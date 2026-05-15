'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface AboutContent {
  id: number
  title: string
  description: string
  image: string
}

export default function AboutSection() {
  const [about, setAbout] = useState<AboutContent | null>(null)

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/about/`)
        setAbout(response.data)
      } catch (error) {
        console.error('Error fetching about content:', error)
      }
    }
    fetchAbout()
  }, [])

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={about?.image || '/placeholder-about.jpg'}
                alt="About Shubhayaan EV"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-primary/10 rounded-full -z-10"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-900">
              {about?.title || 'Leading the EV Revolution'}
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed text-justify">
              {about?.description || 'Shubhayaan EV Official is committed to accelerating the transition to sustainable transportation through innovative electric vehicle solutions.'}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
