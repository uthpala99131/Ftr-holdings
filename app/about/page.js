'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Sparkles, Target, Users, Zap } from 'lucide-react'

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const AboutPage = () => {
  const containerRef = useRef(null)
  const lineRef = useRef(null)

  // Foundational Pillars - FTR Holdings Philosophy
  const foundationalPillars = [
    {
      id: '01',
      icon: Sparkles,
      title: 'IDEATE',
      tagline: 'Spark the Vision',
      description: "Brainstroming and Researching CreativeSolutions that have Purpose and Potencial.",
      align: 'left'
    },
    {
      id: '02',
      icon: Target,
      title: 'INNOVATE',
      tagline: 'Push the Limits',
      description: "Transforming Concepts into Actionable Stratergies that Push Boundaries.",
      align: 'right'
    },
    {
      id: '03',
      icon: Users,
      title: 'build',
      tagline: 'Create the Future',
      description: "Building Brands, Stratergies, Websites, Apps, Digital Flatforms, Social Contents, Cinematic Videos, and Innovative Digital Solutions with Precisions and Agility.",
      align: 'left'
    },
    {
      id: '04',
      icon: Zap,
      title: 'scale ',
      tagline: 'Amplify the Impact',
      description: "Refining, Optimising, and Launching Projects to Achive Maximum Results.",
      align: 'right'
    }
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. HERO PARALLAX EFFECTS
      gsap.to('.hero-float-img', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // 2. THE SNAKE LINE DRAWING
      if (lineRef.current) {
        const pathLength = lineRef.current.getTotalLength()

        gsap.set(lineRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength })

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.pillars-section',
            start: 'top center',
            end: 'bottom bottom',
            scrub: 1,
          }
        })
      }

      // 3. REVEAL PILLAR STAGES
      foundationalPillars.forEach((pillar) => {
        gsap.from(`.pillar-content-${pillar.id}`, {
          y: 60,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: `.pillar-trigger-${pillar.id}`,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        })
      })

      // 4. FLOATING IMAGES ENTRANCE
      gsap.from('.hero-float-img', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out'
      })

      // 5. LEADERSHIP TEAM ENTRANCE
      gsap.from('.team-card', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.leadership-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-background min-h-screen overflow-x-hidden text-text selection:bg-primary selection:text-white">

      {/* --- SECTION 1: HERO WITH FLOATING IMAGES --- */}
      <section className="hero-section relative min-h-[90vh] flex flex-col items-center justify-center pt-20">

        {/* Floating Images - Different Alignments */}
        {/* Top Left - Portrait (visible on all screens, positioned at corner on mobile) */}
        <div className="hero-float-img absolute top-[8%] left-[3%] sm:top-[10%] md:left-[8%] lg:left-[12%] w-16 h-20 sm:w-20 sm:h-28 md:w-40 md:h-52 lg:w-48 lg:h-64 z-10 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=500&auto=format&fit=crop"
            alt="Team collaboration"
            fill
            className="object-cover hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent"></div>
        </div>

        {/* Top Right - Landscape (visible on all screens) */}
        <div className="hero-float-img absolute top-[8%] right-[3%] sm:top-[5%] md:right-[10%] lg:right-[15%] w-20 h-14 sm:w-24 sm:h-16 md:w-52 md:h-36 lg:w-64 lg:h-44 z-10 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=500&auto=format&fit=crop"
            alt="Modern workspace"
            fill
            className="object-cover hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"></div>
        </div>

        {/* Center Left - Square with border (tablet and desktop only) */}
        <div className="hero-float-img absolute top-[45%] left-[2%] md:left-[5%] w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 z-10 rounded-lg overflow-hidden border-4 border-primary shadow-xl hidden md:block">
          <Image
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format&fit=crop"
            alt="Strategic planning"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Bottom Right - Large (visible on all screens, positioned at bottom corner on mobile) */}
        <div className="hero-float-img absolute bottom-[8%] right-[3%] sm:bottom-[10%] md:bottom-[12%] md:right-[8%] lg:right-[10%] w-20 h-24 sm:w-24 sm:h-32 md:w-48 md:h-56 lg:w-56 lg:h-72 z-10 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=500&auto=format&fit=crop"
            alt="Team meeting"
            fill
            className="object-cover hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/40 to-transparent"></div>
        </div>

        {/* Center Right - Small accent (tablet and desktop only) */}
        <div className="hero-float-img absolute top-[55%] right-[18%] w-16 h-16 md:w-24 md:h-24 hidden md:block z-10 rounded-full overflow-hidden border-2 border-secondary shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=500&auto=format&fit=crop"
            alt="Innovation"
            fill
            className="object-cover"
          />
        </div>

        {/* Big Typography */}
        <div className="relative z-20 text-center">
          <p className="font-montserrat text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            Welcome to
          </p>
          <h1 className="font-ethnocentric text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] text-accent">
            FTR<br />GLOBAL
          </h1>
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="font-montserrat text-xs tracking-widest text-accent/60 uppercase">Est. 2025</span>
            <div className="w-12 h-[2px] bg-primary"></div>
          </div>
        </div>

        {/* Intro Text */}
        <div className="relative z-20 mt-10 max-w-2xl text-center px-6">
          <p className="font-open-sans text-base md:text-lg lg:text-xl leading-relaxed text-accent/70">
            We are a creative collective of <span className="text-primary font-bold">engineers</span>,
            <span className="text-primary font-bold"> Strategists</span>, and
            <span className="text-primary font-bold"> Storytellers</span> Creating Digital Experiences that drive the next Generation of Businesses.
          </p>
        </div>

        <div className="absolute bottom-8 animate-bounce text-primary">
          <ArrowDown className="w-6 h-6" />
        </div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #0A0A0A 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </section>


      {/* --- SECTION 2: FOUNDATIONAL PILLARS (Process Style) --- */}
      <section className="pillars-section relative py-24 md:py-32 overflow-hidden bg-secondary/30">

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 px-6">
          <p className="font-montserrat text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
            Our Philosophy
          </p>
          <h2 className="font-ethnocentric text-3xl md:text-4xl lg:text-5xl text-accent mb-6">
            FROM IDEA TO IMPACT
          </h2>
          <p className="font-open-sans text-accent/60 max-w-xl mx-auto text-sm md:text-base">
            The core values that Guide how we create, innovate and Deliver Digital Experiences.
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">

          {/* THE SVG PATH - Winding Line */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block"
            viewBox="0 0 1000 1400"
            preserveAspectRatio="none"
          >
            {/* Background Guide Line */}
            <path
              d="M 500 0 C 500 200, 150 280, 150 400 C 150 520, 850 600, 850 720 C 850 840, 150 920, 150 1040 C 150 1160, 500 1250, 500 1400"
              fill="none"
              stroke="#E5393520"
              strokeWidth="3"
            />

            {/* The Animated Primary Line */}
            <path
              ref={lineRef}
              d="M 500 0 C 500 200, 150 280, 150 400 C 150 520, 850 600, 850 720 C 850 840, 150 920, 150 1040 C 150 1160, 500 1250, 500 1400"
              fill="none"
              stroke="#E53935"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* Mobile Vertical Line Fallback */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20 md:hidden"></div>
          <div className="absolute left-6 top-0 w-0.5 bg-primary md:hidden" style={{ height: '50%' }}></div>


          {/* PILLAR STEPS */}
          <div className="relative z-10 flex flex-col gap-28 md:gap-36 px-6 md:px-0 pt-12">

            {foundationalPillars.map((pillar) => {
              const IconComponent = pillar.icon
              return (
                <div
                  key={pillar.id}
                  className={`pillar-trigger-${pillar.id} flex flex-col md:flex-row items-center w-full`}
                >
                  {/* Spacer for Left/Right alignment */}
                  <div className={`hidden md:block w-1/2 ${pillar.align === 'right' ? 'order-1' : 'order-2'}`}></div>

                  <div className={`w-full md:w-1/2 ${pillar.align === 'right' ? 'md:pl-16 lg:pl-20 order-2' : 'md:pr-16 lg:pr-20 md:text-right order-1'}`}>

                    {/* Pillar Content */}
                    <div className={`pillar-content-${pillar.id} relative pl-12 md:pl-0`}>
                      {/* Mobile Dot */}
                      <div className="absolute left-4 top-2 w-4 h-4 bg-primary rounded-full md:hidden transform -translate-x-1/2 shadow-lg shadow-primary/30"></div>

                      {/* Icon Badge */}
                      <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/10 mb-4 ${pillar.align === 'right' ? '' : 'md:ml-auto'}`}>
                        <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>

                      {/* Pillar Number */}
                      <span className={`font-montserrat text-primary text-xs tracking-[0.2em] uppercase block mb-2 ${pillar.align === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                        ● {pillar.tagline}
                      </span>

                      <h2 className="font-ethnocentric text-5xl md:text-6xl lg:text-7xl text-accent/10 mb-2">
                        {pillar.id}.
                      </h2>

                      <h3 className="font-ethnocentric text-xl md:text-2xl lg:text-3xl text-accent mb-4">
                        {pillar.title}
                      </h3>

                      <p className={`font-open-sans text-accent/60 text-base md:text-lg leading-relaxed max-w-md ${pillar.align === 'right' ? '' : 'md:ml-auto'}`}>
                        {pillar.description}
                      </p>
                    </div>
                  </div>

                </div>
              )
            })}

          </div>

        </div>
      </section>

      {/* --- SECTION 3: LEADERSHIP TEAM --- */}
      <section className="leadership-section py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <p className="font-montserrat text-xs md:text-sm tracking-[0.3em] uppercase text-primary mb-4 font-semibold">
              The Minds Behind FTR
            </p>
            <h2 className="font-ethnocentric text-3xl md:text-4xl lg:text-5xl text-accent mb-6">
              LEADERSHIP TEAM
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                name: "Uthpala Abeysinghe",
                role: "CEO & Founder",
                description: "Visionary Leader Driving Innovation and the Future Direction of the Company.",
                image: "/team/ceo1.png"
              },
              {
                name: "Gayan Harshana",
                role: "COO & Co-Founder",
                description: "Creative Stratergist Turning Bold Ideas Into Powerful Digital Experiences.",
                image: "/team/coo2.png"
              },
              {
                name: "Sahan Mewanthe",
                role: "CTO",
                description: "Technology Visionary Building the Systems that Power Innovation",
                image: "/team/cto1.png"

              }
            ].map((member, index) => (
              <div
                key={index}
                className="team-card group relative"
              >
                {/* Card Container */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 shadow-xl bg-secondary/20 border border-white/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                  {/* Social Badge (Decorative) */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <h3 className="font-ethnocentric text-lg md:text-xl text-accent group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="font-montserrat text-xs text-primary font-bold uppercase tracking-widest">
                    {member.role}
                  </p>
                  <p className="font-open-sans text-sm md:text-base text-accent/60 leading-relaxed pt-2">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Background Decorative Text */}
        <div className="absolute -bottom-10 -right-10 font-ethnocentric text-[15vw] text-accent/5 pointer-events-none select-none z-0">
          TEAM
        </div>
      </section>

      {/* --- SECTION 4: FOUNDER QUOTE --- */}
      <section className="py-20 md:py-32 bg-secondary/30 text-center px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #E53935 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-primary to-transparent"></div>

        <div className="max-w-4xl mx-auto relative">
          {/* Quote Card */}
          <div className="relative bg-background rounded-3xl p-8 md:p-12 lg:p-16 shadow-xl border border-secondary">
            {/* Gradient accent border */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 pointer-events-none"></div>

            {/* Logo */}
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 relative">
              <Image src="/logo.png" alt="FTR Holdings Logo" fill className="object-contain" />
            </div>

            {/* Large decorative quote mark */}
            <div className="absolute top-6 left-6 md:top-8 md:left-10 text-primary/10 font-serif text-7xl md:text-8xl leading-none pointer-events-none select-none">
              &ldquo;
            </div>
            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 text-primary/10 font-serif text-7xl md:text-8xl leading-none pointer-events-none select-none rotate-180">
              &ldquo;
            </div>

            {/* Quote text */}
            <p className="font-ethnocentric text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-accent mb-8 relative z-10 px-2 sm:px-4 md:px-8">
              &ldquo;WE DON&apos;T JUST CREATE. WE INNOVATE, BUILD, AND SHAPE THE FUTURE OF DIGITAL EXPERIENCE.&rdquo;
            </p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-primary"></div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-primary"></div>
            </div>

            {/* Attribution */}
            <p className="font-montserrat text-primary text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
              — FTR GLOBAL TEAM
            </p>
          </div>
        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent via-primary to-transparent"></div>
      </section>

    </div>
  )
}

export default AboutPage