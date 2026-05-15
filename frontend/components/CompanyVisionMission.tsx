'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface VisionMission {
  id: number
  title: string
  description: string
  icon: string
  image: string | null
}

export default function CompanyVisionMission() {
  const [visions, setVisions] = useState<VisionMission[]>([])
  const [missions, setMissions] = useState<VisionMission[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visionRes, missionRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company-vision/`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company-mission/`)
        ])
        setVisions(visionRes.data)
        setMissions(missionRes.data)
      } catch (error) {
        console.error('Error fetching vision/mission:', error)
      }
    }
    fetchData()
  }, [])

  if (visions.length === 0 && missions.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          {visions.map((vision, index) => (
            <motion.div
              key={vision.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 p-8 md:p-10">
                {/* Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">{vision.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {vision.title}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2"></div>
                  </div>
                </div>

                {/* Description */}
                <div className="text-gray-300 text-lg leading-relaxed">
                  {vision.description.split('\n').map((line, idx) => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return null;
                    
                    // Check if line starts with bullet point or dash
                    const isBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*');
                    const content = isBullet ? trimmedLine.substring(1).trim() : trimmedLine;
                    
                    return (
                      <div key={idx} className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mt-2 shadow-lg shadow-blue-500/50"></div>
                        <p className="flex-1">{content}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-600/30 to-transparent"></div>
              </div>
            </motion.div>
          ))}

          {/* Mission */}
          {missions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 p-8 md:p-10">
                {/* Icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-6xl">{mission.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      {mission.title}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2"></div>
                  </div>
                </div>

                {/* Description */}
                <div className="text-gray-300 text-lg leading-relaxed">
                  {mission.description.split('\n').map((line, idx) => {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) return null;
                    
                    // Check if line starts with bullet point or dash
                    const isBullet = trimmedLine.startsWith('•') || trimmedLine.startsWith('-') || trimmedLine.startsWith('*');
                    const content = isBullet ? trimmedLine.substring(1).trim() : trimmedLine;
                    
                    return (
                      <div key={idx} className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-br from-red-400 to-orange-400 rounded-full mt-2 shadow-lg shadow-red-500/50"></div>
                        <p className="flex-1">{content}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-600/30 to-transparent"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
