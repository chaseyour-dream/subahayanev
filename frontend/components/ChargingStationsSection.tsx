'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ChargingStation {
  id: number
  name: string
  location: string
  district: string
  description: string
  image: string
  charging_type: string
}

export default function ChargingStationsSection() {
  const [stations, setStations] = useState<ChargingStation[]>([])

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/charging-stations/`)
        setStations(response.data)
      } catch (error) {
        console.error('Error fetching charging stations:', error)
      }
    }
    fetchStations()
  }, [])

  const LocationPin = ({ size = 56 }: { size?: number }) => (
    <div style={{ width: size, height: size * 1.2 }} className="flex items-center justify-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="white"
        style={{ width: size, height: size }}
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    </div>
  )

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>
        
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${(i * 0.3) % 5}s`,
              animationDuration: `${8 + (i * 0.2) % 4}s`
            }}
          />
        ))}

        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(100px, -100px) scale(1.2); }
          66% { transform: translate(-50px, 100px) scale(0.9); }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0) scale(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(50px) scale(1); opacity: 0; }
        }
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: floatOrb 20s ease-in-out infinite;
        }
        .gradient-orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%);
          top: 10%;
          left: 10%;
        }
        .gradient-orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(52, 211, 153, 0.3) 0%, transparent 70%);
          bottom: 20%;
          right: 10%;
          animation-delay: 7s;
          animation-duration: 25s;
        }
        .gradient-orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.35) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          animation-delay: 14s;
          animation-duration: 30s;
        }
        .floating-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: floatParticle linear infinite;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Find Our Charging Stations</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">Discover our strategically located charging stations across Nepal, designed for your convenience</p>
          <div className="flex items-center justify-center gap-3">
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} className="w-16 h-1 bg-gradient-to-r from-transparent to-white rounded-full origin-right"></motion.div>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, type: 'spring' }} className="w-3 h-3 bg-white rounded-full"></motion.div>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} className="w-16 h-1 bg-gradient-to-l from-transparent to-white rounded-full origin-left"></motion.div>
          </div>
        </motion.div>

        <div className="relative">
          <div className="space-y-0 md:space-y-0 max-w-7xl mx-auto">
            {stations.map((station, index) => (
              <div key={station.id} className="relative mb-8 md:mb-0">
                {index < stations.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 border-l-4 border-dotted border-white z-0" style={{ top: '50%', height: 'calc(100% + 2rem)' }}></div>
                )}
                <div className={`relative ${index === 0 ? 'pt-0' : 'md:pt-8'}`}>
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ marginTop: '30px' }}>
                    <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, type: 'spring', stiffness: 150 }} whileHover={{ scale: 1.1 }} className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-lg"></div>
                      <LocationPin size={70} />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    {/* Desktop: Alternating layout */}
                    <div className="hidden md:flex items-center w-full">
                      {index % 2 === 0 && (
                        <>
                          <div className="w-80 flex-shrink-0">
                            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full">
                              <Link href={`/charging-stations/${station.id}`}>
                                <div className="bg-white rounded-2xl overflow-hidden transition-all cursor-pointer hover:scale-105 shadow-lg hover:shadow-2xl">
                                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    <img src={station.image} alt={station.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                  </div>
                                  <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{station.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                      </svg>
                                      {station.location}, {station.district}
                                    </p>
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                      station.charging_type === 'fast' ? 'bg-green-100 text-green-700' :
                                      station.charging_type === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-blue-100 text-blue-700'
                                    }`}>
                                      ⚡ {station.charging_type?.charAt(0).toUpperCase() + station.charging_type?.slice(1)} Charging
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          </div>
                          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="border-t-4 border-dotted border-white origin-left ml-8" style={{ width: 'calc(50% - 350px)' }}></motion.div>
                        </>
                      )}
                      {index % 2 !== 0 && (
                        <>
                          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }} className="border-t-4 border-dotted border-white origin-right mr-8" style={{ width: 'calc(50% - 160px - 32px)', marginLeft: 'calc(50% + 32px)' }}></motion.div>
                          <div className="w-80 flex-shrink-0 ml-auto">
                            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full">
                              <Link href={`/charging-stations/${station.id}`}>
                                <div className="bg-white rounded-2xl overflow-hidden transition-all cursor-pointer hover:scale-105 shadow-lg hover:shadow-2xl">
                                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    <img src={station.image} alt={station.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                  </div>
                                  <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{station.name}</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                      </svg>
                                      {station.location}, {station.district}
                                    </p>
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                      station.charging_type === 'fast' ? 'bg-green-100 text-green-700' :
                                      station.charging_type === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-blue-100 text-blue-700'
                                    }`}>
                                      ⚡ {station.charging_type?.charAt(0).toUpperCase() + station.charging_type?.slice(1)} Charging
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile: Stacked layout */}
                    <div className="md:hidden w-full max-w-sm mx-auto">
                      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full">
                        <Link href={`/charging-stations/${station.id}`}>
                          <div className="bg-white rounded-2xl overflow-hidden transition-all cursor-pointer hover:scale-105 shadow-lg hover:shadow-2xl">
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                              <img src={station.image} alt={station.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                            <div className="p-6">
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{station.name}</h3>
                              <p className="text-sm text-gray-500 flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {station.location}, {station.district}
                              </p>
                              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                station.charging_type === 'fast' ? 'bg-green-100 text-green-700' :
                                station.charging_type === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                ⚡ {station.charging_type?.charAt(0).toUpperCase() + station.charging_type?.slice(1)} Charging
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
