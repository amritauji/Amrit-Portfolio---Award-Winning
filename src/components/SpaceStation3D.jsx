import React, { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import { LazySpaceStation } from './LazyModels'
import * as THREE from 'three'

export default function SpaceStation3D({ currentScene, onEnterStation }) {
  const stationRef = useRef()
  const textRef = useRef()
  const [showEntryPrompt, setShowEntryPrompt] = useState(false)

  useEffect(() => {
    if (currentScene === 'station') {
      const timer = setTimeout(() => {
        setShowEntryPrompt(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [currentScene])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (stationRef.current) {
      stationRef.current.rotation.y += 0.005
    }

    if (textRef.current) {
      textRef.current.material.opacity = 0.8 + Math.sin(time * 3) * 0.2
    }
  })

  const handleEnterStation = (e) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Enter station clicked, onEnterStation:', onEnterStation)
    if (onEnterStation) {
      console.log('Calling onEnterStation function')
      onEnterStation()
    } else {
      console.log('onEnterStation is not defined')
    }
  }

  return (
    <group position={[0, 0, -80]}>
      {/* Space Station */}
      <group ref={stationRef}>
        <LazySpaceStation scale={[2, 2, 2]} />
        
        {/* Enhanced Station Lighting */}
        <pointLight position={[0, 0, 0]} color={0x00ffff} intensity={3} distance={80} />
        <pointLight position={[15, 0, 0]} color={0xffaa00} intensity={1.5} distance={40} />
        <pointLight position={[-15, 0, 0]} color={0xff0088} intensity={1.5} distance={40} />
        <pointLight position={[0, 15, 0]} color={0x88ff00} intensity={1.2} distance={35} />
        <pointLight position={[0, -15, 0]} color={0x8800ff} intensity={1.2} distance={35} />
        
        {/* Illuminated Docking bay */}
        <mesh position={[0, 0, 15]}>
          <cylinderGeometry args={[8, 8, 2, 16]} />
          <meshPhongMaterial color={0x006666} emissive={0x002222} transparent opacity={0.4} />
        </mesh>
        
        {/* Bright Entry portal */}
        <mesh position={[0, 0, 16]}>
          <ringGeometry args={[6, 8, 16]} />
          <meshBasicMaterial color={0x00ffff} transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Docking bay rim lights */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2
          return (
            <pointLight
              key={i}
              position={[
                Math.cos(angle) * 8,
                Math.sin(angle) * 8,
                15
              ]}
              color={0x00ffff}
              intensity={0.8}
              distance={15}
            />
          )
        })}
      </group>

      {/* Station Name */}
      <Text
        ref={textRef}
        position={[0, 25, 0]}
        fontSize={3}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        AMRIT AUJI WORKSTATION
      </Text>

      {/* Entry Prompt */}
      {showEntryPrompt && (
        <>
          <Text
            position={[0, -25, 0]}
            fontSize={1.5}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            DOCKING SEQUENCE INITIATED
          </Text>
          
          <Html position={[0, -35, 0]} center>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                console.log('Button clicked, calling onEnterStation')
                handleEnterStation(e)
              }}
              style={{
                background: 'linear-gradient(45deg, #004444, #008888)',
                color: '#00ffff',
                border: '2px solid #00ffff',
                padding: '15px 30px',
                fontSize: '18px',
                fontFamily: 'Courier New',
                cursor: 'pointer',
                borderRadius: '10px',
                boxShadow: '0 0 20px rgba(0,255,255,0.5)',
                animation: 'pulse 2s infinite',
                zIndex: 1000,
                position: 'relative'
              }}
            >
              🚀 ENTER WORKSTATION
            </button>
          </Html>
        </>
      )}

      {/* Optimized particles around station */}
      <group>
        {Array.from({ length: 15 }).map((_, i) => {
          const color = [0x00ffff, 0xffaa00, 0xff0088, 0x88ff00][i % 4]
          return (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 120,
                (Math.random() - 0.5) * 120,
                (Math.random() - 0.5) * 60
              ]}
            >
              <sphereGeometry args={[0.3]} />
              <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>
          )
        })}
      </group>
      
      {/* Optimized construction lights */}
      <group>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <pointLight
              key={i}
              position={[
                Math.cos(angle) * 25,
                Math.sin(angle) * 25,
                -80
              ]}
              color={0xffffff}
              intensity={0.5}
              distance={40}
            />
          )
        })}
      </group>
    </group>
  )
}