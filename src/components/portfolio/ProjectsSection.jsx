import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(0)
  
  // Auto-rotate projects every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject(prev => (prev + 1) % projects.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  // Activate projects on scroll
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('projects')
      if (section) {
        const rect = section.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0
        
        if (isVisible) {
          const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
          const newActiveProject = Math.floor(scrollProgress * projects.length)
          if (newActiveProject < projects.length) {
            setActiveProject(newActiveProject)
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const projects = [
    {
      title: 'SkillSphere',
      description: 'SaaS mentorship app connecting students with mentors. Supabase backend with complete website ready for launch.',
      tech: ['React', 'Supabase', 'JavaScript'],
      image: '🎓',
      status: 'Live',
      color: '#76b900',
      bgGradient: 'linear-gradient(135deg, #76b900, #4ecdc4)'
    },
    {
      title: 'AI Voice Automation',
      description: 'Multi-domain NLP-powered system for purchase orders with FastAPI backend and JavaScript frontend.',
      tech: ['Python', 'FastAPI', 'NLP', 'JavaScript'],
      image: '🎤',
      status: 'Completed',
      color: '#ff6b35',
      bgGradient: 'linear-gradient(135deg, #ff6b35, #f7931e)'
    },
    {
      title: 'QR Code Generator SaaS',
      description: 'Advanced QR generator with logo embedding, scan tracking, Cloudinary & MongoDB integration.',
      tech: ['Python', 'MongoDB', 'Cloudinary'],
      image: '🔗',
      status: 'Live',
      color: '#4ecdc4',
      bgGradient: 'linear-gradient(135deg, #4ecdc4, #44a08d)'
    },
    {
      title: 'Galaxy Portfolio',
      description: 'This immersive 3D space portfolio with cinematic animations and interactive elements.',
      tech: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
      image: '🌌',
      status: 'Current',
      color: '#9b59b6',
      bgGradient: 'linear-gradient(135deg, #9b59b6, #8e44ad)'
    }
  ]

  return (
    <section className="section" style={{
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      background: '#000000'
    }}>
      {/* Dynamic background based on active project */}
      <motion.div
        animate={{ 
          background: projects[activeProject].bgGradient,
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      />

      <div style={{ padding: '5% 5%' }}>
        {/* Creative title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ marginBottom: '80px', textAlign: 'center' }}
        >
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff, #76b900, #4ecdc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-3px',
              lineHeight: '0.9',
              marginBottom: '20px'
            }}
          >
            MISSION
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              height: '4px',
              background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35)',
              margin: '0 auto'
            }}
          />
        </motion.div>

        {/* Project showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '60px',
          alignItems: 'center',
          minHeight: '70vh'
        }}>
          
          {/* Left side - Project list */}
          <div>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                onClick={() => setActiveProject(index)}
                whileHover={{ x: 20, scale: 1.02 }}
                style={{
                  padding: '30px',
                  marginBottom: '20px',
                  background: activeProject === index ? 
                    `${project.color}22` : 'rgba(255,255,255,0.03)',
                  border: `2px solid ${activeProject === index ? project.color : 'transparent'}`,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <motion.div
                    animate={{ 
                      rotate: activeProject === index ? [0, 360] : 0,
                      scale: activeProject === index ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 2, repeat: activeProject === index ? Infinity : 0 }}
                    style={{ 
                      fontSize: '2rem', 
                      marginRight: '20px',
                      filter: activeProject === index ? `drop-shadow(0 0 10px ${project.color})` : 'none'
                    }}
                  >
                    {project.image}
                  </motion.div>
                  <div>
                    <h3 style={{
                      color: activeProject === index ? project.color : '#ffffff',
                      fontSize: '1.5rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '700',
                      margin: 0,
                      transition: 'color 0.3s ease'
                    }}>
                      {project.title}
                    </h3>
                    <div style={{
                      background: project.status === 'Live' ? '#00ff00' : 
                                 project.status === 'Current' ? '#ffaa00' : '#4ecdc4',
                      color: '#000',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      display: 'inline-block',
                      marginTop: '8px',
                      textTransform: 'uppercase'
                    }}>
                      {project.status}
                    </div>
                  </div>
                </div>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: activeProject === index ? 'auto' : 0,
                    opacity: activeProject === index ? 1 : 0
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{
                    color: '#cccccc',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '15px'
                  }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        style={{
                          background: `${project.color}33`,
                          color: project.color,
                          padding: '4px 12px',
                          borderRadius: '15px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Active project showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: 'relative',
                height: '500px',
                borderRadius: '30px',
                overflow: 'hidden',
                background: projects[activeProject].bgGradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Animated mesh background */}
              <motion.div
                animate={{
                  background: [
                    `radial-gradient(circle at 20% 20%, ${projects[activeProject].color}44 0%, transparent 50%)`,
                    `radial-gradient(circle at 80% 80%, ${projects[activeProject].color}44 0%, transparent 50%)`,
                    `radial-gradient(circle at 50% 50%, ${projects[activeProject].color}44 0%, transparent 50%)`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0.6
                }}
              />

              {/* Floating geometric shapes */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  style={{
                    position: 'absolute',
                    width: `${15 + Math.random() * 25}px`,
                    height: `${15 + Math.random() * 25}px`,
                    background: projects[activeProject].color,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    opacity: 0.3,
                    borderRadius: i % 2 === 0 ? '50%' : '0'
                  }}
                />
              ))}

              {/* Central project icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  fontSize: '8rem',
                  filter: `drop-shadow(0 0 30px ${projects[activeProject].color})`,
                  zIndex: 1
                }}
              >
                {projects[activeProject].image}
              </motion.div>

              {/* Project title overlay */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  right: '30px',
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(20px)',
                  padding: '20px',
                  borderRadius: '15px',
                  border: `1px solid ${projects[activeProject].color}33`
                }}
              >
                <h3 style={{
                  color: '#ffffff',
                  fontSize: '1.8rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '700',
                  margin: '0 0 10px 0'
                }}>
                  {projects[activeProject].title}
                </h3>
                <p style={{
                  color: '#cccccc',
                  fontSize: '0.9rem',
                  margin: 0,
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {projects[activeProject].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Project navigation dots */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            marginTop: '60px'
          }}
        >
          {projects.map((project, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveProject(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: activeProject === index ? '40px' : '15px',
                height: '15px',
                borderRadius: '10px',
                background: activeProject === index ? project.color : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}