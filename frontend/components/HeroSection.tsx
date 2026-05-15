'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroContent {
  id: number
  title: string
  subtitle: string
  media_type: 'image' | 'video'
  media_file: string
  is_active: boolean
}

// Content position per slide index (cycles: center, bottom-left, center, ...)
const POSITIONS = ['center', 'bottom-left', 'center'] as const
type Position = typeof POSITIONS[number]

// Different transition styles that cycle per slide change
const TRANSITIONS = [
  // 0 → 1: fade
  {
    media: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit:    { opacity: 0 },
      transition: { duration: 1.2, ease: 'easeInOut' },
    },
    content: {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit:    { opacity: 0, scale: 1.04 },
      transition: { duration: 0.6 },
    },
  },
  // 1 → 2: fade
  {
    media: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit:    { opacity: 0 },
      transition: { duration: 1.2, ease: 'easeInOut' },
    },
    content: {
      initial: { opacity: 0, y: 32 },
      animate: { opacity: 1, y: 0 },
      exit:    { opacity: 0, y: -24 },
      transition: { duration: 0.55 },
    },
  },
  // 2 → 0: fade
  {
    media: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit:    { opacity: 0 },
      transition: { duration: 1.2, ease: 'easeInOut' },
    },
    content: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit:    { opacity: 0, x: 30 },
      transition: { duration: 0.55 },
    },
  },
]

export default function HeroSection() {
  const [heroItems, setHeroItems] = useState<HeroContent[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [transitionIndex, setTransitionIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hero/`)
        const data = Array.isArray(response.data) ? response.data : [response.data].filter(Boolean)
        setHeroItems(data)
      } catch (error) {
        console.error('Error fetching hero content:', error)
      }
    }
    fetchHeroContent()
  }, [])

  const advance = useCallback((nextIndex: number) => {
    setTransitionIndex(prev => (prev + 1) % TRANSITIONS.length)
    setCurrentIndex(nextIndex)
  }, [])

  const goToNext = useCallback(() => {
    advance((currentIndex + 1) % heroItems.length)
  }, [currentIndex, heroItems.length, advance])

  const goToIndex = (index: number) => {
    if (index === currentIndex) return
    advance(index)
  }

  // Auto-advance every 7s for both images and videos
  useEffect(() => {
    if (heroItems.length <= 1) return
    timerRef.current = setTimeout(goToNext, 6000)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [currentIndex, heroItems, goToNext])

  // Restart video on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
  }, [currentIndex])

  const current = heroItems[currentIndex]
  const tx = TRANSITIONS[transitionIndex % TRANSITIONS.length]

  // Determine content alignment for this slide
  const posKey = POSITIONS[currentIndex % POSITIONS.length] as Position
  const isCenter = posKey === 'center'

  const contentWrapperClass = isCenter
    ? 'relative z-10 h-full flex items-center justify-center'
    : 'relative z-10 h-full flex items-end pb-36 md:pb-44'

  const contentInnerClass = isCenter
    ? 'text-center max-w-4xl px-6'
    : 'px-6 sm:px-8 max-w-2xl'

  const titleClass = isCenter
    ? 'text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-md'
    : 'text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 drop-shadow-md'

  const buttonsClass = isCenter
    ? 'flex flex-wrap gap-3 justify-center'
    : 'flex flex-wrap gap-3'

  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background Media */}
      <AnimatePresence mode="sync">
        {current ? (
          <motion.div
            key={`media-${current.id}-${transitionIndex}`}
            initial={tx.media.initial}
            animate={tx.media.animate}
            exit={tx.media.exit}
            transition={tx.media.transition}
            className="absolute inset-0 w-full h-full"
          >
            {current.media_type === 'video' ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={current.media_file} type="video/mp4" />
              </video>
            ) : (
              <img
                src={current.media_file}
                alt={current.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </motion.div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700" />
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${currentIndex}`}
          className={contentWrapperClass}
          initial={tx.content.initial}
          animate={tx.content.animate}
          exit={tx.content.exit}
          transition={tx.content.transition}
        >
          <div className={contentInnerClass}>
            <h1 className={`${titleClass} whitespace-nowrap overflow-hidden text-ellipsis`}>
              {current?.title || 'POWERING THE ELECTRIC FUTURE'}
            </h1>

            <p className={`${isCenter ? 'text-xl md:text-2xl' : 'text-base md:text-lg'} text-white/80 mb-8 leading-relaxed`}>
              {current?.subtitle || 'Leading EV Solutions Provider'}
            </p>

            <div className={buttonsClass}>
              <a
                href="#services"
                className={`${isCenter ? 'px-9 py-4 text-base' : 'px-7 py-3 text-sm'} bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg`}
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className={`${isCenter ? 'px-9 py-4 text-base' : 'px-7 py-3 text-sm'} border border-white/70 text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105`}
              >
                Contact Us
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Horizontal circle indicators — centered at bottom */}
      {heroItems.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-row gap-3 items-center">
          {heroItems.map((_, i) => (
            <button
              key={i}
              onClick={() => goToIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative w-5 h-5 flex items-center justify-center group"
            >
              {i === currentIndex ? (
                <span className="w-5 h-5 rounded-full bg-white shadow-lg block transition-all duration-300" />
              ) : (
                <span className="w-5 h-5 rounded-full border-2 border-white/70 group-hover:border-white block transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 right-8 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
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
