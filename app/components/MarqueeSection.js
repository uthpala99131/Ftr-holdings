'use client'
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PartnersSection = () => {
  const sectionRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)
  const tween1Ref = useRef(null)
  const tween2Ref = useRef(null)

  const row1Partners = [
    { logo: '/ABL1.jpg' },
    { logo: '/DL1.jpg' },
    { logo: '/KBA.png' },
    { logo: '/LFLOGO.jpg' },
    { logo: '/MPLOGO.png' },
    { logo: '/VSH.jpg' },
    { logo: '/UNI.png'},
    { logo: '/VW.jpg' },
    { logo: '/liyo.jpeg'},
    { logo: '/WIN.png' }
  ]

  const row2Partners = [
    { logo: '/YSl.jpg' },
    { logo: '/gob.jpg' },
    { logo: '/snl.jpg' },
    { logo: '/suhada.jpeg' },
    { logo: '/swl.jpg' },
    { logo: '/vidu.jpg' },
    { logo: '/SNP.png'},
    { logo: '/vira.jpg' },
    { logo: '/sp.png' },
    { logo: '/yel.jpg' },
    { logo: '/HP.png'}

    
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.from('.partner-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      // Row 1 (Moving Left)
      if (row1Ref.current) {
        tween1Ref.current = gsap.to(row1Ref.current, {
          x: '-50%',
          duration: 40, // Slightly slower for better readability of big logos
          ease: 'none', // 'none' is smoother than 'linear' in modern GSAP
          repeat: -1,
        })
      }

      // Row 2 (Moving Right)
      if (row2Ref.current) {
        tween2Ref.current = gsap.to(row2Ref.current, {
          x: '0%',
          startAt: { x: '-50%' },
          duration: 40,
          ease: 'none',
          repeat: -1,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-background"
      style={{
        borderTop: '1px solid rgba(26,26,26,0.05)',
        borderBottom: '1px solid rgba(26,26,26,0.05)'
      }}
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-20 text-center px-4">
        <h3 className="partner-header font-montserrat font-bold tracking-[0.3em] mb-4 text-xs md:text-sm uppercase text-primary">
          OUR ECOSYSTEM
        </h3>

        <h2 className="partner-header font-ethnocentric text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight text-accent">
          TRUSTED BY <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-800">
            INDUSTRY LEADERS
          </span>
        </h2>
        
        <p className="partner-header font-open-sans text-accent/60 max-w-2xl mx-auto text-sm md:text-lg">
          Powering the digital infrastructure for top-tier brands across the globe.
        </p>
      </div>

      {/* MARQUEE CONTAINER */}
      <div className="relative w-full overflow-hidden flex flex-col gap-12 md:gap-20">
        
        {/* Gradient Overlays (Reduced width to show more logos) */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-40 z-20 pointer-events-none bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-40 z-20 pointer-events-none bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 (scrolls left) */}
        <div 
          className="overflow-visible cursor-grab active:cursor-grabbing"
          onMouseEnter={() => tween1Ref.current?.pause()}
          onMouseLeave={() => tween1Ref.current?.play()}
        >
          <div ref={row1Ref} className="flex items-center w-max">
            {/* Render list twice for seamless infinite scroll */}
            {[...row1Partners, ...row1Partners].map((partner, index) => (
              <div
                key={`row1-${index}`}
                className="group relative flex items-center justify-center px-8 md:px-16"
              >
                {/* Massive scale containers */}
                <div className="relative w-32 h-16 sm:w-48 sm:h-24 md:w-64 md:h-32 transition-all duration-500">
                  <Image
                    src={partner.logo}
                    alt={`Client Partner ${index}`}
                    fill
                    sizes="(max-width: 768px) 128px, 256px"
                    // mix-blend-multiply hides the white background of JPGs
                    className="object-contain mix-blend-multiply grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    priority={index < 4}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 (scrolls right) */}
        <div 
          className="overflow-visible cursor-grab active:cursor-grabbing"
          onMouseEnter={() => tween2Ref.current?.pause()}
          onMouseLeave={() => tween2Ref.current?.play()}
        >
          <div ref={row2Ref} className="flex items-center w-max">
            {[...row2Partners, ...row2Partners].map((partner, index) => (
              <div
                key={`row2-${index}`}
                className="group relative flex items-center justify-center px-8 md:px-16"
              >
                <div className="relative w-32 h-16 sm:w-48 sm:h-24 md:w-64 md:h-32 transition-all duration-500">
                  <Image
                    src={partner.logo}
                    alt={`Client Partner ${index}`}
                    fill
                    sizes="(max-width: 768px) 128px, 256px"
                    className="object-contain mix-blend-multiply grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    priority={index < 4}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default PartnersSection