import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function SpaceLightingEffects({ currentScene }) {
  const lightRef1 = useRef()
  const lightRef2 = useRef()
  const lightRef3 = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime

    // Pulsing nebula lights
    if (lightRef1.current) {
      lightRef1.current.intensity = 0.3 + Math.sin(time * 2) * 0.2
      lightRef1.current.position.x = Math.sin(time * 0.5) * 30
      lightRef1.current.position.y = Math.cos(time * 0.3) * 20
    }

    if (lightRef2.current) {
      lightRef2.current.intensity = 0.2 + Math.cos(time * 1.5) * 0.15
      lightRef2.current.position.x = Math.cos(time * 0.4) * 40
      lightRef2.current.position.z = Math.sin(time * 0.6) * 25
    }

    if (lightRef3.current) {
      lightRef3.current.intensity = 0.25 + Math.sin(time * 3) * 0.1
      lightRef3.current.position.y = Math.sin(time * 0.8) * 35
    }
  })

  return (
    <>
      {/* Animated nebula lights */}
      <pointLight 
        ref={lightRef1}
        position={[30, 20, -50]}
        color={0xff6644}
        intensity={0.3}
        distance={200}
      />
      
      <pointLight 
        ref={lightRef2}
        position={[-40, -15, 30]}
        color={0x4466ff}
        intensity={0.2}
        distance={180}
      />
      
      <pointLight 
        ref={lightRef3}
        position={[0, 35, -100]}
        color={0x44ff66}
        intensity={0.25}
        distance={220}
      />

      {/* Journey-specific lighting */}
      {currentScene === 'journey' && (
        <>
          <spotLight 
            position={[0, 0, 50]}
            target-position={[0, 0, -100]}
            angle={0.3}
            penumbra={0.5}
            intensity={0.8}
            color={0x00ffff}
            distance={200}
          />
          
          <pointLight 
            position={[0, 0, 20]}
            color={0xffffff}
            intensity={1.2}
            distance={50}
          />
        </>
      )}

      {/* Station approach lighting */}
      {currentScene === 'station' && (
        <>
          <spotLight 
            position={[0, 50, 0]}
            target-position={[0, 0, -80]}
            angle={0.5}
            penumbra={0.4}
            intensity={1.5}
            color={0xffffcc}
            distance={200}
          />
          
          <pointLight 
            position={[30, 20, -60]}
            color={0xff8800}
            intensity={0.6}
            distance={100}
          />
          
          <pointLight 
            position={[-30, -20, -60]}
            color={0x0088ff}
            intensity={0.6}
            distance={100}
          />
        </>
      )}
    </>
  )
}