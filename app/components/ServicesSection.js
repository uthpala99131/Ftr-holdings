'use client'
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const ServicesSection = () => {
    const sectionRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    // Mouse tracking for interactive elements
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!sectionRef.current) return
            const rect = sectionRef.current.getBoundingClientRect()
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            })
        }

        const section = sectionRef.current
        if (section) {
            section.addEventListener('mousemove', handleMouseMove)
        }

        return () => {
            if (section) {
                section.removeEventListener('mousemove', handleMouseMove)
            }
        }
    }, [])

    const services = [
        {
            number: '01',
            title: 'DIGITAL MARKETING',
            tags: ['Social Media Management', 'Paid Advertising', 'Content Creations', 'Influencer Marketing', 'Analytics & Reporting','More...'],
        },
        {
            number: '02',
            title: 'Web Design',
            tags: ['Website Development', 'Mobile Apps','UI/UX Design','POS Systems', 'Customized IT Solutions', 'SEO','More...'],
        },
        {
            number: '03',
            title: 'DESIGN & BRANDING',
            tags: ['Branding & Visual identity', 'Graphic Design', 'Video Production', 'Cinematic Storytelling', 'Packaging Design', 'Motion Graphics', 'More...'],
        },
       
        {
            number: '04',
            title: 'EVENT PLANNING',
            tags: ['Corporate Events', 'Event Promotions', 'Marketing Events', 'Wedding Planning', 'More...'],
        },
    ]

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.fromTo('.services-header',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            // View Project link animation
            gsap.fromTo('.view-project-link',
                { x: 30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            )

            // Service cards stagger animation
            const cards = gsap.utils.toArray('.service-card')
            cards.forEach((card, index) => {
                gsap.fromTo(card,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: '.services-grid',
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                )
            })
        }, sectionRef.current)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-20 relative overflow-hidden"
            style={{ backgroundColor: 'var(--background)' }}
        >
            {/* ===== DECORATIVE BACKGROUND ELEMENTS ===== */}

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--text) 1px, transparent 1px),
                        linear-gradient(90deg, var(--text) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Floating Geometric Circles */}
            <div
                className="absolute top-[10%] left-[5%] w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full pointer-events-none animate-pulse"
                style={{
                    background: 'radial-gradient(circle, rgba(229, 57, 53, 0.08) 0%, transparent 70%)',
                    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                    transition: 'transform 0.3s ease-out'
                }}
            />
            <div
                className="absolute bottom-[15%] right-[8%] w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(229, 57, 53, 0.06) 0%, transparent 70%)',
                    transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px)`,
                    transition: 'transform 0.4s ease-out',
                    animation: 'pulse 4s ease-in-out infinite'
                }}
            />

            {/* Rotating Decorative Squares */}
            <div
                className="absolute top-[20%] right-[12%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 pointer-events-none opacity-20"
                style={{
                    border: '2px solid var(--primary)',
                    transform: `rotate(${45 + mousePosition.x * 20}deg)`,
                    transition: 'transform 0.5s ease-out'
                }}
            />
            <div
                className="absolute bottom-[25%] left-[10%] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 pointer-events-none opacity-15"
                style={{
                    border: '1.5px solid var(--accent)',
                    transform: `rotate(${-30 + mousePosition.y * 25}deg)`,
                    transition: 'transform 0.6s ease-out'
                }}
            />

            {/* Animated Floating Dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${4 + i * 2}px`,
                            height: `${4 + i * 2}px`,
                            backgroundColor: i % 2 === 0 ? 'var(--primary)' : 'var(--accent)',
                            opacity: 0.15 + (i * 0.05),
                            top: `${15 + i * 15}%`,
                            left: `${5 + i * 18}%`,
                            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
                            animationDelay: `${i * 0.3}s`
                        }}
                    />
                ))}
            </div>

            {/* Gradient Accent Lines */}
            <div
                className="absolute top-0 left-1/4 w-px h-32 sm:h-40 md:h-48 pointer-events-none opacity-20"
                style={{
                    background: 'linear-gradient(to bottom, transparent, var(--primary), transparent)'
                }}
            />
            <div
                className="absolute bottom-0 right-1/3 w-px h-24 sm:h-32 md:h-40 pointer-events-none opacity-15"
                style={{
                    background: 'linear-gradient(to top, transparent, var(--accent), transparent)'
                }}
            />

            {/* Large Interactive Gradient Orb */}
            <div
                className="absolute top-1/2 left-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(229, 57, 53, 0.04) 0%, transparent 60%)',
                    transform: `translate(-50%, -50%) translate(${(mousePosition.x - 0.5) * 60}px, ${(mousePosition.y - 0.5) * 60}px)`,
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    filter: 'blur(40px)'
                }}
            />

            {/* Decorative Corner Elements */}
            <div
                className="absolute top-8 right-8 sm:top-12 sm:right-12 pointer-events-none opacity-10"
            >
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-t-2 border-r-2" style={{ borderColor: 'var(--primary)' }} />
            </div>
            <div
                className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 pointer-events-none opacity-10"
            >
                <div className="w-20 h-20 sm:w-24 sm:h-24 border-b-2 border-l-2" style={{ borderColor: 'var(--accent)' }} />
            </div>

            {/* CSS Keyframes for animations */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.06; transform: scale(1); }
                    50% { opacity: 0.1; transform: scale(1.1); }
                }
            `}</style>

            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12 sm:mb-14 md:mb-16">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* Title */}
                    <div className="services-header">
                        <h2
                            className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl leading-tight"
                            style={{ color: 'var(--text)' }}
                        >
                            Services that
                        </h2>
                        <h2
                            className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl italic"
                            style={{ color: 'var(--primary)' }}
                        >
                            are tailored
                        </h2>
                    </div>

                    {/* View Project Link */}
                    <Link
                        href="/services"
                        className="view-project-link flex items-center gap-2 group self-start md:self-center"
                    >
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'var(--primary)' }}
                        />
                        <span
                            className="font-montserrat text-sm tracking-wide group-hover:tracking-wider transition-all duration-300"
                            style={{ color: 'var(--text)' }}
                        >
                            View Projects
                        </span>
                        <ArrowUpRight
                            className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                            style={{ color: 'var(--text)' }}
                        />
                    </Link>
                </div>
            </div>

            {/* Services Grid - Wider cards with 4 columns on xl */}
            <div className="services-grid max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card group relative flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-2xl min-h-[340px] sm:min-h-[380px] md:min-h-[420px] transition-all duration-500 cursor-pointer"
                        style={{
                            backgroundColor: 'var(--secondary)',
                            border: '1px solid rgba(26, 26, 26, 0.08)',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary)'
                            e.currentTarget.style.transform = 'translateY(-10px)'
                            e.currentTarget.style.boxShadow = '0 25px 60px rgba(229, 57, 53, 0.15), 0 0 40px rgba(229, 57, 53, 0.08)'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(26, 26, 26, 0.08)'
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)'
                        }}
                    >
                        {/* Top Section */}
                        <div>
                            {/* Number */}
                            <span
                                className="font-montserrat text-sm font-medium tracking-widest mb-6 block"
                                style={{ color: 'var(--primary)' }}
                            >
                                {service.number}
                            </span>

                            {/* Title - Using Ethnocentric font */}
                            <h3
                                className="font-ethnocentric text-xl sm:text-2xl md:text-3xl leading-tight mb-8 group-hover:translate-x-2 transition-transform duration-300"
                                style={{ color: 'var(--text)' }}
                            >
                                {service.title}
                            </h3>
                        </div>

                        {/* Bottom Section */}
                        <div>
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {service.tags.slice(0, 3).map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="font-montserrat text-xs px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-white"
                                        style={{
                                            backgroundColor: 'rgba(26, 26, 26, 0.04)',
                                            color: 'var(--text)',
                                            border: '1px solid rgba(26, 26, 26, 0.08)',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Circle Button */}
                            <div
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    boxShadow: '0 6px 20px rgba(229, 57, 53, 0.35)'
                                }}
                            >
                                <ArrowUpRight
                                    className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:rotate-45 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        {/* Decorative corner accent */}
                        <div
                            className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: 'linear-gradient(135deg, transparent 50%, rgba(229, 57, 53, 0.1) 50%)',
                                borderRadius: '0 1rem 0 0',
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ServicesSection


