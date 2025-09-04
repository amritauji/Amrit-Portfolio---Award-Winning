import React from 'react'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section className="section" style={{
      minHeight: '100vh',
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Diagonal split background */}
      <motion.div
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
        whileInView={{ clipPath: 'polygon(0 0, 60% 0, 40% 100%, 0 100%)' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #76b900, #4ecdc4)',
          opacity: 0.1,
          zIndex: -1
        }}
      />
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        minHeight: '100vh',
        alignItems: 'center'
      }}>
        
        {/* Left side - Interactive photo area */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ 
            padding: '10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Floating elements around photo */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                background: i % 2 === 0 ? '#76b900' : '#4ecdc4',
                borderRadius: i % 3 === 0 ? '50%' : '0',
                left: `${20 + Math.cos(i * 45 * Math.PI / 180) * 150}px`,
                top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 150}px`,
                opacity: 0.6
              }}
            />
          ))}
          
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotateY: 15,
              boxShadow: '0 30px 60px rgba(118,185,0,0.3)'
            }}
            style={{
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, rgba(118,185,0,0.1), rgba(76,205,196,0.1))',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'conic-gradient(from 0deg, transparent, #76b900, transparent)',
                opacity: 0.3
              }}
            />
            
            <div style={{
              fontSize: '4rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #76b900, #4ecdc4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Inter, sans-serif',
              zIndex: 1
            }}>
              AN
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: '30px',
              textAlign: 'center'
            }}
          >
            <p style={{
              color: '#76b900',
              fontSize: '1.1rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              margin: 0
            }}>
              Amrit N. Auji
            </p>
            <p style={{
              color: '#cccccc',
              fontSize: '0.9rem',
              fontFamily: 'Inter, sans-serif',
              margin: '5px 0 0 0'
            }}>
              B.Tech CSE • AI Innovator
            </p>
          </motion.div>
        </motion.div>

        {/* Right side - Content with creative typography */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ padding: '10%' }}
        >
          <motion.div
            style={{ overflow: 'hidden', marginBottom: '40px' }}
          >
            <motion.h2
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: '900',
                color: '#ffffff',
                marginBottom: '20px',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.1',
                letterSpacing: '-1px'
              }}
            >
              About
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                height: '4px',
                background: 'linear-gradient(90deg, #76b900, #4ecdc4)',
                marginBottom: '30px'
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: '#cccccc',
              marginBottom: '40px',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            I'm a B.Tech Computer Science Engineering student passionate about AI, Edge Computing, 
            and building futuristic digital solutions. I love turning ideas into interactive, 
            impactful products and aspire to become a tech entrepreneur.
          </motion.p>

          {/* Animated highlights */}
          <div style={{ display: 'grid', gap: '20px' }}>
            {[
              { icon: '🎓', text: 'B.Tech CSE (Undergrad)', color: '#76b900' },
              { icon: '💡', text: 'AI, Edge Computing, Cloud & SaaS', color: '#4ecdc4' },
              { icon: '🚀', text: 'Building SkillSphere Platform', color: '#ff6b35' },
              { icon: '🎯', text: 'Financial Independence by 25', color: '#76b900' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${item.color}33`,
                  borderLeft: `4px solid ${item.color}`,
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '1.5rem', marginRight: '20px' }}>{item.icon}</span>
                <span style={{ 
                  color: '#ffffff', 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '500'
                }}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: '40px',
              padding: '30px',
              background: 'linear-gradient(135deg, rgba(118,185,0,0.1), rgba(76,205,196,0.1))',
              borderRadius: '20px',
              border: '1px solid rgba(118,185,0,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #76b900, transparent)'
              }}
            />
            <p style={{
              fontSize: '1.1rem',
              color: '#76b900',
              fontStyle: 'italic',
              margin: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: '500'
            }}>
              "Building the future, one innovation at a time."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}