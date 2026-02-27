'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

interface ServiceLocation {
  id: number
  location_name: string
  address: string
  city: string
  district: string
  contact_person: string
  contact_phone: string
  charging_type: string
  washing_facility: boolean
  image: string
}

interface Service {
  id: number
  title: string
  description: string
  icon: string
  locations: ServiceLocation[]
}

export default function ServiceDetailPage() {
  const params = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/services/${params.id}/`)
        setService(response.data)
      } catch (error) {
        console.error('Error fetching service:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchService()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Service not found</div>
      </div>
    )
  }

  return (
    <div>
      <PageHero page="services" />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/services" className="inline-flex items-center text-red-600 hover:text-red-700 mb-8">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>

          {/* Service Title and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {service.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line text-justify">
              {service.description}
            </p>
          </motion.div>

          {/* Display all locations */}
          {service.locations && service.locations.length > 0 && (
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Locations</h2>
              {service.locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Location Image */}
                  <div className="relative h-80 lg:h-auto overflow-hidden">
                    {location.image ? (
                      <img
                        src={location.image}
                        alt={location.location_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                        <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Location Details */}
                  <div className="p-8 space-y-6">
                    <h3 className="text-3xl font-bold text-gray-900">
                      {location.location_name}
                    </h3>

                    {/* Facilities Badges */}
                    {(location.charging_type && location.charging_type !== 'none') || location.washing_facility ? (
                      <div className="flex flex-wrap gap-3">
                        {location.charging_type && location.charging_type !== 'none' && (
                          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                            location.charging_type === 'fast' ? 'bg-green-500 text-white' :
                            location.charging_type === 'moderate' ? 'bg-yellow-500 text-white' :
                            'bg-blue-500 text-white'
                          }`}>
                            <span>⚡</span>
                            <span>{location.charging_type.charAt(0).toUpperCase() + location.charging_type.slice(1)} Charging</span>
                          </div>
                        )}
                        {location.washing_facility && (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white">
                            <span>🚿</span>
                            <span>Washing Facility</span>
                          </div>
                        )}
                      </div>
                    ) : null}

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-gray-500 text-sm font-medium">Address</p>
                          <p className="text-gray-900 font-medium text-lg">{location.address}</p>
                          {(location.city || location.district) && (
                            <p className="text-gray-700">{location.city}{location.city && location.district && ', '}{location.district}</p>
                          )}
                        </div>
                      </div>

                      {(location.contact_person || location.contact_phone) && (
                        <div className="bg-green-600 rounded-xl p-6 text-white space-y-3">
                          {location.contact_person && (
                            <div className="flex items-center gap-3">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              <div>
                                <p className="text-green-100 text-sm">Contact Person</p>
                                <p className="text-white text-lg font-semibold">{location.contact_person}</p>
                              </div>
                            </div>
                          )}
                          {location.contact_phone && (
                            <div className="flex items-center gap-3">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                              </svg>
                              <div>
                                <p className="text-green-100 text-sm">Phone Number</p>
                                <p className="text-white text-lg font-semibold">{location.contact_phone}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Contact Button */}
          <div className="flex justify-center mt-12">
            <Link
              href="/contact"
              className="bg-red-600 text-white px-12 py-4 rounded-full font-semibold hover:bg-red-700 transition-colors text-lg"
            >
              Contact Us for More Information
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
