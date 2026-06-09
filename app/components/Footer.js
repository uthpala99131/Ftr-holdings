'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
    Facebook,
    Instagram,
    Linkedin,
    Youtube,
    MapPin,
    Phone,
    Mail
} from 'lucide-react'
import { SiTiktok } from 'react-icons/si'

// Register GSAP
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const Footer = () => {
    const footerRef = useRef(null)

    // Social Media Links
    const socialLinks = [
        { Icon: Facebook, name: 'Facebook', href: 'https://www.facebook.com/share/1BVhTYsyx6/' },
        { Icon: Instagram, name: 'Instagram', href: 'https://www.instagram.com/ftr_globals?igsh=MXFtMjc0dzcwcjhicA==' },
        { Icon: SiTiktok, name: 'TikTok', href: 'https://tiktok.com/@ftrglobal' },
        { Icon: Youtube, name: 'YouTube', href: 'https://youtube.com/@ftr_global?si=Qx4tDnbtqYmLg2r9' },
        { Icon: Linkedin, name: 'LinkedIn', href: 'https://www.linkedin.com/company/ftr-holdings/' }
    ]

    // Marketing Services
    const marketingServices = [
        "Social Media Management",
        "Paid Advertising Campaigns",
        "Content Marketing",
        "Influencer Marketing",
        "Analytics & Strategy Creation",
        "Email Marketing",
        "Lead Generation & CRO",
        "Branding"
    ]

    // Technology Services
    const techServices = [
        "Web Development",
        "Web System Development",
        "Standalone System Development",
        "Mobile Application Development",
        "AI Solutions",
        "Test Automation Solutions",
        "UI/UX Design",
        "Search Engine Optimization (SEO)",
    ]

    // Design Services
    const designServices = [
        "Branding & Visual Identity",
        "Graphic Design",
        "Video Production & Editing",
        "Creative Content creation",
        "Photography & Videography",
        
    ]

        // Design Services
    const eventServices = [
        "Corporate Event Planning",
        "Event Promotions",
        "Marketing Events",
        "Wedding Planning & More...",
        
    ]

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.footer-col', {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: 'top 90%',
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
            })
        }, footerRef.current)

        return () => ctx.revert()
    }, [])

    return (
        <footer
            ref={footerRef}
            className="pt-16 sm:pt-20 pb-8 relative overflow-hidden"
            style={{ backgroundColor: 'var(--accent)' }}
        >
            {/* Background Effects */}
            <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: 'var(--primary)' }}
            />
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 relative z-10">

                {/* Main Footer Grid - 5 columns on 2xl */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-8 lg:gap-10 2xl:gap-12 mb-12 lg:mb-16">

                    {/* COLUMN 1: BRAND & CONTACT */}
                    <div className="footer-col space-y-5 sm:col-span-2 lg:col-span-1 2xl:col-span-1">
                        {/* Logo */}
                        <div className="relative w-40 h-12 sm:w-48 sm:h-14">
                            <Image
                                src="/fulllogo.png"
                                alt="FTR Holdings Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>

                        <p
                            className="font-open-sans text-sm leading-relaxed max-w-xs"
                            style={{ color: 'var(--secondary)', opacity: 0.7 }}
                        >
                            Empowering startups and businesses with result-driven Digital Marketing, eye Catching Designing and custom built Software Solutions. Turn your ideas into digital success.
                        </p>

                        {/* Contact Details */}
                        <div className="space-y-3 pt-2">
                            <h4
                                className="font-montserrat font-bold text-sm"
                                style={{ color: 'var(--background)' }}
                            >
                                Contact
                            </h4>
                            <a
                                href="tel:+94764790065"
                                className="flex items-center gap-3 transition-colors cursor-pointer group"
                                style={{ color: 'var(--secondary)' }}
                            >
                                <Phone className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" style={{ color: 'var(--primary)' }} />
                                <span className="text-sm font-montserrat group-hover:text-primary transition-colors" style={{ opacity: 0.8 }}>+94 76 479 0065</span>
                            </a>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                className="flex items-start gap-3 transition-colors cursor-pointer group"
                                style={{ color: 'var(--secondary)' }}
                            >
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 group-hover:text-primary transition-colors" style={{ color: 'var(--primary)' }} />
                                <span className="text-sm font-montserrat group-hover:text-primary transition-colors" style={{ opacity: 0.8 }}>
                                    No.99/A, Medawala Rd, Pujapitiya, Kandy,
                                    Sri Lanka.
                                </span>
                            </a>
                            <a
                                href="mailto:ftrglobals@gmail.com"
                                className="flex items-center gap-3 transition-colors cursor-pointer group"
                                style={{ color: 'var(--secondary)' }}
                            >
                                <Mail className="w-4 h-4 shrink-0 group-hover:text-primary transition-colors" style={{ color: 'var(--primary)' }} />
                                <span className="text-sm font-montserrat group-hover:text-primary transition-colors" style={{ opacity: 0.8 }}>ftrglobals@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    {/* COLUMN 2: MARKETING */}
                    <div className="footer-col">
                        <h3
                            className="font-ethnocentric text-base sm:text-lg mb-5"
                            style={{ color: 'var(--background)' }}
                        >
                            Marketing
                        </h3>
                        <ul className="space-y-2.5">
                            {marketingServices.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href="/services"
                                        className="font-montserrat text-sm hover:pl-1 transition-all duration-300 block"
                                        style={{ color: 'var(--secondary)', opacity: 0.7 }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 3: TECHNOLOGY */}
                    <div className="footer-col">
                        <h3
                            className="font-ethnocentric text-base sm:text-lg mb-5"
                            style={{ color: 'var(--background)' }}
                        >
                            Technology
                        </h3>
                        <ul className="space-y-2.5">
                            {techServices.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href="/services"
                                        className="font-montserrat text-sm hover:pl-1 transition-all duration-300 block"
                                        style={{ color: 'var(--secondary)', opacity: 0.7 }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* COLUMN 4: DESIGN */}
                    <div className="footer-col">
                        <h3
                            className="font-ethnocentric text-base sm:text-lg mb-5"
                            style={{ color: 'var(--background)' }}
                        >
                            Design
                        </h3>
                        <ul className="space-y-2.5">
                            {designServices.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href="/services"
                                        className="font-montserrat text-sm hover:pl-1 transition-all duration-300 block"
                                        style={{ color: 'var(--secondary)', opacity: 0.7 }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <li></li>
                        {/* COLUMN 4: DESIGN */}
                    <div className="footer-col">
                        <h3
                            className="font-ethnocentric text-base sm:text-lg mb-5"
                            style={{ color: 'var(--background)' }}
                        >
                            Event Planning
                        </h3>
                        <ul className="space-y-2.5">
                            {eventServices.map((service, index) => (
                                <li key={index}>
                                    <Link
                                        href="/services"
                                        className="font-montserrat text-sm hover:pl-1 transition-all duration-300 block"
                                        style={{ color: 'var(--secondary)', opacity: 0.7 }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    </div>
                    

                    {/* COLUMN 5: SOCIAL (shows on 2xl, hidden on smaller) */}
                    <div className="footer-col hidden 2xl:block">
                        <h3
                            className="font-ethnocentric text-base sm:text-lg mb-5"
                            style={{ color: 'var(--background)' }}
                        >
                            Follow Us
                        </h3>
                        <div className="flex flex-col gap-3">
                            {socialLinks.map(({ Icon, name, href }, i) => (
                                <Link
                                    key={i}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 font-montserrat text-sm transition-all duration-300 group"
                                    style={{ color: 'var(--secondary)', opacity: 0.7 }}
                                >
                                    <span
                                        className="w-8 h-8 rounded flex items-center justify-center transition-all duration-300 group-hover:-translate-y-0.5"
                                        style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    >
                                        <Icon size={16} className="group-hover:text-primary transition-colors" />
                                    </span>
                                    <span className="group-hover:text-primary transition-colors">{name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Social Icons Row - Only visible below 2xl */}
                <div className="footer-col flex justify-center gap-4 mb-8 2xl:hidden">
                    {socialLinks.map(({ Icon, href }, i) => (
                        <Link
                            key={i}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                color: 'var(--secondary)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--primary)'
                                e.currentTarget.style.color = 'white'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                                e.currentTarget.style.color = 'var(--secondary)'
                            }}
                        >
                            <Icon size={18} />
                        </Link>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div
                    className="footer-col border-t pt-6 flex flex-col lg:flex-row justify-between items-center gap-4"
                    style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                >
                    <p
                        className="font-open-sans text-xs text-center lg:text-left"
                        style={{ color: 'var(--secondary)', opacity: 0.5 }}
                    >
                        © {new Date().getFullYear()} FTR Global. All Rights Reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <Link
                            href="/privacy"
                            className="font-montserrat text-xs transition-colors"
                            style={{ color: 'var(--secondary)', opacity: 0.5 }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/terms"
                            className="font-montserrat text-xs transition-colors"
                            style={{ color: 'var(--secondary)', opacity: 0.5 }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                    <p
                        className="font-montserrat text-xs text-center lg:text-right"
                        style={{ color: 'var(--secondary)', opacity: 0.5 }}
                    >
                        Designed & Developed by{' '}
                        <Link
                            href="https://ftrholdings.com"
                            target="_blank"
                            className="font-semibold transition-colors"
                            style={{ color: 'var(--primary)' }}
                        >
                            Sahan Mewantha (CTO)
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
