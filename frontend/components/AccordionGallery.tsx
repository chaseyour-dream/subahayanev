'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface AccordionItem {
  id: number
  title: string
  description: string
  media_type: 'image' | 'video'
  image: string | null
  video: string | null
  media_url: string
  category: string
  order: number
}

export default function AccordionGallery() {
  const [items, setItems] = useState<AccordionItem[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/gallery/`)
        console.log('Gallery API Response:', response.data)
        
        // Handle paginated response
        const galleryData = response.data.results || response.data
        const dataArray = Array.isArray(galleryData) ? galleryData : []
        
        // First try to get items with order 1-5
        let filteredItems = dataArray
          .filter((item: AccordionItem) => item.order >= 1 && item.order <= 5)
          .sort((a: AccordionItem, b: AccordionItem) => a.order - b.order)
        
        // If no items with order 1-5, just take the first 5 items
        if (filteredItems.length === 0) {
          filteredItems = dataArray.slice(0, 5)
        }
        
        console.log('Filtered Items:', filteredItems)
        setItems(filteredItems)
      } catch (error) {
        console.error('Error fetching gallery:', error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="text-center">
          <p className="text-white text-xl">Loading gallery...</p>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    console.log('No items found with order 1-5')
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">EXPLORE OUR</span>
            <span className="text-red-600 ml-3">GALLERY</span>
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400">Hover to explore our collection</p>
        </motion.div>
      </div>

      <div className="w-full px-4">
        {/* Desktop: Horizontal Accordion */}
        <div className="hidden md:flex gap-2 h-[600px] max-w-[1400px] mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out ${
                hoveredIndex === null
                  ? 'flex-1'
                  : hoveredIndex === index
                  ? 'flex-[3]'
                  : 'flex-[0.5]'
              }`}
            >
              {/* Background Media */}
              {item.media_type === 'video' ? (
                <video
                  src={item.media_url}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${item.media_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}

              {/* Dark Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-80' : 'opacity-60'
                }`}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6">
                {/* Vertical Title (when not hovered) */}
                <div
                  className={`absolute left-6 bottom-6 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-0 translate-y-4' : 'opacity-100'
                  }`}
                >
                  <h3
                    className="text-white font-bold text-2xl whitespace-nowrap"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'mixed',
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Expanded Content (when hovered) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${hoveredIndex === index ? 'block' : 'hidden'}`}
                >
                  <div className="space-y-4">
                    {/* Category Badge */}
                    {item.category && (
                      <span className="inline-block px-4 py-2 bg-red-600 text-white rounded-full text-sm font-semibold">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-white font-bold text-3xl md:text-4xl leading-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    {item.description && (
                      <p className="text-gray-300 text-lg leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}

                    {/* Decorative Line */}
                    <div className="w-20 h-1 bg-red-600"></div>
                  </div>
                </motion.div>
              </div>

              {/* Hover Indicator */}
              <div
                className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  hoveredIndex === index ? 'scale-110 bg-red-600' : 'scale-100'
                }`}
              >
                {item.media_type === 'video' ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Vertical Accordion */}
        <div className="md:hidden flex flex-col gap-2 max-w-md mx-auto" style={{ height: '600px' }}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setHoveredIndex(hoveredIndex === index ? null : index)}
              className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-in-out ${
                hoveredIndex === null
                  ? 'flex-1'
                  : hoveredIndex === index
                  ? 'flex-[3]'
                  : 'flex-[0.5]'
              }`}
            >
              {/* Background Media */}
              {item.media_type === 'video' ? (
                <video
                  src={item.media_url}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url(${item.media_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-80' : 'opacity-60'
                }`}
              />
              
              <div className="relative h-full flex flex-col justify-end p-4">
                {/* Horizontal Title (when not expanded) */}
                <div
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <h3 className="text-white font-bold text-lg">
                    {item.title}
                  </h3>
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 10,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`${hoveredIndex === index ? 'block' : 'hidden'}`}
                >
                  <div className="space-y-3">
                    {item.category && (
                      <span className="inline-block px-3 py-1 bg-red-600 text-white rounded-full text-xs font-semibold">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    )}
                    <h3 className="text-white font-bold text-2xl leading-tight">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}
                    <div className="w-16 h-1 bg-red-600"></div>
                  </div>
                </motion.div>
              </div>

              {/* Tap Indicator */}
              <div
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
                  hoveredIndex === index ? 'scale-110 bg-red-600' : 'scale-100'
                }`}
              >
                {item.media_type === 'video' ? (
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <a
          href="/gallery"
          className="inline-block px-10 py-4 bg-red-600 text-white rounded-full font-bold text-lg hover:bg-red-700 transition-all transform hover:scale-105 shadow-2xl"
        >
          View Full Gallery
        </a>
      </div>
    </section>
  )
}
