'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Award, Users, Zap, Target, TrendingUp, Shield } from 'lucide-react'

// Register GSAP Plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ServicesPage = () => {
  const containerRef = useRef(null)

  // Service Data with slugs for routing
  const services = [
    {
      id: '01',
      slug: 'digital-marketing',
      title: 'DIGITAL MARKETING',
      description: "We do not just post content; we engineer viral growth. From SEO to Social Media Management, we turn strangers into loyal customers.",
      features: ['Social Media Management (SMM)', 'Analytics & Strategy Creation', 'Paid Ad Campaigns', 'Influencer & content Marketing', 'Lead Generation & CRO'],
      image: "/SDM1.webp",
    },
    {
      id: '02',
      slug: 'web-development',
      title: 'WEB DEVELOPMENT',
      description: 'High-performance websites built on Next.js. We build digital infrastructures that are fast, secure, and scalable.',
      features: ['Web Development', 'E-Commerce Solutions', 'Custom IT Solutions', 'UI/UX Design', 'Search Engine Optimization (SEO)'],
      image: "/SWD1.webp",
    },
    {
      id: '03',
      slug: 'branding-design',
      title: 'BRANDING & DESIGN',
      description: 'Your brand is your promise. We craft visual identities that separate you from the noise and resonate with your audience.',
      features: ['Branding','Logo Design', 'Graphic Design', 'Video Production & Editing', 'Photography & Videography'],
      image: "/SDB1.webp",
    },
    {
      id: '04',
      slug: 'advertising',
      title: 'ADVERTISING',
      description: 'Precision targeting on Google and Meta. We manage your ad spend to ensure maximum ROI and lead generation.',
      features: ['Meta Ads(Facebook/Instagram)', 'Google Ads (PPC)', 'Tiktok Ads', 'Retargeting Campaigns', 'Analytics & Reporting'],
      image: "/SAD1.webp",
    },
    {
      id: '05',
      slug: 'event-planning',
      title: 'EVENT PLANNING',
      description: 'From corporate launches to tech conferences, we create memorable physical experiences that amplify your digital presence.',
      features: ['Coporate Events', 'Marketing Events', 'Event Promotions & Marketing','Wedding Planning & More...', 'On-site Coordination'],
      image: "/SV1.webp",
    },
    {
      id: '06',
      slug: 'content-marketing',
      title: 'CONTENT MARKETING',
      description: 'Storytelling that sells. We produce high-quality blogs, videos, and copy that establishes your authority in the market.',
      features: ['Content Strategy & Planning', 'Audio & Video Production', 'Content Shooting', 'Competitor content analysis','Campaign planning'],
      image: "/SCM1.webp",
    }
  ]

  // Why Hire Me data
  const whyHireMe = [
    {
      icon: Award,
      title: 'Proven Track Record',
      description: 'Over 150+ successful projects delivered across diverse industries',
      stat: '50+',
      statLabel: 'Projects Completed'
    },
    {
      icon: Users,
      title: 'Client-Centric Approach',
      description: 'We treat your business as our own, ensuring personalized attention',
      stat: '98%',
      statLabel: 'Client Satisfaction'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Agile methodology ensures quick delivery without compromising quality',
      stat: '2x',
      statLabel: 'Faster Delivery'
    },
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every strategy is designed with measurable KPIs and clear goals',
      stat: '300%',
      statLabel: 'Average ROI'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Growth',
      description: 'We do not just deliver - we partner for your long-term success',
      stat: '6+',
      statLabel: 'Months Experience'
    },
    {
      icon: Shield,
      title: 'Transparent Process',
      description: 'Regular updates, clear communication, and no hidden surprises',
      stat: '24/7',
      statLabel: 'Support Available'
    }
  ]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Hero Text Reveal
      gsap.from('.hero-text', {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })

      // 2. Service Cards Stagger Animation
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 85%',
        },
        y: 60,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        clearProps: 'all'
      })

      // 3. Why Hire Me Section Animation
      gsap.from('.why-hire-title', {
        scrollTrigger: {
          trigger: '.why-hire-section',
          start: 'top 85%',
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.out'
      })

      gsap.from('.stat-card-animate', {
        scrollTrigger: {
          trigger: '.why-hire-grid',
          start: 'top 85%',
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all'
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-text selection:bg-primary selection:text-secondary">

      {/* --- HERO SECTION --- */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 text-center bg-secondary border-b border-secondary">
        <div className="max-w-4xl mx-auto">
          <p className="hero-text font-montserrat text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary font-bold mb-3 sm:mb-4">
            Our Expertise
          </p>
          <h1 className="hero-text font-ethnocentric text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-accent mb-4 sm:mb-6 leading-tight">
            ENGINEERING YOUR <span className="text-primary font-bold">GROWTH</span>
          </h1>
          <p className="hero-text font-open-sans text-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2 font-semibold">
            We do not just offer services; we provide integrated digital solutions designed to scale your business from startup to enterprise.
          </p>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="font-montserrat text-xs sm:text-sm tracking-[0.2em] uppercase text-primary font-bold mb-2">
              What We Offer
            </p>
            <h2 className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl text-accent font-bold">
              OUR SERVICES
            </h2>
          </div>

          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {services.map((service) => (
              <Link
                href={`/services/${service.slug}`}
                key={service.id}
                className="service-card group bg-background rounded-xl overflow-hidden border border-secondary hover:border-primary card-hover-glow transition-all duration-500 flex flex-col h-full cursor-pointer will-change-transform shadow-sm"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out grayscale group-hover:grayscale-0"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 service-card-gradient opacity-90 group-hover:opacity-70 transition-opacity"></div>

                  {/* Floating ID Number */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-primary px-2 sm:px-3 py-1 rounded text-secondary font-ethnocentric text-xs sm:text-sm font-bold shadow-lg z-10">
                    {service.id}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow bg-background">
                  <h3 className="font-ethnocentric text-base sm:text-lg md:text-xl text-accent mb-3 sm:mb-4 group-hover:text-primary transition-colors font-bold">
                    {service.title}
                  </h3>

                  <p className="font-open-sans text-text text-sm leading-relaxed mb-4 sm:mb-6 flex-grow font-semibold">
                    {service.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-montserrat text-text font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Learn More Button */}
                  <div className="flex items-center gap-2 font-montserrat font-bold text-xs sm:text-sm text-accent group-hover:text-primary transition-colors mt-auto pointer-events-none">
                    LEARN MORE <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Bottom Red Line Animation */}
                <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- WHY SHOULD YOU HIRE ME SECTION --- */}
      <section className="why-hire-section py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-secondary relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-radial opacity-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-radial opacity-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 why-hire-title">
            <p className="font-montserrat text-xs sm:text-sm tracking-[0.2em] uppercase text-primary font-bold mb-2">
              The Difference
            </p>
            <h2 className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-accent mb-4 sm:mb-6 font-bold">
              WHY <span className="text-primary font-bold">HIRE</span> us?
            </h2>
            <p className="font-open-sans text-text text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2 font-bold">
              I do not just deliver services - I deliver results that transform your business and exceed your expectations.
            </p>
          </div>

          <div className="why-hire-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {whyHireMe.map((item, index) => (
              <div
                key={index}
                className="stat-card-animate stat-card p-5 sm:p-6 md:p-8 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-2 shadow-md will-change-transform bg-background border border-secondary"
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 feature-icon rounded-lg flex items-center justify-center mb-4 sm:mb-6 shadow-md">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
                </div>

                {/* Stat Number */}
                <div className="font-ethnocentric text-3xl sm:text-4xl md:text-5xl text-primary mb-1 sm:mb-2 font-bold">
                  {item.stat}
                </div>
                <p className="font-montserrat text-xs sm:text-sm text-text uppercase tracking-wider mb-3 sm:mb-4 font-bold">
                  {item.statLabel}
                </p>

                {/* Title & Description */}
                <h3 className="font-montserrat font-bold text-base sm:text-lg text-accent mb-2">
                  {item.title}
                </h3>
                <p className="font-open-sans text-sm text-text leading-relaxed font-bold">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 sm:py-20 md:py-24 bg-accent text-center px-4 sm:px-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--secondary) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-secondary mb-4 sm:mb-6 font-bold">
            READY TO <span className="text-primary font-bold">START?</span>
          </h2>
          <p className="font-open-sans text-secondary mb-8 sm:mb-10 text-base sm:text-lg px-2 font-bold">
            Whether you need a full digital overhaul or a specific campaign, we are ready to build.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-secondary font-montserrat font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-sm hover:bg-secondary hover:text-accent transition-all duration-300 text-sm sm:text-base shadow-xl"
          >
            GET A FREE QUOTE
          </Link>
        </div>
      </section>

    </div>
  )
}

export default ServicesPage