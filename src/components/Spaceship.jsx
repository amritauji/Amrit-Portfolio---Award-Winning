import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'

export default function Spaceship({ currentScene, setCurrentScene }) {
  const shipRef = useRef()
  const journeyStarted = useRef(false)
  


  useEffect(() => {
    if (currentScene === 'intro' && !journeyStarted.current) {
      // Auto-start journey after 3 seconds
      const timer = setTimeout(() => {
        journeyStarted.current = true
        setCurrentScene('journey')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentScene, setCurrentScene])

  useFrame((state) => {
    if (!shipRef.current) return

    const time = state.clock.elapsedTime

    if (currentScene === 'intro') {
      shipRef.current.position.y = Math.sin(time) * 0.5
      shipRef.current.rotation.z = Math.sin(time) * 0.1
    } else if (currentScene === 'journey') {
      shipRef.current.position.z -= 0.2
      if (shipRef.current.position.z < -50) {
        setCurrentScene('station')
      }
    }
  })

  return (
    <group ref={shipRef} position={[0, 0, 0]}>
      <mesh>
        <coneGeometry args={[1, 4, 8]} />
        <meshBasicMaterial color={0x00ffff} />
      </mesh>
      <pointLight position={[0, 0, 2]} color={0x00ffff} intensity={1} />
    </group>
  )
}

useGLTF.preload('/assets/futuristic_spaceship.glb')