import React from 'react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="section" style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 5%'
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
      
      {/* Floating geometric shapes */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -100, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 0.5
          }}
          style={{
            position: 'absolute',
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            background: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
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
        style={{ flex: 1, maxWidth: '600px' }}
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
          style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 20px 40px rgba(118,185,0,0.3)',
              background: 'rgba(118,185,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '18px 36px',
              background: 'rgba(255,255,255,0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease'
            }}
          >
            Resume
          </motion.button>

          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: 'rgba(76,185,0,0.2)',
              boxShadow: '0 20px 40px rgba(118,185,0,0.2)'
            }}
            whileTap={{ scale: 0.95 }}
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

          <motion.button
            whileHover={{ 
              scale: 1.05,
              background: 'rgba(255,255,255,0.2)',
              boxShadow: '0 20px 40px rgba(255,255,255,0.1)'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '18px 36px',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Inter, Helvetica, Arial, sans-serif',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.3s ease'
            }}
          >
            Projects
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
            rotateY: [0, 360],
            rotateX: [0, 15, -15, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: '400px',
            height: '400px',
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
                width: '400px',
                height: '400px',
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
                fontSize: '2rem',
                color: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#ff6b35' : '#4ecdc4'
              }}
            >
              {['AI', 'WEB', 'EDGE', 'SAAS', 'ML', 'CLOUD'][i]}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>


    </section>
  )
}