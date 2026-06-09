'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

// Register GSAP Plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

// Service Data - Same as main page for consistency
const servicesData = [
    {
        id: '01',
        slug: 'digital-marketing',
        title: 'DIGITAL MARKETING',
        subtitle: 'Amplify Your Online Presence',
        description: "We do not just post content; we engineer viral growth. From SEO to Social Media Management, we turn strangers into loyal customers.",
        features: ['Social Media Management (SMM)', 'Analytics & Strategy Creation', 'Paid Ad Campaigns', 'Influencer & content Marketing', 'Email Marketing','Branding','Content Creation','Lead Generation & CRO'],
        image: "/see/SDM1.webp",
        detailedDescription: 'Our digital marketing services are designed to amplify your online presence and drive measurable results. We combine data-driven strategies with creative excellence to help your brand stand out in the crowded digital landscape. Our team of experts leverages the latest tools and techniques to ensure your message reaches the right audience at the right time.',
        process: [
            { step: '01', title: 'Discovery', desc: 'We analyze your current digital presence, study your competitors, and identify growth opportunities unique to your business.' },
            { step: '02', title: 'Strategy', desc: 'Based on our findings, we develop a custom marketing plan tailored to your specific business goals and target audience.' },
            { step: '03', title: 'Execution', desc: 'Our team implements campaigns across all relevant channels, creating engaging content that resonates with your audience.' },
            { step: '04', title: 'Optimize', desc: 'We continuously refine and improve campaigns based on real-time performance data to maximize your ROI.' }
        ],
        benefits: [
            'Increased brand visibility across all digital platforms',
            'Higher engagement rates with your target audience',
            'Qualified lead generation that converts',
            'Improved ROI on marketing spend',
            'Data-driven insights for informed decisions',
            'Consistent brand messaging across channels'
        ],
        stats: { projects: '50+', satisfaction: '98%', growth: '250%' }
    },
    {
        id: '02',
        slug: 'web-development',
        title: 'WEB DEVELOPMENT',
        subtitle: 'Build Your Digital Foundation',
        description: 'High-performance websites built on Next.js. We build digital infrastructures that are fast, secure, and scalable.',
        features: ['Web Development', 'E-Commerce Solutions', 'Custom IT Solutions', 'UI/UX Design', 'Search Engine Optimization (SEO)'],
        image: "/see/SWD1.webp",
        detailedDescription: 'We create stunning, high-performance websites and web applications that drive business growth. Our development process focuses on user experience, speed, and scalability using the latest technologies including Next.js, React, and modern backend solutions. Every line of code is optimized for performance and maintainability.',
        process: [
            { step: '01', title: 'Planning', desc: 'We define requirements, system architecture, and technical specifications that align with your business objectives.' },
            { step: '02', title: 'Design', desc: 'Our design team creates wireframes and visual designs that prioritize user experience and brand consistency.' },
            { step: '03', title: 'Development', desc: 'We build your solution using cutting-edge technologies, following best practices for clean, maintainable code.' },
            { step: '04', title: 'Launch', desc: 'We deploy your project with comprehensive testing and provide ongoing support to ensure smooth operation.' }
        ],
        benefits: [
            'Lightning-fast load times under 2 seconds',
            'Mobile-first responsive design',
            'SEO-optimized structure for better rankings',
            'Secure and scalable architecture',
            'Easy content management systems',
            '24/7 monitoring and support'
        ],
        stats: { projects: '80+', satisfaction: '99%', growth: '180%' }
    },
    {
        id: '03',
        slug: 'branding-design',
        title: 'BRANDING & DESIGN',
        subtitle: 'Craft Your Visual Identity',
        description: 'Your brand is your promise. We craft visual identities that separate you from the noise and resonate with your audience.',
        features:  ['Branding','Logo Design', 'Graphic Design', 'Video Production & Editing', 'Photography & Videography'],
        image: "/see/SDB1.webp",
        detailedDescription: 'We build memorable brand identities that tell your story and connect with your target audience. From logo design to comprehensive brand guidelines, we ensure consistency across all touchpoints. Our creative team blends strategy with artistry to create visuals that not only look stunning but also drive results.',
        process: [
            { step: '01', title: 'Research', desc: 'We dive deep into understanding your audience, competitors, and market positioning to inform our creative direction.' },
            { step: '02', title: 'Concept', desc: 'Our designers develop multiple creative directions for your review, each with strategic rationale.' },
            { step: '03', title: 'Refinement', desc: 'We perfect the chosen direction based on your feedback, fine-tuning every detail.' },
            { step: '04', title: 'Delivery', desc: 'You receive a complete brand package with comprehensive usage guidelines and all file formats.' }
        ],
        benefits: [
            'Distinctive brand identity that stands out',
            'Consistent visual language across platforms',
            'Increased brand recognition and recall',
            'Professional marketing materials',
            'Detailed brand guidelines documentation',
            'Scalable design system'
        ],
        stats: { projects: '120+', satisfaction: '98%', growth: '200%' }
    },
    {
        id: '04',
        slug: 'advertising',
        title: 'ADVERTISING',
        subtitle: 'Maximize Your Ad Spend',
        description: 'Precision targeting on Google and Meta. We manage your ad spend to ensure maximum ROI and lead generation.',
        features: ['Meta Ads(Facebook/Instagram)', 'Google Ads (PPC)', 'Tiktok Ads', 'Retargeting Campaigns', 'Analytics & Reporting'],
        image: "/see/SAD1.webp",
        detailedDescription: 'Our paid advertising services deliver targeted campaigns that reach your ideal customers at the right time. We optimize every dollar of your ad spend for maximum return on investment. Using advanced targeting, A/B testing, and continuous optimization, we ensure your ads perform at their peak.',
        process: [
            { step: '01', title: 'Audit', desc: 'We review your current campaigns, analyze performance data, and identify opportunities for improvement.' },
            { step: '02', title: 'Setup', desc: 'We configure precise tracking, build targeted audiences, and create compelling ad creatives.' },
            { step: '03', title: 'Launch', desc: 'We deploy optimized campaigns across platforms with rigorous A/B testing protocols.' },
            { step: '04', title: 'Scale', desc: 'Based on performance data, we scale winning campaigns to maximize your returns.' }
        ],
        benefits: [
            'Precise targeting to reach ideal customers',
            'Measurable campaign results and KPIs',
            'Lower cost per acquisition over time',
            'Real-time performance insights',
            'Transparent reporting and analytics',
            'Continuous optimization for best results'
        ],
        stats: { projects: '20+', satisfaction: '96%', growth: '350%' }
    },
    {
        id: '05',
        slug: 'event-planning',
        title: 'EVENT PLANNING',
        subtitle: 'Create Unforgettable Experiences',
        description: 'From corporate launches to tech conferences, we create memorable physical experiences that amplify your digital presence.',
        features: ['Coporate Events', 'Marketing Events', 'Event Promotions & Marketing','Wedding Planning & More...', 'On-site Coordination'], 
        image: "/see/SV1.webp",
        detailedDescription: 'We plan and execute exceptional events that leave lasting impressions. From intimate gatherings to large-scale conferences, we handle every detail to ensure your event is a success. Our team combines meticulous planning with creative flair to deliver experiences that engage and inspire.',
        process: [
            { step: '01', title: 'Ideation', desc: 'We develop the event concept, define objectives, and create a theme that aligns with your brand.' },
            { step: '02', title: 'Planning', desc: 'We handle venue selection, vendor coordination, and logistics management for seamless execution.' },
            { step: '03', title: 'Promotion', desc: 'We drive attendance through integrated marketing campaigns across digital and traditional channels.' },
            { step: '04', title: 'Execution', desc: 'Our team manages all on-site operations to ensure flawless delivery of your event.' }
        ],
        benefits: [
            'Memorable experiences that resonate',
            'Professional end-to-end coordination',
            'Integrated marketing and promotion',
            'Measurable event ROI tracking',
            'Stress-free planning process',
            'Post-event analysis and insights'
        ],
        stats: { projects: '40+', satisfaction: '100%', growth: '175%' }
    },
    {
        id: '06',
        slug: 'content-marketing',
        title: 'CONTENT MARKETING',
        subtitle: 'Tell Your Story Effectively',
        description: 'Storytelling that sells. We produce high-quality blogs, videos, and copy that establishes your authority in the market.',
        features: ['Copywriting', 'Video Production', 'Blog Management', 'Email Newsletters'],
        image: "/see/SCM1.webp",
        detailedDescription: 'Our content marketing services help you connect with your audience through compelling stories. We create content that educates, entertains, and converts across all channels. From blog posts to video content, we develop a content strategy that positions you as a thought leader in your industry.',
        process: [
            { step: '01', title: 'Strategy', desc: 'We define content pillars, create an editorial calendar, and align content with your business goals.' },
            { step: '02', title: 'Creation', desc: 'Our team produces high-quality content assets including articles, videos, and graphics.' },
            { step: '03', title: 'Distribution', desc: 'We publish and promote content across channels to maximize reach and engagement.' },
            { step: '04', title: 'Analysis', desc: 'We measure performance, gather insights, and continuously optimize our content strategy.' }
        ],
        benefits: [
            'Establish thought leadership in your field',
            'Increase organic traffic consistently',
            'Build audience trust and loyalty',
            'Generate qualified leads organically',
            'Improve SEO rankings over time',
            'Create evergreen content assets'
        ],
        stats: { projects: '300+', satisfaction: '98%', growth: '280%' }
    }
]

const ServiceDetailPage = () => {
    const params = useParams()
    const containerRef = useRef(null)
    const slug = params.slug

    // Find the service by slug
    const service = servicesData.find(s => s.slug === slug)

    // Handle 404
    if (!service) {
        notFound()
    }

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Hero Animation
            gsap.from('.hero-content', {
                y: 40,
                autoAlpha: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            })

            // Overview Section
            gsap.from('.overview-content', {
                scrollTrigger: {
                    trigger: '.overview-section',
                    start: 'top 85%',
                },
                y: 40,
                autoAlpha: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                clearProps: 'all'
            })

            // Process Timeline Animation
            gsap.from('.process-step', {
                scrollTrigger: {
                    trigger: '.process-section',
                    start: 'top 80%',
                },
                x: -30,
                autoAlpha: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                clearProps: 'all'
            })

            // Benefits Cards Animation
            gsap.from('.benefit-item', {
                scrollTrigger: {
                    trigger: '.benefits-section',
                    start: 'top 85%',
                },
                y: 30,
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
            <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-dark opacity-90"></div>
                </div>

                {/* Back Button */}
                <Link
                    href="/services"
                    className="absolute top-24 sm:top-28 left-4 sm:left-8 flex items-center gap-2 text-secondary hover:text-primary transition-colors font-montserrat text-sm z-10 font-bold"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Services</span>
                    <span className="sm:hidden">Back</span>
                </Link>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20 sm:pt-16">
                    <p className="hero-content font-montserrat text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary font-bold mb-3 sm:mb-4">
                        {service.subtitle}
                    </p>
                    <h1 className="hero-content font-ethnocentric text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-secondary mb-4 sm:mb-6 leading-tight font-bold">
                        {service.title}
                    </h1>
                    <p className="hero-content font-open-sans text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-bold">
                        {service.description}
                    </p>

                    {/* Quick Stats */}
                    <div className="hero-content flex flex-wrap justify-center gap-6 sm:gap-12 mt-8 sm:mt-12">
                        <div className="text-center">
                            <p className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl text-primary font-bold">{service.stats.projects}</p>
                            <p className="font-montserrat text-xs sm:text-sm text-secondary uppercase tracking-wider font-bold shadow-sm">Projects</p>
                        </div>
                        <div className="text-center">
                            <p className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl text-primary font-bold">{service.stats.satisfaction}</p>
                            <p className="font-montserrat text-xs sm:text-sm text-secondary uppercase tracking-wider font-bold shadow-sm">Satisfaction</p>
                        </div>
                        <div className="text-center">
                            <p className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl text-primary font-bold">{service.stats.growth}</p>
                            <p className="font-montserrat text-xs sm:text-sm text-secondary uppercase tracking-wider font-bold shadow-sm">Avg Growth</p>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-secondary rounded-full flex justify-center pt-2 shadow-lg">
                        <div className="w-1.5 h-3 bg-primary rounded-full"></div>
                    </div>
                </div>
            </section>

            {/* --- OVERVIEW SECTION --- */}
            <section className="overview-section py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Content */}
                        <div className="bg-background">
                            <p className="overview-content font-montserrat text-xs sm:text-sm tracking-[0.2em] uppercase text-primary font-bold mb-2">
                                Overview
                            </p>
                            <h2 className="overview-content font-ethnocentric text-2xl sm:text-3xl md:text-4xl text-accent mb-6 font-bold">
                                WHAT WE <span className="text-primary font-bold">DELIVER</span>
                            </h2>
                            <p className="overview-content font-open-sans text-text text-base sm:text-lg leading-relaxed mb-8 font-bold">
                                {service.detailedDescription}
                            </p>

                            {/* Features List */}
                            <div className="overview-content grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {service.features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 sm:p-4 bg-secondary rounded-lg border border-secondary hover:border-primary transition-colors shadow-sm"
                                    >
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 feature-icon rounded-lg flex items-center justify-center shrink-0 shadow-md">
                                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                                        </div>
                                        <span className="font-montserrat text-sm text-accent font-bold">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image */}
                        <div className="overview-content relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 service-card-gradient opacity-90"></div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 right-6 bg-background p-4 sm:p-6 rounded-xl shadow-xl border border-secondary opacity-95">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 feature-icon rounded-lg flex items-center justify-center shadow-lg">
                                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="font-montserrat font-bold text-accent text-sm sm:text-base">Premium Quality</p>
                                        <p className="font-open-sans text-text text-xs sm:text-sm font-bold shadow-sm">Industry-leading standards</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROCESS SECTION --- */}
            <section className="process-section py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-secondary">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="font-montserrat text-xs sm:text-sm tracking-[0.2em] uppercase text-primary font-bold mb-2">
                            How It Works
                        </p>
                        <h2 className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl text-accent font-bold">
                            OUR <span className="text-primary font-bold">PROCESS</span>
                        </h2>
                    </div>

                    <div className="space-y-0">
                        {service.process.map((step, idx) => (
                            <div
                                key={idx}
                                className="process-step relative flex flex-col sm:flex-row gap-4 sm:gap-8 pb-8 sm:pb-12 last:pb-0"
                            >
                                {/* Timeline Line */}
                                {idx !== service.process.length - 1 && (
                                    <div className="hidden sm:block absolute left-6 top-16 w-0.5 h-full timeline-line"></div>
                                )}

                                {/* Step Number */}
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-xl flex items-center justify-center shrink-0 z-10 shadow-lg">
                                    <span className="font-ethnocentric text-secondary text-sm sm:text-base font-bold">{step.step}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 bg-background p-5 sm:p-6 md:p-8 rounded-xl border border-secondary hover:border-primary transition-all shadow-sm hover:shadow-md">
                                    <h3 className="font-montserrat font-bold text-lg sm:text-xl text-accent mb-2 sm:mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="font-open-sans text-text text-sm sm:text-base leading-relaxed font-bold">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="benefits-section py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-background">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <p className="font-montserrat text-xs sm:text-sm tracking-[0.2em] uppercase text-primary font-bold mb-2">
                            Why Choose This Service
                        </p>
                        <h2 className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl text-accent font-bold">
                            KEY <span className="text-primary font-bold">BENEFITS</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {service.benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className="benefit-item flex items-start gap-4 p-5 sm:p-6 bg-secondary rounded-xl border border-secondary hover:border-primary card-hover-glow transition-all duration-300 shadow-sm"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center shrink-0 shadow-md">
                                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                                </div>
                                <p className="font-montserrat text-sm sm:text-base text-accent leading-relaxed font-bold">
                                    {benefit}
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
                    <p className="font-montserrat text-xs sm:text-sm tracking-[0.2em] uppercase text-primary font-bold mb-3 sm:mb-4">
                        Ready to Get Started?
                    </p>
                    <h2 className="font-ethnocentric text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-secondary mb-4 sm:mb-6 font-bold leading-tight">
                        LET US BUILD YOUR <span className="text-primary font-bold">{service.title}</span> STRATEGY
                    </h2>
                    <p className="font-open-sans text-secondary mb-8 sm:mb-10 text-base sm:text-lg px-2 font-bold shadow-sm">
                        Book a free consultation and discover how we can help transform your business.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 bg-primary text-secondary font-montserrat font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-sm hover:bg-secondary hover:text-accent transition-all duration-300 text-sm sm:text-base shadow-xl"
                        >
                            GET A FREE QUOTE <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-secondary text-secondary font-montserrat font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-sm hover:bg-secondary hover:text-accent transition-all duration-300 text-sm sm:text-base shadow-lg"
                            style={{ borderColor: 'rgba(245, 245, 245, 0.4)' }}
                        >
                            VIEW ALL SERVICES
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default ServiceDetailPage
