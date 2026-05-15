'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'

interface HistoryItem {
  id: number
  year: number
  title: string
  description: string
  image: string | null
  order: number
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company-history/`)
        setHistory(response.data)
      } catch (error) {
        console.error('Error fetching history:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <PageHero page="history" />
      
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 via-green-600 to-red-600 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-5/12">
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      {/* Year Badge */}
                      <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-full font-bold text-2xl mb-4 shadow-lg">
                        {item.year}
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Decorative Element */}
                      <div className={`mt-6 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                        <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-green-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Center Circle */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-green-600 rounded-full flex items-center justify-center shadow-2xl z-10 relative">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-2xl">
                            {index === 0 ? '🚀' : 
                             index === history.length - 1 ? '🎯' : 
                             index % 3 === 0 ? '⚡' : 
                             index % 3 === 1 ? '🏆' : '🌟'}
                          </span>
                        </div>
                      </div>
                      {/* Pulse Animation */}
                      <div className="absolute inset-0 w-16 h-16 bg-red-600 rounded-full animate-ping opacity-20"></div>
                    </div>
                  </div>

                  {/* Image/Placeholder */}
                  <div className="w-full md:w-5/12">
                    {item.image ? (
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-red-100 to-green-100 rounded-2xl p-12 shadow-xl flex items-center justify-center h-64">
                        <div className="text-center">
                          <div className="text-6xl mb-4">
                            {index === 0 ? '🎬' : 
                             index === history.length - 1 ? '🚀' : 
                             index % 4 === 0 ? '⚡' : 
                             index % 4 === 1 ? '🏢' : 
                             index % 4 === 2 ? '🌱' : '🎯'}
                          </div>
                          <p className="text-gray-600 font-semibold">{item.year}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-red-600 to-green-600 rounded-3xl p-12 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Be Part of Our Journey
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have chosen sustainable transportation with Shubhayaan Motors
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="px-8 py-4 bg-white text-red-600 rounded-full font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                >
                  Explore Our Vehicles
                </a>
                <a
                  href="/test-drive"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-red-600 transition-all transform hover:scale-105"
                >
                  Book Test Drive
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
