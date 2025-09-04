import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Starfield({ currentScene }) {
  const starsRef = useRef()
  const portalRef = useRef()
  
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const starCount = 1000
    const positions = new Float32Array(starCount * 3)
    
    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 500
      positions[i3 + 1] = (Math.random() - 0.5) * 500
      positions[i3 + 2] = (Math.random() - 0.5) * 500
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.001
    }
  })

  return (
    <points ref={starsRef} geometry={starGeometry}>
      <pointsMaterial
        size={2}
        color={0xffffff}
        sizeAttenuation={false}
      />
    </points>
  )
}