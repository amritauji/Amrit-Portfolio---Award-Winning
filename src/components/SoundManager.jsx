import { useEffect, useRef } from 'react'

export default function SoundManager({ currentScene, journeyPhase }) {
  const audioContextRef = useRef(null)
  const oscillatorRef = useRef(null)
  const gainNodeRef = useRef(null)

  useEffect(() => {
    // Initialize Web Audio API
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }

    const audioContext = audioContextRef.current
    
    // Create gain node for volume control
    if (!gainNodeRef.current) {
      gainNodeRef.current = audioContext.createGain()
      gainNodeRef.current.connect(audioContext.destination)
    }

    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop()
        oscillatorRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const audioContext = audioContextRef.current
    const gainNode = gainNodeRef.current
    
    if (!audioContext || !gainNode) return

    // Stop previous sounds
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current = null
    }

    // Create sounds based on scene
    if (currentScene === 'journey') {
      // Engine sound
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'sawtooth'
      oscillator.frequency.setValueAtTime(80, audioContext.currentTime)
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      oscillator.connect(gainNode)
      oscillator.start()
      oscillatorRef.current = oscillator

      // Acceleration sound effect
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 7)
      
    } else if (currentScene === 'station') {
      // Station ambient sound
      const oscillator = audioContext.createOscillator()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
      
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
      oscillator.connect(gainNode)
      oscillator.start()
      oscillatorRef.current = oscillator
    }

    // Jerk sound effect
    if (journeyPhase === 'jerking') {
      const jerkOscillator = audioContext.createOscillator()
      jerkOscillator.type = 'square'
      jerkOscillator.frequency.setValueAtTime(50, audioContext.currentTime)
      
      const jerkGain = audioContext.createGain()
      jerkGain.gain.setValueAtTime(0.2, audioContext.currentTime)
      jerkGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)
      
      jerkOscillator.connect(jerkGain)
      jerkGain.connect(audioContext.destination)
      jerkOscillator.start()
      jerkOscillator.stop(audioContext.currentTime + 1)
    }

  }, [currentScene, journeyPhase])

  return null
}