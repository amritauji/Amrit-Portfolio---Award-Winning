import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLenis } from '../hooks/useLenis'
import Navbar from './Navbar'
import HeroSection from './portfolio/HeroSection'
import AboutSection from './portfolio/AboutSection'
import SkillsSection from './portfolio/SkillsSection'
import ProjectsSection from './portfolio/ProjectsSection'
import ExperienceSection from './portfolio/ExperienceSection'
import ContactSection from './portfolio/ContactSection'
import Footer from './portfolio/Footer'

export default function PortfolioSite({ currentScene }) {
  useLenis()
  
  useEffect(() => {
    console.log('PortfolioSite mounted, currentScene:', currentScene)
  }, [currentScene])

  console.log('PortfolioSite render check - currentScene:', currentScene)
  
  if (currentScene !== 'portfolio') {
    console.log('Not portfolio scene, returning null')
    return null
  }

  return (
    <div>
      <Navbar />
      <div id="hero"><HeroSection /></div>
      <div id="about"><AboutSection /></div>
      <div id="skills"><SkillsSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="timeline"><ExperienceSection /></div>
      <div id="contact"><ContactSection /></div>
      <Footer />
    </div>
  )
}