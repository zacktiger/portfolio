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

    // Group items by navbar sections (header + following cards)
    // so each section can occupy an alternating column.
    const sectionGroups = []
    let currentGroup = null

    items.forEach((item) => {
        if (item.type === 'header') {
            if (currentGroup) sectionGroups.push(currentGroup)
            currentGroup = { header: item, cards: [] }
            return
        }

        if (item.type === 'card' && currentGroup) {
            currentGroup.cards.push(item)
        }
    })

    if (currentGroup) sectionGroups.push(currentGroup)

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

            <div className="max-w-6xl mx-auto relative">
                {sectionGroups.map((group, groupIndex) => {
                    const placeLeft = groupIndex % 2 === 0
                    const isShiftedRightSection =
                        group.header.sectionId === 'skills' || group.header.sectionId === 'contact'

                    const sectionBlock = (
                        <div id={group.header.sectionId || undefined} className="w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5 }}
                                className={`relative text-center pb-8 sm:pb-10 ${groupIndex === 0 ? 'pt-4 sm:pt-6' : 'pt-10 sm:pt-12'}`}
                            >
                                <h2
                                    className={`
                                        font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider mb-4
                                        ${isDark ? 'gradient-text neon-text-cyan' : 'gradient-text-light'}
                                    `}
                                >
                                    {group.header.label}
                                </h2>
                                {group.header.subtitle && (
                                    <p className={`font-display text-base sm:text-lg tracking-wide ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {group.header.subtitle}
                                    </p>
                                )}
                            </motion.div>

                            {group.cards.map((cardItem, cardIndex) => (
                                <motion.div
                                    key={`group-${groupIndex}-card-${cardIndex}`}
                                    initial={{ opacity: 0, y: 35, filter: 'blur(5px)' }}
                                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{
                                        duration: 0.65,
                                        delay: 0.1 + cardIndex * 0.05,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="relative mb-8 sm:mb-10"
                                >
                                    {cardItem.content}
                                </motion.div>
                            ))}
                        </div>
                    )

                    return (
                        <div
                            key={`section-group-${groupIndex}`}
                            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 ${groupIndex === 0 ? '' : 'mt-2 lg:mt-6'}`}
                        >
                            {placeLeft ? (
                                <>
                                    <div>{sectionBlock}</div>
                                    <div className="hidden lg:block" aria-hidden="true" />
                                </>
                            ) : (
                                <>
                                    <div className="hidden lg:block" aria-hidden="true" />
                                    <div className={isShiftedRightSection ? 'timeline-right-shift' : ''}>{sectionBlock}</div>
                                </>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
