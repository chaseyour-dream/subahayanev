'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

interface ChargingStation {
  id: number
  name: string
  location: string
  district: string
  description: string
  image: string
  charging_type: string
  washing_facility: boolean
  contact_person: string
  contact_phone: string
  map_embed_code: string
}

export default function ChargingStationDetailPage() {
  const params = useParams()
  const [station, setStation] = useState<ChargingStation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/charging-stations/${params.id}/`)
        setStation(response.data)
      } catch (error) {
        console.error('Error fetching station:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStation()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!station) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Station not found</div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <img
          src={station.image}
          alt={station.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white mb-6 hover:text-primary transition-colors"
            >
              <FaArrowLeft />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex-1">
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">
                    {station.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-block px-6 py-2 bg-red-600 text-white rounded-full font-semibold text-lg">
                      📍 {station.location}, {station.district}
                    </div>
                    <div className={`inline-block px-5 py-2 rounded-full text-sm font-semibold ${
                      station.charging_type === 'fast' ? 'bg-green-500 text-white' :
                      station.charging_type === 'moderate' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      ⚡ {station.charging_type?.charAt(0).toUpperCase() + station.charging_type?.slice(1)} Charging
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About This Station Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Station</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-justify whitespace-pre-line">
                  {station.description}
                </p>
              </div>

              <div className={`mt-12 grid gap-6 ${
                station.washing_facility ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 lg:grid-cols-3'
              }`}>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-xl h-48 flex flex-col items-center justify-center text-center">
                  <div className="text-primary text-5xl mb-3">⚡</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">Fast Charging</h3>
                  <p className="text-gray-600 text-xs">Quick and efficient charging</p>
                </div>
                
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 rounded-xl h-48 flex flex-col items-center justify-center text-center">
                  <div className="text-secondary text-5xl mb-3">🔌</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">Multiple Ports</h3>
                  <p className="text-gray-600 text-xs">Charge multiple vehicles</p>
                </div>
                
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-xl h-48 flex flex-col items-center justify-center text-center">
                  <div className="text-accent text-5xl mb-3">🏪</div>
                  <h3 className="font-bold text-gray-900 mb-2 text-base">Amenities</h3>
                  <p className="text-gray-600 text-xs">Comfortable waiting area</p>
                </div>

                {station.washing_facility && (
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 p-6 rounded-xl h-48 flex flex-col items-center justify-center text-center">
                    <div className="text-blue-600 text-5xl mb-3">🚿</div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">Washing Facility</h3>
                    <p className="text-gray-600 text-xs">Available</p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              {(station.contact_person || station.contact_phone) && (
                <div className="mt-8 bg-green-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {station.contact_person && (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-100 text-sm font-medium">Representative</p>
                          <p className="text-white text-lg font-bold">{station.contact_person}</p>
                        </div>
                      </div>
                    )}
                    {station.contact_phone && (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-green-100 text-sm font-medium">Phone Number</p>
                          <a href={`tel:${station.contact_phone}`} className="text-white text-lg font-bold hover:text-green-100 transition-colors">
                            {station.contact_phone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Inquiry Button */}
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="block w-full px-8 py-4 bg-red-600 text-white text-center rounded-lg font-semibold hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Send Inquiry
                </Link>
              </div>
            </motion.div>

            {/* Google Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Location Map</h2>
              {station.map_embed_code ? (
                <div 
                  className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:border-0"
                  dangerouslySetInnerHTML={{ 
                    __html: station.map_embed_code.replace(/width="[^"]*"/, 'width="100%"').replace(/height="[^"]*"/, 'height="100%"')
                  }}
                />
              ) : (
                <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                  <div className="text-center p-8">
                    <FaMapMarkerAlt className="text-gray-400 text-6xl mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Map not available</p>
                    <p className="text-gray-500 text-sm mt-2">Contact us for directions</p>
                  </div>
                </div>
              )}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-red-600 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{station.name}</p>
                    <p className="text-gray-600">{station.location}</p>
                    <p className="text-gray-600">{station.district}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
