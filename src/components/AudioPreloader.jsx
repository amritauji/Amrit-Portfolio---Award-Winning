import { useEffect, useState } from 'react'

export default function AudioPreloader({ onAudioReady }) {
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    const audioFiles = [
      '/audio/spaceship-engine.mp3',
      '/audio/spaceship-acceleration.mp3',
      '/audio/interstellar-docking.mp3'
    ]

    let loadedCount = 0
    const totalFiles = audioFiles.length

    const preloadAudio = (src) => {
      return new Promise((resolve) => {
        const audio = new Audio()
        const timeout = setTimeout(() => {
          loadedCount++
          setLoadingProgress((loadedCount / totalFiles) * 100)
          resolve()
        }, 2000) // 2 second timeout
        
        audio.addEventListener('canplaythrough', () => {
          clearTimeout(timeout)
          loadedCount++
          setLoadingProgress((loadedCount / totalFiles) * 100)
          resolve()
        })
        audio.addEventListener('error', () => {
          clearTimeout(timeout)
          loadedCount++
          setLoadingProgress((loadedCount / totalFiles) * 100)
          resolve()
        })
        audio.src = src
        audio.load()
      })
    }

    Promise.all(audioFiles.map(preloadAudio)).then(() => {
      setTimeout(() => {
        setAudioLoaded(true)
        if (onAudioReady) onAudioReady()
      }, 500)
    })

  }, [onAudioReady])

  if (audioLoaded) return null

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#00ffff',
      fontFamily: 'Courier New',
      textAlign: 'center',
      zIndex: 1000
    }}>
      <div style={{ fontSize: '24px', marginBottom: '20px' }}>
        Loading Audio Systems...
      </div>
      <div style={{
        width: '300px',
        height: '4px',
        background: '#003333',
        border: '1px solid #00ffff',
        borderRadius: '2px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${loadingProgress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00ffff, #0088ff)',
          transition: 'width 0.3s ease'
        }} />
      </div>
      <div style={{ fontSize: '14px', marginTop: '10px' }}>
        {Math.round(loadingProgress)}% Complete
      </div>
    </div>
  )
}