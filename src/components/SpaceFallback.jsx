import React from 'react'

export default function SpaceFallback() {
  return (
    <group>
      {/* Space background */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 32, 16]} />
        <meshBasicMaterial color={0x000022} />
      </mesh>

      {/* Asteroids */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 200
          ]}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ]}
          scale={Math.random() * 2 + 0.5}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={0x444444} />
        </mesh>
      ))}

      {/* Stars */}
      {Array.from({ length: 100 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400,
            (Math.random() - 0.5) * 400
          ]}
        >
          <sphereGeometry args={[0.5]} />
          <meshBasicMaterial color={0xffffff} />
        </mesh>
      ))}

      {/* Ambient light */}
      <ambientLight intensity={0.3} />
    </group>
  )
}