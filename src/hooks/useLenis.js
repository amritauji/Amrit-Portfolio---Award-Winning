import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export const useLenis = () => {
  useEffect(() => {
    // Delay Lenis initialization to improve initial load
    const timer = setTimeout(() => {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
        normalizeWheel: true,
        wheelMultiplier: 1,
      })

      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
      lenis.start()

      // Store lenis instance for cleanup
      window.lenisInstance = lenis
    }, 100)

    return () => {
      clearTimeout(timer)
      if (window.lenisInstance) {
        window.lenisInstance.destroy()
        window.lenisInstance = null
      }
    }
  }, [])
}