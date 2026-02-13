import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

/**
 * TimelineSpine renders a glowing vertical center line.
 * Accepts an `items` prop — an array of:
 *   { type: 'header', label, subtitle }   → full-width centered section header
 *   { type: 'card', content }             → alternating left/right card
 * Each card fades in + slides up + blur→sharp on scroll.
 */
export default function TimelineSpine({ items = [] }) {
    const { isDark } = useTheme()
    const spineRef = useRef(null)
    const [fillHeight, setFillHeight] = useState(0)

    // Scroll-driven fill
    useEffect(() => {
        const handleScroll = () => {
            if (!spineRef.current) return
            const rect = spineRef.current.getBoundingClientRect()
            const viewportH = window.innerHeight
            const scrolled = viewportH - rect.top
            const total = rect.height
            const ratio = Math.max(0, Math.min(1, scrolled / total))
            setFillHeight(ratio * 100)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div ref={spineRef} className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
            {/* Center spine line — lg only */}
            <div
                className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
                style={{ width: '2px' }}
            >
                <div className={`absolute inset-0 ${isDark ? 'bg-white/[0.04]' : 'bg-black/[0.05]'}`} />
                <div
                    className="absolute top-0 left-0 right-0 transition-all duration-300 ease-out"
                    style={{
                        height: `${fillHeight}%`,
                        background: isDark
                            ? 'linear-gradient(to bottom, rgba(34,211,238,0.2), rgba(232,121,249,0.2))'
                            : 'linear-gradient(to bottom, rgba(110,198,192,0.3), rgba(180,138,216,0.3))',
                        boxShadow: isDark
                            ? '0 0 10px rgba(34,211,238,0.15), 0 0 25px rgba(34,211,238,0.05)'
                            : '0 0 10px rgba(110,198,192,0.2)',
                    }}
                />
            </div>

            <div className="max-w-4xl mx-auto relative">
                {items.map((item, i) => {
                    // ── Section header — full width, centered ──
                    if (item.type === 'header') {
                        return (
                            <motion.div
                                key={`header-${i}`}
                                id={item.sectionId || undefined}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5 }}
                                className={`relative text-center pb-10 sm:pb-12 lg:pb-14 ${i === 0 ? 'pt-4 sm:pt-6' : 'pt-16 sm:pt-20 lg:pt-24'}`}
                            >
                                <h2
                                    className={`
                                        font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider mb-4
                                        ${isDark ? 'gradient-text neon-text-cyan' : 'gradient-text-light'}
                                    `}
                                >
                                    {item.label}
                                </h2>
                                {item.subtitle && (
                                    <p className={`font-display text-base sm:text-lg tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {item.subtitle}
                                    </p>
                                )}
                            </motion.div>
                        )
                    }

                    // ── Card — single aligned column ──

                    return (
                        <motion.div
                            key={`card-${i}`}
                            initial={{ opacity: 0, y: 35, filter: 'blur(5px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{
                                duration: 0.65,
                                delay: 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`
                                relative mb-8 sm:mb-10 lg:mb-12
                                w-full max-w-3xl mx-auto
                            `}
                        >
                            {item.content}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
