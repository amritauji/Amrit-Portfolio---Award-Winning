import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [activeField, setActiveField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const cursorRef = useRef({ x: 0, y: 0 })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const contactMethods = [
    { 
      icon: '📧', 
      label: 'Email', 
      value: 'amrit.auji@example.com',
      color: '#76b900',
      description: 'Drop me a line anytime'
    },
    { 
      icon: '💼', 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/amritauji',
      color: '#4ecdc4',
      description: 'Let\'s connect professionally'
    },
    { 
      icon: '🐙', 
      label: 'GitHub', 
      value: 'github.com/amritauji',
      color: '#ff6b35',
      description: 'Check out my code'
    }
  ]

  return (
    <section className="section" style={{
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)'
    }}>
      {/* Animated neural network background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#76b900',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
        
        {/* Connection lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1 }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.line
              key={i}
              x1={`${Math.random() * 100}%`}
              y1={`${Math.random() * 100}%`}
              x2={`${Math.random() * 100}%`}
              y2={`${Math.random() * 100}%`}
              stroke="#76b900"
              strokeWidth="1"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </svg>
      </div>

      <div style={{ padding: '5%' }}>
        {/* Creative title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ marginBottom: '100px', textAlign: 'center' }}
        >
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 8rem)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #76b900 50%, #4ecdc4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-3px',
              lineHeight: '0.9',
              marginBottom: '30px'
            }}
          >
            COMMUNICATION
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              height: '6px',
              width: '400px',
              background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35)',
              margin: '0 auto',
              borderRadius: '3px'
            }}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              fontSize: '1.2rem',
              color: '#cccccc',
              marginTop: '30px',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Ready to build the future together?
          </motion.p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          maxWidth: '1400px',
          margin: '0 auto',
          alignItems: 'start'
        }}>
          
          {/* Left side - Contact methods */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.h3
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#76b900',
                marginBottom: '50px',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Let's Connect
            </motion.h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {contactMethods.map((contact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    x: 20, 
                    scale: 1.05,
                    boxShadow: `0 20px 40px ${contact.color}33`
                  }}
                  transition={{ delay: i * 0.2 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: `2px solid ${contact.color}33`,
                    backdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    animate={{
                      background: [
                        `radial-gradient(circle at 0% 0%, ${contact.color}22 0%, transparent 50%)`,
                        `radial-gradient(circle at 100% 100%, ${contact.color}22 0%, transparent 50%)`,
                        `radial-gradient(circle at 0% 0%, ${contact.color}22 0%, transparent 50%)`
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: -1
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        fontSize: '2.5rem',
                        marginRight: '20px',
                        filter: `drop-shadow(0 0 10px ${contact.color})`
                      }}
                    >
                      {contact.icon}
                    </motion.div>
                    <div>
                      <h4 style={{
                        color: contact.color,
                        fontSize: '1.3rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        {contact.label}
                      </h4>
                      <p style={{
                        color: '#cccccc',
                        fontSize: '0.9rem',
                        margin: '5px 0 0 0',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {contact.description}
                      </p>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#ffffff',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {contact.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Futuristic contact form */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(118,185,0,0.1), rgba(76,205,196,0.1))',
                    padding: '50px',
                    borderRadius: '30px',
                    border: '2px solid rgba(118,185,0,0.3)',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Animated border */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      background: 'conic-gradient(from 0deg, #76b900, #4ecdc4, #ff6b35, #76b900)',
                      borderRadius: '32px',
                      zIndex: -1,
                      opacity: 0.5
                    }}
                  />

                  <h3 style={{
                    color: '#76b900',
                    fontSize: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    marginBottom: '40px',
                    textAlign: 'center'
                  }}>
                    Mission Control
                  </h3>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {[
                      { key: 'name', placeholder: 'Agent Name', type: 'text' },
                      { key: 'email', placeholder: 'Communication Channel', type: 'email' },
                      { key: 'message', placeholder: 'Mission Brief', type: 'textarea' }
                    ].map((field, i) => (
                      <motion.div
                        key={field.key}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        style={{ position: 'relative' }}
                      >
                        {field.type === 'textarea' ? (
                          <motion.textarea
                            whileFocus={{ 
                              scale: 1.02,
                              boxShadow: '0 0 30px rgba(118,185,0,0.3)'
                            }}
                            onFocus={() => setActiveField(field.key)}
                            onBlur={() => setActiveField(null)}
                            placeholder={field.placeholder}
                            rows="4"
                            value={formData[field.key]}
                            onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                            style={{
                              width: '100%',
                              padding: '20px',
                              background: 'rgba(0,0,0,0.5)',
                              border: `2px solid ${activeField === field.key ? '#76b900' : 'rgba(118,185,0,0.3)'}`,
                              borderRadius: '15px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontFamily: 'Inter, sans-serif',
                              resize: 'vertical',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        ) : (
                          <motion.input
                            whileFocus={{ 
                              scale: 1.02,
                              boxShadow: '0 0 30px rgba(118,185,0,0.3)'
                            }}
                            onFocus={() => setActiveField(field.key)}
                            onBlur={() => setActiveField(null)}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.key]}
                            onChange={(e) => setFormData({...formData, [field.key]: e.target.value})}
                            style={{
                              width: '100%',
                              padding: '20px',
                              background: 'rgba(0,0,0,0.5)',
                              border: `2px solid ${activeField === field.key ? '#76b900' : 'rgba(118,185,0,0.3)'}`,
                              borderRadius: '15px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontFamily: 'Inter, sans-serif',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        )}
                        
                        {/* Field label animation */}
                        <AnimatePresence>
                          {activeField === field.key && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '20px',
                                background: '#76b900',
                                color: '#000',
                                padding: '4px 12px',
                                borderRadius: '10px',
                                fontSize: '0.8rem',
                                fontWeight: '600'
                              }}
                            >
                              {field.placeholder}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}

                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 20px 40px rgba(118,185,0,0.4)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitting}
                      type="submit"
                      style={{
                        padding: '20px',
                        background: isSubmitting ? 
                          'linear-gradient(45deg, #666, #888)' :
                          'linear-gradient(45deg, #76b900, #4ecdc4)',
                        color: '#000000',
                        border: 'none',
                        borderRadius: '15px',
                        fontSize: '18px',
                        fontWeight: '700',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isSubmitting ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              style={{
                                width: '20px',
                                height: '20px',
                                border: '2px solid #000',
                                borderTop: '2px solid transparent',
                                borderRadius: '50%'
                              }}
                            />
                            Transmitting...
                          </motion.div>
                        ) : (
                          <motion.span
                            key="text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            🚀 Launch Mission
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(118,185,0,0.2), rgba(76,205,196,0.2))',
                    padding: '80px 50px',
                    borderRadius: '30px',
                    border: '2px solid #76b900',
                    textAlign: 'center',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '4rem', marginBottom: '30px' }}
                  >
                    ✅
                  </motion.div>
                  <h3 style={{
                    color: '#76b900',
                    fontSize: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    marginBottom: '20px'
                  }}>
                    Mission Received!
                  </h3>
                  <p style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Your message has been transmitted successfully. I'll respond within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}