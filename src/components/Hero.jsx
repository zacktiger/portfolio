import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Card from './Card'
import RetroCarGame from './RetroCarGame'

export default function Hero() {
    const { isDark } = useTheme()

    return (
        <section
            id="home"
            className={`
                relative min-h-screen flex items-center justify-center overflow-hidden
            `}
        >
            {/* Car game background */}
            <RetroCarGame />

            {/* Subtle vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: isDark
                        ? 'radial-gradient(ellipse at center, transparent 40%, rgba(8,8,22,0.7) 100%)'
                        : 'radial-gradient(ellipse at center, transparent 40%, rgba(240,234,246,0.6) 100%)',
                    zIndex: 1,
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <Card className="p-8 sm:p-12 md:p-16 bg-dark-bg/60 backdrop-blur-lg" hover={false}>
                    {/* Greeting */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.7 }}
                        className={`
                            font-display text-sm sm:text-base tracking-[0.3em] uppercase mb-4
                            ${isDark ? 'text-neon-pink' : 'text-pastel-purple'}
                        `}
                    >
                        Hello, World — I'm
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className={`
                            font-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-wider mb-6
                            ${isDark ? 'text-white neon-text-cyan' : 'gradient-text-light'}
                        `}
                    >
                        KSHITIJ
                        <br />
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className={isDark ? 'text-neon-pink neon-text-pink' : 'text-pastel-purple'}
                        >
                            BACHHAV
                        </motion.span>
                    </motion.h1>

                    {/* Title */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className={`
                            font-display text-base sm:text-lg md:text-xl tracking-wider mb-8
                            ${isDark ? 'text-gray-300' : 'text-gray-700'}
                        `}
                    >
                        Software Development Engineer —{' '}
                        <span className={isDark ? 'text-neon-cyan' : 'text-pastel-cyan'}>
                            Full Stack / Backend
                        </span>
                    </motion.p>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.6 }}
                        className="flex items-center justify-center gap-6"
                    >
                        {[
                            { icon: Github, href: 'https://github.com/KshitijBachhav', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://linkedin.com/in/KshitijBachhav', label: 'LinkedIn' },
                            { icon: Mail, href: 'mailto:kshitijbachhav005@gmail.com', label: 'Email' },
                        ].map(({ icon: Icon, href, label }, i) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.9 + i * 0.15, type: 'spring', stiffness: 200 }}
                                className={`
                                    p-3 rounded-xl border transition-all duration-300
                                    ${isDark
                                        ? 'border-neon-cyan/20 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/60 hover:shadow-glow-cyan'
                                        : 'border-pastel-cyan/30 text-gray-500 hover:text-pastel-cyan hover:border-pastel-cyan/60'
                                    }
                                `}
                            >
                                <Icon size={20} />
                            </motion.a>
                        ))}
                    </motion.div>
                </Card>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="mt-12"
                >
                    <motion.a
                        href="#about"
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className={`inline-block ${isDark ? 'text-neon-cyan/50' : 'text-pastel-cyan/70'}`}
                    >
                        <ChevronDown size={28} />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
