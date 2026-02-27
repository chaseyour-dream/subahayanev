'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import PageHero from '@/components/PageHero'
import AboutSection from '@/components/AboutSection'
import TestDriveSection from '@/components/TestDriveSection'
import { FaEnvelope, FaPhone, FaQuoteLeft } from 'react-icons/fa'

interface OwnerMessage {
  id: number
  owner_name: string
  owner_title: string
  message: string
  photo: string
}

interface TeamMember {
  id: number
  name: string
  designation: string
  team_type: string
  description: string
  email: string
  phone: string
  photo: string
}

export default function AboutPage() {
  const [ownerMessage, setOwnerMessage] = useState<OwnerMessage | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [selectedTeam, setSelectedTeam] = useState<'board' | 'technical'>('board')

  useEffect(() => {
    const fetchOwnerMessage = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/owner-message/`)
        setOwnerMessage(response.data)
      } catch (error) {
        console.error('Error fetching owner message:', error)
      }
    }

    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/team-members/`)
        setTeamMembers(response.data)
      } catch (error) {
        console.error('Error fetching team members:', error)
      }
    }

    fetchOwnerMessage()
    fetchTeamMembers()
  }, [])

  const boardMembers = teamMembers.filter(member => member.team_type === 'board')
  const technicalMembers = teamMembers.filter(member => member.team_type === 'technical')
  const displayMembers = selectedTeam === 'board' ? boardMembers : technicalMembers

  return (
    <>
      <PageHero page="about" />
      <AboutSection />

      {/* Owner Message Section */}
      {ownerMessage && (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-white">MESSAGE FROM</span>
                <span className="text-red-500 ml-3">THE OWNER</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-blue-600/20 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                  {/* Owner Photo - Takes 2 columns */}
                  <div className="lg:col-span-2 relative">
                    <div className="relative h-96 lg:h-full">
                      <img
                        src={ownerMessage.photo}
                        alt={ownerMessage.owner_name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/50 to-transparent"></div>
                      
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/30 to-transparent"></div>
                    </div>
                  </div>

                  {/* Message Content - Takes 3 columns */}
                  <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                    {/* Owner Info */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-1 h-16 bg-gradient-to-b from-red-500 to-red-600"></div>
                        <div>
                          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {ownerMessage.owner_name}
                          </h3>
                          <p className="text-xl text-red-400 font-semibold">{ownerMessage.owner_title}</p>
                        </div>
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <div className="relative mb-6">
                      <FaQuoteLeft className="text-6xl text-red-600/20 absolute -top-4 -left-2" />
                    </div>
                    
                    {/* Message */}
                    <div className="relative pl-8">
                      <p className="text-gray-300 text-lg md:text-xl leading-relaxed italic whitespace-pre-line text-justify">
                        {ownerMessage.message}
                      </p>
                    </div>

                 
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gray-900">OUR</span>
                <span className="text-red-600 ml-3">TEAM</span>
              </h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated professionals driving our vision forward
              </p>
            </motion.div>

            {/* Team Type Selector */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setSelectedTeam('board')}
                className={`px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 ${
                  selectedTeam === 'board'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'
                }`}
              >
                Board of Directors 
              </button>
              <button
                onClick={() => setSelectedTeam('technical')}
                className={`px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 ${
                  selectedTeam === 'technical'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow border border-gray-200'
                }`}
              >
                Technical Team 
              </button>
            </div>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative h-full"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 ${
                    selectedTeam === 'board' 
                      ? 'bg-gradient-to-r from-red-600 to-pink-600' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600'
                  }`}></div>
                  
                  <div className="relative bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-xl overflow-hidden group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 flex flex-col h-full">
                    {/* Photo Section */}
                    <div className="relative h-80 overflow-hidden flex-shrink-0">
                      {/* Photo */}
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Name & Designation */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <div className="flex items-start gap-4">
                          {/* Accent Line */}
                          <div className={`w-1.5 h-20 rounded-full ${
                            selectedTeam === 'board' 
                              ? 'bg-gradient-to-b from-red-400 via-red-500 to-pink-600' 
                              : 'bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-600'
                          } shadow-lg`}></div>
                          
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                              {member.name}
                            </h3>
                            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-md ${
                              selectedTeam === 'board' 
                                ? 'bg-red-500/90 text-white' 
                                : 'bg-blue-500/90 text-white'
                            } shadow-lg`}>
                              {member.designation}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 space-y-5 flex-1 flex flex-col">
                      {/* Description */}
                      <div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {member.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className={`h-px ${
                        selectedTeam === 'board' 
                          ? 'bg-gradient-to-r from-transparent via-red-200 to-transparent' 
                          : 'bg-gradient-to-r from-transparent via-blue-200 to-transparent'
                      }`}></div>

                      {/* Contact Cards */}
                      <div className="space-y-3 mt-auto">
                        {/* Email */}
                        <a
                          href={`mailto:${member.email}`}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                            selectedTeam === 'board'
                              ? 'bg-red-50 hover:bg-red-100'
                              : 'bg-blue-50 hover:bg-blue-100'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedTeam === 'board' 
                              ? 'bg-gradient-to-br from-red-500 to-red-600' 
                              : 'bg-gradient-to-br from-blue-500 to-blue-600'
                          }`}>
                            <FaEnvelope className="text-white text-sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Email</p>
                            <p className={`text-sm font-semibold truncate ${
                              selectedTeam === 'board' ? 'text-red-700' : 'text-blue-700'
                            }`}>
                              {member.email}
                            </p>
                          </div>
                        </a>

                        {/* Phone */}
                        <a
                          href={`tel:${member.phone}`}
                          className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                            selectedTeam === 'board'
                              ? 'bg-red-50 hover:bg-red-100'
                              : 'bg-blue-50 hover:bg-blue-100'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedTeam === 'board' 
                              ? 'bg-gradient-to-br from-red-500 to-red-600' 
                              : 'bg-gradient-to-br from-blue-500 to-blue-600'
                          }`}>
                            <FaPhone className="text-white text-sm" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Phone</p>
                            <p className={`text-sm font-semibold ${
                              selectedTeam === 'board' ? 'text-red-700' : 'text-blue-700'
                            }`}>
                              {member.phone}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Bottom Gradient Bar */}
                    <div className={`h-2 ${
                      selectedTeam === 'board' 
                        ? 'bg-gradient-to-r from-red-500 via-pink-500 to-red-500' 
                        : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500'
                    }`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {displayMembers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No team members found in this category</p>
              </div>
            )}
          </div>
        </section>
      )}

      <TestDriveSection />
    </>
  )
}
