import React, { useState, useEffect, Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'
import PerformanceOptimizer from './components/PerformanceOptimizer'

// Lazy load the main portfolio site
const PortfolioSite = React.lazy(() => import('./components/PortfolioSite'))

// Simple fallback component
const PortfolioFallback = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #000000, #1a1a2e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#76b900',
    fontSize: '1.2rem',
    fontFamily: 'Inter, sans-serif'
  }}>
    Initializing Portfolio...
  </div>
)

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingEl = document.getElementById('loading')
    if (loadingEl) loadingEl.style.display = 'none'
  }, [])

  return (
    <>
      <PerformanceOptimizer />
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <Suspense fallback={<PortfolioFallback />}>
          <PortfolioSite />
        </Suspense>
      )}
    </>
  )
}