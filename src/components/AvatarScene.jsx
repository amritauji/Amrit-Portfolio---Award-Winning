import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { gsap } from 'gsap'
import * as anime from 'animejs'
import Velocity from 'velocity-animate'
import { useSpring, animated } from '@react-spring/three'

export default function AvatarScene({ setCurrentScene }) {
  const avatarRef = useRef()
  const textRef = useRef()
  
  const { scale } = useSpring({
    scale: [1, 1, 1],
    from: { scale: [0, 0, 0] },
    config: { tension: 200, friction: 20 }
  })

  useEffect(() => {
    // Anime.js for avatar animation
    anime.default({
      targets: avatarRef.current?.scale,
      x: [0, 1.2, 1],
      y: [0, 1.2, 1], 
      z: [0, 1.2, 1],
      duration: 1500,
      easing: 'easeOutElastic(1, .8)'
    })

    // Velocity.js for text animation
    setTimeout(() => {
      if (textRef.current?.material) {
        Velocity(textRef.current.material, { opacity: 1 }, { duration: 1000 })
      }
    }, 500)

    // Auto transition to homepage
    const timer = setTimeout(() => {
      setCurrentScene('homepage')
    }, 4000)

    return () => clearTimeout(timer)
  }, [setCurrentScene])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (avatarRef.current) {
      avatarRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
      avatarRef.current.position.y = Math.sin(time * 2) * 0.1
    }
  })

  return (
    <group>
      {/* Avatar */}
      <animated.group ref={avatarRef} position={[0, 0, 0]} scale={scale}>
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshPhongMaterial color={0x00ffff} emissive={0x002244} />
        </mesh>
        
        {/* Avatar glow */}
        <mesh scale={1.2}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color={0x00ffff} transparent opacity={0.2} />
        </mesh>
      </animated.group>

      {/* Greeting Text */}
      <Text
        ref={textRef}
        position={[0, -4, 0]}
        fontSize={1.2}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to Amrit's Workstation!
      </Text>

      {/* Lighting */}
      <pointLight position={[0, 0, 5]} color={0x00ffff} intensity={2} />
      <ambientLight intensity={0.3} />
    </group>
  )
}