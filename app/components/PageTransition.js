'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const PageTransition = ({ children }) => {
    const pageRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                pageRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                }
            )
        }, pageRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={pageRef} className="page-transition-wrapper">
            {children}
        </div>
    )
}

export default PageTransition
