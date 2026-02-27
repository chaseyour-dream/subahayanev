'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '@/components/PageHero'
import { FaPlay, FaTimes, FaImage, FaVideo, FaCar } from 'react-icons/fa'

interface GalleryItem {
  id: number
  title: string
  description: string
  media_type: 'image' | 'video'
  image: string | null
  video: string | null
  media_url: string
  category?: string
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedMediaType, setSelectedMediaType] = useState<string>('all')
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery/`)
        console.log('Gallery data:', response.data)
        setItems(response.data)
      } catch (error) {
        console.error('Error fetching gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const categories = ['all', 'kaweii', 'nevko', 'general']
  const mediaTypes = ['all', 'image', 'video']
  
  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category?.toLowerCase() === selectedCategory
    const mediaTypeMatch = selectedMediaType === 'all' || item.media_type === selectedMediaType
    return categoryMatch && mediaTypeMatch
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredItems.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, selectedMediaType])

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedItem(null)
    document.body.style.overflow = 'unset'
  }

  if (loading) {
    return (
      <>
        <PageHero page="gallery" />
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              <p className="text-gray-600 mt-4">Loading gallery...</p>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero page="gallery" />

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-12 space-y-6">
            {/* Vehicle Type Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaCar className="text-red-600" />
                Vehicle Type
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Media Type Filter */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FaImage className="text-blue-600" />
                Content Type
              </h3>
              <div className="flex flex-wrap gap-3">
                {mediaTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedMediaType(type)}
                    className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2 ${
                      selectedMediaType === type
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'
                    }`}
                  >
                    {type === 'image' && <FaImage />}
                    {type === 'video' && <FaVideo />}
                    {type === 'all' && <span>🎬</span>}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          {currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => openModal(item)}
                  className="relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  {item.media_type === 'video' ? (
                    <>
                      <video
                        src={item.media_url}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <FaPlay className="text-white text-2xl ml-1" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.media_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 w-full">
                      <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      {item.description && (
                        <p className="text-gray-300 text-sm mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                  </div>

                  {item.category && item.category !== 'general' && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 text-white rounded-full text-xs font-semibold">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-red-600 hover:text-white shadow border border-gray-200'
                    }`}
                  >
                    ← Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1
                      // Show first page, last page, current page, and pages around current
                      const showPage = 
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      
                      // Show ellipsis
                      const showEllipsisBefore = pageNumber === currentPage - 2 && currentPage > 3
                      const showEllipsisAfter = pageNumber === currentPage + 2 && currentPage < totalPages - 2

                      if (showEllipsisBefore || showEllipsisAfter) {
                        return (
                          <span key={pageNumber} className="px-3 py-2 text-gray-400">
                            ...
                          </span>
                        )
                      }

                      if (!showPage) return null

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            currentPage === pageNumber
                              ? 'bg-red-600 text-white shadow-lg scale-110'
                              : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-red-600 hover:text-white shadow border border-gray-200'
                    }`}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-xl">No media found with selected filters</p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedMediaType('all')
                }}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-red-600 transition-colors z-10"
              >
                <FaTimes className="text-4xl" />
              </button>

              <div className="bg-black rounded-lg overflow-hidden flex-1 flex items-center justify-center">
                {selectedItem.media_type === 'video' ? (
                  <video
                    src={selectedItem.media_url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.media_url}
                    alt={selectedItem.title}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                )}
              </div>

              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-b-lg p-8 mt-2 border-t-4 border-red-600">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {selectedItem.title}
                      </h2>
                      <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ${
                        selectedItem.media_type === 'video' 
                          ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      }`}>
                        {selectedItem.media_type === 'video' ? '🎥 Video' : '📷 Image'}
                      </span>
                      {selectedItem.category && (
                        <span className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg">
                          {selectedItem.category.charAt(0).toUpperCase() + selectedItem.category.slice(1)}
                        </span>
                      )}
                    </div>
                    {selectedItem.description && (
                      <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border-l-4 border-red-500 shadow-xl">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-red-400 font-bold text-sm uppercase tracking-wide mb-2">Description</h3>
                            <p className="text-gray-300 leading-relaxed text-base">{selectedItem.description}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold hover:from-red-700 hover:to-red-800 transition-all flex-shrink-0 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
