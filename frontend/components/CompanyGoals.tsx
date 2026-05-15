'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

interface Goal {
  id: number
  title: string
  description: string
  icon: string
  image: string | null
  media_url: string
  media_display_url: string | null
  target_year: number | null
}

export default function CompanyGoals() {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company-goals/`)
        setGoals(response.data)
      } catch (error) {
        console.error('Error fetching goals:', error)
      }
    }
    fetchGoals()
  }, [])

  if (goals.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900">OUR</span>
            <span className="text-blue-900 ml-3">GOALS</span>
          </h2>
          <div className="w-24 h-1 bg-blue-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Strategic objectives driving our growth and commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group h-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
              
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-3 overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {goal.media_display_url ? (
                    <img
                      src={goal.media_display_url}
                      alt={goal.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-gray-400 text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm font-medium">No Image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center flex-1">
                    {goal.description}
                  </p>
                </div>

                <div className="h-1.5 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
