import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function Card({ children, className = '', glowColor = 'cyan', delay = 0, hover = true }) {
    const { isDark } = useTheme()
    const isP = glowColor === 'pink'

    const borderColor = isDark
        ? isP ? 'border-neon-pink/15' : 'border-neon-cyan/15'
        : isP ? 'border-pastel-purple/30' : 'border-pastel-cyan/30'

    const hoverBorder = isDark
        ? isP ? 'hover:border-neon-pink/40' : 'hover:border-neon-cyan/40'
        : isP ? 'hover:border-pastel-purple/50' : 'hover:border-pastel-cyan/50'

    // Slightly stronger card bg for readability
    const bgClass = isDark ? 'bg-dark-card/98' : 'bg-light-card/98'

    const glowClass = isDark
        ? isP ? 'hover:shadow-glow-pink' : 'hover:shadow-glow-cyan'
        : ''

    const topAccent = isDark
        ? isP
            ? 'before:bg-gradient-to-r before:from-transparent before:via-neon-pink/40 before:to-transparent'
            : 'before:bg-gradient-to-r before:from-transparent before:via-neon-cyan/40 before:to-transparent'
        : isP
            ? 'before:bg-gradient-to-r before:from-transparent before:via-pastel-purple/50 before:to-transparent'
            : 'before:bg-gradient-to-r before:from-transparent before:via-pastel-cyan/50 before:to-transparent'

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay }}
            whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : {}}
            className={`
                relative rounded-2xl border ${borderColor} ${hoverBorder}
                ${bgClass} backdrop-blur-md
                ${glowClass}
                transition-all duration-300 ease-out
                before:absolute before:top-0 before:left-[10%] before:right-[10%] before:h-px
                ${topAccent}
                p-7 sm:p-10 lg:p-12
                ${className}
            `}
        >
            {children}
        </motion.div>
    )
}
