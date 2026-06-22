'use client'

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Filter, CheckCircle2, TrendingUp, Users, Zap, ChevronLeft, ChevronRight, Play, X, Film, Tv } from 'lucide-react'
import {
SiAdobephotoshop,
SiAdobeaftereffects,
SiAdobeillustrator,
SiAdobepremierepro,
SiFigma,
SiNextdotjs,
SiNodedotjs,
SiMongodb,
SiReact,
SiTailwindcss,
SiTypescript,
SiMeta,
SiGoogleads,
SiMailchimp,
SiHubspot,
SiGoogleanalytics,
SiSemrush,
SiFacebook,
SiYoutube,
SiInstagram,
SiTiktok,
SiLinkedin,
SiX
} from 'react-icons/si'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

function ProjectCard({ project }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered || !project.images || project.images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % project.images.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [isHovered, project.images])

  const handlePrev = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
  }

  const handleNext = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCurrentIndex(0)
      }}
      className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 rounded-lg flex flex-col h-full group"
    >
      <div className="relative w-full aspect-video overflow-hidden select-none bg-gray-50">
        {project.images && project.images.length > 0 ? (
          <>
            <Image
              src={project.images[currentIndex]}
              alt={`${project.title} - Image ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 cursor-pointer z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 cursor-pointer z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dots */}
            {project.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                {project.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(idx)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Images Available
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold font-montserrat text-accent mb-2 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm font-open-sans leading-relaxed mb-6">
            {project.desc}
          </p>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
            {project.category}
          </span>
          <ArrowUpRight className="w-5 h-5 text-accent/60 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
      </div>
    </div>
  )
}

function VideoCard({ video, onPlayClick }) {
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!videoRef.current) return
    if (isHovered) {
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {})
      }
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0.5
    }
  }, [isHovered])

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onPlayClick(video)}
      className={`relative group overflow-hidden bg-black/40 border border-white/10 hover:border-primary/50 rounded-2xl cursor-pointer transition-all duration-500 shadow-xl flex flex-col justify-between w-full ${
        video.aspect === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'
      }`}
    >
      {/* Video Element */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-neutral-900">
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            e.target.currentTime = 0.5
            setIsLoaded(true)
          }}
          className={`w-full h-full object-cover transition-opacity duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Cinematic dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 group-hover:from-black/95 group-hover:via-black/30 group-hover:to-black/45 transition-all duration-300 z-10" />
      </div>

      {/* Top Details (Category & Play Icon) */}
      <div className="relative z-20 p-6 flex justify-between items-start">
        <span className="font-montserrat text-white text-[9px] tracking-widest font-black uppercase bg-primary border border-primary/20 px-3 py-1.5 rounded-full shadow-lg">
          {video.category}
        </span>
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <Play className="w-4 h-4 text-white fill-white translate-x-[1px]" />
        </div>
      </div>

      {/* Bottom Details (Title & Short Desc) */}
      <div className="relative z-20 p-6 pt-0 mt-auto transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
        <h4 className="font-ethnocentric text-xs md:text-sm text-white mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-1">
          {video.title}
        </h4>
        <p className="font-open-sans text-white/70 text-[11px] line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {video.desc}
        </p>
        
        {/* Sub-details (Tags / Info) */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {video.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="text-[9px] font-montserrat text-white/40 tracking-wider font-semibold">
              #{tag.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Glow border overlay */}
      <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/40 transition-all duration-300 rounded-2xl pointer-events-none z-30" />
    </div>
  )
}


export default function PortfolioPage() {

const containerRef = useRef(null)
const videoSectionRef = useRef(null)

const [filter, setFilter] = useState('All')
const [videoFilter, setVideoFilter] = useState('All')
const [activeVideo, setActiveVideo] = useState(null)
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setActiveVideo(null)
    }
  }
  if (activeVideo) {
    window.addEventListener('keydown', handleKeyDown)
  }
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [activeVideo])



/* ---------------- PAGINATION STATE ---------------- */

const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 8

/* -------------------------------- PROJECTS -------------------------------- */

const projects = [
  {
    id: 6,
    title: 'Social Media Marketing',
    category: 'Digital Marketing',
    desc: 'A full-suite social media management strategy focusing on consistent brand storytelling, engagement growth, interactive content scheduling, and community building across multiple channels.',
    images: [
      '/project/marketing/SM2.jpg',
      '/project/marketing/SM3.jpg',
      '/project/marketing/SM1.jpg',
      '/project/marketing/SM6.jpg'
    ]
  },
    {
    id: 5,
    title: 'Branding',
    category: 'Digital Marketing',
    desc: 'A high-impact, data-driven marketing campaign tailored to expand reach and optimize user acquisition, leveraging targeted ads, detailed performance tracking, and custom conversion funnel designs.',
    images: [
      '/project/marketing/SMB5.jpg',
      '/project/marketing/SMb4.jpg'
    ]
  },

  // Web & IT solutions (webmobile)
  {
    id: 1,
    title: 'Smart Spent Mobile Application',
    category: 'Web & IT solutions',
    desc: 'A next-generation financial tracking application designed to help users budget, track expenses, and analyze spending patterns with real-time charts, automated transaction tagging, and secure cloud sync.',
    images: [
      '/project/webmobile/sma1.webp',
      '/project/webmobile/sma2.webp',
      '/project/webmobile/sma3.webp'
    ]
  },
  {
    id: 2,
    title: 'Seeker Moments',
    category: 'Web & IT solutions',
    desc: 'A premium portfolio website for professional photographers, featuring high-resolution galleries, fluid grid layouts, category-based filtering, and a seamless client booking system.',
    images: [
      '/project/webmobile/seek1.webp',
      '/project/webmobile/seek2.webp',
      '/project/webmobile/seek3.webp'
    ]
  },
  {
    id: 3,
    title: 'Liyo Travels',
    category: 'Web & IT solutions',
    desc: 'A comprehensive travel booking platform for travel agencies, supporting customizable tour packages, interactive destination guides, secure online reservations, and itinerary builders.',
    images: [
      '/project/webmobile/liyo1.png',
      '/project/webmobile/liyo2.png',
      '/project/webmobile/liyo3.png'
    ]
  },
  {
    id: 113,
    title: 'Kaveesha Wadugoda Portfolio Website',
    category: 'Web & IT solutions',
    desc: 'A modern and professional personal portfolio website showcasing creative expertise, featured projects, skills, and career achievements. Designed with an engaging user interface, seamless navigation, and interactive sections to highlight experience, services, and professional branding.',
    images: [
      '/project/webmobile/kavi1.png',
      '/project/webmobile/kavi2.png',
      '/project/webmobile/kavi3.png'
    ]
  },
  {
    id: 4,
    title: 'Farm Management System',
    category: 'Web & IT solutions',
    desc: 'A robust, offline-capable Point of Sale (POS) and inventory management system designed for agricultural enterprises, featuring livestock tracking, harvest logs, and sales analytics.',
    images: [
      '/project/webmobile/farm1.webp',
      '/project/webmobile/farm2.webp'
    ]
  },

  // Digital Marketing (marketing)


  // Design & Branding (design)
  {
    id: 7,
    title: 'Maths Class Designs',
    category: 'Design & Branding',
    desc: 'A creative branding and design collection tailored for educational institutes, featuring engaging flyer designs, promotional banners, and visual aids built to attract student enrollment.',
    images: [
      '/project/design/ma3.jpg',
'/project/design/TC14.jpg',
'/project/design/TC13.jpg',
'/project/design/TC12.jpg',
'/project/design/TC5.jpg',
      '/project/design/ma1.jpg',
      '/project/design/ma2.jpg'
      
    ]
  },
  {
    id: 8,
    title: 'Combined Maths',
    category: 'Design & Branding',
    desc: 'A specialized academic design series for advanced level mathematics classes, featuring structured educational poster layouts, custom graphs, and conceptual infographics.',
    images: [
      '/project/design/mat1.jpg',
      '/project/design/mat2.jpg',
      '/project/design/mat3.jpg'
    ]
  },
  {
    id: 9,
    title: 'Science Class',
    category: 'Design & Branding',
    desc: 'A vibrant visual branding series created for science courses, utilizing clean icons, custom illustrations, and color-coded materials to simplify complex scientific theories for students.',
    images: [
      '/project/design/sc1.jpg',
      '/project/design/sc2.jpg',
      '/project/design/sc3.jpg'
    ]
  }
]

const reelsData = [
  {
    id: 1,
    title: 'FTR Global Brand Anthem',
    category: 'Brand Commercial',
    desc: 'The official brand introduction video for FTR Global, highlighting our vision, team, and digital excellence.',
    videoUrl: '/reels/FTR1.mp4',
    aspect: 'horizontal',
    client: 'FTR Global',
    year: '2026',
    tags: ['Brand', 'Commercial', 'Corporate']
  },
  {
    id: 2,
    title: 'Viraga Wedding Center ',
    category: 'Business Promo',
    desc: 'A premium, high-octane cinematic promotion capturing the sleek aesthetics and dynamic performance of the latest Volkswagen series.',
    videoUrl: '/reels/VW(P)_2.mp4',
    aspect: 'vertical',
    client: 'Viraga Wedding Center',
    year: '2026',
    tags: ['Fashion', 'Lifestyle', 'Fast Cut']
  },
  {
    id: 3,
    title: 'Auto Brokers',
    category: 'AI Video',
    desc: 'High-energy fashion reel showing youth culture and streetwear aesthetics for the Alpha Brand.',
    videoUrl: '/reels/AB1.mp4',
    aspect: 'vertical',
    client: 'Auto Brokers',
    year: '2026',
     tags: ['Cinematic', 'Automotive', 'Color Grading']
  },
  {
    id: 4,
    title: 'Directline Limited - Episode 1',
    category: 'Luxury Lifestyle',
    desc: 'Episode 1 of the Directline Limited series, showcasing high-end architecture and premium modern living.',
    videoUrl: '/reels/DLL1.mp4',
    aspect: 'vertical',
    client: 'Directline Limited',
    year: '2025',
    tags: ['Reels', 'Business']
  },
  {
    id: 5,
    title: 'Directline Limited - Episode 2',
    category: 'Luxury Lifestyle',
    desc: 'Episode 2 of the Directline Limited series, featuring modern urban fashion and high-end automotive design.',
    videoUrl: '/reels/DLL2.mp4',
    aspect: 'vertical',
    client: 'Directline Limited',
    year: '2025',
    tags: ['Reels', 'Business']
  },
  {
    id: 6,
    title: 'Directline Limited - Episode 3',
    category: 'Luxury Lifestyle',
    desc: 'Episode 3 of the Directline Limited series, focusing on luxury travel, tropical getaways, and resort living.',
    videoUrl: '/reels/DLL3.mp4',
    aspect: 'vertical',
    client: 'Directline Limited',
    year: '2025',
    tags: ['Reels', 'Business']
  },
  {
    id: 7,
    title: 'Directline Limited - Episode 4',
    category: 'Luxury Lifestyle',
    desc: 'Episode 4 of the Directline Limited series, highlighting fitness, morning routines, and wellness aesthetics.',
    videoUrl: '/reels/DLL4.mp4',
    aspect: 'vertical',
    client: 'Directline Limited',
    year: '2026',
    tags: ['Reels', 'Business']
  },
   {
    id: 18,
    title: 'ONE Shoot - FTR Global',
    category: 'Luxury Lifestyle',
    desc: 'One shoot. One unforgettable vibe. ',
    videoUrl: '/reels/ONE.mp4',
    aspect: 'vertical',
    client: 'Sigiri rest',
    year: '2026',
    tags: ['Reels', 'Hotel & Tourism']
  },
  {
    id: 8,
    title: 'Directline Limited - Episode 5',
    category: 'Luxury Lifestyle',
    desc: 'The season finale of the Directline Limited series, exploring nightlife, city lights, and premium dining experiences.',
    videoUrl: '/reels/DLL5.mp4',
    aspect: 'vertical',
    client: 'Directline Limited',
    year: '2026',
    tags: ['Reels', 'Business']
  },
  {
    id: 9,
    title: 'Thilina & Naduni Wedding Day',
    category: 'Event Promotion',
    desc: 'An immersive, rhythm-synchronized reel capturing the vibrant energy and crowd response at the Urban Beats festival.',
    videoUrl: '/reels/EV1.mp4',
    aspect: 'vertical',
    client: 'Thilina & Naduni',
    year: '2026',
    tags: ['Wedding', 'Event', 'Vibrant']
  },
  {
    id: 10,
    title: 'FTR Innovation Loop',
    category: 'Brand Commercial',
    desc: 'A fast-paced motion graphics loop showing FTR\'s capabilities in software, design, and marketing.',
    videoUrl: '/reels/FTR2.mp4',
    aspect: 'horizontal',
    client: 'FTR Global',
    year: '2026',
    tags: ['Motion Graphics', 'Brand', 'Abstract']
  },
  {
    id: 11,
    title: 'Goblin\' Event Builders',
    category: 'Corporate Storytelling',
    desc: 'Corporate branding reel designed for modern founders, combining expert advice with high-end b-roll footage.',
    videoUrl: '/reels/GEB.mp4',
    aspect: 'vertical',
    client: 'GEB',
    year: '2026',
    tags: ['Event', 'Promotion', 'Storytelling']
  },
   {
    id: 3,
    title: 'SuhadaFibers',
    category: 'Business Promo',
    desc: 'High-energy fashion reel showing youth culture and streetwear aesthetics for the Alpha Brand.',
    videoUrl: '/reels/SFG(L).mp4',
    aspect: 'vertical',
    client: 'Suhada Fiber Glass',
    year: '2026',
     tags: ['Cinematic', 'Automotive', 'Color Grading']
  },
]

/* -------------------------------- FILTERS -------------------------------- */

const categories = [
  'All', 'Web & IT solutions', 'Digital Marketing', 'Design & Branding'
]

let filteredProjects = projects

if (filter !== 'All') {
  filteredProjects = filteredProjects.filter(p => p.category === filter)
}

/* ---------------- PAGINATION LOGIC ---------------- */

const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)

const startIndex = (currentPage - 1) * itemsPerPage
const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

/* -------------------------------- STATS -------------------------------- */

const stats=[
{number:'100+',label:'Projects Delivered',icon:CheckCircle2},
{number:'98%',label:'Client Satisfaction',icon:TrendingUp},
{number:'50+',label:'Happy Clients',icon:Users},
{number:'24/7',label:'Support Available',icon:Zap}
]

/* -------------------------------- TECH STACK -------------------------------- */

const SiCapcut = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91V8.72L6.354 12 0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12 24.19 6.443zM9.982 13.873l7.797 4.083H2.157l7.825-4.083zm7.741-7.828l-7.742 4.057-7.825-4.057h15.567z" />
  </svg>
)

const designTools=[
{icon:SiAdobephotoshop,name:'Photoshop',color:'#31A8FF'},
{icon:SiAdobeaftereffects,name:'After Effects',color:'#9999FF'},
{icon:SiAdobeillustrator,name:'Illustrator',color:'#FF9A00'},
{icon:SiAdobepremierepro,name:'Premiere Pro',color:'#9999FF'},
{icon:SiCapcut,name:'CapCut',color:'#25F4EE'},
{icon:SiFigma,name:'Figma',color:'#F24E1E'}
]

const webStack=[
{icon:SiNextdotjs,name:'Next.js',color:'#000'},
{icon:SiNodedotjs,name:'Node.js',color:'#339933'},
{icon:SiMongodb,name:'MongoDB',color:'#47A248'},
{icon:SiReact,name:'React',color:'#61DAFB'},
{icon:SiTailwindcss,name:'Tailwind',color:'#06B6D4'},
{icon:SiTypescript,name:'TypeScript',color:'#3178C6'}
]

const marketingTools=[
{icon:SiMeta,name:'Meta Ads',color:'#0081FB'},
{icon:SiGoogleads,name:'Google Ads',color:'#4285F4'},
{icon:SiMailchimp,name:'Mailchimp',color:'#FFE01B'},
{icon:SiHubspot,name:'HubSpot',color:'#FF7A59'},
{icon:SiGoogleanalytics,name:'Analytics',color:'#E37400'},
{icon:SiSemrush,name:'SEMrush',color:'#FF642D'}
]

const socialMediaTools = [
  { icon: SiFacebook, name: 'Facebook', color: '#1877F2', href: 'https://www.facebook.com/share/1BVhTYsyx6/' },
  { icon: SiYoutube, name: 'YouTube', color: '#FF0000', href: 'https://youtube.com/@ftr_global?si=Qx4tDnbtqYmLg2r9' },
  { icon: SiInstagram, name: 'Instagram', color: '#E1306C', href: 'https://www.instagram.com/ftr_globals?igsh=MXFtMjc0dzcwcjhicA==' },
  { icon: SiTiktok, name: 'TikTok', color: '#FFFFFF', href: 'https://tiktok.com/@ftrglobal' },
  { icon: SiLinkedin, name: 'LinkedIn', color: '#0A66C2', href: 'https://www.linkedin.com/company/ftr-holdings/' },
  { icon: SiX, name: 'X', color: '#FFFFFF', href: 'https://x.com' }
]

/* -------------------------------- ANIMATIONS -------------------------------- */

useLayoutEffect(()=>{
const ctx=gsap.context(()=>{

gsap.from('.hero-title',{
y:100,
opacity:0,
duration:1
})

},containerRef)

return()=>ctx.revert()

},[])

/* -------------------------------- UI -------------------------------- */

return(

<div ref={containerRef} className="bg-white min-h-screen">

{/* HERO + OTHER SECTIONS (UNCHANGED) */}

{/* --- HERO SECTION --- */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-accent">
        {/* Animated Background Pattern */}
        <div className="hero-bg-pattern absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
          <div className="hero-badge inline-block mb-8">
            <span className="font-montserrat text-primary text-xs tracking-[0.4em] font-bold px-6 py-3 border-2 border-primary uppercase">
              Digital Excellence
            </span>
          </div>

          <h1 className="mb-8 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <span className="hero-title-word font-ethnocentric text-5xl md:text-8xl text-white inline-block">
                CRAFTING
              </span>
              <span className="hero-title-word font-ethnocentric text-5xl md:text-8xl text-primary inline-block">
                DIGITAL
              </span>
            </div>
            <div className="flex justify-center mt-4">
              <span className="hero-title-word font-ethnocentric text-5xl md:text-8xl text-white inline-block">
                EXCELLENCE
              </span>
            </div>
          </h1>

          <p className="hero-subtitle font-open-sans text-secondary/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
            We transform ambitious ideas into powerful digital experiences through
            cutting-edge development, strategic marketing, and innovative design.
          </p>

          <button 
            onClick={() => {
              videoSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="hero-cta magnetic-btn group relative px-10 py-5 overflow-hidden transition-all duration-500 cursor-pointer"
          >
            {/* Background Layers */}
            <div className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-expo"></div>
            <div className="absolute inset-0 border-2 border-primary group-hover:border-white/20 transition-colors duration-500"></div>

            {/* Shine Effect */}
            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-35deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>

            {/* Content */}
            <div className="relative flex items-center gap-4">
              <span className="font-montserrat font-black text-sm tracking-[0.3em] text-white group-hover:text-white transition-colors duration-300">
                EXPLORE OUR WORK
              </span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-primary/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
          </div>
          <span className="font-montserrat text-white/50 text-xs tracking-widest">SCROLL</span>
        </div>
      </section>


{/* --- STATS SECTION --- */}
      <section className="stats-section py-24 bg-accent relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="font-montserrat text-primary text-sm tracking-[0.4em] font-bold uppercase">
              [ By The Numbers ]
            </span>
            <h2 className="font-ethnocentric text-4xl md:text-5xl text-white mt-4">
              PROVEN <span className="text-primary">IMPACT</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card relative group p-8 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-500 overflow-hidden"
              >
                {/* Glowing corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon */}
                <div className="relative w-14 h-14 mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-primary to-red-700 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Number */}
                <h3 className="font-ethnocentric text-4xl md:text-5xl text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.number}
                </h3>
                <p className="font-open-sans text-white/60 text-sm">{stat.label}</p>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* ---------------- FILTER BAR ---------------- */}

<div className="bg-white border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <span className="font-montserrat text-accent font-bold text-sm tracking-wider">FILTER:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-montserrat text-xs tracking-widest font-bold px-6 py-3 transition-all duration-300 ${filter === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-accent/40 hover:text-primary border border-transparent hover:border-accent/20'
                  }`}>
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
    </div>
</div>




{/* ---------------- PORTFOLIO GRID ---------------- */}

<section className="py-20">

<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

{currentProjects.map((project) => (
  <ProjectCard key={project.id} project={project} />
))}

</div>

{/* ---------------- PAGINATION ---------------- */}



</section>

{/* --- VIDEO GALLERY SECTION --- */}
<section ref={videoSectionRef} className="py-24 bg-accent relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
  </div>
  
  <div className="max-w-7xl mx-auto px-6 relative z-10">
    {/* Header */}
    <div className="text-center mb-16">
      <span className="font-montserrat text-primary text-sm tracking-[0.4em] font-bold uppercase">
        [ Video Gallery ]
      </span>
      <h2 className="font-ethnocentric text-4xl md:text-5xl text-white mt-4 mb-4">
        REELS & <span className="text-primary">CINEMATICS</span>
      </h2>
      <p className="font-open-sans text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
        High-impact vertical storytelling, commercial projects, and brand campaigns designed to captivate audiences.
      </p>
    </div>

    {/* Video Filter Tabs */}
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-white/5 border border-white/10 p-1.5 rounded-full backdrop-blur-md">
        {['All', 'Reels & Shorts', 'Commercials & Brand'].map((tab) => {
          const filterValue = tab === 'Reels & Shorts' ? 'vertical' : tab === 'Commercials & Brand' ? 'horizontal' : 'All'
          return (
            <button
              key={tab}
              onClick={() => setVideoFilter(filterValue)}
              className={`font-montserrat text-xs tracking-wider font-bold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer ${
                (filterValue === 'All' && videoFilter === 'All') || (filterValue === 'vertical' && videoFilter === 'vertical') || (filterValue === 'horizontal' && videoFilter === 'horizontal')
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          )
        })}
      </div>
    </div>

    {/* Masonry Grid */}
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:balance] w-full">
      {reelsData
        .filter(v => videoFilter === 'All' || v.aspect === videoFilter)
        .map((video) => (
          <div key={video.id} className="break-inside-avoid mb-6 block w-full">
            <VideoCard video={video} onPlayClick={setActiveVideo} />
          </div>
        ))}
    </div>
  </div>
</section>

{/* REST OF YOUR SECTIONS (UNCHANGED) */}


{/* --- TECH STACK SECTION --- */}
      <section className="tech-section py-24 bg-secondary relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="font-montserrat text-primary text-sm tracking-[0.4em] font-bold uppercase">
              [ Our Arsenal ]
            </span>
            <h2 className="font-ethnocentric text-4xl md:text-6xl text-accent mt-4 mb-4">
              TOOLS & <span className="text-primary">TECHNOLOGIES</span>
            </h2>
            <p className="font-open-sans text-accent/60 text-lg max-w-2xl mx-auto">
              Cutting-edge technologies that power our creative and development processes
            </p>
          </div>

          {/* Tech Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Design Stack */}
            <div className="group bg-white p-8 border border-gray-200 hover:border-primary/30 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-primary/10">
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-red-400"></div>

              {/* Floating decoration */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-montserrat text-primary text-xs font-bold tracking-wider">CREATIVE SUITE</span>
                </div>
                <h3 className="font-ethnocentric text-2xl text-accent">DESIGN</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {designTools.map((tool, index) => (
                  <div key={index} className="tech-icon group/icon flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-current opacity-20 rounded-lg blur-lg scale-0 group-hover/icon:scale-100 transition-transform duration-300" style={{ color: tool.color }}></div>
                      <tool.icon className="relative w-10 h-10 md:w-12 md:h-12 group-hover/icon:scale-110 transition-transform duration-300" style={{ color: tool.color }} />
                    </div>
                    <span className="font-montserrat text-[10px] md:text-xs text-accent/70 font-medium text-center">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Dev Stack */}
            <div className="group bg-accent p-8 border border-white/10 hover:border-primary/50 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-primary/20">
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-red-400"></div>

              {/* Floating decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/20 rounded-full mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-montserrat text-primary text-xs font-bold tracking-wider">FULL STACK</span>
                </div>
                <h3 className="font-ethnocentric text-2xl text-white">DEVELOPMENT</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {webStack.map((tool, index) => (
                  <div key={index} className="tech-icon group/icon flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-current opacity-30 rounded-lg blur-lg scale-0 group-hover/icon:scale-100 transition-transform duration-300" style={{ color: tool.color }}></div>
                      <tool.icon className="relative w-10 h-10 md:w-12 md:h-12 group-hover/icon:scale-110 transition-transform duration-300" style={{ color: tool.color }} />
                    </div>
                    <span className="font-montserrat text-[10px] md:text-xs text-white/70 font-medium text-center">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marketing Stack */}
            <div className="group bg-white p-8 border border-gray-200 hover:border-primary/30 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-primary/10">
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-red-400"></div>

              {/* Floating decoration */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-montserrat text-primary text-xs font-bold tracking-wider">GROWTH STACK</span>
                </div>
                <h3 className="font-ethnocentric text-2xl text-accent">MARKETING</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {marketingTools.map((tool, index) => (
                  <div key={index} className="tech-icon group/icon flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary transition-all duration-300 cursor-pointer">
                    <div className="relative">
                      <div className="absolute inset-0 bg-current opacity-20 rounded-lg blur-lg scale-0 group-hover/icon:scale-100 transition-transform duration-300" style={{ color: tool.color }}></div>
                      <tool.icon className="relative w-10 h-10 md:w-12 md:h-12 group-hover/icon:scale-110 transition-transform duration-300" style={{ color: tool.color }} />
                    </div>
                    <span className="font-montserrat text-[10px] md:text-xs text-accent/70 font-medium text-center">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Stack */}
            <div className="group bg-accent p-8 border border-white/10 hover:border-primary/50 transition-all duration-500 relative overflow-hidden hover:shadow-2xl hover:shadow-primary/20">
              {/* Accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-red-400"></div>

              {/* Floating decoration */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/20 rounded-full mb-4">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-montserrat text-primary text-xs font-bold tracking-wider">SOCIAL MEDIA</span>
                </div>
                <h3 className="font-ethnocentric text-2xl text-white">SOCIALS</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {socialMediaTools.map((tool, index) => (
                  <a
                    key={index}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tech-icon group/icon flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-current opacity-30 rounded-lg blur-lg scale-0 group-hover/icon:scale-100 transition-transform duration-300" style={{ color: tool.color }}></div>
                      <tool.icon className="relative w-10 h-10 md:w-12 md:h-12 group-hover/icon:scale-110 transition-transform duration-300" style={{ color: tool.color }} />
                    </div>
                    <span className="font-montserrat text-[10px] md:text-xs text-white/70 font-medium text-center">
                      {tool.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


{/* --- PROCESS SECTION --- */}
      <section className="process-section py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-20">
            <span className="font-montserrat text-primary text-sm tracking-[0.4em] font-bold uppercase">
              [ Our Approach ]
            </span>
            <h2 className="font-ethnocentric text-4xl md:text-6xl text-accent mt-4 mb-6">
              HOW WE <span className="text-primary">WORK</span>
            </h2>
            <p className="font-open-sans text-accent/60 text-lg max-w-2xl mx-auto">
              A proven methodology that turns complex challenges into elegant solutions
            </p>
          </div>

          {/* Process Steps */}
          <div className="space-y-6">
            {[
              { number: '01', title: 'DISCOVER', desc: 'Deep dive into your business goals, audience, and competitive landscape to craft the perfect strategy.' },
              { number: '02', title: 'DESIGN', desc: 'Create intuitive, beautiful interfaces that blend form and function seamlessly.' },
              { number: '03', title: 'DEVELOP', desc: 'Build robust, scalable solutions using cutting-edge technologies and best practices.' },
              { number: '04', title: 'DELIVER', desc: 'Launch with confidence, then optimize and scale based on real-world data and feedback.' }
            ].map((step, index) => (
              <div key={index} className="process-step group flex items-start gap-8 p-8 border border-gray-100 hover:border-primary/30 transition-all duration-300 bg-white hover:shadow-xl">
                <div className="flex-shrink-0">
                  <span className="font-ethnocentric text-6xl text-accent/10 group-hover:text-primary/20 transition-colors">
                    {step.number}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-ethnocentric text-2xl text-accent mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-open-sans text-accent/70 text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-accent/20 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>


{/* --- CTA SECTION --- */}
      <section className="cta-section py-32 bg-accent text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="cta-content relative z-10 max-w-5xl mx-auto px-6">
          <div className="inline-block mb-8">
            <span className="font-montserrat text-primary text-xs tracking-[0.4em] font-bold px-6 py-3 border-2 border-primary uppercase">
              Let's Collaborate
            </span>
          </div>

          <h2 className="font-ethnocentric text-4xl md:text-7xl text-white mb-8 leading-tight">
            READY TO BUILD<br />
            SOMETHING <span className="text-primary">AMAZING?</span>
          </h2>

          <p className="font-open-sans text-secondary/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Your success story starts here. Let's turn your vision into a digital
            masterpiece that drives real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="magnetic-btn bg-primary text-white font-montserrat font-bold px-10 py-5 text-sm tracking-wider hover:bg-white hover:text-accent transition-all duration-300 inline-flex items-center gap-3 group">
              START YOUR PROJECT
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="magnetic-btn border-2 border-white text-white font-montserrat font-bold px-10 py-5 text-sm tracking-wider hover:bg-white hover:text-accent transition-all duration-300">
              VIEW CASE STUDIES
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary/10 rounded-full animate-pulse delay-75"></div>
      </section>

      {/* --- VIDEO LIGHTBOX MODAL --- */}
      {mounted && activeVideo && createPortal(
        <div 
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-10 transition-all duration-500 animate-fadeIn cursor-pointer"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-center justify-center max-h-[90vh] cursor-default"
          >
            {/* Video Player Container */}
            <div className={`relative flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${activeVideo.aspect === 'vertical' ? 'w-full max-w-[340px] aspect-[9/16]' : 'w-full lg:flex-1 aspect-video'}`}>
              <video
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Panel */}
            <div className="w-full lg:w-96 text-left flex flex-col justify-between self-stretch py-4">
              <div>
                <span className="font-montserrat text-primary text-xs tracking-[0.2em] font-bold uppercase mb-3 inline-block">
                  {activeVideo.category}
                </span>
                <h3 className="font-ethnocentric text-xl md:text-2xl text-white mb-6 leading-tight">
                  {activeVideo.title}
                </h3>
                <p className="font-open-sans text-white/70 text-sm leading-relaxed mb-8">
                  {activeVideo.desc}
                </p>

                <div className="space-y-4 border-t border-white/10 pt-6">
                  <div className="flex justify-between text-xs font-montserrat">
                    <span className="text-white/40 uppercase tracking-wider">Client</span>
                    <span className="text-white font-semibold">{activeVideo.client}</span>
                  </div>
                  <div className="flex justify-between text-xs font-montserrat">
                    <span className="text-white/40 uppercase tracking-wider">Year</span>
                    <span className="text-white font-semibold">{activeVideo.year}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <span className="block text-xs font-montserrat text-white/40 uppercase tracking-wider mb-3">Tags</span>
                <div className="flex flex-wrap gap-2">
                  {activeVideo.tags.map((tag, idx) => (
                    <span key={idx} className="font-montserrat text-[10px] tracking-wider font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-white/70">
                      #{tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  )
}