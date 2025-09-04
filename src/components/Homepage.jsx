import React from 'react'

export default function Homepage({ currentScene }) {
  if (currentScene !== 'homepage') return null

  return (
    <animated.div style={{
      ...fadeIn,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      color: '#ffffff',
      fontFamily: 'Courier New, monospace',
      overflow: 'auto',
      zIndex: 100
    }}>
      {/* Header */}
      <header style={{
        padding: '20px',
        textAlign: 'center',
        borderBottom: '2px solid #00ffff'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: '#00ffff',
          textShadow: '0 0 20px rgba(0,255,255,0.5)',
          margin: 0
        }}>
          AMRIT AUJI
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#ffffff', margin: '10px 0' }}>
          Space Engineer & Full Stack Developer
        </p>
      </header>

      {/* About Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          color: '#00ffff',
          borderLeft: '4px solid #00ffff',
          paddingLeft: '20px',
          marginBottom: '30px'
        }}>
          About Me
        </h2>
        <div style={{ 
          background: 'rgba(0,255,255,0.1)', 
          padding: '30px', 
          borderRadius: '10px',
          border: '1px solid rgba(0,255,255,0.3)'
        }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
            Welcome to my digital space station! I'm a passionate developer exploring the frontiers of 
            technology, specializing in AI, edge computing, and innovative web solutions. 
            My mission is to build applications that push the boundaries of what's possible.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          color: '#00ffff',
          borderLeft: '4px solid #00ffff',
          paddingLeft: '20px',
          marginBottom: '30px'
        }}>
          Technical Arsenal
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {[
            { category: 'Frontend', skills: ['React', 'Three.js', 'JavaScript', 'HTML/CSS'] },
            { category: 'Backend', skills: ['Python', 'FastAPI', 'Java', 'Node.js'] },
            { category: 'AI & Data', skills: ['Machine Learning', 'Edge Computing', 'Data Analysis'] },
            { category: 'Tools', skills: ['Git', 'Docker', 'Cloud Platforms', 'SaaS Development'] }
          ].map((skillGroup, index) => (
            <div key={index} style={{
              background: 'rgba(0,255,255,0.1)',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid rgba(0,255,255,0.3)'
            }}>
              <h3 style={{ color: '#00ffff', marginBottom: '15px' }}>{skillGroup.category}</h3>
              {skillGroup.skills.map((skill, i) => (
                <div key={i} style={{
                  background: 'rgba(0,255,255,0.2)',
                  padding: '8px 12px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  fontSize: '0.9rem'
                }}>
                  {skill}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          color: '#00ffff',
          borderLeft: '4px solid #00ffff',
          paddingLeft: '20px',
          marginBottom: '30px'
        }}>
          Mission Portfolio
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            { name: 'QR Code Generator', desc: 'Dynamic QR code generation system', tech: 'Python, FastAPI' },
            { name: 'Voice Automation', desc: 'AI-powered voice control system', tech: 'Python, ML' },
            { name: 'SkillSphere Platform', desc: 'Comprehensive learning management system', tech: 'React, Node.js' },
            { name: 'Space Portfolio', desc: 'Immersive 3D portfolio experience', tech: 'React, Three.js' }
          ].map((project, index) => (
            <div key={index} style={{
              background: 'rgba(0,255,255,0.1)',
              padding: '25px',
              borderRadius: '10px',
              border: '1px solid rgba(0,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0,255,255,0.2)'
              e.target.style.transform = 'translateY(-5px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0,255,255,0.1)'
              e.target.style.transform = 'translateY(0)'
            }}>
              <h3 style={{ color: '#00ffff', marginBottom: '10px' }}>🚀 {project.name}</h3>
              <p style={{ marginBottom: '15px', lineHeight: '1.5' }}>{project.desc}</p>
              <div style={{
                background: 'rgba(0,255,255,0.3)',
                padding: '5px 10px',
                borderRadius: '15px',
                fontSize: '0.8rem',
                display: 'inline-block'
              }}>
                {project.tech}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          color: '#00ffff',
          borderLeft: '4px solid #00ffff',
          paddingLeft: '20px',
          marginBottom: '30px'
        }}>
          Communication Array
        </h2>
        <div style={{
          background: 'rgba(0,255,255,0.1)',
          padding: '30px',
          borderRadius: '10px',
          border: '1px solid rgba(0,255,255,0.3)',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
            Ready to collaborate on the next big mission?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <a href="mailto:amrit.auji@example.com" style={{
              color: '#00ffff',
              textDecoration: 'none',
              padding: '10px 20px',
              border: '2px solid #00ffff',
              borderRadius: '25px',
              transition: 'all 0.3s ease'
            }}>
              📧 Email
            </a>
            <a href="https://linkedin.com/in/amritauji" style={{
              color: '#00ffff',
              textDecoration: 'none',
              padding: '10px 20px',
              border: '2px solid #00ffff',
              borderRadius: '25px',
              transition: 'all 0.3s ease'
            }}>
              💼 LinkedIn
            </a>
            <a href="https://github.com/amritauji" style={{
              color: '#00ffff',
              textDecoration: 'none',
              padding: '10px 20px',
              border: '2px solid #00ffff',
              borderRadius: '25px',
              transition: 'all 0.3s ease'
            }}>
              🐙 GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '30px 20px',
        textAlign: 'center',
        borderTop: '2px solid #00ffff',
        marginTop: '40px'
      }}>
        <p style={{ margin: 0, opacity: 0.7 }}>
          © 2024 Amrit Auji - Exploring the Digital Universe
        </p>
      </footer>
    </animated.div>
  )
}