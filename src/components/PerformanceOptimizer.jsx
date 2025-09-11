import { useEffect } from 'react'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical images
    const preloadImages = ['/amrit-photo.png']
    
    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Optimize animations for low-end devices
    const isLowEndDevice = () => {
      return navigator.hardwareConcurrency <= 4 || 
             navigator.deviceMemory <= 4 ||
             /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }

    if (isLowEndDevice()) {
      document.documentElement.style.setProperty('--animation-duration', '0.5s')
      document.documentElement.style.setProperty('--reduced-motion', 'reduce')
    }

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.1s')
      document.documentElement.style.setProperty('--reduced-motion', 'reduce')
    }

    // Cleanup unused resources
    const cleanup = () => {
      // Force garbage collection if available
      if (window.gc) {
        window.gc()
      }
    }

    // Cleanup on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cleanup()
      }
    })

    return cleanup
  }, [])

  return null
}