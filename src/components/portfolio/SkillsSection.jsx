import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  
  const skills = [
    { 
      category: 'Programming', 
      icon: '💻', 
      skills: ['Java', 'Python', 'JavaScript', 'C++', 'TypeScript', 'SQL', 'DSA', 'OOP'],
      color: '#76b900',
      level: 90
    },
    { 
      category: 'AI/ML', 
      icon: '🤖', 
      skills: ['NLP', 'Voice Automation', 'Data Science', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Edge AI', 'Computer Vision', 'Generative AI'],
      color: '#4ecdc4',
      level: 75
    },
    { 
      category: 'Web Development', 
      icon: '🌐', 
      skills: ['React', 'FastAPI', 'Supabase', 'MongoDB', 'Next.js', 'Node.js', 'Tailwind CSS', 'REST APIs'],
      color: '#ff6b35',
      level: 85
    },
    { 
      category: 'DevOps/Cloud', 
      icon: '☁️', 
      skills: ['Docker', 'Git', 'Cloud Deploy', 'CI/CD', 'Kubernetes', 'AWS', 'Terraform', 'Monitoring', 'GitHub Actions'],
      color: '#9b59b6',
      level: 70
    }
  ]

  return (
    <section style={{
      minHeight: '100vh',
      padding: '100px 5%',
      position: 'relative',
      background: 'radial-gradient(ellipse at center, #111111 0%, #000000 100%)'
    }}>
      {/* Optimized tech particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="particle motion-element"
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: skills[i % skills.length].color,
            borderRadius: '50%',
            left: `${10 + (i * 6)}%`,
            top: `${10 + (i * 5)}%`,
            zIndex: 1,
            willChange: 'transform, opacity'
          }}
        />
      ))}

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '100px' }}
        >
          <motion.h2
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #ffffff, #76b900, #4ecdc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-2px',
              marginBottom: '20px'
            }}
          >
            ARSENAL
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '200px' }}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{
              height: '4px',
              background: 'linear-gradient(90deg, #76b900, #4ecdc4, #ff6b35)',
              margin: '0 auto',
              borderRadius: '2px'
            }}
          />
        </motion.div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px'
        }}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: `0 20px 40px ${skill.color}33`
              }}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '40px',
                borderRadius: '20px',
                border: `2px solid ${hoveredSkill === index ? skill.color : 'rgba(255,255,255,0.1)'}`,
                backdropFilter: 'blur(20px)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Animated background glow */}
              <motion.div
                animate={{
                  background: hoveredSkill === index ? [
                    `radial-gradient(circle at 20% 20%, ${skill.color}22 0%, transparent 50%)`,
                    `radial-gradient(circle at 80% 80%, ${skill.color}22 0%, transparent 50%)`
                  ] : 'transparent'
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: -1
                }}
              />

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                <motion.div
                  animate={{ 
                    rotate: hoveredSkill === index ? [0, 360] : 0,
                    scale: hoveredSkill === index ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 2, repeat: hoveredSkill === index ? Infinity : 0 }}
                  style={{
                    fontSize: '3rem',
                    marginRight: '20px',
                    filter: hoveredSkill === index ? `drop-shadow(0 0 15px ${skill.color})` : 'none'
                  }}
                >
                  {skill.icon}
                </motion.div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: hoveredSkill === index ? skill.color : '#ffffff',
                    fontSize: '1.8rem',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '700',
                    margin: 0,
                    transition: 'color 0.3s ease'
                  }}>
                    {skill.category}
                  </h3>
                  
                  {/* Skill level bar */}
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '3px',
                    marginTop: '10px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                  
                  <span style={{
                    color: skill.color,
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    marginTop: '5px',
                    display: 'block'
                  }}>
                    {skill.level}% Proficiency
                  </span>
                </div>
              </div>

              {/* Skills tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {skill.skills.map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: `${skill.color}44`
                    }}
                    transition={{ delay: i * 0.1 }}
                    style={{
                      background: `${skill.color}22`,
                      color: '#ffffff',
                      padding: '10px 16px',
                      borderRadius: '25px',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      fontFamily: 'Inter, sans-serif',
                      border: `1px solid ${skill.color}33`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>

              {/* Floating skill indicator */}
              <AnimatePresence>
                {hoveredSkill === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: skill.color,
                      color: '#000000',
                      padding: '8px 12px',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}
                  >
                    Expert
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            marginTop: '80px',
            textAlign: 'center'
          }}
        >
          {[
            { label: 'Technologies', value: '35+' },
            { label: 'Projects Built', value: '20+' },
            { label: 'Years Learning', value: '3+' },
            { label: 'Lines of Code', value: '50K+' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '30px 20px',
                borderRadius: '15px',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '900',
                  color: skills[i % skills.length].color,
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '10px'
                }}
              >
                {stat.value}
              </motion.div>
              <p style={{
                color: '#cccccc',
                fontSize: '1rem',
                margin: 0,
                fontFamily: 'Inter, sans-serif'
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}