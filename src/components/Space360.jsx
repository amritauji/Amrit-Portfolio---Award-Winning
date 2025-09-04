import React, { useRef } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export default function Space360() {
  const sphereRef = useRef()
  
  // Create a starfield texture programmatically
  const createStarTexture = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 2048
    canvas.height = 1024
    const ctx = canvas.getContext('2d')
    
    // Black background
    ctx.fillStyle = '#000011'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add stars
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * 2 + 0.5
      const brightness = Math.random() * 0.8 + 0.2
      
      ctx.fillStyle = `rgba(${255 * brightness}, ${255 * brightness}, 255, ${brightness})`
      ctx.beginPath()
      ctx.arc(x, y, size, 0, Math.PI * 2)
      ctx.fill()
    }
    
    // Add nebula effects
    const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width/2)
    gradient.addColorStop(0, 'rgba(0, 100, 200, 0.1)')
    gradient.addColorStop(0.5, 'rgba(100, 0, 200, 0.05)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }

  const starTexture = createStarTexture()

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.0002
      sphereRef.current.rotation.x += 0.0001
    }
  })

  return (
    <mesh ref={sphereRef} scale={[-1, 1, 1]}>
      <sphereGeometry args={[1000, 64, 32]} />
      <meshBasicMaterial map={starTexture} side={THREE.BackSide} />
    </mesh>
  )
}