'use client'
import React, { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'

const HeroSection = () => {
    const heroRef = useRef(null)
    const headingRef = useRef(null)
    const subheadingRef = useRef(null)
    const descRef = useRef(null)
    const buttonsRef = useRef(null)
    const scrollIndicatorRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            tl.fromTo(headingRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.4, delay: 0.3 }
            )
            .fromTo(subheadingRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                '-=0.9'
            )
            .fromTo(descRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                '-=0.7'
            )
            .fromTo(buttonsRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9 },
                '-=0.6'
            )
            .fromTo(scrollIndicatorRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                '-=0.4'
            )

        }, heroRef.current)

        return () => ctx.revert()
    }, [])

    const handleScrollDown = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen w-full flex items-center justify-center px-6 sm:px-8 md:px-12 overflow-hidden text-white"
        >
            {/* Background Video */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/FTR(2).mp4" type="video/mp4" />
                </video>
                {/* Gradient overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
            </div>

            {/* Main Content - Centered */}
            <div className="relative z-10 w-full max-w-5xl mx-auto text-center flex flex-col items-center gap-8 sm:gap-10 py-20">
                
                {/* Brand Tag */}
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-7 py-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xl font-medium font-ethnocentric  tracking-wide "style={{ color: 'var(--primary)' }}>FTR GLOBAL</span>
                </div>

                {/* Main Heading */}
                <div className="space-y-4 sm:space-y-6">
                    <h1
                        ref={headingRef}
                        className="font-ethnocentric text-5x1 sm:text-5xl md:text-6xl lg:text-9x1 font-bold leading-[1.1] "
                    >
                        CREATE THE FUTURE
                    </h1>
                    <h2
                        ref={subheadingRef}
                        className="font-ethnocentric text-3xl sm:text-3xl md:text-5xl lg:text-6xl  font-bold leading-[1.1]  bg-gradient-to-r from-white via-red-400 to-red-800 bg-clip-text text-transparent"
                    style={{ color: 'var(--primary)' }}>
                        START THE REVOLUTION
                    </h2>
                </div>

                {/* Description */}
                <p
                    ref={descRef}
                    className="text-base sm:text-lg text-gray-300 leading-relaxed font-light max-w-2xl mx-auto px-4"
                >
                    Turning Digital Ideas Into Reality. While Crafting Innovative Solutions with Precition and Creativity for the Future.
                </p>

                {/* CTA Buttons */}
                <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-4">
                    <Link
                        href="/portfolio"
                        className="group relative overflow-hidden flex items-center justify-center gap-2.5 bg-white text-black hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 rounded-full px-8 py-4 font-semibold text-base min-w-[200px]" style={{ color: 'var(--primary)' }}
                    >
                        <span className="relative z-10">View Our Work</span>
                        <svg 
                            className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>

                    <Link
                        href="/contact"
                        className="group flex items-center justify-center gap-2.5 bg-transparent hover:bg-white/10 backdrop-blur-sm border-2 border-white/40 hover:border-white transition-all duration-300 rounded-full px-8 py-4 font-semibold text-base text-white min-w-[200px]"
                    >
                        <span>Get In Touch</span>
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator - Bottom Center */}
            <button
                ref={scrollIndicatorRef}
                onClick={handleScrollDown}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 group"
                aria-label="Scroll down"
            >
                <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
                <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2">
                    <div className="w-1.5 h-2 bg-white rounded-full animate-bounce" />
                </div>
            </button>
        </section>
    )
}

export default HeroSection