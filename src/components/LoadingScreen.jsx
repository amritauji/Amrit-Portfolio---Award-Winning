import React, { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const containerRef = useRef()
  const logoRef = useRef()
  const progressBarRef = useRef()
  const textRef = useRef()
  const particlesRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline()
    
    // Initial setup
    gsap.set(containerRef.current, { opacity: 0 })
    gsap.set(logoRef.current, { scale: 0, rotation: -180 })
    gsap.set(textRef.current, { y: 50, opacity: 0 })
    gsap.set(progressBarRef.current, { scaleX: 0 })

    // Entrance animation
    tl.to(containerRef.current, { opacity: 1, duration: 0.5 })
      .to(logoRef.current, { 
        scale: 1, 
        rotation: 0, 
        duration: 1.2, 
        ease: "elastic.out(1, 0.5)" 
      })
      .to(textRef.current, { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.5")

    // Continuous logo animation
    gsap.to(logoRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    })

    // Particle animations
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        gsap.to(particle, {
          y: -window.innerHeight,
          opacity: 0,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          delay: Math.random() * 2,
          ease: "none"
        })
      }
    })

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1.5
        
        // Animate progress bar with GSAP
        gsap.to(progressBarRef.current, {
          scaleX: newProgress / 100,
          duration: 0.3,
          ease: "power2.out"
        })

        // Text glitch effect
        if (newProgress % 10 === 0) {
          gsap.to(textRef.current, {
            x: Math.random() * 4 - 2,
            duration: 0.1,
            yoyo: true,
            repeat: 3
          })
        }
        
        if (newProgress >= 100) {
          clearInterval(progressTimer)
          
          // Exit animation
          const exitTl = gsap.timeline()
          exitTl.to(logoRef.current, { 
            scale: 0, 
            rotation: 180, 
            duration: 0.6, 
            ease: "back.in(1.7)" 
          })
          .to(textRef.current, { 
            y: -50, 
            opacity: 0, 
            duration: 0.4 
          }, "-=0.3")
          .to(containerRef.current, { 
            opacity: 0, 
            scale: 1.1, 
            filter: "blur(20px)", 
            duration: 0.8, 
            ease: "power2.inOut",
            onComplete: () => onComplete()
          }, "-=0.2")
          
          return 100
        }
        return newProgress
      })
    }, 60)
    
    return () => {
      clearInterval(progressTimer)
      gsap.killTweensOf("*")
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
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
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          ref={el => particlesRef.current[i] = el}
          style={{
            position: 'absolute',
            width: i % 5 === 0 ? '6px' : '3px',
            height: i % 5 === 0 ? '6px' : '3px',
            background: ['#76b900', '#4ecdc4', '#ff6b35', '#9b59b6'][i % 4],
            borderRadius: i % 3 === 0 ? '50%' : '0',
            left: `${Math.random() * 100}%`,
            top: '100%',
            boxShadow: `0 0 15px ${['#76b900', '#4ecdc4', '#ff6b35', '#9b59b6'][i % 4]}`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={`geo-${i}`}
          ref={el => particlesRef.current[50 + i] = el}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            background: `linear-gradient(45deg, ${['#76b900', '#4ecdc4', '#ff6b35', '#9b59b6'][i % 4]}, transparent)`,
            borderRadius: i % 4 === 0 ? '50%' : i % 4 === 1 ? '0' : '20%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.6,
            border: `1px solid ${['#76b900', '#4ecdc4', '#ff6b35', '#9b59b6'][i % 4]}`
          }}
        />
      ))}

      {/* Main content */}
      <div style={{ textAlign: 'center' }}>
        {/* Morphing logo */}
        <div
          ref={logoRef}
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
          
          {/* Orbiting elements */}
          {[0, 1, 2, 3, 4].map(i => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: i < 3 ? '8px' : '12px',
                height: i < 3 ? '8px' : '12px',
                background: i < 3 ? '#ffffff' : ['#76b900', '#4ecdc4'][i - 3],
                borderRadius: i % 2 === 0 ? '50%' : '20%',
                top: '50%',
                left: '50%',
                transformOrigin: `${50 + i * 15}px 0`,
                animation: `orbit${i % 3} ${1.5 + i * 0.5}s linear infinite`,
                boxShadow: `0 0 10px ${i < 3 ? '#ffffff' : ['#76b900', '#4ecdc4'][i - 3]}`
              }}
            />
          ))}
          
          {/* Pulsing rings */}
          {[0, 1].map(i => (
            <div
              key={`ring-${i}`}
              style={{
                position: 'absolute',
                width: `${180 + i * 40}px`,
                height: `${180 + i * 40}px`,
                border: `2px solid ${i === 0 ? '#76b900' : '#4ecdc4'}`,
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: 0.3,
                animation: `pulse${i} ${3 + i}s ease-in-out infinite`
              }}
            />
          ))}
        </div>

        {/* Dynamic text */}
        <h2
          ref={textRef}
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
        </h2>

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
          <div
            ref={progressBarRef}
            style={{
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35, #9b59b6)',
              borderRadius: '20px',
              transformOrigin: 'left',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Wave effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '200%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              animation: 'wave 2s linear infinite'
            }} />
          </div>
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
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(118,185,0,0.1) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        animation: 'breathe 4s ease-in-out infinite',
        zIndex: -1
      }} />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes orbit0 {
          from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
        }
        @keyframes orbit1 {
          from { transform: rotate(0deg) translateX(65px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(65px) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes pulse0 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
        }
        @keyframes pulse1 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(50%); }
        }
      `}</style>
    </div>
  )
}