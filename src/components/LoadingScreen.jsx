import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2
        
        if (newProgress >= 100) {
          clearInterval(progressTimer)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 800)
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 50)
    
    return () => clearInterval(progressTimer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #000000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [-100, -window.innerHeight],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                background: ['#76b900', '#4ecdc4', '#ff6b35', '#9b59b6'][i % 4],
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: '100%'
              }}
            />
          ))}



          {/* Main content */}
          <div style={{ textAlign: 'center' }}>
            {/* Morphing logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              style={{
                width: '150px',
                height: '150px',
                margin: '0 auto 50px',
                background: 'conic-gradient(from 0deg, #76b900, #4ecdc4, #ff6b35, #9b59b6, #76b900)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: '900',
                color: '#000000',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 0 60px rgba(118,185,0,0.6)',
                position: 'relative'
              }}
            >
              AA
            </motion.div>

            {/* Dynamic text */}
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                color: '#ffffff',
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                marginBottom: '40px',
                letterSpacing: '0.2em',
                textShadow: '0 0 20px rgba(118,185,0,0.5)'
              }}
            >
              LOADING ASSETS
            </motion.h2>

            {/* Liquid progress bar */}
            <div style={{
              width: '400px',
              height: '8px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '20px',
              overflow: 'hidden',
              marginBottom: '30px',
              position: 'relative'
            }}>
              <motion.div
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.3 }}
                style={{
                  height: '100%',
                  width: '100%',
                  background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35, #9b59b6)',
                  borderRadius: '20px',
                  transformOrigin: 'left'
                }}
              />
            </div>

            {/* Progress counter */}
            <div style={{
              color: '#76b900',
              fontSize: '1.5rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '700',
              letterSpacing: '0.1em',
              textShadow: '0 0 10px rgba(118,185,0,0.8)'
            }}>
              {Math.floor(progress)}%
            </div>
          </div>

          {/* Background glow effect */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(118,185,0,0.1) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              zIndex: -1
            }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  )
}