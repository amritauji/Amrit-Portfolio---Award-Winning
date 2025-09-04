import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useSpring, animated } from 'react-spring'

export default function FadeTransition({ currentScene }) {
  const fadeRef = useRef()
  
  const fadeSpring = useSpring({
    opacity: 0,
    from: { opacity: 1 },
    config: { duration: 800 }
  })

  useEffect(() => {
    if (fadeRef.current) {
      gsap.fromTo(fadeRef.current, 
        { opacity: 1 }, 
        { opacity: 0, duration: 1, ease: "power2.out" }
      )
    }
  }, [currentScene])

  return (
    <animated.div
      ref={fadeRef}
      data-fade-transition
      style={{
        ...fadeSpring,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000000',
        pointerEvents: 'none',
        zIndex: 10
      }}
    />
  )
}