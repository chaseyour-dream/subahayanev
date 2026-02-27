'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaTimes, FaCalendar } from 'react-icons/fa'
import axios from 'axios'

interface Review {
  id: number
  client_name: string
  model_selected: string
  photo: string
  photo_url: string
  review_description: string
  rating: number
  created_at: string
}

export default function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [direction, setDirection] = useState(0)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)

  const reviewsPerPage = 3
  const totalPages = Math.ceil(reviews.length / reviewsPerPage)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`)
        setReviews(response.data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  useEffect(() => {
    if (reviews.length > reviewsPerPage && !selectedReview) {
      const timer = setInterval(() => {
        nextPage()
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [currentPage, reviews.length, selectedReview])

  const nextPage = () => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToPage = (page: number) => {
    setDirection(page > currentPage ? 1 : -1)
    setCurrentPage(page)
  }

  const openReviewModal = (review: Review) => {
    setSelectedReview(review)
    document.body.style.overflow = 'hidden'
  }

  const closeReviewModal = () => {
    setSelectedReview(null)
    document.body.style.overflow = 'unset'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-xl">Loading reviews...</p>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) {
    return null
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const startIndex = currentPage * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const currentReviews = reviews.slice(startIndex, endIndex)

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gray-900">WHAT OUR</span>
              <span className="text-red-600 ml-3">CLIENTS SAY</span>
            </h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Real experiences from our valued customers</p>
          </motion.div>

          <div className="relative">
            {/* Navigation Buttons */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevPage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
                  aria-label="Previous reviews"
                >
                  <FaChevronLeft className="text-xl" />
                </button>

                <button
                  onClick={nextPage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all"
                  aria-label="Next reviews"
                >
                  <FaChevronRight className="text-xl" />
                </button>
              </>
            )}

            {/* Reviews Grid with Carousel */}
            <div className="relative min-h-[600px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {currentReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => openReviewModal(review)}
                      className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all flex flex-col h-full cursor-pointer transform hover:scale-105"
                    >
                      {/* Quote Icon */}
                      <FaQuoteLeft className="text-3xl text-red-600 opacity-20 mb-4" />

                      {/* Customer Photo */}
                      <div className="flex justify-center mb-6">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-600 shadow-lg">
                            <img
                              src={review.photo_url || review.photo}
                              alt={review.client_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Rating Badge */}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg text-sm">
                            <FaStar className="text-yellow-300 text-xs" />
                            <span className="font-bold">{review.rating}.0</span>
                          </div>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-lg ${
                              i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 text-center leading-relaxed mb-6 italic flex-1 line-clamp-4">
                        "{review.review_description}"
                      </p>

                      {/* Customer Info */}
                      <div className="text-center border-t pt-4 mt-auto">
                        <h4 className="text-lg font-bold text-gray-900">
                          {review.client_name}
                        </h4>
                        <p className="text-red-600 font-semibold text-sm">
                          {review.model_selected}
                        </p>
                      </div>

                      {/* Click to view indicator */}
                      <div className="text-center mt-4">
                        <span className="text-xs text-gray-500 hover:text-red-600 transition-colors">
                          Click to read full review →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentPage
                        ? 'bg-red-600 w-8'
                        : 'bg-gray-300 hover:bg-gray-400 w-3'
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Page Counter */}
            {totalPages > 1 && (
              <div className="text-center mt-6">
                <p className="text-gray-600 font-medium">
                  Showing {startIndex + 1}-{Math.min(endIndex, reviews.length)} of {reviews.length} reviews
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Full Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeReviewModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeReviewModal}
                className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all shadow-lg"
              >
                <FaTimes className="text-xl" />
              </button>

              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 md:p-8 text-white relative overflow-hidden">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                    {/* Customer Photo */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                          <img
                            src={selectedReview.photo_url || selectedReview.photo}
                            alt={selectedReview.client_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Rating Badge */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full flex items-center gap-1 shadow-xl">
                          <FaStar className="text-sm" />
                          <span className="font-bold text-lg">{selectedReview.rating}.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info */}
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        {selectedReview.client_name}
                      </h2>
                      <p className="text-xl text-red-100 font-semibold mb-3">
                        {selectedReview.model_selected}
                      </p>
                      
                      {/* Stars */}
                      <div className="flex justify-center md:justify-start gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xl ${
                              i < selectedReview.rating ? 'text-yellow-300' : 'text-white/30'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Date */}
                      <div className="flex items-center justify-center md:justify-start gap-2 text-red-100 text-sm">
                        <FaCalendar />
                        <span>{formatDate(selectedReview.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6 md:p-8 max-h-[50vh] overflow-y-auto">
                  <div className="relative mb-6">
                    <FaQuoteLeft className="absolute -top-2 -left-2 text-4xl text-red-600 opacity-10" />
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed italic pl-6">
                      {selectedReview.review_description}
                    </p>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl text-center">
                      <div className="text-2xl mb-1">⭐</div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Rating</h4>
                      <p className="text-red-600 font-bold text-xl">{selectedReview.rating}/5</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                      <div className="text-2xl mb-1">🚗</div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Vehicle</h4>
                      <p className="text-blue-600 font-semibold text-xs">{selectedReview.model_selected}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center">
                      <div className="text-2xl mb-1">✓</div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Status</h4>
                      <p className="text-green-600 font-semibold text-xs">Verified</p>
                    </div>
                  </div>

                  {/* Close Button */}
                  <div className="text-center">
                    <button
                      onClick={closeReviewModal}
                      className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
