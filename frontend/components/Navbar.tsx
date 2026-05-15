'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import { FaBars, FaTimes } from 'react-icons/fa'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logo, setLogo] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Check if scrolled from top
      setIsScrolled(currentScrollY > 50)

      // Only show navbar when at the very top of the page
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsMobileMenuOpen(false) // Close mobile menu when hiding
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

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

  const isActive = (path: string) => pathname === path

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/services', label: 'SERVICES' },
    { href: '/products', label: 'PRODUCTS' },
    { href: '/gallery', label: 'GALLERY' },
    { href: '/journey', label: 'JOURNEY' },
    { href: '/history', label: 'HISTORY' },
  ]

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 shadow-xl'
          : 'bg-transparent'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0 group">
            {logo && (
              <div className="w-16 h-16 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img src={logo} alt="Shubhayaan EV" className="w-full h-full object-contain" />
              </div>
            )}
            <div className="hidden sm:block">
              <div className="text-2xl font-bold leading-tight">
                <span className={`${isScrolled ? 'text-red-600' : 'text-white'} transition-colors duration-300`}>
                  SHUBHAYAAN
                </span>
              </div>
              <div className="text-sm font-semibold tracking-wider">
                <span className={`${isScrolled ? 'text-green-600' : 'text-green-400'} transition-colors duration-300`}>
                  ELECTRIC VEHICLES
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 font-semibold text-sm transition-all duration-300 rounded-lg group ${
                  isActive(link.href)
                    ? isScrolled
                      ? 'text-red-600'
                      : 'text-white'
                    : isScrolled
                    ? 'text-gray-700 hover:text-red-600'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
                {/* Active Indicator */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 transition-all duration-300 ${
                    isActive(link.href)
                      ? 'w-full bg-red-600'
                      : 'w-0 group-hover:w-full bg-red-600'
                  }`}
                ></span>
              </Link>
            ))}
            
            {/* Contact Button */}
            <Link
              href="/contact"
              className={`ml-4 px-5 py-1.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-lg ${
                isScrolled
                  ? 'border-red-600 text-red-600 bg-transparent'
                  : 'border-white text-white bg-transparent'
              }`}
            >
              CONTACT US
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-red-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block px-4 py-3 rounded-lg font-bold text-sm border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-200 text-center mt-2 active:scale-95"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
