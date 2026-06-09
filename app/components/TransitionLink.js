'use client'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'
import { useCallback } from 'react'

const TransitionLink = ({ href, children, className, onClick, ...props }) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = useCallback(
        (e) => {
            e.preventDefault()

            // If clicking the same page, do nothing
            if (href === pathname) return

            // Run custom onClick if provided (e.g. close mobile menu)
            if (onClick) onClick(e)

            // Exit animation
            const wrapper = document.querySelector('.page-transition-wrapper')
            if (wrapper) {
                gsap.to(wrapper, {
                    opacity: 0,
                    y: -20,
                    duration: 0.4,
                    ease: 'power2.in',
                    onComplete: () => {
                        router.push(href)
                    },
                })
            } else {
                // Fallback: navigate immediately if wrapper not found
                router.push(href)
            }
        },
        [href, pathname, router, onClick]
    )

    return (
        <a href={href} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    )
}

export default TransitionLink
