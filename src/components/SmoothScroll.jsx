import React, { useEffect, useRef } from 'react'

export default function SmoothScroll({ children }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    let animationId
    let currentScrollY = 0
    let targetScrollY = 0
    const ease = 0.08

    const smoothScroll = () => {
      targetScrollY = window.scrollY
      currentScrollY += (targetScrollY - currentScrollY) * ease

      if (scrollRef.current) {
        scrollRef.current.style.transform = `translateY(-${currentScrollY}px)`
      }

      if (Math.abs(targetScrollY - currentScrollY) > 0.1) {
        animationId = requestAnimationFrame(smoothScroll)
      }
    }

    const handleScroll = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(smoothScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  useEffect(() => {
    // Set body height to enable scrolling
    if (scrollRef.current) {
      document.body.style.height = `${scrollRef.current.scrollHeight}px`
    }
    
    return () => {
      document.body.style.height = 'auto'
    }
  }, [children])

  return (
    <div
      ref={scrollRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  )
}