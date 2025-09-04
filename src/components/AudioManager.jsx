import { useEffect, useRef } from 'react'

export default function AudioManager({ currentScene, isMuted }) {
  const audioRefs = useRef({})
  const currentAudio = useRef(null)

  useEffect(() => {
    audioRefs.current = {
      engine: new Audio('/audio/spaceship-engine.mp3'),
      acceleration: new Audio('/audio/spaceship-acceleration.mp3'),
      interstellar: new Audio('/audio/interstellar-docking.mp3')
    }
    
    audioRefs.current.engine.loop = true
    audioRefs.current.engine.volume = 0.3
    audioRefs.current.acceleration.volume = 0.4
    audioRefs.current.interstellar.loop = true
    audioRefs.current.interstellar.volume = 0.3
  }, [])

  useEffect(() => {
    if (!audioRefs.current.engine) return

    // Stop current audio
    if (currentAudio.current) {
      currentAudio.current.pause()
    }

    if (isMuted) return

    // Play new audio
    let newAudio
    switch (currentScene) {
      case 'intro':
        newAudio = audioRefs.current.engine
        break
      case 'journey':
        newAudio = audioRefs.current.acceleration
        break
      case 'station':
        newAudio = audioRefs.current.interstellar
        break
    }

    if (newAudio) {
      newAudio.currentTime = 0
      newAudio.play().catch(console.log)
      currentAudio.current = newAudio
    }
  }, [currentScene, isMuted])

  useEffect(() => {
    if (currentAudio.current) {
      if (isMuted) {
        currentAudio.current.pause()
      } else {
        currentAudio.current.play().catch(console.log)
      }
    }
  }, [isMuted])

  return null
}