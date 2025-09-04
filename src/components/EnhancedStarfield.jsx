import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function EnhancedStarfield({ currentScene }) {
  const starsRef = useRef()
  const portalRef = useRef()
  const trailsRef = useRef()

  const { starGeometry, portalGeometry, trailGeometry } = useMemo(() => {
    // Optimized starfield
    const starGeo = new THREE.BufferGeometry()
    const starCount = 1500
    const positions = new Float32Array(starCount * 3)
    const colors = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 1000
      positions[i3 + 1] = (Math.random() - 0.5) * 1000
      positions[i3 + 2] = (Math.random() - 0.5) * 1000
      
      const color = new THREE.Color()
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.5)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
      
      sizes[i] = Math.random() * 2 + 0.5
    }
    
    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    starGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Optimized portal
    const portalGeo = new THREE.BufferGeometry()
    const portalCount = 200
    const portalPos = new Float32Array(portalCount * 3)
    
    for (let i = 0; i < portalCount; i++) {
      const i3 = i * 3
      const angle = (i / portalCount) * Math.PI * 20
      const radius = 15 + Math.sin(angle * 0.5) * 5
      
      portalPos[i3] = Math.cos(angle) * radius
      portalPos[i3 + 1] = Math.sin(angle) * radius
      portalPos[i3 + 2] = (i / portalCount) * -200 - 50
    }
    
    portalGeo.setAttribute('position', new THREE.BufferAttribute(portalPos, 3))

    // Optimized trails
    const trailGeo = new THREE.BufferGeometry()
    const trailCount = 100
    const trailPos = new Float32Array(trailCount * 3)
    
    for (let i = 0; i < trailCount; i++) {
      const i3 = i * 3
      trailPos[i3] = (Math.random() - 0.5) * 100
      trailPos[i3 + 1] = (Math.random() - 0.5) * 100
      trailPos[i3 + 2] = Math.random() * -500
    }
    
    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3))
    
    return { starGeometry: starGeo, portalGeometry: portalGeo, trailGeometry: trailGeo }
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    if (starsRef.current) {
      if (currentScene === 'journey') {
        // Optimized star movement
        const positions = starsRef.current.geometry.attributes.position.array
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 2] += 6
          if (positions[i + 2] > 80) {
            positions[i + 2] = -800
            positions[i] = (Math.random() - 0.5) * 800
            positions[i + 1] = (Math.random() - 0.5) * 800
          }
        }
        starsRef.current.geometry.attributes.position.needsUpdate = true
      } else {
        starsRef.current.rotation.y += 0.0003
      }
    }

    if (portalRef.current && currentScene === 'journey') {
      portalRef.current.rotation.z += 0.1
      portalRef.current.material.opacity = 0.3 + Math.sin(time * 5) * 0.2
    }

    if (trailsRef.current && currentScene === 'journey') {
      const positions = trailsRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 12
        if (positions[i + 2] > 40) {
          positions[i + 2] = -400
          positions[i] = (Math.random() - 0.5) * 80
          positions[i + 1] = (Math.random() - 0.5) * 80
        }
      }
      trailsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <>
      {/* Main starfield */}
      <points ref={starsRef} geometry={starGeometry}>
        <pointsMaterial
          size={2}
          sizeAttenuation={true}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
        />
      </points>

      {/* Portal tunnel during journey */}
      {currentScene === 'journey' && (
        <points ref={portalRef} geometry={portalGeometry}>
          <pointsMaterial
            size={6}
            color={0x00ffff}
            transparent={true}
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}

      {/* Speed trails during journey */}
      {currentScene === 'journey' && (
        <points ref={trailsRef} geometry={trailGeometry}>
          <pointsMaterial
            size={4}
            color={0xffffff}
            transparent={true}
            opacity={0.6}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </>
  )
}