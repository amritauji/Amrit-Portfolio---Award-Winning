import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef()
  const { scrollYProgress } = useScroll({ container: containerRef })
  
  const projects = [
    {
      id: 0,
      title: "SkillSphere",
      subtitle: "AI-Powered Learning Platform",
      description: "Revolutionary mentorship platform connecting students with industry experts through intelligent matching algorithms and real-time collaboration tools.",
      longDescription: "SkillSphere transforms the way students connect with mentors by leveraging advanced AI algorithms to create perfect matches based on skills, interests, and career goals. The platform features real-time video calls, progress tracking, and personalized learning paths.",
      tech: ["React", "Supabase", "AI/ML", "WebRTC", "Node.js"],
      color: "#76b900",
      gradient: "linear-gradient(135deg, #76b900, #4ecdc4)",
      year: "2024",
      category: "SaaS Platform",
      status: "Live",
      metrics: { users: "500+", satisfaction: "95%", growth: "200%" },
      image: "🎓",
      github: "https://github.com/amritauji/careerfuse-ai"
    },
    {
      id: 1,
      title: "Voice Automation",
      subtitle: "NLP Processing System",
      description: "Advanced voice automation system for purchase orders with 98% accuracy in natural language processing and multi-language support.",
      longDescription: "This cutting-edge voice automation system processes complex purchase orders through advanced NLP models, supporting multiple languages and achieving industry-leading accuracy rates through custom-trained neural networks.",
      tech: ["Python", "FastAPI", "NLP", "TensorFlow", "Docker"],
      color: "#ff6b35",
      gradient: "linear-gradient(135deg, #ff6b35, #f7931e)",
      year: "2024",
      category: "AI System",
      status: "Completed",
      metrics: { accuracy: "98%", speed: "40% faster", languages: "12+" },
      image: "🎤",
      github: "https://github.com/amritauji/Voice-Based-Automation"
    },
    {
      id: 2,
      title: "QR Generator SaaS",
      subtitle: "Enterprise QR Solutions",
      description: "Scalable QR code generation platform with advanced analytics, logo embedding, and cloud integration for enterprise clients.",
      longDescription: "Enterprise-grade QR code generation platform featuring custom logo embedding, real-time analytics, bulk generation capabilities, and seamless cloud integration with 99.9% uptime guarantee.",
      tech: ["Python", "MongoDB", "Cloudinary", "Analytics", "AWS"],
      color: "#4ecdc4",
      gradient: "linear-gradient(135deg, #4ecdc4, #44a08d)",
      year: "2023",
      category: "Web Application",
      status: "Live",
      metrics: { generated: "10M+", uptime: "99.9%", clients: "50+" },
      image: "🔗",
      github: "https://github.com/amritauji/QR_GEN"
    },
    {
      id: 3,
      title: "IgnisAI",
      subtitle: "Real-Time Wildfire Detection",
      description: "IgnisAI is a prototype web app for detecting wildfires in real-time and providing rapid notifications using machine learning and satellite imagery.",
      longDescription: "IgnisAI provides a cutting-edge approach to wildfire detection by combining satellite imagery, machine learning, and real-time notifications to enhance early warning systems. Uses Random Forest classifier with NDVI, LST, and Burned Area metrics for accurate wildfire prediction.",
      tech: ["React", "Django", "TypeScript", "Random Forest", "ML"],
      color: "#e74c3c",
      gradient: "linear-gradient(135deg, #e74c3c, #c0392b)",
      year: "2024",
      category: "AI System",
      status: "Prototype",
      metrics: { accuracy: "92%", cities: "US Focus", alerts: "Real-time" },
      image: "🔥",
      github: "https://github.com/Puspa222/Fire-Detection"
    }
  ]

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleProjectChange = (index) => {
    if (index !== activeProject) {
      setActiveProject(index)
    }
  }

  return (
    <div ref={containerRef} style={{
      width: '100%',
      minHeight: '100vh',
      background: '#000000'
    }}>
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #000000, #1a1a2e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{
                width: '60px',
                height: '60px',
                border: '3px solid transparent',
                borderTop: '3px solid #76b900',
                borderRadius: '50%'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable Container */}
      <div
        style={{
          width: '100%'
        }}
      >
        {/* Hero Section */}
        <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
          {/* Animated Background */}
          <motion.div
            style={{
              y: backgroundY,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '120%',
              opacity: 0.1
            }}
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, #76b900 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, #ff6b35 0%, transparent 50%)',
                'radial-gradient(circle at 40% 60%, #4ecdc4 0%, transparent 50%)',
                'radial-gradient(circle at 60% 40%, #9b59b6 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Floating Elements */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                position: 'absolute',
                width: `${10 + Math.random() * 20}px`,
                height: `${10 + Math.random() * 20}px`,
                background: ['#76b900', '#ff6b35', '#4ecdc4', '#9b59b6'][i % 4],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3,
                borderRadius: i % 2 === 0 ? '50%' : '0'
              }}
            />
          ))}



          {/* Hero Content */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 10
          }}>
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                fontSize: 'clamp(4rem, 12vw, 12rem)',
                fontWeight: '900',
                background: 'linear-gradient(135deg, #ffffff, #76b900, #4ecdc4, #ff6b35)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-4px',
                lineHeight: '0.8',
                marginBottom: '30px'
              }}
            >
              PROJECTS
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                fontSize: '1.5rem',
                color: '#cccccc',
                fontFamily: 'Inter, sans-serif',
                maxWidth: '600px',
                margin: '0 auto 50px auto'
              }}
            >
              Innovative solutions that push the boundaries of technology
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('projects-grid').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  padding: '15px 30px',
                  background: 'linear-gradient(135deg, #76b900, #4ecdc4)',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '1rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Explore Work
              </motion.button>
              

            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#76b900',
              fontSize: '2rem',
              cursor: 'pointer'
            }}
            onClick={() => document.getElementById('projects-grid').scrollIntoView({ behavior: 'smooth' })}
          >
            ↓
          </motion.div>
        </section>

        {/* Projects Grid */}
        <section id="projects-grid" style={{ 
          minHeight: '200vh', 
          padding: '100px 5%',
          background: 'linear-gradient(180deg, #000000, #0a0a0a, #000000)'
        }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
            {/* Animated shapes behind text */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
                style={{
                  position: 'absolute',
                  width: `${30 + Math.random() * 40}px`,
                  height: `${30 + Math.random() * 40}px`,
                  background: ['#a8e6cf', '#88d8c0', '#76b900', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][i % 8],
                  left: `${10 + i * 12}%`,
                  top: `${-20 + Math.random() * 40}px`,
                  opacity: 0.6,
                  borderRadius: i % 2 === 0 ? '50%' : '8px',
                  zIndex: -1
                }}
              />
            ))}
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '900',
                background: 'linear-gradient(90deg, #a8e6cf, #88d8c0, #76b900, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #f38ba8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '-2px',
                position: 'relative',
                zIndex: 1
              }}
            >
              PROJECTS
            </motion.h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '80px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -20, scale: 1.02 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                onClick={() => handleProjectChange(index)}
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {/* Project Header */}
                <div style={{
                  height: '300px',
                  background: project.gradient,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {/* Animated Background */}
                  <motion.div
                    animate={{
                      background: [
                        `radial-gradient(circle at 20% 20%, ${project.color}44 0%, transparent 50%)`,
                        `radial-gradient(circle at 80% 80%, ${project.color}44 0%, transparent 50%)`,
                        `radial-gradient(circle at 50% 50%, ${project.color}44 0%, transparent 50%)`
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0.6
                    }}
                  />

                  {/* Floating Elements */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                      style={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        background: '#ffffff',
                        left: `${10 + i * 10}%`,
                        top: `${20 + i * 8}%`,
                        opacity: 0.3,
                        borderRadius: i % 2 === 0 ? '50%' : '0'
                      }}
                    />
                  ))}

                  {/* Project Icon */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      fontSize: '6rem',
                      filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.5))',
                      zIndex: 1
                    }}
                  >
                    {project.image}
                  </motion.div>

                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: project.status === 'Live' ? '#00ff00' : 
                               project.status === 'Current' ? '#ffaa00' : '#4ecdc4',
                    color: '#000',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {project.status}
                  </div>
                </div>

                {/* Project Content */}
                <div style={{ padding: '40px' }}>
                  <div style={{
                    color: project.color,
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    {project.category} • {project.year}
                  </div>

                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '2.5rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '900',
                    marginBottom: '10px',
                    lineHeight: '1.1'
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    color: project.color,
                    fontSize: '1.2rem',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '20px',
                    fontWeight: '600'
                  }}>
                    {project.subtitle}
                  </p>

                  <p style={{
                    color: '#cccccc',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.6',
                    marginBottom: '30px'
                  }}>
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '20px',
                    marginBottom: '30px'
                  }}>
                    {Object.entries(project.metrics).map(([key, value], i) => (
                      <div key={key} style={{ textAlign: 'center' }}>
                        <div style={{
                          color: project.color,
                          fontSize: '1.5rem',
                          fontWeight: '900',
                          marginBottom: '5px'
                        }}>
                          {value}
                        </div>
                        <div style={{
                          color: '#ffffff',
                          fontSize: '0.8rem',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '30px'
                  }}>
                    {project.tech.map((tech, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                          padding: '8px 16px',
                          background: `${project.color}22`,
                          color: project.color,
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: '600'
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '12px 24px',
                        background: project.color,
                        color: '#000000',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      View Live →
                    </motion.a>
                    
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        padding: '12px 24px',
                        background: 'transparent',
                        color: '#ffffff',
                        border: `2px solid ${project.color}33`,
                        borderRadius: '25px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      Github
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>


      </div>
    </div>
  )
}