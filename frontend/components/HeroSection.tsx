'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface HeroContent {
  id: number
  title: string
  subtitle: string
  media_type: 'image' | 'video'
  media_file: string
  is_active: boolean
}

export default function HeroSection() {
  const [heroContent, setHeroContent] = useState<HeroContent | null>(null)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hero/`)
        console.log('Hero content fetched:', response.data)
        console.log('Media file URL:', response.data.media_file)
        setHeroContent(response.data)
      } catch (error) {
        console.error('Error fetching hero content:', error)
      }
    }
    fetchHeroContent()
  }, [])

  console.log('Current heroContent state:', heroContent)

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Media */}
      {heroContent ? (
        <>
          {heroContent.media_type === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroContent.media_file} type="video/mp4" />
            </video>
          ) : (
            <img
              src={heroContent.media_file}
              alt="Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </>
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-gradient-to-r from-primary to-secondary"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {heroContent?.title || 'POWERING THE ELECTRIC FUTURE'}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
          >
            {heroContent?.subtitle || 'Leading EV Solutions Provider'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#services"
              className="px-8 py-4 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Services
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-white text-white bg-transparent rounded-full font-semibold hover:bg-red-600 hover:border-red-600 transition-all transform hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}
