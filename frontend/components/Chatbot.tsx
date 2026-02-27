'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQ {
  id: number
  question: string
  answer: string
}

interface Message {
  id: number
  message_type: 'user' | 'bot' | 'admin'
  message: string
  created_at: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [showNameForm, setShowNameForm] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

  // Filter FAQs based on input message
  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(inputMessage.toLowerCase())
  )

  useEffect(() => {
    fetchFAQs()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (sessionId && isOpen) {
      const interval = setInterval(() => {
        fetchMessages()
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [sessionId, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const fetchFAQs = async () => {
    try {
      const response = await fetch(`${API_URL}/chatbot-faq/`)
      const data = await response.json()
      setFaqs(data)
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    }
  }

  const createSession = async (name: string, email: string) => {
    try {
      const response = await fetch(`${API_URL}/chat/session/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: name,
          user_email: email
        })
      })
      const data = await response.json()
      setSessionId(data.session_id)
      setShowNameForm(false)
    } catch (error) {
      console.error('Error creating session:', error)
    }
  }

  const fetchMessages = async () => {
    if (!sessionId) return
    try {
      const response = await fetch(`${API_URL}/chat/session/${sessionId}/`)
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const sendMessage = async (message: string, type: 'user' | 'bot' = 'user') => {
    if (!sessionId || !message.trim()) return

    try {
      await fetch(`${API_URL}/chat/session/${sessionId}/message/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message_type: type,
          message: message
        })
      })
      await fetchMessages()
      setInputMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleFAQClick = (faq: FAQ) => {
    sendMessage(faq.question, 'user')
    setTimeout(() => {
      sendMessage(faq.answer, 'bot')
    }, 500)
    setInputMessage('') // Clear input after FAQ click
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      sendMessage(inputMessage, 'user')
    }
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName.trim()) {
      createSession(userName, userEmail)
    }
  }

  const handleSkipName = () => {
    createSession('Anonymous', '')
  }

  return (
    <>
      {/* Chatbot Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4">
              <h3 className="text-lg font-semibold">Chat with Us</h3>
              <p className="text-sm text-green-50">
                {userName && userName !== 'Anonymous' ? `Hi ${userName}! ` : ''}We're here to help!
              </p>
            </div>

            {/* Name Form */}
            {showNameForm && (
              <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                <form onSubmit={handleNameSubmit} className="w-full space-y-4">
                  <div className="text-center mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Welcome! 👋</h4>
                    <p className="text-sm text-gray-600">Let us know who you are</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    Start Chat
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleSkipName}
                    className="w-full text-gray-600 text-sm hover:text-gray-800 transition-colors"
                  >
                    Continue as Guest
                  </button>
                </form>
              </div>
            )}

            {/* Messages Area */}
            {!showNameForm && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.message_type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.message_type === 'user'
                            ? 'bg-green-500 text-white rounded-br-none'
                            : msg.message_type === 'admin'
                            ? 'bg-blue-500 text-white rounded-bl-none'
                            : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                        }`}
                      >
                        {msg.message_type === 'user' && userName && userName !== 'Anonymous' && (
                          <p className="text-xs font-semibold mb-1 text-green-100">
                            {userName}
                          </p>
                        )}
                        {msg.message_type === 'admin' && (
                          <p className="text-xs font-semibold mb-1 text-blue-100">
                            Support Team
                          </p>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.message_type === 'user' || msg.message_type === 'admin' 
                            ? 'text-white/70' 
                            : 'text-gray-500'
                        }`}>
                          {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* FAQ Suggestions - Always visible */}
                {filteredFAQs.length > 0 && (
                  <div className="px-4 py-2 bg-white border-t border-gray-200 max-h-48 overflow-y-auto">
                    <p className="text-xs text-gray-500 mb-2">💡 Suggested questions:</p>
                    <div className="space-y-1">
                      {filteredFAQs.slice(0, 3).map((faq) => (
                        <button
                          key={faq.id}
                          onClick={() => handleFAQClick(faq)}
                          className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg hover:bg-green-50 transition-all duration-200 text-xs text-gray-700 border border-gray-200"
                        >
                          {faq.question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
