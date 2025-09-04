import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

// Lazy loaded spaceship
export function LazySpaceship({ position, rotation, scale }) {
  try {
    const { scene } = useGLTF('/assets/futuristic_spaceship.glb')
    return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
  } catch {
    return (
      <mesh position={position} rotation={rotation} scale={scale}>
        <coneGeometry args={[1, 4, 8]} />
        <meshPhongMaterial color={0x00ffff} emissive={0x004444} />
      </mesh>
    )
  }
}

// Lazy loaded space station
export function LazySpaceStation({ position, rotation, scale }) {
  try {
    const { scene } = useGLTF('/assets/iss_-_international_space_station..glb')
    return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
  } catch {
    return (
      <group position={position} rotation={rotation} scale={scale}>
        <mesh>
          <cylinderGeometry args={[8, 8, 4, 16]} />
          <meshPhongMaterial color={0x444444} emissive={0x002244} />
        </mesh>
        <mesh position={[0, 3, 0]}>
          <torusGeometry args={[6, 0.5, 8, 16]} />
          <meshPhongMaterial color={0x00ffff} emissive={0x004444} />
        </mesh>
      </group>
    )
  }
}

// Lazy loaded galaxy
export function LazyGalaxy({ position, rotation, scale }) {
  try {
    const { scene } = useGLTF('/assets/inside_galaxy_skybox_hdri_360_panorama.glb')
    return <primitive object={scene} position={position} rotation={rotation} scale={scale} />
  } catch {
    return null
  }
}

// Preload models
useGLTF.preload('/assets/futuristic_spaceship.glb')
useGLTF.preload('/assets/iss_-_international_space_station..glb')
useGLTF.preload('/assets/inside_galaxy_skybox_hdri_360_panorama.glb')