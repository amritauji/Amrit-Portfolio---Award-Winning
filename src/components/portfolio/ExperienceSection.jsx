import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  const experiences = [
    {
      year: '2024',
      title: 'Internship Preparation',
      company: 'Self-Directed Learning',
      period: '2024 - Present',
      description: 'Building projects and preparing for placements with focus on technical exposure and skill development',
      skills: ['DSA', 'System Design', 'Project Building'],
      color: '#76b900',
      icon: '🎯',
      achievement: 'Multiple Projects Completed'
    },
    {
      year: '2024',
      title: 'Gen AI Exchange Hackathon',
      company: 'Hackathon Participant',
      period: '2024',
      description: 'Participated in AI-focused hackathon, developing innovative solutions using generative AI',
      skills: ['AI/ML', 'Python', 'Innovation'],
      color: '#ff6b35',
      icon: '🚀',
      achievement: 'AI Solution Developed'
    },
    {
      year: '2023',
      title: 'Data Science Course',
      company: 'Academic Project',
      period: '2023 - 2024',
      description: 'Completed comprehensive data science course with final assignment published on GitHub',
      skills: ['Data Science', 'Python', 'Analytics', 'GitHub'],
      color: '#4ecdc4',
      icon: '📊',
      achievement: 'Course Completed'
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.timeline-section')
      if (element) {
        const rect = element.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight))
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="section timeline-section" style={{
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at center, #111111 0%, #000000 100%)'
    }}>
      {/* Animated constellation background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#ffffff',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div style={{ padding: '5%' }}>
        {/* Creative title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ marginBottom: '100px', textAlign: 'center' }}
        >
          <motion.h2
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff 0%, #76b900 30%, #4ecdc4 60%, #ff6b35 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-4px',
              lineHeight: '0.8',
              marginBottom: '30px'
            }}
          >
            TIMELINE
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{
              height: '6px',
              width: '300px',
              background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35)',
              margin: '0 auto',
              borderRadius: '3px'
            }}
          />
        </motion.div>

        {/* Interactive timeline */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 100px 1fr',
          gap: '40px',
          alignItems: 'start',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          
          {/* Left side content */}
          <div style={{ textAlign: 'right' }}>
            <AnimatePresence>
              {experiences.map((exp, index) => (
                index % 2 === 0 && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ 
                      opacity: activeIndex === index ? 1 : 0.3,
                      x: activeIndex === index ? 0 : -50,
                      scale: activeIndex === index ? 1 : 0.9
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      marginBottom: '120px',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, x: -10 }}
                      style={{
                        background: activeIndex === index ? 
                          `linear-gradient(135deg, ${exp.color}22, transparent)` : 
                          'rgba(255,255,255,0.03)',
                        padding: '40px',
                        borderRadius: '25px',
                        border: `2px solid ${activeIndex === index ? exp.color : 'rgba(255,255,255,0.1)'}`,
                        backdropFilter: 'blur(20px)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <motion.div
                        animate={{ rotate: activeIndex === index ? [0, 360] : 0 }}
                        transition={{ duration: 3, repeat: activeIndex === index ? Infinity : 0 }}
                        style={{
                          fontSize: '3rem',
                          marginBottom: '20px',
                          filter: activeIndex === index ? `drop-shadow(0 0 20px ${exp.color})` : 'none'
                        }}
                      >
                        {exp.icon}
                      </motion.div>
                      
                      <h3 style={{
                        color: activeIndex === index ? exp.color : '#ffffff',
                        fontSize: '1.8rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '700',
                        marginBottom: '10px',
                        transition: 'color 0.3s ease'
                      }}>
                        {exp.title}
                      </h3>
                      
                      <p style={{
                        color: '#cccccc',
                        fontSize: '1rem',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '15px'
                      }}>
                        {exp.company}
                      </p>
                      
                      <div style={{
                        background: exp.color,
                        color: '#000',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '20px'
                      }}>
                        {exp.achievement}
                      </div>
                      
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
                          fontSize: '1rem',
                          lineHeight: '1.6',
                          marginBottom: '20px'
                        }}>
                          {exp.description}
                        </p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end' }}>
                          {exp.skills.map((skill, i) => (
                            <span
                              key={i}
                              style={{
                                background: `${exp.color}33`,
                                color: exp.color,
                                padding: '6px 12px',
                                borderRadius: '15px',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Center timeline */}
          <div style={{ position: 'relative', height: '100%' }}>
            {/* Main timeline line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                width: '4px',
                background: 'linear-gradient(to bottom, #76b900, #4ecdc4, #ff6b35)',
                transform: 'translateX(-50%)',
                borderRadius: '2px'
              }}
            />

            {/* Timeline nodes */}
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onClick={() => setActiveIndex(index)}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: `${index * 33.33}%`,
                  transform: 'translateX(-50%)',
                  cursor: 'pointer'
                }}
              >
                <motion.div
                  animate={{
                    scale: activeIndex === index ? [1, 1.3, 1] : 1,
                    boxShadow: activeIndex === index ? 
                      [`0 0 0 0 ${exp.color}`, `0 0 0 20px ${exp.color}00`] : 
                      `0 0 20px ${exp.color}77`
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: activeIndex === index ? Infinity : 0 
                  }}
                  style={{
                    width: '30px',
                    height: '30px',
                    background: exp.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '4px solid #000000'
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: '8px',
                      height: '8px',
                      background: '#ffffff',
                      borderRadius: '50%'
                    }}
                  />
                </motion.div>

                {/* Year label */}
                <motion.div
                  animate={{ 
                    color: activeIndex === index ? exp.color : '#ffffff',
                    scale: activeIndex === index ? 1.1 : 1
                  }}
                  style={{
                    position: 'absolute',
                    top: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {exp.year}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Right side content */}
          <div>
            <AnimatePresence>
              {experiences.map((exp, index) => (
                index % 2 === 1 && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ 
                      opacity: activeIndex === index ? 1 : 0.3,
                      x: activeIndex === index ? 0 : 50,
                      scale: activeIndex === index ? 1 : 0.9
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      marginBottom: '120px',
                      cursor: 'pointer'
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, x: 10 }}
                      style={{
                        background: activeIndex === index ? 
                          `linear-gradient(135deg, ${exp.color}22, transparent)` : 
                          'rgba(255,255,255,0.03)',
                        padding: '40px',
                        borderRadius: '25px',
                        border: `2px solid ${activeIndex === index ? exp.color : 'rgba(255,255,255,0.1)'}`,
                        backdropFilter: 'blur(20px)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <motion.div
                        animate={{ rotate: activeIndex === index ? [0, 360] : 0 }}
                        transition={{ duration: 3, repeat: activeIndex === index ? Infinity : 0 }}
                        style={{
                          fontSize: '3rem',
                          marginBottom: '20px',
                          filter: activeIndex === index ? `drop-shadow(0 0 20px ${exp.color})` : 'none'
                        }}
                      >
                        {exp.icon}
                      </motion.div>
                      
                      <h3 style={{
                        color: activeIndex === index ? exp.color : '#ffffff',
                        fontSize: '1.8rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '700',
                        marginBottom: '10px',
                        transition: 'color 0.3s ease'
                      }}>
                        {exp.title}
                      </h3>
                      
                      <p style={{
                        color: '#cccccc',
                        fontSize: '1rem',
                        fontFamily: 'Inter, sans-serif',
                        marginBottom: '15px'
                      }}>
                        {exp.company}
                      </p>
                      
                      <div style={{
                        background: exp.color,
                        color: '#000',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        display: 'inline-block',
                        marginBottom: '20px'
                      }}>
                        {exp.achievement}
                      </div>
                      
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
                          fontSize: '1rem',
                          lineHeight: '1.6',
                          marginBottom: '20px'
                        }}>
                          {exp.description}
                        </p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {exp.skills.map((skill, i) => (
                            <span
                              key={i}
                              style={{
                                background: `${exp.color}33`,
                                color: exp.color,
                                padding: '6px 12px',
                                borderRadius: '15px',
                                fontSize: '0.8rem',
                                fontWeight: '500'
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{
            position: 'fixed',
            right: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            zIndex: 100
          }}
        >
          {experiences.map((exp, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: activeIndex === index ? '20px' : '12px',
                height: activeIndex === index ? '20px' : '12px',
                borderRadius: '50%',
                background: activeIndex === index ? exp.color : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeIndex === index ? `0 0 15px ${exp.color}` : 'none'
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}