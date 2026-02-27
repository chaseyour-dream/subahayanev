'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface PageHeroData {
  id: number
  page: string
  title: string
  subtitle: string
  image: string
}

interface PageHeroProps {
  page: string
}

export default function PageHero({ page }: PageHeroProps) {
  const [heroData, setHeroData] = useState<PageHeroData | null>(null)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/page-hero/${page}/`)
        setHeroData(response.data)
      } catch (error) {
        console.error('Error fetching page hero:', error)
      }
    }
    fetchHeroData()
  }, [page])

  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      {/* Background Image */}
      {heroData ? (
        <img
          src={heroData.image}
          alt={heroData.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-secondary" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {heroData?.title || 'Loading...'}
          </motion.h1>
          
          {heroData?.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            >
              {heroData.subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
