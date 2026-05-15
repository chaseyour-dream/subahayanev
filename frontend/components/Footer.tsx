'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  const [logo, setLogo] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/logo/`)
        setLogo(response.data.logo)
      } catch (error) {
        console.error('Error fetching logo:', error)
      }
    }
    fetchLogo()
  }, [])

  return (
    <footer className="bg-gray-900 text-white rounded-t-[50px] mt-20">
      {/* Separator Line */}
      <div className="w-full h-1 bg-white"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4 flex flex-col items-center md:items-start">
              {logo && (
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shadow-md mb-3">
                  <img src={logo} alt="Shubhayaan EV" className="w-full h-full object-contain p-1" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-white text-center md:text-left">
                SHUBHAYAAN EV
              </h3>
            </div>
            <p className="text-gray-400 text-center md:text-left">
              Powering the electric future with innovative EV solutions
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <div className="w-12 h-0.5 bg-red-500 mb-4"></div>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/history" className="text-gray-400 hover:text-primary transition-colors">Our History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Services</h4>
            <div className="w-12 h-0.5 bg-red-500 mb-4"></div>
            <ul className="space-y-2">
              <li className="text-gray-400">EV Charging Stations</li>
              <li className="text-gray-400">EV Showrooms</li>
              <li className="text-gray-400">Service Centers</li>
              <li className="text-gray-400">Fleet Solutions</li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="w-12 h-0.5 bg-red-500 mb-4"></div>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">shubhayaanmotors@gmail.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Shubhayaan EV Official. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
