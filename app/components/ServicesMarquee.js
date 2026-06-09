'use client'
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const ServicesMarquee = () => {
    const marqueeRef = useRef(null)
    const containerRef = useRef(null)

    const services = [
        'DIGITAL MARKETING',
        'MOBILE APP DEVELOPMENT',
        'SOCIAL MEDIA MANAGEMENT & MARKETING',
        'CONTENT CREATION',
        'ADVERTISING CAMPAIGNS',
        'BRANDING',
        'GRAPHIC DESIGN SOLUTIONS',
        'VIDEO EDITING & PRODUCTION',
        'WEB DEVELOPMENT',
    ]

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Infinite marquee animation
            const marqueeInner = marqueeRef.current
            if (marqueeInner) {
                gsap.to(marqueeInner, {
                    x: '-50%',
                    duration: 40,
                    ease: 'linear',
                    repeat: -1,
                })
            }

            // Section fade in on scroll
            gsap.fromTo(containerRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )
        }, containerRef.current)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={containerRef}
            className="relative mt-6 py-6 sm:py-8 overflow-hidden"
            style={{
                backgroundColor: '#0F1419',
            }}
        >
            {/* Gradient overlays for fade effect */}
            <div
                className="absolute inset-y-0 left-0 w-32 sm:w-40 md:w-48 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(to right, #0F1419, transparent)'
                }}
            />
            <div
                className="absolute inset-y-0 right-0 w-32 sm:w-40 md:w-48 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(to left, #0F1419, transparent)'
                }}
            />

            {/* Marquee inner */}
            <div
                ref={marqueeRef}
                className="flex items-center gap-16 sm:gap-20 md:gap-24 lg:gap-32 w-max"
            >
                {/* Render services twice for seamless infinite scroll */}
                {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex items-center gap-16 sm:gap-20 md:gap-24 lg:gap-32">
                        {services.map((service, index) => (
                            <div
                                key={`${setIndex}-${index}`}
                                className="group cursor-pointer transition-all duration-300"
                            >
                                {/* Service Name */}
                                <span
                                    className="font-ethnocentric text-xs sm:text-sm md:text-base whitespace-nowrap transition-all duration-300 inline-block"
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.3)',
                                        letterSpacing: '0.1em'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = 'rgba(229, 57, 53, 0.9)'
                                        e.currentTarget.style.transform = 'scale(1.05)'
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)'
                                        e.currentTarget.style.transform = 'scale(1)'
                                    }}
                                >
                                    {service}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ServicesMarquee


