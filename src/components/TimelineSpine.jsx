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

    // Track card index separately for alternating
    let cardIdx = 0

    return (
        <div ref={spineRef} className="relative py-20 lg:py-32 px-6">
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

            <div className="max-w-6xl mx-auto relative">
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
                                className="relative text-center py-12 lg:py-16"
                            >
                                {/* Dot on spine for header */}
                                <div
                                    className={`
                                        hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
                                        w-4 h-4 rounded-full border-2
                                        ${isDark ? 'border-neon-cyan/60 bg-dark-bg' : 'border-pastel-cyan/70 bg-light-bg'}
                                    `}
                                    style={{
                                        zIndex: 3,
                                        boxShadow: isDark
                                            ? '0 0 10px rgba(34,211,238,0.4), 0 0 20px rgba(34,211,238,0.1)'
                                            : '0 0 10px rgba(110,198,192,0.4)',
                                    }}
                                />
                                <h2
                                    className={`
                                        font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider mb-3
                                        ${isDark ? 'gradient-text neon-text-cyan' : 'gradient-text-light'}
                                    `}
                                >
                                    {item.label}
                                </h2>
                                {item.subtitle && (
                                    <p className={`font-display text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {item.subtitle}
                                    </p>
                                )}
                            </motion.div>
                        )
                    }

                    // ── Card — alternating left/right ──
                    const isLeft = cardIdx % 2 === 0
                    const currentCardIdx = cardIdx
                    cardIdx++

                    return (
                        <motion.div
                            key={`card-${i}`}
                            initial={{ opacity: 0, y: 35, filter: 'blur(5px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{
                                duration: 0.65,
                                delay: 0.08 + (currentCardIdx % 4) * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`
                                relative mb-10 lg:mb-14
                                lg:w-[46%]
                                ${isLeft ? 'lg:mr-auto lg:pr-10' : 'lg:ml-auto lg:pl-10'}
                            `}
                        >
                            {/* Dot on spine */}
                            <div
                                className={`
                                    hidden lg:block absolute top-8
                                    w-3 h-3 rounded-full border-2
                                    ${isLeft
                                        ? 'lg:-right-[calc(4/46*100%+7px)]'
                                        : 'lg:-left-[calc(4/46*100%+7px)]'
                                    }
                                    ${isDark
                                        ? 'border-neon-cyan/40 bg-dark-bg'
                                        : 'border-pastel-cyan/50 bg-light-bg'
                                    }
                                `}
                                style={{
                                    position: 'absolute',
                                    [isLeft ? 'right' : 'left']: '-7px',
                                    top: '2rem',
                                    zIndex: 2,
                                    boxShadow: isDark
                                        ? '0 0 6px rgba(34,211,238,0.3)'
                                        : '0 0 6px rgba(110,198,192,0.3)',
                                }}
                            />

                            {/* Connector line to spine */}
                            <div
                                className="hidden lg:block absolute"
                                style={{
                                    top: 'calc(2rem + 5px)',
                                    [isLeft ? 'right' : 'left']: '-4px',
                                    width: '2.5rem',
                                    height: '1px',
                                    background: isDark
                                        ? 'rgba(34,211,238,0.12)'
                                        : 'rgba(110,198,192,0.18)',
                                }}
                            />

                            {item.content}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
