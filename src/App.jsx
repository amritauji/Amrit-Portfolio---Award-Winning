import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import SpaceScene from './components/SpaceScene'
import AudioPreloader from './components/AudioPreloader'
import AudioClickPrompt from './components/AudioClickPrompt'
import SpaceFallback from './components/SpaceFallback'
import FadeTransition from './components/FadeTransition'
import { UserPreferences } from './utils/userPreferences'
import PortfolioSite from './components/PortfolioSite'

export default function App() {
  const [currentScene, setCurrentScene] = useState('intro')
  const [audioReady, setAudioReady] = useState(false)
  const [showAudioPrompt, setShowAudioPrompt] = useState(() => {
    return !UserPreferences.hasVisited()
  })
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const loadingEl = document.getElementById('loading')
    if (loadingEl) loadingEl.style.display = 'none'
    
    // Auto-start if user has visited before
    if (UserPreferences.hasVisited()) {
      setShowAudioPrompt(false)
      UserPreferences.incrementVisitCount()
    }
  }, [])

  return (
    <>
      {!audioReady && (
        <AudioPreloader onAudioReady={() => {
          setAudioReady(true)
          UserPreferences.setVisited()
          UserPreferences.incrementVisitCount()
        }} />
      )}
      
      {audioReady && (
        <>
        <FadeTransition currentScene={currentScene} />
        
        {/* Control buttons */}
        {currentScene !== 'portfolio' && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 200,
            display: 'flex',
            gap: '10px'
          }}>
            <button
              onClick={() => setCurrentScene('portfolio')}
              style={{
                background: 'rgba(0,255,255,0.2)',
                color: '#00ffff',
                border: '1px solid #00ffff',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'Courier New'
              }}
            >
              Skip to Portfolio
            </button>
            
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: '#ffffff',
                border: '1px solid #ffffff',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontFamily: 'Courier New'
              }}
            >
              {isMuted ? '🔇 Unmute' : '🔊 Mute'}
            </button>
          </div>
        )}
        
        {currentScene !== 'portfolio' ? (
          <Canvas
            camera={{ position: [0, 5, 20], fov: 75 }}
            style={{ height: '100vh', background: '#000011' }}
            gl={{ 
              antialias: true, 
              alpha: false, 
              powerPreference: 'high-performance',
              stencil: false,
              depth: true
            }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            <Suspense fallback={<SpaceFallback />}>
              <SpaceScene currentScene={currentScene} setCurrentScene={setCurrentScene} isMuted={isMuted} />
            </Suspense>
          </Canvas>
        ) : (
          <PortfolioSite currentScene={currentScene} />
        )}
        </>
      )}
    </>
  )
}