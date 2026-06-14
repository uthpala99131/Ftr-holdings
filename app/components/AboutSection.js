'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Facebook, Instagram, Youtube, ArrowUpRight, Linkedin } from 'lucide-react'
import { TikTok_Sans } from 'next/font/google'

// Register GSAP Plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const AboutSection = () => {
    const containerRef = useRef(null)

    // Merging your previous stats with the new design style
    const stats = [
        { label: 'PROJECTS DONE', value: '50+' },
        { label: 'HAPPY CLIENTS', value: '98%' },
        { label: 'GROWTH RATE', value: '200%' },
    ]

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Image animation with fromTo for reliability
            gsap.fromTo('.about-image-container',
                { x: -80, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.about-image-container',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            // Content items - simple fade in
            const contentItems = gsap.utils.toArray('.about-content-item')
            contentItems.forEach((item, index) => {
                gsap.fromTo(item,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.about-content-wrapper',
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            // Stats rows - individual triggers
            const statRows = gsap.utils.toArray('.stat-row')
            statRows.forEach((row, index) => {
                gsap.fromTo(row,
                    { x: 30, opacity: 0 },
                    {
                        x: 0,
                        opacity: 1,
                        duration: 0.6,
                        delay: index * 0.12,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: '.stats-wrapper',
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

            // Social icons - individual triggers
            const socialIcons = gsap.utils.toArray('.social-icon')
            socialIcons.forEach((icon, index) => {
                gsap.fromTo(icon,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: '.social-wrapper',
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })

        }, containerRef.current)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-20 relative overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full pointer-events-none" style={{ background: 'linear-gradient(to left, var(--secondary), transparent)' }} />

            {/* Top Right "Read More" Button */}
            <Link href="/about" className="absolute top-6 sm:top-8 md:top-10 right-4 sm:right-6 md:right-20 about-content-item hidden md:flex items-center gap-2 group cursor-pointer">
                <span className="font-montserrat text-sm font-bold transition-colors" style={{ color: 'var(--text)' }}>
                    READ MORE
                </span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all" style={{ border: '1px solid rgba(26, 26, 26, 0.2)' }}>
                    <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--text)' }} />
                </div>
            </Link>

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">

                {/* --- LEFT COLUMN: IMAGE --- */}
                <div className="about-image-container relative order-1 md:order-1">
                    {/* Decorative Brackets */}
                    <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-t-2 border-l-2" style={{ borderColor: 'var(--primary)' }} />
                    <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 border-b-2 border-r-2" style={{ borderColor: 'var(--primary)' }} />

                    {/* Image */}
                    <div 
                        className="relative h-[350px] sm:h-[400px] md:h-[500px] w-full rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                        style={{ backgroundColor: 'var(--secondary)' }}
                    >
                        <Image
                            src="/FTRA.jpg"
                            alt="Agency Director"
                            fill
                            className="object-cover object-center"
                        />

                        <div
                            className="absolute inset-0 opacity-40"
                            style={{
                            background: 'linear-gradient(to top, var(--accent), transparent, transparent)'
                         }}
                         />
                        </div>
                </div>

                {/* --- RIGHT COLUMN: CONTENT --- */}
                <div className="about-content-wrapper flex flex-col justify-center order-2 md:order-2">

                    {/* Bracketed Header */}
                    <div className="about-content-item mb-4 sm:mb-6">
                        <span className="font-montserrat text-xs sm:text-sm tracking-widest" style={{ color: 'var(--text)', opacity: 0.6 }}>
                            [ ABOUT US ]
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h2 className="about-content-item font-ethnocentric text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-2" style={{ color: 'var(--text)' }}>
                        THE   <span style={{ color: 'var(--primary)' }}>REVOLUTION</span> BEGINS RIGHT HERE
                    </h2>
                    <p className="about-content-item font-montserrat italic text-xl sm:text-2xl mb-6 sm:mb-8" style={{ color: 'var(--text)', opacity: 0.8 }}>
                        That Matter.
                    </p>

                    {/* Paragraph */}
                    <p className="about-content-item font-open-sans text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 border-l-2 pl-4 sm:pl-6" style={{ color: 'var(--text)', opacity: 0.7, borderColor: 'var(--primary)' }}>
                        Leading the Digital Revolution from Simple Websites to Complex Web Applications, Cinematic Content, Advertising, Digital Marketing and Innovative Digital Solutions, Combining Technology and Storytelling to Bring ideas to life.
                    </p>

                    {/* Stats Section */}
                    <div className="stats-wrapper space-y-4 sm:space-y-6 mb-8 sm:mb-10">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-row flex items-center justify-between border-b pb-3 sm:pb-4 group transition-all" style={{ borderColor: 'rgba(26, 26, 26, 0.1)' }}>
                                <span className="font-montserrat text-xs sm:text-sm tracking-widest transition-opacity" style={{ color: 'var(--text)', opacity: 0.6 }}>
                                    [ {stat.label} ]
                                </span>
                                <span className="font-ethnocentric text-lg sm:text-xl" style={{ color: 'var(--primary)' }}>
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="social-wrapper about-content-item flex items-center gap-3 sm:gap-4 flex-wrap">
                        <span className="font-montserrat text-xs uppercase mr-2 sm:mr-4" style={{ color: 'var(--text)', opacity: 0.5 }}>
                            Social Media :
                        </span>
                        {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                            <div
                                key={i}
                                className="social-icon w-12 h-12 sm:w-14 sm:h-14 rounded flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                                style={{ backgroundColor: 'var(--secondary)', color: 'var(--text)' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--primary)'
                                    e.currentTarget.style.color = 'white'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--secondary)'
                                    e.currentTarget.style.color = 'var(--text)'
                                }}
                            >
                                <Icon size={22} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AboutSection