import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AvatarVideoLoader({ onComplete }) {
  const videoRef = useRef()
  const [isLoading, setIsLoading] = useState(true)
  const [videoEnded, setVideoEnded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      setIsLoading(false)
      video.play().catch(console.log)
    }

    const handleEnded = () => {
      setVideoEnded(true)
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 500)
    }

    const handleError = () => {
      console.log('Video failed to load, skipping to portfolio')
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 1000)
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    // Auto-skip after 3 seconds if video doesn't load
    const skipTimer = setTimeout(() => {
      console.log('Video timeout, skipping to portfolio')
      if (onComplete) onComplete()
    }, 3000)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
      clearTimeout(skipTimer)
    }
  }, [onComplete])

  return (
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
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            width: '50px',
            height: '50px',
            border: '3px solid #00ffff',
            borderTop: '3px solid transparent',
            borderRadius: '50%'
          }}
        />
      )}

      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease'
        }}
        muted
        playsInline
      >
        <source src="/video/Amrit Avatar star wars.mp4" type="video/mp4" />
      </video>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            bottom: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#00ffff',
            fontFamily: 'Courier New',
            fontSize: '18px',
            textAlign: 'center'
          }}
        >
          <div>Initializing Workstation...</div>
          <motion.div
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{
              height: '2px',
              background: '#00ffff',
              marginTop: '10px',
              borderRadius: '1px'
            }}
          />
        </motion.div>
      )}
    </motion.div>
  )
}