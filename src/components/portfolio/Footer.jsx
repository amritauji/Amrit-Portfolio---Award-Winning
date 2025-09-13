import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const socialLinks = [
    { 
      icon: '💼', 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/amrit-auji/',
      color: '#76b900',
      description: 'Professional Network'
    },
    { 
      icon: '🐙', 
      name: 'GitHub', 
      url: 'https://github.com/amritauji',
      color: '#4ecdc4',
      description: 'Code Repository'
    },
    { 
      icon: '🐦', 
      name: 'Twitter', 
      url: 'https://twitter.com/amritauji',
      color: '#ff6b35',
      description: 'Thoughts & Updates'
    },
    { 
      icon: '📧', 
      name: 'Email', 
      url: 'mailto:amritauji93@gmail.com',
      color: '#9b59b6',
      description: 'Direct Contact'
    }
  ]

  const stats = [
    { label: 'Projects Completed', value: '15+', color: '#76b900' },
    { label: 'Technologies Mastered', value: '20+', color: '#4ecdc4' },
    { label: 'Coffee Consumed', value: '∞', color: '#ff6b35' },
    { label: 'Lines of Code', value: '50K+', color: '#9b59b6' }
  ]

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #000000 0%, #111111 50%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(118,185,0,0.3)'
    }}>
      {/* Optimized particle field */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="particle motion-element"
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              background: i % 4 === 0 ? '#76b900' : i % 4 === 1 ? '#4ecdc4' : i % 4 === 2 ? '#ff6b35' : '#9b59b6',
              borderRadius: '50%',
              left: `${5 + (i * 4)}%`,
              top: `${5 + (i * 3)}%`,
              willChange: 'transform, opacity'
            }}
          />
        ))}
      </div>

      <div style={{ padding: '80px 5% 40px 5%' }}>
        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '80px',
            maxWidth: '1200px',
            margin: '0 auto 80px auto'
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 20px 40px ${stat.color}33`
              }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '30px',
                borderRadius: '20px',
                border: `2px solid ${stat.color}33`,
                backdropFilter: 'blur(20px)',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated background glow */}
              <motion.div
                animate={{
                  background: [
                    `radial-gradient(circle at center, ${stat.color}22 0%, transparent 70%)`,
                    `radial-gradient(circle at center, ${stat.color}11 0%, transparent 70%)`,
                    `radial-gradient(circle at center, ${stat.color}22 0%, transparent 70%)`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1
                }}
              />

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  color: stat.color,
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '10px',
                  filter: `drop-shadow(0 0 10px ${stat.color})`
                }}
              >
                {stat.value}
              </motion.div>
              <p style={{
                color: '#cccccc',
                fontSize: '1rem',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
                fontWeight: '500'
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main footer content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'start'
        }}>
          
          {/* Left - Brand section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h3
              animate={{
                background: [
                  'linear-gradient(135deg, #76b900, #4ecdc4)',
                  'linear-gradient(135deg, #4ecdc4, #ff6b35)',
                  'linear-gradient(135deg, #ff6b35, #76b900)',
                  'linear-gradient(135deg, #76b900, #4ecdc4)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '20px',
                letterSpacing: '-1px'
              }}
            >
              AMRIT N. AUJI
            </motion.h3>
            
            <p style={{
              color: '#cccccc',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              fontFamily: 'Inter, sans-serif',
              marginBottom: '30px'
            }}>
              Building the future through innovative technology solutions. 
              Passionate about AI, edge computing, and creating impactful digital experiences.
            </p>

            {/* Live status indicator */}
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: '12px',
                  height: '12px',
                  background: '#00ff00',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #00ff00'
                }}
              />
              <span style={{
                color: '#00ff00',
                fontSize: '0.9rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                Available for opportunities
              </span>
            </motion.div>

            {/* Current time */}
            <p style={{
              color: '#76b900',
              fontSize: '0.9rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              Local Time: {currentTime.toLocaleTimeString()}
            </p>
          </motion.div>

          {/* Center - Social links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h4 style={{
              color: '#76b900',
              fontSize: '1.3rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              marginBottom: '30px'
            }}>
              Connect
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ 
                    x: 10,
                    scale: 1.05,
                    boxShadow: `0 10px 20px ${social.color}33`
                  }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '15px',
                    border: `1px solid ${social.color}33`,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    style={{
                      fontSize: '1.5rem',
                      filter: `drop-shadow(0 0 5px ${social.color})`
                    }}
                  >
                    {social.icon}
                  </motion.div>
                  <div>
                    <div style={{
                      color: social.color,
                      fontSize: '1rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '600'
                    }}>
                      {social.name}
                    </div>
                    <div style={{
                      color: '#cccccc',
                      fontSize: '0.8rem',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {social.description}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right - Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h4 style={{
              color: '#76b900',
              fontSize: '1.3rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              marginBottom: '30px'
            }}>
              Navigate
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['About', 'Skills', 'Projects', 'Timeline', 'Contact'].map((link, i) => (
                <motion.a
                  key={i}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 10, color: '#76b900' }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    color: '#cccccc',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            marginTop: '80px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(118,185,0,0.3)',
            textAlign: 'center'
          }}
        >
          {/* Animated divider */}
          <motion.div
            animate={{
              background: [
                'linear-gradient(90deg, transparent, #76b900, transparent)',
                'linear-gradient(90deg, transparent, #4ecdc4, transparent)',
                'linear-gradient(90deg, transparent, #ff6b35, transparent)',
                'linear-gradient(90deg, transparent, #76b900, transparent)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              height: '2px',
              width: '200px',
              margin: '0 auto 30px auto',
              borderRadius: '1px'
            }}
          />

          <p style={{
            color: '#ffffff',
            fontSize: '1.1rem',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            marginBottom: '10px'
          }}>
            © 2025 Amrit N. Auji
          </p>
          
          <motion.p
            animate={{ 
              background: [
                'linear-gradient(135deg, #76b900, #4ecdc4)',
                'linear-gradient(135deg, #4ecdc4, #ff6b35)',
                'linear-gradient(135deg, #ff6b35, #76b900)',
                'linear-gradient(135deg, #76b900, #4ecdc4)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              fontSize: '1rem',
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Crafting Tomorrow's Digital Experiences
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}