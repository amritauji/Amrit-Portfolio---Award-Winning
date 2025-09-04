import React from 'react'

export default function AudioClickPrompt({ onEnable }) {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 20, 40, 0.9)',
      border: '2px solid #00ffff',
      borderRadius: '15px',
      padding: '30px',
      textAlign: 'center',
      color: '#00ffff',
      fontFamily: 'Courier New',
      zIndex: 2000,
      boxShadow: '0 0 30px rgba(0,255,255,0.5)'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '20px' }}>
        🎵 AUDIO SYSTEMS READY
      </div>
      <div style={{ fontSize: '16px', marginBottom: '25px', color: '#ffffff' }}>
        Click to enable immersive space audio
      </div>
      <button
        onClick={onEnable}
        style={{
          background: 'linear-gradient(45deg, #004444, #008888)',
          color: '#00ffff',
          border: '2px solid #00ffff',
          padding: '15px 30px',
          fontSize: '18px',
          fontFamily: 'Courier New',
          cursor: 'pointer',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(0,255,255,0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.boxShadow = '0 0 30px rgba(0,255,255,0.6)'
          e.target.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.target.style.boxShadow = '0 0 20px rgba(0,255,255,0.3)'
          e.target.style.transform = 'scale(1)'
        }}
      >
        🚀 LAUNCH EXPERIENCE
      </button>
    </div>
  )
}