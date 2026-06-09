'use client'
import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Calendar, User, Tag } from 'lucide-react'
import { blogs } from '@/data/blogs'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const BlogPage = () => {
  const containerRef = useRef(null)

  // Use imported blogs
  // slice(1) to skip the first one which is featured
  const posts = blogs.slice(1)
  const featuredPost = blogs[0]

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Hero Animations
      const tl = gsap.timeline()
      tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-title', { y: 100, opacity: 0, duration: 1, stagger: 0.15, ease: 'power4.out' }, '-=0.5')
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')
        .from('.featured-card', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')

      // Parallax Background
      gsap.to('.hero-bg-pattern', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      })

      // Blog Grid Batched Animation
      ScrollTrigger.batch('.blog-card', {
        onEnter: (elements) => {
          gsap.fromTo(elements,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', overwrite: true }
          )
        },
        start: 'top 85%',
        once: true
      })

      // Newsletter Reveal
      ScrollTrigger.create({
        trigger: '.newsletter-section',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo('.newsletter-content',
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out' }
          )
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-accent selection:bg-primary selection:text-white">

      {/* --- HERO SECTION (Dark Theme) --- */}
      <section className="relative pt-32 pb-24 px-6 bg-accent border-b border-white/10 overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] hero-bg-pattern"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="hero-badge font-montserrat text-primary text-sm tracking-[0.4em] font-bold uppercase mb-4 inline-block">
              [ Knowledge Hub ]
            </p>
            <h1 className="font-ethnocentric text-4xl md:text-6xl text-white mb-6 overflow-hidden">
              <span className="hero-title inline-block">LATEST</span> <span className="hero-title text-primary inline-block">INSIGHTS</span>
            </h1>
            <p className="hero-subtitle font-open-sans text-secondary/60 text-lg max-w-2xl mx-auto">
              Fresh Perspectives on Digital Trends, Creativity, and Technology
            </p>
          </div>

          {/* --- FEATURED POST --- */}
          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="featured-card group relative w-full h-[500px] rounded-xl overflow-hidden cursor-pointer shadow-2xl border border-white/10">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                <span className="inline-block bg-primary text-white font-montserrat text-xs font-bold px-3 py-1 mb-4 rounded-sm uppercase tracking-wider">
                  {featuredPost.category}
                </span>
                <h2 className="font-ethnocentric text-2xl md:text-4xl text-white mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="font-open-sans text-secondary/80 text-lg mb-6 line-clamp-2 md:line-clamp-none">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-6 text-secondary/60 font-montserrat text-xs tracking-wider uppercase">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {featuredPost.author}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* --- BLOG GRID (Light Theme) --- */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-ethnocentric text-2xl text-accent">Recent Articles</h3>
            <div className="h-[1px] bg-accent/10 flex-grow ml-8 hidden md:block"></div>
          </div>

          <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block h-full">
                <article
                  className="blog-card group flex flex-col h-full bg-white border border-gray-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 rounded-lg overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur text-accent font-montserrat text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider border border-accent/10 shadow-sm">
                        [ {post.category} ]
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500"></div>

                    <div className="flex items-center gap-3 text-accent/40 text-xs font-montserrat mb-4 group-hover:text-primary/70 transition-colors">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>

                    <h3 className="font-ethnocentric text-lg text-accent mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="font-open-sans text-accent/60 text-sm leading-relaxed mb-6 flex-grow line-clamp-3 group-hover:text-accent/80 transition-colors">
                      {post.excerpt}
                    </p>

                    <button className="flex items-center gap-2 font-montserrat font-bold text-xs text-accent uppercase tracking-widest group-hover:text-primary transition-colors mt-auto group/btn">
                      Read Article <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-20 text-center">
            <button className="border border-accent/20 text-accent font-montserrat font-bold py-4 px-12 hover:bg-primary hover:text-white transition-all duration-300">
              LOAD MORE STORIES
            </button>
          </div>

        </div>
      </section>

      {/* --- NEWSLETTER CTA --- */}
      <section className="newsletter-section py-20 bg-accent relative overflow-hidden text-center px-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="newsletter-content relative z-10 max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <Tag className="w-8 h-8" />
          </div>
          <h2 className="font-ethnocentric text-3xl text-white mb-4">
            STAY AHEAD OF THE CURVE
          </h2>
          <p className="font-open-sans text-secondary/60 mb-8">
            Join 5,000+ founders and developers getting our weekly tech & marketing deep dives.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow bg-white/5 border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-primary transition-colors font-open-sans placeholder:text-white/20"
            />
            <button className="bg-primary text-white font-montserrat font-bold px-8 py-4 hover:bg-white hover:text-accent transition-all duration-300 whitespace-nowrap">
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default BlogPage