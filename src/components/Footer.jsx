import { Github, Linkedin, Mail, Phone } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Footer() {
    const { isDark } = useTheme()

    const contactItems = [
        { icon: Mail, label: 'kshitijbachhav005@gmail.com', href: 'mailto:kshitijbachhav005@gmail.com' },
        { icon: Phone, label: '+91-9322391752', href: 'tel:+919322391752' },
    ]

    const socialItems = [
        { icon: Github, label: 'GitHub', href: 'https://github.com/zacktiger' },
        { icon: Linkedin, label: 'LinkedIn', href: 'www.linkedin.com/in/kshitij-bachhav-789a59213' },
    ]

    const quickLinks = ['Home', 'About', 'Projects', 'Skills', 'Contact']

    return (
        <footer
            className={`
                relative overflow-visible px-6 pt-16 pb-8
                ${isDark ? 'bg-[#040410]' : 'bg-[#e8e4f0]'}
            `}
            style={{ marginTop: '128px' }}
        >
            {/* Background extension above footer to match lifted divider */}
            <div className={`absolute -top-[12px] left-0 right-0 h-[12px] ${isDark ? 'bg-[#040410]' : 'bg-[#e8e4f0]'}`} />

            {/* Top divider — wider glow */}
            <div className={`absolute -top-[12px] left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent' : 'bg-gradient-to-r from-transparent via-pastel-cyan/30 to-transparent'}`} />
            <div className="max-w-6xl mx-auto">
                {/* Main footer content */}
                <div className="grid sm:grid-cols-3 gap-10 mb-12">
                    {/* Col 1: Logo & tagline */}
                    <div>
                        <span className={`font-heading text-lg tracking-widest font-bold ${isDark ? 'text-neon-cyan' : 'text-pastel-cyan'}`}>
                            KB.DEV
                        </span>
                        <p className={`mt-3 text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                            Software Development Engineer.
                            <br />
                            Full Stack & Backend Developer.
                        </p>
                    </div>

                    {/* Col 2: Quick Links */}
                    <div>
                        <h4 className={`font-display text-xs tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Quick Links
                        </h4>
                        <div className="flex flex-col gap-2">
                            {quickLinks.map(link => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase()}`}
                                    className={`
                                        text-sm font-display transition-colors duration-300
                                        ${isDark ? 'text-gray-500 hover:text-neon-cyan' : 'text-gray-400 hover:text-pastel-cyan'}
                                    `}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 3: Contact Info */}
                    <div>
                        <h4 className={`font-display text-xs tracking-[0.2em] uppercase mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Get in Touch
                        </h4>
                        <div className="flex flex-col gap-3">
                            {contactItems.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className={`
                                        flex items-center gap-2.5 text-sm transition-colors duration-300
                                        ${isDark ? 'text-gray-500 hover:text-neon-cyan' : 'text-gray-400 hover:text-pastel-cyan'}
                                    `}
                                >
                                    <Icon size={14} className="shrink-0" />
                                    <span className="truncate">{label}</span>
                                </a>
                            ))}
                            <div className="flex gap-3 mt-2">
                                {socialItems.map(({ icon: Icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        className={`
                                            p-2 rounded-lg border transition-all duration-300
                                            ${isDark
                                                ? 'border-white/5 text-gray-500 hover:text-neon-cyan hover:border-neon-cyan/20'
                                                : 'border-black/5 text-gray-400 hover:text-pastel-cyan hover:border-pastel-cyan/20'
                                            }
                                        `}
                                    >
                                        <Icon size={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    <p className={`text-xs font-display ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                        © {new Date().getFullYear()} Kshitij Bachhav. All rights reserved.
                    </p>
                    <p className={`text-xs font-display ${isDark ? 'text-gray-700' : 'text-gray-400'}`}>
                        Crafted with <span className={isDark ? 'text-neon-pink' : 'text-pastel-purple'}>♥</span> and neon lights.
                    </p>
                </div>
            </div>
        </footer>
    )
}

