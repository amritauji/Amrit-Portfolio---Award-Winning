import React from 'react'

export default function UI({ currentScene, setCurrentScene }) {
  const sceneNames = {
    intro: 'Galaxy Exploration',
    journey: 'Approaching Station',
    station: 'Docking Sequence',
    portfolio: 'Station Interior'
  }

  return (
    <>
      {/* Scene Info */}
      <div className="ui-overlay">
        <div style={{ marginBottom: '10px' }}>
          <strong>Current Phase:</strong> {sceneNames[currentScene]}
        </div>
        <div style={{ fontSize: '12px', opacity: 0.7 }}>
          {currentScene === 'intro' && 'Initializing journey through space...'}
          {currentScene === 'journey' && 'Spaceship en route to station...'}
          {currentScene === 'station' && 'Preparing to dock...'}
          {currentScene === 'portfolio' && 'Welcome aboard! Explore the rooms.'}
        </div>
      </div>

      {/* Navigation Controls */}
      {currentScene === 'portfolio' && (
        <div className="navigation">
          <button 
            className="nav-btn"
            onClick={() => setCurrentScene('intro')}
          >
            🚀 Restart Journey
          </button>
          <button 
            className="nav-btn"
            onClick={() => window.open('mailto:amrit.auji@example.com')}
          >
            📧 Contact
          </button>
          <button 
            className="nav-btn"
            onClick={() => window.open('https://github.com/amritauji', '_blank')}
          >
            🐙 GitHub
          </button>
        </div>
      )}

      {/* Skip Button for Intro */}
      {(currentScene === 'intro' || currentScene === 'journey') && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 100
        }}>
          <button 
            className="nav-btn"
            onClick={() => setCurrentScene('portfolio')}
          >
            Skip to Portfolio →
          </button>
        </div>
      )}
    </>
  )
}