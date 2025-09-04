import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function GalaxyBackground() {
  const galaxyRef = useRef()
  const { scene } = useGLTF('/assets/inside_galaxy_skybox_hdri_360_panorama.glb')

  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group ref={galaxyRef} scale={[100, 100, 100]} position={[0, 0, -500]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/assets/inside_galaxy_skybox_hdri_360_panorama.glb')