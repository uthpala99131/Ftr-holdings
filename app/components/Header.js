"use client";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X, Home, Info, Briefcase, FolderOpen, DollarSign, FileText, Mail } from "lucide-react";
import { useWindowScroll } from "react-use";
import TransitionLink from "./TransitionLink";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
    const headerRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const pathname = usePathname();

    // Navigation items with routes
    const navItems = [
        { name: "Home", route: "/", icon: Home },
        { name: "About", route: "/about", icon: Info },
        { name: "Services", route: "/services", icon: Briefcase },
        { name: "Portfolio", route: "/portfolio", icon: FolderOpen },
        { name: "Blog", route: "/blog", icon: FileText },
        { name: "Contact", route: "/contact", icon: Mail },
    ];

    // Check if current route is active
    const isActive = (route) => {
        if (route === "/") return pathname === "/";
        return pathname.startsWith(route);
    };

    // Scroll-based show/hide header
    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        if (!headerRef.current) return;

        gsap.to(headerRef.current, {
            y: isNavVisible ? 0 : -100,
            autoAlpha: isNavVisible ? 1 : 0,
            duration: 0.4,
            ease: "power1.in",
            overwrite: 'auto',
            clearProps: isNavVisible ? '' : 'visibility',
        });
    }, [isNavVisible]);

    useGSAP(() => {
        gsap.set(headerRef.current, { y: -80, opacity: 0 });
        gsap.set(navLinksRef.current, { y: 0, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(headerRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "steps(12)",
        }).to(
            navLinksRef.current,
            {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.6,
                ease: "back.out(1.7)",
            },
            "-=0.5"
        );
    }, []);

    const handleNavClick = (index) => {
        gsap.to(navLinksRef.current[index], {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
        });
        setMobileMenuOpen(false);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Header */}
            <header
                ref={headerRef}
                className="hidden lg:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl px-4 xl:px-6 py-2.5 rounded-full backdrop-blur-xl shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(229, 57, 53, 0.1) 0%, rgba(10, 10, 10, 0.85) 50%, rgba(229, 57, 53, 0.05) 100%)',
                    border: '1px solid rgba(229, 57, 53, 0.2)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(229, 57, 53, 0.1)',
                }}
            >
                <div className="flex items-center justify-between w-full gap-2">
                    {/* Logo */}
                    <TransitionLink
                        href="/"
                        className="flex items-center group cursor-pointer shrink-0"
                    >
                        <div ref={logoRef} className="relative w-36 h-10 xl:w-44 xl:h-12 transition-all duration-300">
                            <Image
                                src="/fulllogo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </TransitionLink>

                    {/* Nav Links */}
                    <nav className="flex items-center gap-1 xl:gap-3 2xl:gap-5 font-montserrat">
                        {navItems.map((item, index) => (
                            <span key={item.name} ref={(el) => (navLinksRef.current[index] = el)}>
                                <TransitionLink
                                    href={item.route}
                                    onClick={() => handleNavClick(index)}
                                    className={`relative group transition-all duration-300 py-1.5 px-2 xl:px-3 inline-flex flex-col ${isActive(item.route)
                                        ? 'text-[var(--primary)]'
                                        : 'text-[var(--secondary)] hover:text-white'
                                        }`}
                                >
                                    <span className="text-xs xl:text-sm font-medium tracking-wide font-open-sans whitespace-nowrap">{item.name}</span>
                                    <span
                                        className={`absolute bottom-0.5 left-2 xl:left-3 right-2 xl:right-3 h-0.5 bg-[var(--primary)] transform origin-left transition-transform duration-300 ${isActive(item.route) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                            }`}
                                    />
                                    {isActive(item.route) && (
                                        <span className="absolute bottom-0.5 left-2 xl:left-3 right-2 xl:right-3 h-0.5 bg-[var(--primary)] blur-sm opacity-60" />
                                    )}
                                </TransitionLink>
                            </span>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <TransitionLink
                        href="/contact"
                        className="px-4 xl:px-5 py-2 rounded-full font-montserrat font-semibold text-xs xl:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
                        style={{
                            background: 'linear-gradient(135deg, var(--primary) 0%, #C62828 100%)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(229, 57, 53, 0.4)',
                        }}
                    >
                        Contact Us
                    </TransitionLink>
                </div>
            </header>

            {/* Mobile Header Bar */}
            <header
                className="lg:hidden fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
                style={{
                    background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(229, 57, 53, 0.1) 100%)',
                    borderBottom: '1px solid rgba(229, 57, 53, 0.2)',
                }}
            >
                <div className="flex items-center justify-between px-4 py-3">
                    <TransitionLink href="/" className="flex items-center">
                        <div className="relative w-28 h-8 transition-all duration-300">
                            <Image
                                src="/fulllogo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </TransitionLink>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                        style={{
                            background: mobileMenuOpen ? 'var(--primary)' : 'rgba(229, 57, 53, 0.1)',
                            border: '1px solid rgba(229, 57, 53, 0.3)',
                        }}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-white" />
                        ) : (
                            <Menu className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Fullscreen Menu */}
            <div
                className={`lg:hidden fixed inset-0 z-40 backdrop-blur-3xl transition-all duration-500 overflow-y-auto ${mobileMenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-full"
                    }`}
                style={{
                    background: 'linear-gradient(180deg, rgba(10, 10, 10, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%)',
                    height: '100dvh', // Use dynamic viewport height
                }}
            >
                <div className="flex flex-col min-h-full pt-16 sm:pt-20 pb-8">
                    {/* Logo in Mobile Menu */}
                    <div className="px-8 py-4 sm:py-6 flex justify-center shrink-0">
                        <div className="relative w-36 h-12 sm:w-44 sm:h-16 transition-all duration-300">
                            <Image
                                src="/fulllogo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <nav className="flex-1 px-6 py-2">
                        <div className="space-y-1 sm:space-y-2">
                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const active = isActive(item.route);
                                return (
                                    <TransitionLink
                                        key={item.name}
                                        href={item.route}
                                        onClick={() => handleNavClick(index)}
                                        className={`w-full flex items-center gap-4 px-5 py-3.5 sm:py-4 rounded-2xl transition-all duration-300 font-open-sans ${active
                                            ? 'text-white'
                                            : 'text-[var(--secondary)] hover:text-white'
                                            }`}
                                        style={{
                                            background: active
                                                ? 'linear-gradient(135deg, rgba(229, 57, 53, 0.3) 0%, rgba(229, 57, 53, 0.1) 100%)'
                                                : 'transparent',
                                            border: active ? '1px solid rgba(229, 57, 53, 0.4)' : '1px solid transparent',
                                        }}
                                    >
                                        <div
                                            className="p-2 rounded-xl"
                                            style={{
                                                background: active ? 'var(--primary)' : 'rgba(245, 245, 245, 0.1)',
                                            }}
                                        >
                                            <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-[var(--secondary)]'}`} />
                                        </div>
                                        <span className="text-lg font-medium font-montserrat">
                                            {item.name}
                                        </span>
                                        {active && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-[var(--primary)]" />
                                        )}
                                    </TransitionLink>
                                );
                            })}
                        </div>
                    </nav>

                    {/* Mobile CTA Button */}
                    <div className="px-6 pb-6">
                        <TransitionLink
                            href="/contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full block text-center py-4 rounded-2xl font-montserrat font-bold text-lg transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, var(--primary) 0%, #C62828 100%)',
                                color: 'white',
                                boxShadow: '0 4px 20px rgba(229, 57, 53, 0.4)',
                            }}
                        >
                            Contact Us
                        </TransitionLink>
                    </div>

                    {/* Mobile Menu Footer */}
                    <div
                        className="px-8 pb-4 pt-4 shrink-0"
                        style={{ borderTop: '1px solid rgba(229, 57, 53, 0.2)' }}
                    >
                        <p className="text-center text-xs sm:text-sm font-open-sans" style={{ color: 'var(--secondary)', opacity: 0.6 }}>
                            © 2026 FTR Global. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;