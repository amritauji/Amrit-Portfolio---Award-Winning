import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

export default function SpaceStation({ currentScene, setCurrentScene }) {
  const stationRef = useRef()
  const textRef = useRef()

  useEffect(() => {
    if (currentScene === 'station') {
      // Auto-transition to portfolio after 4 seconds
      const timer = setTimeout(() => {
        setCurrentScene('portfolio')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [currentScene, setCurrentScene])

  useFrame((state) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += 0.005
    }
    
    if (textRef.current) {
      textRef.current.material.opacity = Math.sin(state.clock.elapsedTime * 2) * 0.3 + 0.7
    }
  })

  return (
    <group position={[0, 0, -60]}>
      {/* Main Station Structure */}
      <mesh ref={stationRef}>
        <cylinderGeometry args={[5, 5, 2, 16]} />
        <meshBasicMaterial color={0x444444} />
      </mesh>
      <pointLight position={[0, 0, 0]} color={0x00ffff} intensity={1} />

      {/* Station Name */}
      <Text
        ref={textRef}
        position={[0, 20, 0]}
        fontSize={2}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        AMRIT AUJI SPACE STATION
      </Text>

      {/* Welcome Message */}
      {currentScene === 'station' && (
        <Text
          position={[0, -20, 0]}
          fontSize={1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Docking Sequence Initiated...
        </Text>
      )}
    </group>
  )
}

useGLTF.preload('/assets/iss_-_international_space_station..glb')