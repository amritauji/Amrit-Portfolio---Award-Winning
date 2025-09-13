import React, { useState, useEffect, Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'
import PerformanceOptimizer from './components/PerformanceOptimizer'

// Lazy load the main portfolio site
const PortfolioSite = React.lazy(() => import('./components/PortfolioSite'))



export default function App() {
  const [isLoading, setIsLoading] = useState(true)



  return (
    <>
      <PerformanceOptimizer />
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <Suspense fallback={null}>
          <PortfolioSite />
        </Suspense>
      )}
    </>
  )
}