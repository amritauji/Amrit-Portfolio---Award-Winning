import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function SpaceEnvironment() {
  const spaceRef = useRef()
  const { scene } = useGLTF('/assets/need_some_space.glb')

  useFrame(() => {
    if (spaceRef.current) {
      spaceRef.current.rotation.x += 0.0002
      spaceRef.current.rotation.z += 0.0003
    }
  })

  return (
    <group ref={spaceRef} scale={[20, 20, 20]} position={[0, 0, -300]}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/assets/need_some_space.glb')