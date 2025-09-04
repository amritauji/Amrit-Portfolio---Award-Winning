import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

export default function UI3D({ currentScene, setCurrentScene }) {
  const hudRef = useRef()
  const controlsRef = useRef()

  const sceneNames = {
    intro: 'Galaxy Exploration',
    journey: 'Hyperspace Jump',
    station: 'Docking Sequence',
    portfolio: 'Station Interior'
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (hudRef.current) {
      hudRef.current.material.opacity = Math.sin(time * 2) * 0.1 + 0.9
    }
    
    if (controlsRef.current && currentScene === 'portfolio') {
      controlsRef.current.rotation.y = Math.sin(time * 0.5) * 0.1
    }
  })

  return (
    <group>
      {/* 3D HUD Display */}
      <group position={[-25, 15, 0]}>
        <mesh>
          <planeGeometry args={[12, 4]} />
          <meshBasicMaterial 
            ref={hudRef}
            color={0x000033} 
            transparent 
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <Text
          position={[0, 0.5, 0.1]}
          fontSize={0.8}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          {sceneNames[currentScene]}
        </Text>
        
        <Text
          position={[0, -0.5, 0.1]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {currentScene === 'intro' && 'Initializing warp drive...'}
          {currentScene === 'journey' && 'Approaching destination...'}
          {currentScene === 'station' && 'Docking protocols active...'}
          {currentScene === 'portfolio' && 'Systems online. Explore freely.'}
        </Text>
      </group>

      {/* 3D Navigation Controls */}
      {currentScene === 'portfolio' && (
        <group ref={controlsRef} position={[0, -18, 0]}>
          {/* Control Panel Base */}
          <mesh position={[0, 0, -1]}>
            <boxGeometry args={[20, 3, 2]} />
            <meshPhongMaterial color={0x001122} emissive={0x002244} />
          </mesh>
          
          {/* Navigation Buttons */}
          <group position={[-6, 0, 0]}>
            <mesh onClick={() => setCurrentScene('intro')}>
              <boxGeometry args={[3, 2, 0.5]} />
              <meshPhongMaterial color={0x004444} emissive={0x002222} />
            </mesh>
            <Text position={[0, 0, 0.3]} fontSize={0.3} color="#00ffff">
              🚀 RESTART
            </Text>
          </group>
          
          <group position={[0, 0, 0]}>
            <mesh onClick={() => window.open('mailto:amrit.auji@example.com')}>
              <boxGeometry args={[3, 2, 0.5]} />
              <meshPhongMaterial color={0x440044} emissive={0x220022} />
            </mesh>
            <Text position={[0, 0, 0.3]} fontSize={0.3} color="#ff00ff">
              📧 CONTACT
            </Text>
          </group>
          
          <group position={[6, 0, 0]}>
            <mesh onClick={() => window.open('https://github.com/amritauji', '_blank')}>
              <boxGeometry args={[3, 2, 0.5]} />
              <meshPhongMaterial color={0x444400} emissive={0x222200} />
            </mesh>
            <Text position={[0, 0, 0.3]} fontSize={0.3} color="#ffff00">
              🐙 GITHUB
            </Text>
          </group>
        </group>
      )}

      {/* Skip Button for Intro/Journey */}
      {(currentScene === 'intro' || currentScene === 'journey') && (
        <group position={[20, 15, 0]}>
          <mesh onClick={() => setCurrentScene('portfolio')}>
            <boxGeometry args={[6, 2, 0.5]} />
            <meshPhongMaterial color={0x440000} emissive={0x220000} />
          </mesh>
          <Text position={[0, 0, 0.3]} fontSize={0.4} color="#ff4444">
            SKIP TO PORTFOLIO →
          </Text>
        </group>
      )}

      {/* Camera Controls Instructions */}
      {currentScene === 'portfolio' && (
        <Html position={[0, -25, 0]} center>
          <div style={{
            color: '#00ffff',
            fontFamily: 'Courier New',
            fontSize: '14px',
            textAlign: 'center',
            background: 'rgba(0,0,0,0.7)',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #00ffff'
          }}>
            🖱️ Mouse: Rotate View | 🔍 Scroll: Zoom | 📱 Click Rooms to Explore
          </div>
        </Html>
      )}
    </group>
  )
}