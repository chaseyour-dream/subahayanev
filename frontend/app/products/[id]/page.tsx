'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

interface Product {
  id: number
  name: string
  category: string
  description: string
  price: string
  image: string
  specifications: string
  battery_capacity: string
  model: string
  range_per_charge: string
  charging_time: string
  top_speed: string
  seating_capacity: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}/`)
        setProduct(response.data)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Product not found</div>
      </div>
    )
  }

  const features = [
    { label: 'Battery Capacity', value: product.battery_capacity },
    { label: 'Model', value: product.model },
    { label: 'Range per Charge', value: product.range_per_charge },
    { label: 'Charging Time', value: product.charging_time },
    { label: 'Top Speed', value: product.top_speed },
    { label: 'Seating Capacity', value: product.seating_capacity },
  ].filter(f => f.value)

  return (
    <div>
      <PageHero page="products" />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/products" className="inline-flex items-center text-red-600 hover:text-red-700 mb-8">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        <div className="space-y-12">
          {/* Top Section: Image and Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm uppercase tracking-wide mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl font-bold text-red-600 mb-6">{product.price}</p>
              </div>

              <div className="prose prose-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section: Key Features and Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Key Features */}
            {features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-green-600 rounded-2xl p-8 text-white shadow-xl"
              >
                <h3 className="text-3xl font-bold mb-6">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-green-100 text-sm font-medium mb-1">{feature.label}</span>
                      <span className="text-white text-xl font-bold">{feature.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Specifications */}
            {product.specifications && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
              >
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Specifications</h3>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{product.specifications}</p>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
          >
            <Link
              href="/test-drive"
              className="flex-1 bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition-colors text-center text-lg"
            >
              Book Test Drive
            </Link>
            <Link
              href="/contact"
              className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors text-center text-lg"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
    </div>
  )
}
