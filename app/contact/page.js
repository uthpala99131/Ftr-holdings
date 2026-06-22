'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Phone, Mail, Clock, Send, Check, MessageCircle, ExternalLink, ArrowDown } from 'lucide-react'


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ContactPage = () => {
  const containerRef = useRef(null)

  // Service Selection State (Your existing state)
  const [selectedService, setSelectedService] = useState('')
  const services = [ 'Digital Marketing','Web Development', 'Mobile Apps','Graphic design', 'Video Production', 'Content Creations', 'Advertising', 'Branding', 'SEO / SEM', 'Other']

  // --- ADDED: Form Data & Submission State ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)

  // --- ADDED: Input Change Handler ---
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // --- ADDED: Submit Handler ---
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)

    emailjs.send(
      'service_2osj9uj',          // Your EmailJS service ID
      'template_8kbgheh',         // Your EmailJS template ID
      {
        name: formData.name,
        email: formData.email,
        service: selectedService, // Captures your pill selection
        message: formData.message
      },
      'YOmiKrXHKSXW6r6MZ'          // Your EmailJS public key (user ID)
    )
      .then((result) => {
        console.log('Email successfully sent!', result.text)
        setIsSubmitted(true)
        setIsSending(false)
        // Reset form
        setFormData({ name: '', email: '', message: '' })
        setSelectedService('')

        // Animate success message
        gsap.fromTo('.success-msg',
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
        )
      }, (error) => {
        console.error('Failed to send email:', error.text)
        setIsSending(false)
        alert('Oops! Something went wrong. Please try again.')
      })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Hero Text Animation
      gsap.fromTo('.contact-hero-text',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
      )

      // 2. Contact Info Cards Stagger
      gsap.fromTo('.info-card',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.5 }
      )

      // 3. Form Reveal
      gsap.fromTo('.contact-form',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-accent min-h-screen text-white selection:bg-primary selection:text-white">

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="contact-hero-text font-montserrat text-primary text-sm tracking-[0.4em] font-bold uppercase mb-4">
            [ Let&apos;s Build ]
          </p>
          <h1 className="contact-hero-text font-ethnocentric text-3xl sm:text-4xl md:text-7xl text-white mb-6">
            START YOUR <span className="text-primary">PROJECT</span>
          </h1>
          <p className="contact-hero-text font-open-sans text-secondary text-base sm:text-lg max-w-2xl mx-auto">
            Ready to scale? Tell us about your vision, and we&apos;ll architect the digital infrastructure to make it happen.
          </p>
        </div>
      </section>

      {/* --- MAIN GRID (INFO + FORM) --- */}
      <section className="py-12 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT COL: CONTACT INFO */}
          <div className="space-y-5">

            {/* Location Card */}
            <a
              href="https://maps.google.com/?q=349/2/1,+Katugastota+Rd,+Kandy,+Sri+Lanka"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card contact-card"
            >
              <div className="contact-card-icon icon-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-ethnocentric text-base sm:text-lg mb-2">Visit Us</h3>
                <p className="font-open-sans text-secondary leading-relaxed text-sm sm:text-base">
                  No.99/A, Medawala Rd, Pujapitiya<br />
                  Kandy, Sri Lanka.
                </p>
              </div>
              <ExternalLink className="contact-card-arrow w-5 h-5" />
            </a>

            {/* Email Card */}
            <a
              href="mailto:contact@ftrglobals.com"
              className="info-card contact-card"
            >
              <div className="contact-card-icon icon-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-ethnocentric text-base sm:text-lg mb-2">Email Us</h3>
                <p className="font-open-sans text-secondary mb-1 text-sm sm:text-base">contact@ftrglobals.com</p>
                <p className="font-open-sans text-secondary text-sm sm:text-base">ftrglobals@gmail.com</p>
              </div>
              <ExternalLink className="contact-card-arrow w-5 h-5" />
            </a>

            {/* Phone Card */}
            <a
              href="tel:+94764790065"
              className="info-card contact-card"
            >
              <div className="contact-card-icon icon-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-ethnocentric text-base sm:text-lg mb-2">Call Us</h3>
                <p className="font-open-sans text-secondary font-bold text-base sm:text-lg">+94 76 479 0065</p>
                <p className="font-open-sans text-secondary text-xs sm:text-sm">Mon-Sat from 9am to 6pm</p>
              </div>
              <ExternalLink className="contact-card-arrow w-5 h-5" />
            </a>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/94764790065"
              target="_blank"
              rel="noopener noreferrer"
              className="info-card contact-card contact-card-whatsapp"
            >
              <div className="contact-card-icon icon-whatsapp">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-ethnocentric text-base sm:text-lg mb-2">WhatsApp</h3>
                <p className="font-open-sans text-secondary/70 font-bold text-base sm:text-lg">+94 76 479 0065</p>
                <p className="font-open-sans text-secondary/50 text-xs sm:text-sm">Chat with us instantly</p>
              </div>
              <ExternalLink className="contact-card-arrow w-5 h-5" />
            </a>

          </div>

          {/* RIGHT COL: INTERACTIVE FORM */}
          <div className="contact-form bg-white text-accent rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">

            <div className="relative z-10 h-full">
              {!isSubmitted ? (
                <>
                  <h3 className="font-ethnocentric text-xl sm:text-2xl mb-8">Send a Message</h3>

                  <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2">
                        <label className="font-montserrat text-xs font-bold uppercase tracking-wider text-accent">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Kamal Perera"
                          className="w-full bg-secondary border border-gray-200 p-3 sm:p-4 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-open-sans text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="font-montserrat text-xs font-bold uppercase tracking-wider text-accent">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="kamal@gmail.com"
                          className="w-full bg-secondary border border-gray-200 p-3 sm:p-4 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-open-sans text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    {/* Service Selection Pills */}
                    <div className="space-y-3">
                      <label className="font-montserrat text-xs font-bold uppercase tracking-wider text-accent">I&apos;m Interested In...</label>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {services.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => setSelectedService(service)}
                            className={`text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 ${selectedService === service
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-white border-gray-300 text-accent/70 hover:border-primary hover:text-primary'
                              }`}
                          >
                            {selectedService === service && <Check className="w-3 h-3" />}
                            {service}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-2">
                      <label className="font-montserrat text-xs font-bold uppercase tracking-wider text-accent">Project Details</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows="4"
                        placeholder="Tell us about your project, timeline, and goals..."
                        className="w-full bg-secondary border border-gray-200 p-3 sm:p-4 rounded-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-open-sans text-sm sm:text-base"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-accent text-white font-montserrat font-bold py-4 sm:py-5 rounded-sm hover:bg-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group text-sm sm:text-base shadow-lg hover:shadow-primary/30"
                    >
                      {isSending ? (
                        <>SENDING... <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                      ) : (
                        <>SEND PROPOSAL <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>

                  </form>
                </>
) : (
  <div className="success-msg flex flex-col items-center justify-center text-center py-20">
    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
      <Check className="w-10 h-10 text-emerald-500" />
    </div>
    <h3 className="font-ethnocentric text-2xl sm:text-3xl text-accent mb-4">SUCCESS!</h3>
    <p className="font-open-sans text-accent/70 text-lg mb-8 max-w-sm">
      Thank you for reaching out. We&apos;ve received your message and we&apos;ll contact you soon.
    </p>
    <button
      onClick={() => setIsSubmitted(false)}
      className="font-montserrat font-bold text-primary hover:text-accent transition-colors flex items-center gap-2 group"
    >
      Send another message
      <ArrowDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
)}
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full pointer-events-none"></div>
          </div>

        </div>
      </section>

      {/* --- FULL WIDTH MAP (DARK MODE STYLED) --- */}
      <section className="w-full h-75 sm:h-100 md:h-125 relative border-t border-white grayscale invert filter">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63320.43002241689!2d80.62578145!3d7.29057155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae366266498acd3%3A0x411a3818a1e03c35!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-500"
        ></iframe>

        {/* Map Overlay Card */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:left-12 bg-black text-white p-4 sm:p-6 rounded-lg border border-white/20 shadow-2xl z-10 max-w-xs grayscale-0 invert-0">
          <h4 className="font-ethnocentric text-primary mb-1 text-sm sm:text-base">FTR HQ</h4>
          <p className="text-xs sm:text-sm text-gray-400">Pujapitiya, Kandy.</p>
        </div>
      </section>

    </div>
  )
}

export default ContactPage