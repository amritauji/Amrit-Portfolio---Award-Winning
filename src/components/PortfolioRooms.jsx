import React, { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

const rooms = [
  { id: 'about', position: [-15, 0, 0], title: 'ABOUT ME', color: 0x00ffff },
  { id: 'skills', position: [0, 0, 0], title: 'SKILLS', color: 0xff00ff },
  { id: 'projects', position: [15, 0, 0], title: 'PROJECTS', color: 0xffff00 },
  { id: 'contact', position: [0, 15, 0], title: 'CONTACT', color: 0x00ff00 }
]

function Room({ room, isActive, onClick }) {
  const roomRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (roomRef.current) {
      roomRef.current.rotation.y += 0.01
      
      if (isActive) {
        roomRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1)
      } else {
        roomRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <group position={room.position} onClick={onClick}>
      {/* Room Structure */}
      <mesh ref={roomRef}>
        <boxGeometry args={[4, 4, 4]} />
        <meshPhongMaterial 
          color={room.color} 
          transparent 
          opacity={0.3}
          emissive={room.color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Room Title */}
      <Text
        position={[0, 6, 0]}
        fontSize={1}
        color={room.color}
        anchorX="center"
        anchorY="middle"
      >
        {room.title}
      </Text>

      {/* Interactive Glow */}
      <pointLight 
        ref={glowRef}
        color={room.color} 
        intensity={isActive ? 2 : 0.5} 
        distance={10} 
      />
    </group>
  )
}

function RoomContent({ activeRoom }) {
  const content = {
    about: {
      title: "Amrit Auji",
      text: "BTech Computer Science Engineering Student\nAI & Edge Computing Enthusiast\nPassionate about building innovative solutions"
    },
    skills: {
      title: "Technical Skills",
      text: "Languages: Java, Python, JavaScript\nFrameworks: React, FastAPI\nTools: Supabase, Three.js\nInterests: AI, Cloud Computing, SaaS"
    },
    projects: {
      title: "Featured Projects",
      text: "🔗 QR Code Generator\n🎤 Voice Automation Purchase Orders\n🌐 SkillSphere Platform\n🚀 Space Portfolio (This!)"
    },
    contact: {
      title: "Get In Touch",
      text: "📧 Email: amrit.auji@example.com\n💼 LinkedIn: /in/amritauji\n🐙 GitHub: /amritauji"
    }
  }

  if (!activeRoom || !content[activeRoom]) return null

  return (
    <Html position={[0, -8, 0]} center>
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid #00ffff',
        borderRadius: '10px',
        padding: '20px',
        color: '#00ffff',
        fontFamily: 'Courier New',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '15px', color: '#ffffff' }}>
          {content[activeRoom].title}
        </h2>
        <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
          {content[activeRoom].text}
        </p>
      </div>
    </Html>
  )
}

export default function PortfolioRooms() {
  const [activeRoom, setActiveRoom] = useState(null)

  return (
    <group>
      {/* Navigation Instructions */}
      <Text
        position={[0, -20, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Click on rooms to explore • Use mouse to navigate
      </Text>

      {/* Rooms */}
      {rooms.map((room) => (
        <Room
          key={room.id}
          room={room}
          isActive={activeRoom === room.id}
          onClick={() => setActiveRoom(activeRoom === room.id ? null : room.id)}
        />
      ))}

      {/* Room Content Display */}
      <RoomContent activeRoom={activeRoom} />
    </group>
  )
}