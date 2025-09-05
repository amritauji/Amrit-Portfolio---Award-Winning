import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [activeField, setActiveField] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeContact, setActiveContact] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-rotate contact methods
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveContact(prev => (prev + 1) % contactMethods.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

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
      value: 'amritauji93@gmail.com',
      color: '#76b900',
      description: 'Drop me a line anytime',
      url: 'mailto:amritauji93@gmail.com',
      bgGradient: 'linear-gradient(135deg, #76b900, #5a8f00)'
    },
    { 
      icon: '💼', 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/amrit-auji',
      color: '#4ecdc4',
      description: 'Let\'s connect professionally',
      url: 'https://www.linkedin.com/in/amrit-auji/',
      bgGradient: 'linear-gradient(135deg, #4ecdc4, #44a08d)'
    },
    { 
      icon: '🐙', 
      label: 'GitHub', 
      value: 'github.com/amritauji',
      color: '#ff6b35',
      description: 'Check out my code',
      url: 'https://github.com/amritauji',
      bgGradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    { 
      icon: '🐦', 
      label: 'Twitter/X', 
      value: 'x.com/amrit_auji',
      color: '#9b59b6',
      description: 'Follow my journey',
      url: 'https://x.com/amrit_auji',
      bgGradient: 'linear-gradient(135deg, #9b59b6, #8e44ad)'
    }
  ]

  return (
    <section style={{
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #111111 0%, #000000 100%)'
    }}>
      {/* Dynamic cursor follower */}
      <motion.div
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          position: 'fixed',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: contactMethods[activeContact].color,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.6,
          filter: 'blur(1px)'
        }}
      />

      {/* Floating orbs */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3
          }}
          style={{
            position: 'absolute',
            width: `${8 + Math.random() * 16}px`,
            height: `${8 + Math.random() * 16}px`,
            background: contactMethods[i % contactMethods.length].color,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)'
          }}
        />
      ))}

      <div style={{ padding: '5%' }}>
        {/* Hero title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ textAlign: 'center', marginBottom: '120px' }}
        >
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(4rem, 12vw, 12rem)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #76b900 30%, #4ecdc4 60%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-4px',
              lineHeight: '0.8',
              marginBottom: '40px'
            }}
          >
            LET'S TALK
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '1.4rem',
              color: '#cccccc',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Ready to build something extraordinary together? Let's connect and make it happen.
          </motion.p>
        </motion.div>

        {/* Main content grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '100px',
          maxWidth: '1600px',
          margin: '0 auto',
          alignItems: 'start'
        }}>
          
          {/* Left - Contact showcase */}
          <div style={{ position: 'relative' }}>
            {/* Background showcase */}
            <motion.div
              animate={{ 
                background: contactMethods[activeContact].bgGradient,
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                right: '-50px',
                bottom: '-50px',
                borderRadius: '40px',
                zIndex: -1
              }}
            />

            {/* Contact methods grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '60px'
            }}>
              {contactMethods.map((contact, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: `0 30px 60px ${contact.color}33`
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveContact(i)
                    window.open(contact.url, '_blank')
                  }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: activeContact === i ? 
                      `linear-gradient(135deg, ${contact.color}22, transparent)` : 
                      'rgba(255,255,255,0.03)',
                    padding: '40px',
                    borderRadius: '25px',
                    border: `2px solid ${activeContact === i ? contact.color : 'rgba(255,255,255,0.1)'}`,
                    backdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Animated corner accent */}
                  <motion.div
                    animate={{
                      opacity: activeContact === i ? [0, 1, 0] : 0,
                      scale: activeContact === i ? [0, 1.2, 0] : 0
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      width: '8px',
                      height: '8px',
                      background: contact.color,
                      borderRadius: '50%'
                    }}
                  />

                  <motion.div
                    animate={{ 
                      rotate: activeContact === i ? [0, 360] : 0,
                      scale: activeContact === i ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 3, repeat: activeContact === i ? Infinity : 0 }}
                    style={{
                      fontSize: '3rem',
                      marginBottom: '20px',
                      filter: activeContact === i ? `drop-shadow(0 0 20px ${contact.color})` : 'none'
                    }}
                  >
                    {contact.icon}
                  </motion.div>
                  
                  <h3 style={{
                    color: activeContact === i ? contact.color : '#ffffff',
                    fontSize: '1.4rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    marginBottom: '8px',
                    transition: 'color 0.3s ease'
                  }}>
                    {contact.label}
                  </h3>
                  
                  <p style={{
                    color: '#cccccc',
                    fontSize: '0.9rem',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '15px'
                  }}>
                    {contact.description}
                  </p>
                  
                  <p style={{
                    color: activeContact === i ? contact.color : '#ffffff',
                    fontSize: '0.85rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    opacity: 0.8,
                    transition: 'color 0.3s ease'
                  }}>
                    {contact.value}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Active contact showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeContact}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                style={{
                  background: `linear-gradient(135deg, ${contactMethods[activeContact].color}11, transparent)`,
                  padding: '40px',
                  borderRadius: '30px',
                  border: `2px solid ${contactMethods[activeContact].color}33`,
                  backdropFilter: 'blur(20px)',
                  textAlign: 'center'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    fontSize: '4rem',
                    marginBottom: '20px',
                    filter: `drop-shadow(0 0 30px ${contactMethods[activeContact].color})`
                  }}
                >
                  {contactMethods[activeContact].icon}
                </motion.div>
                
                <h3 style={{
                  color: contactMethods[activeContact].color,
                  fontSize: '2rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700',
                  marginBottom: '10px'
                }}>
                  {contactMethods[activeContact].label}
                </h3>
                
                <p style={{
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {contactMethods[activeContact].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '50px',
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Floating form accent */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                      position: 'absolute',
                      top: '-100px',
                      right: '-100px',
                      width: '200px',
                      height: '200px',
                      background: `conic-gradient(from 0deg, ${contactMethods[activeContact].color}44, transparent, ${contactMethods[activeContact].color}44)`,
                      borderRadius: '50%',
                      zIndex: -1
                    }}
                  />

                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '2.5rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    marginBottom: '15px'
                  }}>
                    Start a Project
                  </h3>
                  
                  <p style={{
                    color: '#cccccc',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '40px'
                  }}>
                    Tell me about your vision and let's bring it to life.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    {[
                      { key: 'name', placeholder: 'Your Name', type: 'text' },
                      { key: 'email', placeholder: 'Email Address', type: 'email' },
                      { key: 'message', placeholder: 'Project Details', type: 'textarea' }
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
                              borderColor: contactMethods[activeContact].color
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
                              background: 'rgba(0,0,0,0.3)',
                              border: `2px solid ${activeField === field.key ? contactMethods[activeContact].color : 'rgba(255,255,255,0.1)'}`,
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
                              borderColor: contactMethods[activeContact].color
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
                              background: 'rgba(0,0,0,0.3)',
                              border: `2px solid ${activeField === field.key ? contactMethods[activeContact].color : 'rgba(255,255,255,0.1)'}`,
                              borderRadius: '15px',
                              color: '#ffffff',
                              fontSize: '16px',
                              fontFamily: 'Inter, sans-serif',
                              transition: 'all 0.3s ease'
                            }}
                          />
                        )}
                      </motion.div>
                    ))}

                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 20px 40px ${contactMethods[activeContact].color}44`
                      }}
                      whileTap={{ scale: 0.95 }}
                      disabled={isSubmitting}
                      type="submit"
                      style={{
                        padding: '20px',
                        background: isSubmitting ? 
                          'linear-gradient(45deg, #666, #888)' :
                          contactMethods[activeContact].bgGradient,
                        color: '#000000',
                        border: 'none',
                        borderRadius: '15px',
                        fontSize: '18px',
                        fontWeight: '700',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    background: `linear-gradient(135deg, ${contactMethods[activeContact].color}22, transparent)`,
                    padding: '80px 50px',
                    borderRadius: '30px',
                    border: `2px solid ${contactMethods[activeContact].color}`,
                    textAlign: 'center',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontSize: '4rem', marginBottom: '30px' }}
                  >
                    ✨
                  </motion.div>
                  <h3 style={{
                    color: contactMethods[activeContact].color,
                    fontSize: '2rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    marginBottom: '20px'
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Thanks for reaching out! I'll get back to you within 24 hours.
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