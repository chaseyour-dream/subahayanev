'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

interface GalleryImage {
  id: number
  image: string
  caption: string
}

interface Journey {
  id: number
  title: string
  description: string
  cover_image: string
  gallery_images: GalleryImage[]
}

export default function JourneyDetailPage() {
  const params = useParams()
  const [journey, setJourney] = useState<Journey | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/journey/${params.id}/`)
        setJourney(response.data)
      } catch (error) {
        console.error('Error fetching journey:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchJourney()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!journey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Journey not found</div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section with Cover Image */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={journey.cover_image}
          alt={journey.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 text-white mb-6 hover:text-red-400 transition-colors"
            >
              <FaArrowLeft />
              Back to Journey
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {journey.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Cover Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full min-h-[400px]">
              <img
                src={journey.cover_image}
                alt={journey.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 h-full flex flex-col justify-center">
              <div className="relative">
                {/* Decorative Quote Icon */}
                <div className="absolute -top-4 -left-4 text-red-600/10 text-8xl font-serif">"</div>
                
                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-red-500 mb-6 relative z-10">
                  {journey.title}
                </h2>
                
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic text-justify whitespace-pre-line relative z-10">
                  {journey.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {journey.gallery_images && journey.gallery_images.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gray-900">PHOTO</span>
                <span className="text-red-600 ml-3">GALLERY</span>
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {journey.gallery_images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image}
                    alt={image.caption || journey.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white font-semibold text-center">{image.caption}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="max-w-5xl w-full">
            <img
              src={selectedImage.image}
              alt={selectedImage.caption || journey.title}
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            {selectedImage.caption && (
              <div className="mt-4 text-center">
                <p className="text-white text-xl font-semibold">{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
