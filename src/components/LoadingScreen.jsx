import React, { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef()
  const materialRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      pos.x += sin(pos.y * 10.0 + time * 2.0) * 0.1;
      pos.y += cos(pos.x * 10.0 + time * 1.5) * 0.1;
      pos.z += sin(pos.x * 5.0 + pos.y * 5.0 + time) * 0.05;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float time;
    
    void main() {
      vec3 color1 = vec3(0.463, 0.725, 0.0); // #76b900
      vec3 color2 = vec3(0.306, 0.804, 0.769); // #4ecdc4
      vec3 color3 = vec3(1.0, 0.42, 0.208); // #ff6b35
      
      float noise = sin(vPosition.x * 5.0 + time) * cos(vPosition.y * 5.0 + time * 0.5);
      float gradient = (vUv.y + noise * 0.2 + sin(time) * 0.1);
      
      vec3 finalColor = mix(color1, color2, gradient);
      finalColor = mix(finalColor, color3, sin(time * 0.5) * 0.3 + 0.3);
      
      float alpha = 0.8 + sin(time * 2.0) * 0.2;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 }
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Particles() {
  const pointsRef = useRef()
  const particleCount = 1000

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20

    const colorChoice = Math.floor(Math.random() * 3)
    if (colorChoice === 0) {
      colors[i * 3] = 0.463; colors[i * 3 + 1] = 0.725; colors[i * 3 + 2] = 0.0
    } else if (colorChoice === 1) {
      colors[i * 3] = 0.306; colors[i * 3 + 1] = 0.804; colors[i * 3 + 2] = 0.769
    } else {
      colors[i * 3] = 1.0; colors[i * 3 + 1] = 0.42; colors[i * 3 + 2] = 0.208
    }
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.1
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={particleCount}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={particleCount}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} />
    </points>
  )
}

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef()
  const textRef = useRef()
  const progressRef = useRef()
  const percentRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()

    // Initial setup
    gsap.set([textRef.current, progressRef.current, percentRef.current], {
      opacity: 0,
      y: 50
    })

    // Animate in
    tl.to([textRef.current, progressRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    })

    // Progress animation
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15
      if (progress > 100) progress = 100

      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out"
      })

      if (percentRef.current) {
        percentRef.current.textContent = `${Math.floor(progress)}%`
      }

      if (progress >= 100) {
        clearInterval(progressInterval)
        
        // Exit animation
        setTimeout(() => {
          tl.to(containerRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: "power2.in",
            onComplete: () => {
              onComplete()
            }
          })
        }, 500)
      }
    }, 100)

    return () => {
      clearInterval(progressInterval)
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #000000, #1a1a2e, #16213e)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        overflow: 'hidden'
      }}
    >
      {/* Three.js Canvas */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.7
      }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <AnimatedSphere />
          <Particles />
        </Canvas>
      </div>

      {/* Loading UI */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h1
          ref={textRef}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #76b900, #4ecdc4, #ff6b35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '40px',
            letterSpacing: '-1px'
          }}
        >
          AMRIT AUJI
        </h1>

        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          padding: '30px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <p style={{
            color: '#ffffff',
            fontSize: '1.2rem',
            marginBottom: '30px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '500'
          }}>
            Loading Portfolio Experience...
          </p>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '3px',
            overflow: 'hidden',
            marginBottom: '15px'
          }}>
            <div
              ref={progressRef}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35)',
                borderRadius: '3px',
                width: '0%',
                transition: 'width 0.3s ease'
              }}
            />
          </div>

          <div
            ref={percentRef}
            style={{
              color: '#76b900',
              fontSize: '1.1rem',
              fontWeight: '700',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            0%
          </div>
        </div>
      </div>

      {/* Floating elements */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: i % 3 === 0 ? '#76b900' : i % 3 === 1 ? '#4ecdc4' : '#ff6b35',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            opacity: 0.6
          }}
        />
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  )
}