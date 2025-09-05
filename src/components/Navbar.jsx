import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const navItems = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👨💻' },
    { id: 'skills', label: 'Arsenal', icon: '⚡' },
    { id: 'projects', label: 'Mission', icon: '🚀' },
    { id: 'timeline', label: 'Timeline', icon: '📈' },
    { id: 'contact', label: 'Connect', icon: '📡' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section, index) => {
        if (section) {
          const { offsetTop, offsetHeight } = section
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navItems[index].id)
          }
        }
      })
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: 'clamp(10px, 3vw, 20px) clamp(15px, 5vw, 5%)',
          transition: 'all 0.3s ease'
        }}
      >
        <motion.div
          animate={{
            background: isScrolled ? 
              'rgba(255,255,255,0.1)' : 
              'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: isScrolled ? '25px' : '0px',
            border: isScrolled ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
            boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.3)' : 'none'
          }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isScrolled ? 'clamp(10px, 2vw, 15px) clamp(15px, 4vw, 30px)' : 'clamp(15px, 3vw, 20px) 0',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Animated background glow */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(118,185,0,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(76,205,196,0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 20%, rgba(255,107,53,0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,
              opacity: isScrolled ? 1 : 0
            }}
          />

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('hero')}
            style={{ cursor: 'pointer' }}
          >
            <motion.h1
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
                fontSize: isScrolled ? 'clamp(1.2rem, 4vw, 1.5rem)' : 'clamp(1.5rem, 5vw, 2rem)',
                fontWeight: '900',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                margin: 0,
                letterSpacing: '-1px',
                transition: 'font-size 0.3s ease'
              }}
            >
              AN
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px'
          }} className="desktop-nav">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: activeSection === item.id ? 
                    'linear-gradient(135deg, #76b900, #4ecdc4)' : 
                    'rgba(255,255,255,0.1)',
                  color: activeSection === item.id ? '#000000' : '#ffffff',
                  border: activeSection === item.id ? 
                    'none' : 
                    '1px solid rgba(255,255,255,0.2)',
                  padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
                  borderRadius: '20px',
                  fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 0.3, scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, #76b900, transparent)',
                    zIndex: -1
                  }}
                />
                
                <span style={{ marginRight: '8px' }}>{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '50px',
              height: '50px',
              background: 'rgba(118,185,0,0.2)',
              border: '2px solid #76b900',
              borderRadius: '50%',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
              style={{
                width: '20px',
                height: '2px',
                background: '#76b900',
                position: 'absolute'
              }}
            />
            <motion.div
              animate={{ 
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? 0 : 6
              }}
              style={{
                width: '20px',
                height: '2px',
                background: '#76b900',
                position: 'absolute'
              }}
            />
            <motion.div
              animate={{ 
                opacity: isMenuOpen ? 0 : 1,
                y: isMenuOpen ? 0 : -6
              }}
              style={{
                width: '20px',
                height: '2px',
                background: '#76b900',
                position: 'absolute'
              }}
            />
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(20px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Animated background particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#4ecdc4' : '#ff6b35',
                  borderRadius: '50%',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}

            <div style={{ textAlign: 'center' }}>
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 50, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 20px 40px rgba(118,185,0,0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    display: 'block',
                    width: 'clamp(250px, 80vw, 300px)',
                    margin: 'clamp(15px, 4vw, 20px) auto',
                    padding: 'clamp(15px, 4vw, 20px)',
                    background: activeSection === item.id ? 
                      'linear-gradient(135deg, #76b900, #4ecdc4)' : 
                      'rgba(255,255,255,0.1)',
                    color: activeSection === item.id ? '#000000' : '#ffffff',
                    border: '2px solid rgba(118,185,0,0.3)',
                    borderRadius: '15px',
                    fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Animated background */}
                  <motion.div
                    animate={{
                      background: [
                        `radial-gradient(circle at 0% 0%, ${activeSection === item.id ? '#ffffff22' : '#76b90022'} 0%, transparent 50%)`,
                        `radial-gradient(circle at 100% 100%, ${activeSection === item.id ? '#ffffff22' : '#76b90022'} 0%, transparent 50%)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: -1
                    }}
                  />
                  
                  <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>
                    {item.icon}
                  </span>
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isScrolled ? 1 : 0, 
          opacity: isScrolled ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000
        }}
      >
        <motion.button
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 20px 40px rgba(118,185,0,0.4)'
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection('hero')}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #76b900, #4ecdc4)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            boxShadow: '0 10px 30px rgba(118,185,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Rotating border */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              top: '-2px',
              left: '-2px',
              right: '-2px',
              bottom: '-2px',
              background: 'conic-gradient(from 0deg, #76b900, #4ecdc4, #ff6b35, #76b900)',
              borderRadius: '50%',
              zIndex: -1
            }}
          />
          
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: '#000000', fontWeight: 'bold' }}
          >
            ↑
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35)',
          zIndex: 1001,
          transformOrigin: 'left'
        }}
      />
    </>
  )
}