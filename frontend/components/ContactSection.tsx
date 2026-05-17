'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import axios from 'axios'

export default function ContactSection() {
  const [enquiryData, setEnquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [reviewData, setReviewData] = useState({
    client_name: '',
    model_selected: '',
    review_description: '',
    rating: 5,
    photo: null as File | null
  })

  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [reviewStatus, setReviewStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleEnquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEnquiryData({
      ...enquiryData,
      [e.target.name]: e.target.value
    })
  }

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value
    })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReviewData({
        ...reviewData,
        photo: e.target.files[0]
      })
    }
  }

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingEnquiry(true)
    setEnquiryStatus('idle')

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact-enquiry/`, enquiryData)
      setEnquiryStatus('success')
      setEnquiryData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting enquiry:', error)
      setEnquiryStatus('error')
    } finally {
      setIsSubmittingEnquiry(false)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingReview(true)
    setReviewStatus('idle')

    try {
      const formData = new FormData()
      formData.append('client_name', reviewData.client_name)
      formData.append('model_selected', reviewData.model_selected)
      formData.append('review_description', reviewData.review_description)
      formData.append('rating', reviewData.rating.toString())
      if (reviewData.photo) {
        formData.append('photo', reviewData.photo)
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`, formData)
      setReviewStatus('success')
      setReviewData({ client_name: '', model_selected: '', review_description: '', rating: 5, photo: null })
      // Reset file input
      const fileInput = document.getElementById('photo') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error) {
      console.error('Error submitting review:', error)
      setReviewStatus('error')
    } finally {
      setIsSubmittingReview(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-red-600">CONTACT US</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6">Get in touch with us today</p>
          <div className="flex items-center justify-center gap-3">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-16 h-1 bg-gradient-to-r from-transparent to-red-500 rounded-full origin-right"
            ></motion.div>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring' }}
              className="w-3 h-3 bg-red-500 rounded-full"
            ></motion.div>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="w-16 h-1 bg-gradient-to-l from-transparent to-red-500 rounded-full origin-left"
            ></motion.div>
          </div>
        </motion.div>

        {/* First Row: Contact Info + Enquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <FaPhone className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Phone</h3>
              <p className="text-gray-600 mb-1">9857026370</p>
              <p className="text-gray-600">9802590241</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaEnvelope className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Email</h3>
              <p className="text-gray-600 break-all">shubhayaanmotors@gmail.com</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FaMapMarkerAlt className="text-green-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Location</h3>
              <p className="text-gray-600">Kathmandu, Nepal</p>
              <p className="text-sm text-gray-500 mt-2">Visit our showrooms and service centers</p>
            </div>
          </motion.div>

          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us an Enquiry</h3>
            
            {enquiryStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you! Your enquiry has been submitted successfully.
              </div>
            )}
            
            {enquiryStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                Sorry, there was an error submitting your enquiry. Please try again.
              </div>
            )}

            <form onSubmit={handleEnquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={enquiryData.name}
                    onChange={handleEnquiryChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={enquiryData.email}
                    onChange={handleEnquiryChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={enquiryData.phone}
                    onChange={handleEnquiryChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={enquiryData.subject}
                    onChange={handleEnquiryChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={enquiryData.message}
                  onChange={handleEnquiryChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmittingEnquiry}
                className="w-full px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmittingEnquiry ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Second Row: Review Form + Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Share Your Experience</h3>
            
            {reviewStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                Thank you! Your review has been submitted and is pending approval.
              </div>
            )}
            
            {reviewStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                Sorry, there was an error submitting your review. Please try again.
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="client_name"
                  name="client_name"
                  required
                  value={reviewData.client_name}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="model_selected" className="block text-sm font-medium text-gray-700 mb-1">
                  Vehicle Model *
                </label>
                <input
                  type="text"
                  id="model_selected"
                  name="model_selected"
                  required
                  value={reviewData.model_selected}
                  onChange={handleReviewChange}
                  placeholder="e.g., Kaweii EV, Nevko EV"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                  Rating *
                </label>
                <select
                  id="rating"
                  name="rating"
                  required
                  value={reviewData.rating}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 stars)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 stars)</option>
                  <option value={3}>⭐⭐⭐ (3 stars)</option>
                  <option value={2}>⭐⭐ (2 stars)</option>
                  <option value={1}>⭐ (1 star)</option>
                </select>
              </div>

              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: Upload your photo for the review</p>
              </div>

              <div>
                <label htmlFor="review_description" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review *
                </label>
                <textarea
                  id="review_description"
                  name="review_description"
                  required
                  rows={4}
                  value={reviewData.review_description}
                  onChange={handleReviewChange}
                  placeholder="Share your experience with us..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full px-8 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Us Here</h3>
            <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7234567890123!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjAiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shubhayaan Motors Location"
              ></iframe>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FaMapMarkerAlt className="text-red-600 text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Main Office</p>
                  <p className="text-gray-600 text-sm">Kathmandu, Nepal</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <FaPhone className="text-red-600 text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Contact Numbers</p>
                  <p className="text-gray-600 text-sm">9857026370 / 9802590241</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
