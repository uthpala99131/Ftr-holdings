'use client'
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const CTASection = () => {
    const sectionRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Content animation
            gsap.fromTo('.cta-content',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            // Buttons animation
            gsap.fromTo('.cta-btn',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            // Decorative elements
            gsap.fromTo('.cta-decorative',
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )
        }, sectionRef.current)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="py-20 sm:py-24 md:py-32 relative overflow-hidden"
            style={{ backgroundColor: 'var(--secondary)' }}
        >
            {/* Decorative Background Elements */}
            <div
                className="cta-decorative absolute top-10 left-10 w-32 h-32 rounded-full opacity-20 pointer-events-none"
                style={{ backgroundColor: 'var(--primary)', filter: 'blur(60px)' }}
            />
            <div
                className="cta-decorative absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-15 pointer-events-none"
                style={{ backgroundColor: 'var(--primary)', filter: 'blur(80px)' }}
            />

            {/* Top Border Accent */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1"
                style={{ backgroundColor: 'var(--primary)' }}
            />

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">

                {/* Tagline */}
                <p
                    className="cta-content font-montserrat font-bold tracking-[0.2em] text-xs sm:text-sm mb-4 sm:mb-6 uppercase"
                    style={{ color: 'var(--primary)' }}
                >
                    beging your REVOLUTION
                </p>

                {/* Main Headline */}
                <h2
                    className="cta-content font-ethnocentric text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 leading-tight"
                    style={{ color: 'var(--text)' }}
                >
                    ARE YOU{' '}
                    <span style={{ color: 'var(--primary)' }}>READY</span>?
                </h2>

                {/* Description */}
                <p
                    className="cta-content font-open-sans text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed px-4"
                    style={{ color: 'var(--text)', opacity: 0.7 }}
                >
                    Stop blending in. Build a Digital Presence that Commands Attention and Fuels Growth.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">

                    {/* Primary Button */}
                    <Link
                        href="/contact"
                        className="cta-btn group flex items-center justify-center gap-3 font-montserrat font-bold text-sm sm:text-base py-4 sm:py-5 px-8 sm:px-10 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            boxShadow: '0 8px 30px rgba(229, 57, 53, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(229, 57, 53, 0.5)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(229, 57, 53, 0.3)'
                        }}
                    >
                        <span>GET A PROPOSAL</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>

                    {/* Secondary Button */}
                    <Link
                        href="/contact"
                        className="cta-btn group flex items-center justify-center gap-3 font-montserrat font-semibold text-sm sm:text-base py-4 sm:py-5 px-8 sm:px-10 rounded-full transition-all duration-300 hover:scale-105"
                        style={{
                            backgroundColor: 'transparent',
                            color: 'var(--text)',
                            border: '2px solid rgba(26, 26, 26, 0.2)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)'
                            e.currentTarget.style.color = 'var(--primary)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.2)'
                            e.currentTarget.style.color = 'var(--text)'
                        }}
                    >
                        <Phone className="w-4 h-4" />
                        <span>BOOK A CALL</span>
                    </Link>
                </div>

                {/* Trust Indicator */}
                <p
                    className="cta-content font-montserrat text-xs sm:text-sm mt-10 sm:mt-12"
                    style={{ color: 'var(--text)', opacity: 0.5 }}
                >
                    ✓ Free Consultation &nbsp;&nbsp; ✓ No Obligation &nbsp;&nbsp; ✓ Quick Response
                </p>
            </div>
        </section>
    )
}

export default CTASection
