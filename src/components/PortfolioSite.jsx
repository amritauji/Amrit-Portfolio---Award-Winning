import React, { useEffect, Suspense, lazy } from 'react'
import { useLenis } from '../hooks/useLenis'
import Navbar from './Navbar'
import HeroSection from './portfolio/HeroSection'

// Lazy load heavy sections
const AboutSection = lazy(() => import('./portfolio/AboutSection'))
const SkillsSection = lazy(() => import('./portfolio/SkillsSection'))
const ProjectsPage = lazy(() => import('./ProjectsPage'))
const ExperienceSection = lazy(() => import('./portfolio/ExperienceSection'))
const ContactSection = lazy(() => import('./portfolio/ContactSection'))
const Footer = lazy(() => import('./portfolio/Footer'))

// Lightweight section fallback
const SectionFallback = () => (
  <div style={{
    minHeight: '50vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#76b900',
    fontSize: '1rem',
    fontFamily: 'Inter, sans-serif'
  }}>
    Loading section...
  </div>
)

export default function PortfolioSite() {
  useLenis()

  return (
    <div>
      <Navbar />
      <section id="hero"><HeroSection /></section>
      <Suspense fallback={<SectionFallback />}>
        <section id="about"><AboutSection /></section>
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <section id="skills"><SkillsSection /></section>
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <section id="projects"><ProjectsPage /></section>
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <section id="timeline"><ExperienceSection /></section>
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <section id="contact"><ContactSection /></section>
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  )
}