'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Import all section components
import HeroSection from './components/HeroSection'
import ServicesMarquee from './components/ServicesMarquee'
import AboutSection from './components/AboutSection'
import MarqueeSection from './components/MarqueeSection'
import ServicesSection from './components/ServicesSection'
import CTASection from './components/CTASection'

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

const Page = () => {
  const mainRef = useRef(null)

  useEffect(() => {
    // Set GSAP config for better performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    })

    const ctx = gsap.context(() => {
      // Simplified scroll progress animation
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Reduced scrub for smoother performance
        },
      })

      // Optimize ScrollTrigger for performance
      ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 150, // Reduce update frequency
      })
    }, mainRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={mainRef} className="bg-background min-h-screen overflow-x-hidden">
      {/* Performance & Scrollbar Styles */}
      <style jsx global>{`
        html {
          overflow-x: hidden;
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        /* Hide scrollbar but allow scrolling */
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        
        /* Performance optimizations */
        .page-section {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Smooth GPU acceleration */
        section {
          transform: translateZ(0);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100]">
        <div
          className="scroll-progress h-full bg-gradient-to-r from-primary via-red-400 to-primary origin-left"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />
      </div>

      {/* Page Sections - Removed wrapper divs for better performance */}
      <HeroSection />
      <ServicesMarquee />
      <AboutSection />
      <MarqueeSection />
      <ServicesSection />
      <CTASection />
    </div>
  )
}

export default Page