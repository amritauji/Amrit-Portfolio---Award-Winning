import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

function HologramPanel({ position, title, content, color = 0x00ffff, onClick }) {
  const panelRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (panelRef.current) {
      panelRef.current.material.opacity = 0.3 + Math.sin(time * 3) * 0.1
      panelRef.current.rotation.y = Math.sin(time * 0.5) * 0.05
      
      if (hovered) {
        panelRef.current.scale.setScalar(1.1 + Math.sin(time * 8) * 0.05)
      } else {
        panelRef.current.scale.setScalar(1)
      }
    }

    if (glowRef.current) {
      glowRef.current.intensity = hovered ? 3 + Math.sin(time * 10) * 0.5 : 1
    }
  })

  return (
    <group position={position}>
      {/* Panel background */}
      <mesh 
        ref={panelRef}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[8, 5]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Holographic border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(8, 5)]} />
        <lineBasicMaterial color={color} />
      </lineSegments>

      {/* Title */}
      <Text
        position={[0, 1.5, 0.1]}
        fontSize={0.6}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Content */}
      <Text
        position={[0, -0.5, 0.1]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={7}
      >
        {content}
      </Text>

      {/* Glow effect */}
      <pointLight 
        ref={glowRef}
        position={[0, 0, 1]}
        color={color}
        intensity={1}
        distance={15}
      />
    </group>
  )
}

function ControlButton({ position, label, color, onClick, icon }) {
  const buttonRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (buttonRef.current) {
      if (hovered) {
        buttonRef.current.scale.setScalar(1.2 + Math.sin(time * 15) * 0.1)
        buttonRef.current.material.emissiveIntensity = 0.5 + Math.sin(time * 10) * 0.2
      } else {
        buttonRef.current.scale.setScalar(1)
        buttonRef.current.material.emissiveIntensity = 0.2
      }
    }
  })

  return (
    <group position={position}>
      {/* Button base */}
      <mesh 
        ref={buttonRef}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <cylinderGeometry args={[1.5, 1.5, 0.3, 8]} />
        <meshPhongMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Button glow ring */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[1.8, 0.1, 8, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {icon} {label}
      </Text>
    </group>
  )
}

export default function HolographicUI({ currentScene, setCurrentScene }) {
  const hudRef = useRef()
  const [activePanel, setActivePanel] = useState(null)

  const portfolioData = {
    about: {
      title: "AMRIT AUJI",
      content: "BTech Computer Science Engineering\nAI & Edge Computing Specialist\nInnovative Solution Architect",
      color: 0x00ffff
    },
    skills: {
      title: "TECHNICAL ARSENAL",
      content: "Java • Python • JavaScript\nReact • FastAPI • Three.js\nAI • Cloud Computing • SaaS",
      color: 0xff00ff
    },
    projects: {
      title: "MISSION PORTFOLIO",
      content: "🔗 QR Code Generator\n🎤 Voice Automation System\n🌐 SkillSphere Platform\n🚀 Space Portfolio",
      color: 0xffff00
    },
    contact: {
      title: "COMMUNICATION ARRAY",
      content: "📧 amrit.auji@example.com\n💼 LinkedIn: /in/amritauji\n🐙 GitHub: /amritauji",
      color: 0x00ff00
    }
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (hudRef.current) {
      hudRef.current.material.opacity = 0.8 + Math.sin(time * 2) * 0.1
    }
  })

  return (
    <group>
      {/* Floating HUD Display */}
      <group position={[-30, 18, 0]}>
        <mesh ref={hudRef}>
          <planeGeometry args={[15, 6]} />
          <meshBasicMaterial 
            color={0x001133} 
            transparent 
            opacity={0.7}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        <Text
          position={[0, 1, 0.1]}
          fontSize={1}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          {currentScene === 'intro' && 'GALAXY EXPLORATION'}
          {currentScene === 'journey' && 'HYPERSPACE JUMP'}
          {currentScene === 'station' && 'DOCKING SEQUENCE'}
          {currentScene === 'portfolio' && 'STATION INTERIOR'}
        </Text>
        
        <Text
          position={[0, -1, 0.1]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {currentScene === 'intro' && 'Initializing warp drive systems...'}
          {currentScene === 'journey' && 'Approaching destination coordinates...'}
          {currentScene === 'station' && 'Docking protocols active...'}
          {currentScene === 'portfolio' && 'All systems online. Explore freely.'}
        </Text>
      </group>

      {/* Portfolio Holographic Panels */}
      {currentScene === 'portfolio' && (
        <>
          <HologramPanel
            position={[-20, 0, 0]}
            title={portfolioData.about.title}
            content={portfolioData.about.content}
            color={portfolioData.about.color}
            onClick={() => setActivePanel(activePanel === 'about' ? null : 'about')}
          />
          
          <HologramPanel
            position={[0, 0, -15]}
            title={portfolioData.skills.title}
            content={portfolioData.skills.content}
            color={portfolioData.skills.color}
            onClick={() => setActivePanel(activePanel === 'skills' ? null : 'skills')}
          />
          
          <HologramPanel
            position={[20, 0, 0]}
            title={portfolioData.projects.title}
            content={portfolioData.projects.content}
            color={portfolioData.projects.color}
            onClick={() => setActivePanel(activePanel === 'projects' ? null : 'projects')}
          />
          
          <HologramPanel
            position={[0, 0, 15]}
            title={portfolioData.contact.title}
            content={portfolioData.contact.content}
            color={portfolioData.contact.color}
            onClick={() => setActivePanel(activePanel === 'contact' ? null : 'contact')}
          />
        </>
      )}

      {/* 3D Control Buttons */}
      {currentScene === 'portfolio' && (
        <group position={[0, -25, 0]}>
          <ControlButton
            position={[-8, 0, 0]}
            label="RESTART"
            color={0x00ffff}
            icon="🚀"
            onClick={() => setCurrentScene('intro')}
          />
          
          <ControlButton
            position={[0, 0, 0]}
            label="CONTACT"
            color={0xff00ff}
            icon="📧"
            onClick={() => window.open('mailto:amrit.auji@example.com')}
          />
          
          <ControlButton
            position={[8, 0, 0]}
            label="GITHUB"
            color={0xffff00}
            icon="🐙"
            onClick={() => window.open('https://github.com/amritauji', '_blank')}
          />
        </group>
      )}

      {/* Skip Button */}
      {(currentScene === 'intro' || currentScene === 'journey') && (
        <group position={[25, 15, 0]}>
          <ControlButton
            position={[0, 0, 0]}
            label="SKIP"
            color={0xff4444}
            icon="⚡"
            onClick={() => setCurrentScene('portfolio')}
          />
        </group>
      )}

      {/* Instructions */}
      {currentScene === 'portfolio' && (
        <Html position={[0, -35, 0]} center>
          <div style={{
            color: '#00ffff',
            fontFamily: 'Courier New',
            fontSize: '16px',
            textAlign: 'center',
            background: 'rgba(0,20,40,0.8)',
            padding: '15px',
            borderRadius: '10px',
            border: '2px solid #00ffff',
            boxShadow: '0 0 20px rgba(0,255,255,0.3)'
          }}>
            🖱️ <strong>Mouse:</strong> Rotate View | 🔍 <strong>Scroll:</strong> Zoom | 📱 <strong>Click:</strong> Interact with Holograms
          </div>
        </Html>
      )}
    </group>
  )
}