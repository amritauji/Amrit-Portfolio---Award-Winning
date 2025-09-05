import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function LoadingManager({ children, onLoadComplete }) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadAssets = async () => {
      const assets = [
        // Audio files
        '/audio/spaceship-engine.mp3',
        '/audio/spaceship-acceleration.mp3',
        '/audio/interstellar-docking.mp3',
        // Image files
        '/amrit-photo.png'
      ]

      let loadedCount = 0
      const totalAssets = assets.length + 1 // +1 for component loading

      // Load audio files
      const audioPromises = assets.filter(asset => asset.includes('.mp3')).map(src => {
        return new Promise((resolve) => {
          const audio = new Audio(src)
          audio.addEventListener('canplaythrough', () => {
            loadedCount++
            setLoadingProgress((loadedCount / totalAssets) * 100)
            resolve()
          })
          audio.addEventListener('error', () => {
            loadedCount++
            setLoadingProgress((loadedCount / totalAssets) * 100)
            resolve() // Continue even if audio fails
          })
          audio.load()
        })
      })

      // Load image files
      const imagePromises = assets.filter(asset => asset.includes('.png') || asset.includes('.jpg')).map(src => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            loadedCount++
            setLoadingProgress((loadedCount / totalAssets) * 100)
            resolve()
          }
          img.onerror = () => {
            loadedCount++
            setLoadingProgress((loadedCount / totalAssets) * 100)
            resolve() // Continue even if image fails
          }
          img.src = src
        })
      })

      // Wait for all assets
      await Promise.all([...audioPromises, ...imagePromises])

      // Wait for components to be ready
      await new Promise(resolve => setTimeout(resolve, 500))
      loadedCount++
      setLoadingProgress(100)

      // Additional delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 800))
      
      setIsLoaded(true)
      if (onLoadComplete) onLoadComplete()
    }

    loadAssets()
  }, [onLoadComplete])

  if (!isLoaded) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at center, #111111 0%, #000000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
      }}>
        {/* Loading animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: '80px',
            height: '80px',
            border: '3px solid rgba(118,185,0,0.3)',
            borderTop: '3px solid #76b900',
            borderRadius: '50%',
            marginBottom: '30px'
          }}
        />

        {/* Loading text */}
        <motion.h2
          animate={{
            background: [
              'linear-gradient(135deg, #76b900, #4ecdc4)',
              'linear-gradient(135deg, #4ecdc4, #ff6b35)',
              'linear-gradient(135deg, #ff6b35, #76b900)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: '2rem',
            fontWeight: '900',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '20px'
          }}
        >
          Loading Experience...
        </motion.h2>

        {/* Progress bar */}
        <div style={{
          width: '300px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginBottom: '15px'
        }}>
          <motion.div
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3 }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #76b900, #4ecdc4)',
              borderRadius: '2px'
            }}
          />
        </div>

        {/* Progress percentage */}
        <motion.p
          style={{
            color: '#cccccc',
            fontSize: '1rem',
            fontFamily: 'Inter, sans-serif',
            margin: 0
          }}
        >
          {Math.round(loadingProgress)}%
        </motion.p>

        {/* Floating particles */}
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
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}