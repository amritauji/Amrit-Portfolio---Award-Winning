import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

export default function HeroSection() {
  const [showContactCard, setShowContactCard] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const heroRef = useRef(null)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleContactClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    setButtonPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    })
    setShowContactCard(true)
  }

  return (
    <>

      <div className="section-wrapper">
        <div className="container">
          <section 
            ref={heroRef}
            className="section mobile-stack" 
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              paddingTop: '120px',
              paddingBottom: '60px',
              width: '100%'
            }}
          >
            {/* Optimized Particle System */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -3
            }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="particle motion-element"
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  style={{
                    position: 'absolute',
                    width: '2px',
                    height: '2px',
                    background: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#4ecdc4' : '#ff6b35',
                    borderRadius: '50%',
                    left: `${20 + (i * 7)}%`,
                    top: `${20 + (i * 6)}%`,
                    willChange: 'transform, opacity'
                  }}
                />
              ))}
            </div>
            
            {/* Dynamic Mesh Background */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(ellipse at 20% 20%, rgba(118,185,0,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,107,53,0.1) 0%, transparent 60%), radial-gradient(ellipse at 40% 60%, rgba(78,205,196,0.12) 0%, transparent 60%)',
                  'radial-gradient(ellipse at 60% 40%, rgba(118,185,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,107,53,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(78,205,196,0.1) 0%, transparent 60%)',
                  'radial-gradient(ellipse at 80% 60%, rgba(118,185,0,0.1) 0%, transparent 60%), radial-gradient(ellipse at 40% 20%, rgba(255,107,53,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 40%, rgba(78,205,196,0.15) 0%, transparent 60%)'
                ]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -2
              }}
            />
            
            {/* Optimized Floating Elements */}
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className="motion-element"
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 90, 180]
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  width: '30px',
                  height: '30px',
                  background: `${i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4'}15`,
                  border: `1px solid ${i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4'}`,
                  left: `${25 + i * 25}%`,
                  top: `${25 + i * 20}%`,
                  opacity: 0.5,
                  borderRadius: '50%',
                  zIndex: -2,
                  willChange: 'transform'
                }}
              />
            ))}

            {/* Main Content Container */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              maxWidth: '1200px',
              gap: '60px'
            }}>
              {/* Left side - Text content */}
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ flex: 1, maxWidth: '600px', zIndex: 2 }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Fluid Typography */}
                <motion.div
                  style={{ overflow: 'hidden', marginBottom: '40px', position: 'relative' }}
                >
                  <motion.h1
                    initial={{ y: 120, rotateX: 90 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{
                      scale: 1.02,
                      textShadow: '0 0 30px rgba(118,185,0,0.5)'
                    }}
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 6rem)',
                      fontWeight: '900',
                      marginBottom: '0',
                      letterSpacing: '-2px',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      lineHeight: '0.9',
                      color: '#ffffff',
                      cursor: 'default',
                      textShadow: '0 0 30px rgba(118,185,0,0.4)'
                    }}
                  >
                    AMRIT
                  </motion.h1>
                  
                  <motion.h1
                    initial={{ y: 120, rotateX: 90 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{
                      scale: 1.02,
                      x: 20,
                      textShadow: '0 0 30px rgba(78,205,196,0.5)'
                    }}
                    style={{
                      fontSize: 'clamp(3rem, 8vw, 6rem)',
                      fontWeight: '900',
                      color: '#ffffff',
                      marginBottom: '0',
                      letterSpacing: '-2px',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      lineHeight: '0.9',
                      marginLeft: 'clamp(1rem, 3vw, 2rem)',
                      cursor: 'default',
                      textShadow: '0 0 30px rgba(78,205,196,0.4)'
                    }}
                  >
                    N. AUJI
                  </motion.h1>
                  
                  {/* Morphing accent */}
                  <motion.div
                    animate={{
                      scaleX: [0, 1, 0.8, 1],
                      opacity: [0, 1, 0.7, 1]
                    }}
                    transition={{
                      duration: 2,
                      delay: 1,
                      ease: "easeOut"
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: '0',
                      width: '200px',
                      height: '4px',
                      background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35)',
                      borderRadius: '2px',
                      transformOrigin: 'left'
                    }}
                  />
                </motion.div>

                {/* Enhanced Description */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{ marginBottom: '60px', position: 'relative' }}
                >
                  <motion.p
                    whileHover={{ x: 10 }}
                    style={{
                      fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
                      color: '#ffffff',
                      marginBottom: '15px',
                      fontWeight: '400',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      lineHeight: '1.7',
                      letterSpacing: '0.5px',
                      opacity: 0.9
                    }}
                  >
                    Future AI & Edge Computing Innovator
                  </motion.p>
                  
                  <motion.p
                    whileHover={{ 
                      scale: 1.05,
                      color: '#4ecdc4'
                    }}
                    style={{
                      fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                      color: '#76b900',
                      fontWeight: '600',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Building Tomorrow's Digital Solutions
                  </motion.p>
                  
                  {/* Animated underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100px' }}
                    transition={{ duration: 1.5, delay: 1.2 }}
                    style={{
                      height: '2px',
                      background: 'linear-gradient(90deg, #76b900, transparent)',
                      marginTop: '20px',
                      borderRadius: '1px'
                    }}
                  />
                </motion.div>

                {/* Interactive Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  style={{ display: 'flex', gap: 'clamp(15px, 4vw, 20px)', flexWrap: 'wrap' }}
                >
                  <motion.button
                    whileHover={{ 
                      scale: 1.08,
                      rotateX: 5,
                      boxShadow: '0 25px 50px rgba(118,185,0,0.4)',
                      background: 'linear-gradient(135deg, rgba(118,185,0,0.3), rgba(78,205,196,0.2))'
                    }}
                    whileTap={{ scale: 0.95, rotateX: -5 }}
                    onClick={() => window.open('/resume.pdf', '_blank')}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    style={{
                      padding: 'clamp(15px, 4vw, 20px) clamp(30px, 7vw, 40px)',
                      background: 'rgba(118,185,0,0.15)',
                      color: '#ffffff',
                      border: '2px solid rgba(118,185,0,0.5)',
                      borderRadius: '50px',
                      fontSize: 'clamp(13px, 3.5vw, 15px)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    📄 Resume
                  </motion.button>

                  <motion.button
                    whileHover={{ 
                      scale: 1.08,
                      rotateX: 5,
                      background: 'linear-gradient(135deg, rgba(118,185,0,0.2), rgba(78,205,196,0.3))',
                      boxShadow: '0 25px 50px rgba(78,205,196,0.3)',
                      borderColor: 'rgba(78,205,196,0.8)'
                    }}
                    whileTap={{ scale: 0.95, rotateX: -5 }}
                    onClick={handleContactClick}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    style={{
                      padding: 'clamp(15px, 4vw, 20px) clamp(30px, 7vw, 40px)',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '50px',
                      fontSize: 'clamp(13px, 3.5vw, 15px)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontFamily: 'Inter, Helvetica, Arial, sans-serif',
                      backdropFilter: 'blur(20px)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      zIndex: 10
                    }}
                  >
                    ✨ Contact
                  </motion.button>
                </motion.div>
              </motion.div>
              
              {/* Right side - Enhanced 3D Interactive Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="cube-container"
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  perspective: '1000px'
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Fixed 3D Cube */}
                <motion.div
                  animate={{
                    rotateY: [0, 360]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  whileHover={{
                    scale: 1.05
                  }}
                  style={{
                    width: 'clamp(200px, 35vw, 350px)',
                    height: 'clamp(200px, 35vw, 350px)',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    cursor: 'pointer'
                  }}
                >
                  {/* Simplified 3D Cube faces */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const colors = ['#76b900', '#ff6b35', '#4ecdc4']
                    const labels = ['AI', 'WEB', 'EDGE', 'SAAS', 'ML', 'CLOUD']
                    const color = colors[i % 3]
                    const size = 'clamp(200px, 35vw, 350px)'
                    const translateZ = 'clamp(100px, 17.5vw, 175px)'
                    
                    return (
                      <motion.div
                        key={i}
                        style={{
                          position: 'absolute',
                          width: size,
                          height: size,
                          background: `linear-gradient(135deg, ${color}20, transparent)`,
                          border: `2px solid ${color}`,
                          backdropFilter: 'blur(10px)',
                          transform: 
                            i === 0 ? `rotateY(0deg) translateZ(${translateZ})` :
                            i === 1 ? `rotateY(90deg) translateZ(${translateZ})` :
                            i === 2 ? `rotateY(180deg) translateZ(${translateZ})` :
                            i === 3 ? `rotateY(-90deg) translateZ(${translateZ})` :
                            i === 4 ? `rotateX(90deg) translateZ(${translateZ})` :
                            `rotateX(-90deg) translateZ(${translateZ})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                          fontWeight: '900',
                          color: color,
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        {labels[i]}
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            </div>

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

            {/* Enhanced Responsive CSS */}
            <style jsx>{`
              @media (max-width: 768px) {
                .section {
                  padding: 140px 20px 60px !important;
                }
                .section > div {
                  flex-direction: column !important;
                  text-align: center !important;
                  gap: 40px !important;
                }
                .cube-container {
                  display: none !important;
                }
                .section h1 {
                  font-size: clamp(2.8rem, 14vw, 5rem) !important;
                  margin-left: 0 !important;
                  text-align: center !important;
                }
                .section p {
                  font-size: clamp(1rem, 4vw, 1.3rem) !important;
                  margin-bottom: 20px !important;
                  text-align: center !important;
                }
                .section button {
                  font-size: clamp(14px, 4vw, 16px) !important;
                  padding: 18px 35px !important;
                  margin: 5px !important;
                }
              }
              
              @media (min-width: 769px) and (max-width: 1024px) {
                .section {
                  padding: 140px 40px 60px !important;
                }
                .cube-container {
                  transform: scale(0.8) !important;
                }
              }
              
              /* Hide custom cursor on touch devices */
              @media (hover: none) {
                .custom-cursor {
                  display: none !important;
                }
              }
            `}</style>
          </section>
        </div>
      </div>
    </>
  )
}