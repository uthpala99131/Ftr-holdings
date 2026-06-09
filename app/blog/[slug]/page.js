'use client'
import React, { useLayoutEffect, useRef, use, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, Linkedin, BookmarkPlus, ArrowUp, ChevronRight } from 'lucide-react'
import { blogs } from '@/data/blogs'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

const BlogPost = ({ params }) => {
    const containerRef = useRef(null)
    const [readingProgress, setReadingProgress] = useState(0)
    const [showScrollTop, setShowScrollTop] = useState(false)

    // Unwrap params using React.use() for Next.js 15+ compatibility
    const resolvedParams = use(params)
    const { slug } = resolvedParams

    const post = blogs.find(b => b.slug === slug)

    // Get related posts (same category, excluding current)
    const relatedPosts = blogs
        .filter(b => b.category === post?.category && b.slug !== slug)
        .slice(0, 3)

    // Reading progress tracker
    useEffect(() => {
        const updateReadingProgress = () => {
            const scrollTop = window.scrollY
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const progress = (scrollTop / docHeight) * 100
            setReadingProgress(progress)
            setShowScrollTop(scrollTop > 500)
        }

        window.addEventListener('scroll', updateReadingProgress)
        return () => window.removeEventListener('scroll', updateReadingProgress)
    }, [])

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useLayoutEffect(() => {
        if (!post) return

        const ctx = gsap.context(() => {
            // Hero Animation Sequence
            const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

            heroTl
                .from('.hero-bg-pattern', {
                    scale: 1.2,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'power2.out'
                })
                .from('.post-category', {
                    y: -30,
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, '-=1')
                .from('.post-title-word', {
                    y: 100,
                    opacity: 0,
                    rotationX: -45,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power4.out'
                }, '-=0.6')
                .from('.post-meta-item', {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.1
                }, '-=0.4')
                .from('.post-image-container', {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=0.6')

            // Parallax effect on hero background
            gsap.to('.hero-bg-pattern', {
                y: 150,
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            })

            // Content paragraphs stagger animation
            gsap.from('.post-content > *', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.post-content',
                    start: 'top 75%',
                }
            })

            // Related posts animation
            gsap.from('.related-post-card', {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.related-posts-section',
                    start: 'top 80%',
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [post])

    if (!post) {
        return notFound()
    }

    // Split title into words for animation
    const titleWords = post.title.split(' ')

    return (
        <div ref={containerRef} className="bg-accent min-h-screen text-secondary selection:bg-primary selection:text-secondary overflow-x-hidden">

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-secondary/10 z-50">
                <div
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Navigation / Back Button */}
            <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        href="/blog"
                        className="pointer-events-auto flex items-center gap-3 group bg-accent/80 backdrop-blur-md px-6 py-3 rounded-full border border-secondary/20 hover:bg-primary hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        <ArrowLeft className="w-4 h-4 text-secondary/80 group-hover:text-secondary transition-colors" />
                        <span className="font-montserrat font-bold text-xs text-secondary/80 group-hover:text-secondary uppercase tracking-wider hidden md:block transition-colors">
                            Back to Blog
                        </span>
                    </Link>

                    {/* Bookmark Button */}
                    <button className="pointer-events-auto w-12 h-12 bg-accent/80 backdrop-blur-md rounded-full border border-secondary/20 hover:bg-primary hover:border-primary shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
                        <BookmarkPlus className="w-5 h-5 text-secondary/80 group-hover:text-secondary transition-colors" />
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <header className="hero-section relative pt-32 md:pt-40 pb-24 px-6 bg-accent overflow-hidden border-b border-secondary/10">
                {/* Animated Background Pattern */}
                <div className="hero-bg-pattern absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#F5F5F515_1px,transparent_1px),linear-gradient(to_bottom,#F5F5F515_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* Category Badge */}
                    <div className="flex justify-center mb-8">
                        <span className="post-category inline-flex items-center gap-2 bg-primary/20 text-primary border-2 border-primary/30 font-montserrat text-xs font-bold px-6 py-3 rounded-full uppercase tracking-widest backdrop-blur-sm">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            {post.category}
                        </span>
                    </div>

                    {/* Title with word-by-word animation */}
                    <h1 className="text-center mb-12 leading-tight">
                        {titleWords.map((word, index) => (
                            <span
                                key={index}
                                className="post-title-word inline-block font-ethnocentric text-3xl md:text-5xl lg:text-6xl text-secondary mr-3 md:mr-4"
                            >
                                {word}
                            </span>
                        ))}
                    </h1>

                    {/* Meta Information */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        <div className="post-meta-item flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                                <Calendar className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                            </div>
                            <div>
                                <p className="font-montserrat text-secondary/50 text-[10px] uppercase tracking-wider">Published</p>
                                <p className="font-montserrat text-secondary text-sm font-bold">{post.date}</p>
                            </div>
                        </div>

                        <div className="post-meta-item flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                                <User className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                            </div>
                            <div>
                                <p className="font-montserrat text-secondary/50 text-[10px] uppercase tracking-wider">Author</p>
                                <p className="font-montserrat text-secondary text-sm font-bold">{post.author}</p>
                            </div>
                        </div>

                        <div className="post-meta-item flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                                <Clock className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                            </div>
                            <div>
                                <p className="font-montserrat text-secondary/50 text-[10px] uppercase tracking-wider">Read Time</p>
                                <p className="font-montserrat text-secondary text-sm font-bold">5 Min Read</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative bottom wave */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
                    <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-accent"></path>
                    </svg>
                </div>
            </header>

            {/* --- FEATURED IMAGE --- */}
            <div className="px-6 -mt-20 mb-24 relative z-20">
                <div className="post-image-container max-w-6xl mx-auto relative">
                    <div className="relative h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary/10 group bg-accent">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            priority
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 to-transparent"></div>
                    </div>

                    {/* Floating decorative elements */}
                    <div className="absolute -top-6 -left-6 w-24 h-24 border-4 border-primary/30 rounded-full -z-10 hidden md:block"></div>
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10 hidden md:block"></div>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 mb-24">

                {/* Sidebar - Social Share (Desktop) */}
                <aside className="hidden lg:block lg:col-span-2">
                    <div className="sticky top-32">
                        <p className="font-montserrat text-secondary/40 text-xs uppercase tracking-wider mb-4 font-bold">Share</p>
                        <div className="flex flex-col gap-3">
                            <button className="w-12 h-12 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary/80 hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300 group">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary/80 hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300 group">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary/80 hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300 group">
                                <Linkedin className="w-5 h-5" />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary/80 hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300 group">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Article Content */}
                <article className="lg:col-span-7">
                    {/* Drop cap first letter styling */}
                    <div
                        className="post-content font-open-sans text-secondary/80 text-lg leading-relaxed space-y-8
                        [&>p]:mb-6 
                        [&>p:first-of-type]:first-letter:text-7xl 
                        [&>p:first-of-type]:first-letter:font-ethnocentric 
                        [&>p:first-of-type]:first-letter:text-primary 
                        [&>p:first-of-type]:first-letter:float-left 
                        [&>p:first-of-type]:first-letter:mr-3
                        [&>p:first-of-type]:first-letter:leading-none
                        [&>h2]:font-ethnocentric 
                        [&>h2]:text-3xl 
                        [&>h2]:text-secondary 
                        [&>h2]:mt-16 
                        [&>h2]:mb-6
                        [&>h2]:pb-4
                        [&>h2]:border-b-2
                        [&>h2]:border-secondary/10
                        [&>h3]:font-ethnocentric
                        [&>h3]:text-xl
                        [&>h3]:text-secondary
                        [&>h3]:mt-10
                        [&>h3]:mb-4
                        [&>ul]:list-disc 
                        [&>ul]:pl-8 
                        [&>ul]:mb-6
                        [&>ul]:space-y-3
                        [&>li]:text-secondary/70
                        [&>li]:leading-relaxed
                        [&>strong]:text-secondary 
                        [&>strong]:font-bold
                        [&>blockquote]:border-l-4
                        [&>blockquote]:border-primary
                        [&>blockquote]:pl-6
                        [&>blockquote]:py-4
                        [&>blockquote]:my-8
                        [&>blockquote]:italic
                        [&>blockquote]:text-secondary/60
                        [&>blockquote]:bg-secondary/5
                        [&>code]:bg-secondary/5
                        [&>code]:px-2
                        [&>code]:py-1
                        [&>code]:rounded
                        [&>code]:text-sm
                        [&>code]:font-mono
                        [&>code]:text-primary"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Tags Section */}
                    <div className="mt-16 pt-8 border-t border-secondary/10">
                        <p className="font-montserrat text-secondary/40 text-xs uppercase tracking-wider mb-4 font-bold">Tagged In</p>
                        <div className="flex flex-wrap gap-3">
                            {post.tags && post.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="group font-montserrat text-sm font-bold text-secondary/60 bg-secondary/5 hover:bg-primary hover:text-secondary px-5 py-2 rounded-full uppercase tracking-wider border border-secondary/5 hover:border-primary transition-all duration-300 cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Share Section (Mobile) */}
                    <div className="share-section lg:hidden mt-12 p-8 bg-secondary/5 rounded-2xl border border-secondary/10">
                        <div className="flex items-center justify-between mb-6">
                            <span className="font-ethnocentric text-xl text-secondary">Share Article</span>
                            <Share2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 h-12 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="flex-1 h-12 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="flex-1 h-12 rounded-full bg-secondary/5 border border-secondary/10 flex items-center justify-center text-secondary hover:bg-primary hover:text-secondary hover:border-primary transition-all duration-300">
                                <Linkedin className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Author Card */}
                    <div className="author-card mt-16 p-8 bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl border border-secondary/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-primary/30 flex items-center justify-center overflow-hidden">
                                    <User className="w-10 h-10 text-primary" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row items-center gap-3 mb-2">
                                    <h3 className="font-ethnocentric text-xl text-secondary">{post.author}</h3>
                                    <span className="font-montserrat text-[10px] text-primary bg-primary/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                                        Author
                                    </span>
                                </div>
                                <p className="font-open-sans text-secondary/70 text-sm leading-relaxed mb-4">
                                    Digital marketing strategist and content creator with over 10 years of experience
                                    helping brands achieve their online goals.
                                </p>
                                <Link href="/blog">
                                <button className="font-montserrat text-sm font-bold text-primary hover:text-secondary transition-colors inline-flex items-center gap-2 group/btn">
                                    View all articles
                                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Sidebar - Quick Stats & Related (Desktop) */}
                <aside className="hidden lg:block lg:col-span-3">
                    <div className="sticky top-32 space-y-8">
                        {/* Quick Stats */}
                        <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/10 backdrop-blur-sm">
                            <h3 className="font-ethnocentric text-sm text-secondary mb-4 uppercase tracking-wider">Quick Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-open-sans text-sm text-secondary/60">Reading Progress</span>
                                    <span className="font-montserrat text-sm font-bold text-primary">{Math.round(readingProgress)}%</span>
                                </div>
                                <div className="w-full h-2 bg-secondary/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-300 ease-out"
                                        style={{ width: `${readingProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        {/* Mini Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div className="bg-secondary/5 p-6 rounded-2xl border border-secondary/10 backdrop-blur-sm">
                                <h3 className="font-ethnocentric text-sm text-secondary mb-6 uppercase tracking-wider">Related Reads</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((related, index) => (
                                        <Link
                                            key={index}
                                            href={`/blog/${related.slug}`}
                                            className="group block"
                                        >
                                            <div className="flex gap-3 items-start">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-secondary/10">
                                                    <Image
                                                        src={related.image}
                                                        alt={related.title}
                                                        fill
                                                        sizes="100px"
                                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-montserrat text-xs font-bold text-secondary group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                                        {related.title}
                                                    </h4>
                                                    <p className="font-open-sans text-[10px] text-secondary/40">{related.date}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {/* --- RELATED POSTS SECTION (Full Width) --- */}
            {relatedPosts.length > 0 && (
                <section className="related-posts-section py-24 px-6 bg-accent border-t border-secondary/10">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-montserrat text-primary text-sm tracking-[0.4em] font-bold uppercase">
                                [ Keep Reading ]
                            </span>
                            <h2 className="font-ethnocentric text-4xl md:text-5xl text-secondary mt-4">
                                RELATED <span className="text-primary">ARTICLES</span>
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((related, index) => (
                                <Link
                                    key={index}
                                    href={`/blog/${related.slug}`}
                                    className="related-post-card group bg-secondary/5 rounded-2xl overflow-hidden border border-secondary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={related.image}
                                            alt={related.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 to-transparent"></div>
                                        <span className="absolute top-4 left-4 bg-primary text-secondary font-montserrat text-[10px] font-bold px-4 py-2 uppercase tracking-wider">
                                            {related.category}
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-ethnocentric text-lg text-secondary group-hover:text-primary transition-colors mb-3 line-clamp-2">
                                            {related.title}
                                        </h3>
                                        <p className="font-open-sans text-sm text-secondary/60 line-clamp-2 mb-4">
                                            {related.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-montserrat text-secondary/40">{related.date}</span>
                                            <div className="flex items-center gap-2 font-montserrat font-bold text-primary group-hover:gap-3 transition-all">
                                                Read More
                                                <ChevronRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* --- SCROLL TO TOP BUTTON --- */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-primary text-secondary rounded-full shadow-2xl flex items-center justify-center hover:bg-secondary hover:text-accent transition-all duration-300 group animate-bounce"
                >
                    <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
            )}

        </div>
    )
}

export default BlogPost