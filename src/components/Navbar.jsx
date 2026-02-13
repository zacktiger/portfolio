import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const { isDark, toggleTheme } = useTheme()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.classList.add('sidebar-open')
        } else {
            document.body.classList.remove('sidebar-open')
        }
        return () => document.body.classList.remove('sidebar-open')
    }, [isSidebarOpen])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`
                    fixed top-0 left-0 right-0 z-50 transition-all duration-500
                    ${isScrolled
                        ? isDark
                            ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-neon-cyan/8'
                            : 'bg-light-bg/90 backdrop-blur-xl border-b border-pastel-cyan/20'
                        : 'bg-transparent'
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-2">
                        <span
                            className={`
                                font-heading text-xl font-bold tracking-widest
                                ${isDark ? 'text-neon-cyan' : 'text-pastel-cyan'}
                            `}
                        >
                            KB
                        </span>
                        <span className={`hidden sm:block font-display text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            .dev
                        </span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={`
                                    font-display text-[13px] tracking-[0.15em] uppercase transition-all duration-300
                                    ${isDark
                                        ? 'text-gray-400 hover:text-neon-cyan'
                                        : 'text-gray-500 hover:text-pastel-cyan'
                                    }
                                    relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[1px]
                                    after:transition-all after:duration-300 hover:after:w-full
                                    ${isDark ? 'after:bg-neon-cyan/50' : 'after:bg-pastel-cyan/60'}
                                `}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Right side: Theme toggle + Mobile menu */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`
                                relative w-14 h-7 rounded-full transition-all duration-500
                                ${isDark
                                    ? 'bg-dark-surface border border-neon-cyan/20'
                                    : 'bg-light-surface border border-pastel-purple/40'
                                }
                            `}
                            aria-label="Toggle theme"
                        >
                            <motion.div
                                animate={{ x: isDark ? 2 : 26 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                className={`
                                    absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center
                                    ${isDark
                                        ? 'bg-neon-cyan shadow-glow-cyan'
                                        : 'bg-pastel-purple'
                                    }
                                `}
                            >
                                {isDark
                                    ? <Moon size={12} className="text-dark-bg" />
                                    : <Sun size={12} className="text-white" />
                                }
                            </motion.div>
                        </button>

                        {/* Mobile toggle - Hamburger */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className={`md:hidden p-1 ${isDark ? 'text-neon-cyan' : 'text-pastel-purple'}`}
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ═══ Sidebar Overlay ═══ */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Sidebar Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className={`
                                fixed top-0 right-0 bottom-0 z-[70] w-72 md:hidden
                                ${isDark
                                    ? 'bg-dark-bg/98 border-l border-neon-cyan/10'
                                    : 'bg-light-bg/98 border-l border-pastel-cyan/20'
                                }
                            `}
                        >
                            {/* Close button */}
                            <div className="flex justify-end p-6">
                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`p-2 rounded-lg transition-colors ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-500 hover:text-pastel-purple'}`}
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Nav Links */}
                            <nav className="px-8 flex flex-col gap-2">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.07 }}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`
                                            font-display text-lg tracking-[0.12em] uppercase py-3
                                            border-b transition-all duration-300
                                            ${isDark
                                                ? 'text-gray-300 hover:text-neon-cyan border-white/5 hover:border-neon-cyan/20 hover:pl-2'
                                                : 'text-gray-600 hover:text-pastel-cyan border-black/5 hover:border-pastel-cyan/20 hover:pl-2'
                                            }
                                        `}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </nav>

                            {/* Bottom accent */}
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className={`h-px ${isDark ? 'bg-gradient-to-r from-neon-cyan/20 via-neon-pink/20 to-transparent' : 'bg-gradient-to-r from-pastel-cyan/30 via-pastel-purple/30 to-transparent'}`} />
                                <p className={`mt-4 font-heading text-xs tracking-widest ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                    KB.DEV
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
