import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function HeroSection() {
  const [showContactCard, setShowContactCard] = useState(false)

  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })


  const handleContactClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    setButtonPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    })
    setShowContactCard(true)
  }

  return (
    <section className="section mobile-stack" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(80px, 15vw, 120px) clamp(20px, 5vw, 80px) clamp(40px, 8vw, 80px)',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      gap: 'clamp(40px, 8vw, 80px)'
    }}>
      {/* Dynamic mesh gradient background */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, #76b900 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 40% 60%, #4ecdc4 0%, transparent 50%)',
            'radial-gradient(circle at 60% 40%, #76b900 0%, transparent 50%), radial-gradient(circle at 20% 80%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4ecdc4 0%, transparent 50%)',
            'radial-gradient(circle at 80% 60%, #76b900 0%, transparent 50%), radial-gradient(circle at 40% 20%, #ff6b35 0%, transparent 50%), radial-gradient(circle at 20% 40%, #4ecdc4 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.1,
          zIndex: -2
        }}
      />
      
      {/* Reduced floating geometric shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.3
          }}
          style={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            background: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4',
            left: `${20 + i * 15}%`,
            top: `${20 + i * 10}%`,
            opacity: 0.1,
            borderRadius: i % 2 === 0 ? '50%' : '0',
            zIndex: -1
          }}
        />
      ))}

      {/* Left side - Text content */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ flex: 1, maxWidth: '600px', textAlign: window.innerWidth < 768 ? 'center' : 'left' }}
      >
        <motion.div
          style={{ overflow: 'hidden', marginBottom: '30px' }}
        >
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '0',
              letterSpacing: '-2px',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              lineHeight: '0.9',
              background: 'linear-gradient(135deg, #ffffff 0%, #76b900 50%, #4ecdc4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            AMRIT
          </motion.h1>
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: '900',
              color: '#ffffff',
              marginBottom: '0',
              letterSpacing: '-2px',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              lineHeight: '0.9',
              marginLeft: '2rem'
            }}
          >
            N. AUJI
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{ marginBottom: '50px' }}
        >
          <motion.p
            style={{
              fontSize: '1.2rem',
              color: '#cccccc',
              marginBottom: '10px',
              fontWeight: '400',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              lineHeight: '1.6'
            }}
          >
            Future AI & Edge Computing Innovator
          </motion.p>
          <motion.p
            style={{
              fontSize: '1rem',
              color: '#76b900',
              fontWeight: '500',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif'
            }}
          >
            Building Tomorrow's Digital Solutions
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          style={{ display: 'flex', gap: 'clamp(10px, 3vw, 15px)', flexWrap: 'wrap', justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start' }}
        >
          <motion.button
            className="magnet hover-target"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(118,185,0,0.3)',
              background: 'rgba(118,185,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('/resume.pdf', '_blank')}
            style={{
              padding: 'clamp(12px, 3vw, 18px) clamp(24px, 6vw, 36px)',
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50px',
              fontSize: 'clamp(12px, 3vw, 14px)',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease'
            }}
          >
            📄 Resume
          </motion.button>

          <motion.button
            className="magnet hover-target"
            whileHover={{ 
              scale: 1.05,
              background: 'rgba(76,185,0,0.2)',
              boxShadow: '0 20px 40px rgba(118,185,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContactClick}
            style={{
              padding: '18px 36px',
              background: 'transparent',
              color: '#76b900',
              border: '1px solid rgba(118,185,0,0.5)',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease'
            }}
          >
            Contact
          </motion.button>


        </motion.div>
      </motion.div>
      
      {/* Right side - Interactive 3D element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}
      >
        <motion.div
          animate={{
            rotateY: [0, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: 'clamp(250px, 50vw, 400px)',
            height: 'clamp(250px, 50vw, 400px)',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* 3D Cube faces */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: 'clamp(250px, 50vw, 400px)',
                height: 'clamp(250px, 50vw, 400px)',
                background: `linear-gradient(135deg, ${i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4'}22, transparent)`,
                border: `2px solid ${i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4'}`,
                backdropFilter: 'blur(10px)',
                transform: 
                  i === 0 ? 'rotateY(0deg) translateZ(200px)' :
                  i === 1 ? 'rotateY(90deg) translateZ(200px)' :
                  i === 2 ? 'rotateY(180deg) translateZ(200px)' :
                  i === 3 ? 'rotateY(-90deg) translateZ(200px)' :
                  i === 4 ? 'rotateX(90deg) translateZ(200px)' :
                  'rotateX(-90deg) translateZ(200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                color: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4'
              }}
            >
              {['AI', 'WEB', 'EDGE', 'SAAS', 'ML', 'CLOUD'][i]}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Contact Card Animation */}
      <AnimatePresence>
        {showContactCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(20px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={() => setShowContactCard(false)}
          >
            <motion.div
              initial={{
                x: buttonPosition.x - window.innerWidth / 2,
                y: buttonPosition.y - window.innerHeight / 2,
                scale: 0,
                rotate: -180,
                opacity: 0
              }}
              animate={{
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
                opacity: 1
              }}
              exit={{
                x: buttonPosition.x - window.innerWidth / 2,
                y: buttonPosition.y - window.innerHeight / 2,
                scale: 0,
                rotate: 180,
                opacity: 0
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 300,
                duration: 0.6
              }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(118,185,0,0.1))',
                backdropFilter: 'blur(30px)',
                border: '2px solid rgba(118,185,0,0.3)',
                borderRadius: '30px',
                padding: '40px',
                maxWidth: '500px',
                width: '90vw',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated background particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                  style={{
                    position: 'absolute',
                    width: '3px',
                    height: '3px',
                    background: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#4ecdc4' : '#ff6b35',
                    borderRadius: '50%',
                    left: `${20 + (i * 10)}%`,
                    top: `${20 + (i * 8)}%`,
                    zIndex: -1
                  }}
                />
              ))}

              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowContactCard(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #76b900, #4ecdc4)',
                  border: 'none',
                  color: '#000000',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ×
              </motion.button>

              {/* Card content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: '900',
                    background: 'linear-gradient(135deg, #76b900, #4ecdc4)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}
                >
                  Let's Connect!
                </motion.h2>

                <div style={{ display: 'grid', gap: '20px' }}>
                  {[
                    { icon: '📧', label: 'Email', value: 'amritauji93@gmail.com', link: 'mailto:amritauji93@gmail.com' },
                    { icon: '📱', label: 'Phone', value: '+91 9322720508', link: 'tel:+919322720508' },
                    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/amritauji', link: 'https://www.linkedin.com/in/amrit-auji/' },
                    { icon: '🐙', label: 'GitHub', value: 'github.com/amritauji', link: 'https://github.com/amritauji' },
                    { icon: '🌐', label: 'Website', value: 'amritauji.dev', link: 'https://amritauji.dev' }
                  ].map((contact, i) => (
                    <motion.a
                      key={i}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '15px 20px',
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(118,185,0,0.2)',
                        borderRadius: '15px',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>{contact.icon}</span>
                      <div>
                        <div style={{
                          color: '#76b900',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {contact.label}
                        </div>
                        <div style={{
                          color: '#ffffff',
                          fontSize: '1rem',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {contact.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}