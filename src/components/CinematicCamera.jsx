import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { gsap } from 'gsap'

export default function CinematicCamera({ currentScene, shipPosition }) {
  const { camera } = useThree()
  const shakeRef = useRef({ x: 0, y: 0, z: 0 })

  useFrame((state) => {
    const time = state.clock.elapsedTime

    switch (currentScene) {
      case 'intro':
        camera.position.set(0, 5, 20)
        camera.lookAt(0, 0, 0)
        break

      case 'journey':
        camera.position.set(shipPosition.x, shipPosition.y + 4, shipPosition.z + 12)
        camera.lookAt(shipPosition.x, shipPosition.y, shipPosition.z - 5)
        break

      case 'station':
        camera.position.set(0, 8, 15)
        camera.lookAt(0, 0, -80)
        break

      case 'portfolio':
        // Free camera control handled by OrbitControls
        break
    }
  })

  return null
}