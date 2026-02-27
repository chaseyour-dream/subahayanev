'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TestDriveSection() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-400 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
          >
            Experience the Future
            <br />
            <span className="text-4xl md:text-6xl">of Driving</span>
          </motion.h2>

          {/* Divider Line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-md mx-auto mb-10"
          >
            <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent"></div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-6">
              Are you ready to <span className="text-white font-semibold">revolutionize your daily commute?</span>
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Our electric vehicles are designed to offer unparalleled <span className="text-white">performance</span>, 
              <span className="text-white"> efficiency</span>, and <span className="text-white">sustainability</span>. 
              With cutting-edge technology, sleek designs, and zero emissions, our EVs are paving the way for a greener future.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/test-drive"
              className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-black bg-white rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-white/50"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-100 to-white transition-all duration-300 group-hover:from-white group-hover:to-gray-100"></span>
              <span className="relative flex items-center gap-3">
                Book a Test Drive
                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex justify-center gap-8 text-gray-500"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm">Electric</div>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-sm">Emissions</div>
            </div>
            <div className="w-px bg-gray-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">∞</div>
              <div className="text-sm">Possibilities</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
