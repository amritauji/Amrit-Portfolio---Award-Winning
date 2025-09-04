import React, { useRef, useEffect, Suspense, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import EnhancedStarfield from './EnhancedStarfield'
import { LazySpaceship, LazySpaceStation, LazyGalaxy } from './LazyModels'
import { useSpring } from '@react-spring/three'
import * as anime from 'animejs'
import CinematicCamera from './CinematicCamera'
import HolographicUI from './HolographicUI'
import SpaceStation3D from './SpaceStation3D'
import Space360 from './Space360'
import AudioManager from './AudioManager'
import SpaceLightingEffects from './SpaceLightingEffects'
import AvatarScene from './AvatarScene'
import Homepage from './Homepage'
import AvatarVideoLoader from './AvatarVideoLoader'
import PortfolioSite from './PortfolioSite'

export default function SpaceScene({ currentScene, setCurrentScene, isMuted }) {
  const { camera } = useThree()
  const sceneRef = useRef()
  const [shipPosition, setShipPosition] = useState({ x: 0, y: 0, z: 0 })

  const [enteringStation, setEnteringStation] = useState(false)
  const [zoomEffect, setZoomEffect] = useState(false)
  const [showVideoLoader, setShowVideoLoader] = useState(false)

  useEffect(() => {
    console.log('SpaceScene - currentScene changed to:', currentScene)
  }, [currentScene])

  useEffect(() => {
    // Scene transitions
    switch (currentScene) {
      case 'intro':
        gsap.to(camera.position, { x: 0, y: 5, z: 20, duration: 2 })
        break
      case 'journey':
        gsap.to(camera.position, { x: 0, y: 2, z: 8, duration: 3 })
        break
      case 'station':
        gsap.to(camera.position, { x: 0, y: 0, z: 5, duration: 2 })
        break
      case 'portfolio':
        gsap.to(camera.position, { x: 0, y: 0, z: 15, duration: 2 })
        break
    }
  }, [currentScene, camera])

  return (
    <group ref={sceneRef}>
      {/* Bright Space Lighting */}
      <ambientLight intensity={0.5} color={0x4466ff} />
      
      {/* Main directional light */}
      <directionalLight 
        position={[50, 50, 50]} 
        intensity={2} 
        color={0xffffff}
        castShadow
      />
      
      {/* Fill lights */}
      <pointLight position={[20, 20, 20]} intensity={1.5} color={0xffffff} distance={100} />
      <pointLight position={[-20, -20, 20]} intensity={1} color={0x88aaff} distance={100} />
      <pointLight position={[0, 30, 0]} intensity={0.8} color={0xffffaa} distance={80} />

      {/* 360 Degree Space Environment */}
      <Space360 />
      
      {/* Enhanced Background */}
      <EnhancedStarfield currentScene={currentScene} />
      
      {/* Lazy loaded galaxy background */}
      <Suspense fallback={null}>
        <LazyGalaxy position={[0, 0, -800]} scale={[200, 200, 200]} />
      </Suspense>

      {/* Enhanced Spaceship */}
      {(currentScene === 'intro' || currentScene === 'journey') && (
        <Suspense fallback={
          <mesh>
            <coneGeometry args={[1, 4, 8]} />
            <meshBasicMaterial color={0x00ffff} />
          </mesh>
        }>
          <SpaceshipController 
            currentScene={currentScene} 
            setCurrentScene={setCurrentScene}
            setShipPosition={setShipPosition}
            enteringStation={enteringStation}
          />
          
          {/* Spaceship lighting */}
          <pointLight position={[0, 5, 5]} intensity={0.8} color={0x00ffff} distance={30} />
        </Suspense>
      )}
      
      {/* Enhanced Space Station with Lighting */}
      {currentScene === 'station' && (
        <>
          <SpaceStation3D 
            currentScene={currentScene}
            onEnterStation={() => {
              console.log('onEnterStation called - setting portfolio scene')
              console.log('Current scene before:', currentScene)
              setCurrentScene('portfolio')
              console.log('setCurrentScene(portfolio) called')
            }}
          />
          
          {/* Station-specific lighting */}
          <spotLight 
            position={[0, 40, -40]} 
            target-position={[0, 0, -80]}
            angle={0.4} 
            penumbra={0.3} 
            intensity={2} 
            color={0xffffff}
            distance={150}
            castShadow
          />
          
          <pointLight position={[0, 0, -40]} intensity={3} color={0x00ffff} distance={120} />
          <pointLight position={[30, 20, -80]} intensity={2} color={0xffaa00} distance={80} />
          <pointLight position={[-30, -20, -80]} intensity={2} color={0xff0088} distance={80} />
        </>
      )}
      

      
      {/* Cinematic Camera System */}
      <CinematicCamera currentScene={currentScene} shipPosition={shipPosition} />
      
      {/* Enhanced Camera Controls */}
      <OrbitControls 
        enabled={currentScene === 'portfolio'}
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={150}
        maxPolarAngle={Math.PI * 0.8}
        minPolarAngle={Math.PI * 0.2}
        enableDamping={true}
        dampingFactor={0.05}
      />
      
      {/* Holographic UI System */}
      <HolographicUI currentScene={currentScene} setCurrentScene={setCurrentScene} />
      
      {/* Dynamic space lighting effects */}
      <SpaceLightingEffects currentScene={currentScene} />
      
      {/* Avatar Scene */}
      {currentScene === 'avatar' && (
        <AvatarScene setCurrentScene={setCurrentScene} />
      )}
      
      {/* Sound Effects */}
      <AudioManager currentScene={currentScene} isMuted={isMuted} />
      
      {/* Avatar Video Loader */}
      {showVideoLoader && (
        <AvatarVideoLoader onComplete={() => {
          console.log('Video completed, switching to portfolio')
          setShowVideoLoader(false)
          setCurrentScene('portfolio')
        }} />
      )}
      
      {/* Homepage */}
      <Homepage currentScene={currentScene} />
    </group>
  )
}

// Enhanced Spaceship Controller
function SpaceshipController({ currentScene, setCurrentScene, setShipPosition, enteringStation }) {
  const shipRef = useRef()
  const timeline = useRef(null)
  
  const { position } = useSpring({
    position: currentScene === 'journey' ? [0, 0, -50] : [0, 0, 0],
    config: { tension: 120, friction: 14 }
  })

  useEffect(() => {
    if (!shipRef.current) return

    // Kill existing timeline
    if (timeline.current) timeline.current.kill()

    if (currentScene === 'intro') {
      // 4 second engine phase
      timeline.current = gsap.timeline()
        .to(shipRef.current.position, { y: 1, duration: 1, ease: "power2.inOut", yoyo: true, repeat: 1 })
        .to(shipRef.current.rotation, { z: 0.1, duration: 0.8, ease: "sine.inOut", yoyo: true, repeat: 2 }, 0)
        .to({}, { duration: 0.5, onStart: () => fadeToScene('journey') })
        .call(() => {
          setCurrentScene('journey')
          localStorage.setItem('lastScene', 'journey')
        }, null, 4.5)

    } else if (currentScene === 'journey') {
      // 4 second acceleration phase
      timeline.current = gsap.timeline()
        .to(shipRef.current.position, { z: -100, duration: 4, ease: "power2.in" })
        .to(shipRef.current.position, { y: 0, duration: 2, ease: "power2.out" }, 0)
        .to(shipRef.current.rotation, { x: 0, duration: 2, ease: "power2.out" }, 2)
        .to({}, { duration: 0.5, onStart: () => fadeToScene('station') })
        .call(() => {
          setCurrentScene('station')
          localStorage.setItem('lastScene', 'station')
        }, null, 4.5)

    } else if (currentScene === 'station' && enteringStation) {
      timeline.current = gsap.timeline()
        .to(shipRef.current.position, { z: -200, duration: 1.5, ease: "power2.in" })
        .to({}, { duration: 0.3, onStart: () => fadeToScene('avatar') })
        .call(() => {
          setCurrentScene('avatar')
          localStorage.setItem('lastScene', 'avatar')
        }, null, 1.8)
    }

    const fadeToScene = (scene) => {
      const fadeEl = document.querySelector('[data-fade-transition]')
      if (fadeEl) {
        gsap.to(fadeEl, { opacity: 1, duration: 0.3, ease: "power2.in" })
      }
    }

    return () => {
      if (timeline.current) timeline.current.kill()
    }
  }, [currentScene, enteringStation, setCurrentScene])

  useFrame(() => {
    if (shipRef.current) {
      setShipPosition({ 
        x: shipRef.current.position.x, 
        y: shipRef.current.position.y, 
        z: shipRef.current.position.z 
      })
    }
  })

  return (
    <group ref={shipRef}>
      <LazySpaceship scale={[0.8, 0.8, 0.8]} />
      <pointLight position={[0, 0, 3]} color={0x00ffff} intensity={2} distance={20} />
      
      {/* Engine trails */}
      {currentScene === 'journey' && (
        <group position={[0, 0, 2]}>
          <mesh>
            <coneGeometry args={[0.3, 3, 8]} />
            <meshBasicMaterial color={0x00ffff} transparent opacity={0.6} />
          </mesh>
        </group>
      )}
    </group>
  )
}