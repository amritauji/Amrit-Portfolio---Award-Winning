import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-rotate timeline every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % experiences.length)
      }, 5000)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused])
  
  const handleTimelineClick = (index) => {
    setActiveIndex(index)
    setIsPaused(true)
    
    // Resume auto-rotation after 5 seconds
    setTimeout(() => {
      setIsPaused(false)
    }, 5000)
  }

  const experiences = [
    {
      year: '2022',
      title: 'Journey Begins',
      subtitle: 'B.Tech Start',
      description: 'Started CSE at MIT-ADT University, exploring tech fundamentals',
      color: '#9b59b6',
      icon: '🎓',
      gradient: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
      detailedContent: {
        achievements: ['Enrolled in Computer Science & Engineering', 'First programming language: Python', 'Built first web application', 'Joined coding communities'],
        skills: ['Python Basics', 'HTML/CSS', 'Problem Solving', 'Academic Excellence'],
        projects: ['Calculator App', 'Personal Website', 'Basic Games'],
        focus: 'Learning programming fundamentals and exploring different domains of computer science.'
      }
    },
    {
      year: '2023',
      title: 'Tech Foundation',
      subtitle: 'Deep Learning Phase',
      description: 'AI/ML exploration and first full-stack projects',
      color: '#4ecdc4',
      icon: '🔍',
      gradient: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
      detailedContent: {
        achievements: ['Completed Data Structures & Algorithms', 'Built responsive web applications', 'Learned React.js framework', 'Participated in hackathons'],
        skills: ['JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Git/GitHub'],
        projects: ['E-commerce Website', 'Task Management App', 'Weather Dashboard'],
        focus: 'Building strong technical foundation with modern web technologies and best practices.'
      }
    },
    {
      year: '2024',
      title: 'Innovation Breakthrough',
      subtitle: 'Major Projects & IP',
      description: 'SIH participation, SkillSphere creation, and Nexus Votenet copyright',
      color: '#ff6b35',
      icon: '🛠️',
      gradient: 'linear-gradient(135deg, #ff6b35, #f7931e)',
      detailedContent: {
        achievements: ['Smart India Hackathon participation', 'SkillSphere platform development', 'Nexus Votenet copyright registration', 'Advanced React projects'],
        skills: ['Python ML/AI', 'Advanced React', 'Three.js', 'Cloud Services', 'DevOps'],
        projects: ['SkillSphere Learning Platform', 'Nexus Votenet System', '3D Portfolio Website'],
        focus: 'Creating innovative solutions and securing intellectual property for groundbreaking projects.'
      }
    },
    {
      year: '2025',
      title: 'Career Ready',
      subtitle: 'Final Year Focus',
      description: 'Mastering placement skills and building innovative projects',
      color: '#76b900',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #76b900, #5a8f00)',
      detailedContent: {
        achievements: ['Graduation preparation', 'Industry internships', 'Professional certifications', 'Leadership roles'],
        skills: ['Full-Stack Development', 'AI/ML Engineering', 'Cloud Architecture', 'Team Leadership'],
        projects: ['Enterprise Applications', 'AI-Powered Solutions', 'Scalable Platforms'],
        focus: 'Ready to contribute to innovative tech companies and drive digital transformation initiatives.'
      }
    }
  ]

  return (
    <section style={{
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #111111 0%, #000000 100%)'
    }}>
      {/* Dynamic cursor trail */}
      <motion.div
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        style={{
          position: 'fixed',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${experiences[activeIndex].color}44, transparent)`,
          pointerEvents: 'none',
          zIndex: 9999,
          filter: 'blur(10px)'
        }}
      />

      {/* Floating timeline particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -50, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4
          }}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: experiences[i % experiences.length].color,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      <div className="mobile-padding tablet-padding" style={{ padding: 'clamp(20px, 5vw, 80px)' }}>
        {/* Massive title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ textAlign: 'center', marginBottom: '120px' }}
        >
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(4rem, 15vw, 15rem)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #76b900 25%, #4ecdc4 50%, #ff6b35 75%, #9b59b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-6px',
              lineHeight: '0.8'
            }}
          >
            JOURNEY
          </motion.h2>
        </motion.div>

        {/* Horizontal timeline */}
        <div style={{
          maxWidth: '1600px',
          margin: '0 auto',
          position: 'relative'
        }}>
          {/* Timeline line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              height: '4px',
              background: 'linear-gradient(90deg, #9b59b6, #4ecdc4, #ff6b35, #76b900)',
              borderRadius: '2px',
              marginBottom: '60px'
            }}
          />

          {/* Timeline items */}
          <div className="mobile-stack" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px',
            position: 'relative'
          }}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  y: -20,
                  scale: 1.05
                }}
                onClick={() => handleTimelineClick(index)}
                transition={{ delay: index * 0.2 }}
                style={{
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Timeline node */}
                <motion.div
                  animate={{
                    scale: activeIndex === index ? [1, 1.3, 1] : 1,
                    boxShadow: activeIndex === index ? 
                      `0 0 40px ${exp.color}` : 
                      `0 0 20px ${exp.color}77`
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: exp.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    margin: '0 auto 30px auto',
                    position: 'relative',
                    zIndex: 2
                  }}
                >
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 360 : 0 }}
                    transition={{ duration: 3, repeat: activeIndex === index ? Infinity : 0 }}
                  >
                    {exp.icon}
                  </motion.div>
                </motion.div>

                {/* Year label */}
                <motion.div
                  animate={{ 
                    color: activeIndex === index ? exp.color : '#ffffff',
                    scale: activeIndex === index ? 1.1 : 1
                  }}
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: '900',
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'center',
                    marginBottom: '15px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {exp.year}
                </motion.div>

                {/* Content card */}
                <motion.div
                  animate={{
                    background: activeIndex === index ? 
                      `linear-gradient(135deg, ${exp.color}22, transparent)` : 
                      'rgba(255,255,255,0.03)',
                    borderColor: activeIndex === index ? exp.color : 'rgba(255,255,255,0.1)'
                  }}
                  style={{
                    padding: '30px',
                    borderRadius: '20px',
                    border: '2px solid',
                    backdropFilter: 'blur(20px)',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Animated background accent */}
                  <motion.div
                    animate={{
                      opacity: activeIndex === index ? [0, 0.3, 0] : 0,
                      scale: activeIndex === index ? [0, 2, 0] : 0
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '100px',
                      height: '100px',
                      background: `radial-gradient(circle, ${exp.color}, transparent)`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: -1
                    }}
                  />

                  <h3 style={{
                    color: activeIndex === index ? exp.color : '#ffffff',
                    fontSize: '1.4rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    marginBottom: '8px',
                    transition: 'color 0.3s ease'
                  }}>
                    {exp.title}
                  </h3>

                  <p style={{
                    color: activeIndex === index ? exp.color : '#cccccc',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '500',
                    marginBottom: '15px',
                    opacity: 0.8,
                    transition: 'color 0.3s ease'
                  }}>
                    {exp.subtitle}
                  </p>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeIndex === index ? 'auto' : 0,
                      opacity: activeIndex === index ? 1 : 0
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '1.5'
                    }}>
                      {exp.description}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Active experience showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              style={{
                marginTop: '80px',
                padding: '60px',
                background: `linear-gradient(135deg, ${experiences[activeIndex].color}11, transparent)`,
                borderRadius: '30px',
                border: `2px solid ${experiences[activeIndex].color}33`,
                backdropFilter: 'blur(20px)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Animated background waves */}
              <motion.div
                animate={{
                  background: [
                    `radial-gradient(ellipse at 0% 0%, ${experiences[activeIndex].color}22 0%, transparent 50%)`,
                    `radial-gradient(ellipse at 100% 100%, ${experiences[activeIndex].color}22 0%, transparent 50%)`,
                    `radial-gradient(ellipse at 0% 100%, ${experiences[activeIndex].color}22 0%, transparent 50%)`,
                    `radial-gradient(ellipse at 100% 0%, ${experiences[activeIndex].color}22 0%, transparent 50%)`
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1
                }}
              />

              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{
                  fontSize: '5rem',
                  marginBottom: '30px',
                  filter: `drop-shadow(0 0 30px ${experiences[activeIndex].color})`
                }}
              >
                {experiences[activeIndex].icon}
              </motion.div>

              <h2 style={{
                color: experiences[activeIndex].color,
                fontSize: '3rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '900',
                marginBottom: '15px'
              }}>
                {experiences[activeIndex].year}
              </h2>

              <h3 style={{
                color: '#ffffff',
                fontSize: '2rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '700',
                marginBottom: '20px'
              }}>
                {experiences[activeIndex].title}
              </h3>

              <p style={{
                color: '#cccccc',
                fontSize: '1.2rem',
                fontFamily: 'Inter, sans-serif',
                maxWidth: '600px',
                margin: '0 auto 40px auto'
              }}>
                {experiences[activeIndex].description}
              </p>

              {/* Detailed content grid */}
              <div className="mobile-stack" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginTop: '40px',
                maxWidth: '1000px',
                margin: '40px auto 0 auto'
              }}>
                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    padding: '25px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: `1px solid ${experiences[activeIndex].color}33`
                  }}
                >
                  <h4 style={{
                    color: experiences[activeIndex].color,
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '15px'
                  }}>🏆 Key Achievements</h4>
                  <ul style={{
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    listStyle: 'none',
                    padding: 0
                  }}>
                    {experiences[activeIndex].detailedContent.achievements.map((achievement, i) => (
                      <li key={i} style={{ marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: experiences[activeIndex].color }}>•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    padding: '25px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: `1px solid ${experiences[activeIndex].color}33`
                  }}
                >
                  <h4 style={{
                    color: experiences[activeIndex].color,
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '15px'
                  }}>⚡ Technical Skills</h4>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {experiences[activeIndex].detailedContent.skills.map((skill, i) => (
                      <span key={i} style={{
                        padding: '6px 12px',
                        background: `${experiences[activeIndex].color}22`,
                        color: experiences[activeIndex].color,
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Projects */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  style={{
                    padding: '25px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: `1px solid ${experiences[activeIndex].color}33`
                  }}
                >
                  <h4 style={{
                    color: experiences[activeIndex].color,
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '15px'
                  }}>🚀 Notable Projects</h4>
                  <ul style={{
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    listStyle: 'none',
                    padding: 0
                  }}>
                    {experiences[activeIndex].detailedContent.projects.map((project, i) => (
                      <li key={i} style={{ marginBottom: '8px', paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: experiences[activeIndex].color }}>•</span>
                        {project}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Focus */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  style={{
                    padding: '25px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    border: `1px solid ${experiences[activeIndex].color}33`
                  }}
                >
                  <h4 style={{
                    color: experiences[activeIndex].color,
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    marginBottom: '15px'
                  }}>🎯 Primary Focus</h4>
                  <p style={{
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {experiences[activeIndex].detailedContent.focus}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginTop: '60px'
            }}
          >
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                onClick={() => handleTimelineClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  background: activeIndex === index ? exp.color : 'rgba(255,255,255,0.2)',
                  width: activeIndex === index ? '40px' : '15px'
                }}
                style={{
                  height: '15px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-stack {
            grid-template-columns: 1fr !important;
          }
          .mobile-padding {
            padding: 20px !important;
          }
        }
        @media (max-width: 480px) {
          .mobile-stack {
            gap: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}