import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Card from './Card'
import SectionTitle from './SectionTitle'

export default function Contact() {
    const { isDark } = useTheme()

    const contactInfo = [
        {
            icon: Mail,
            label: 'Email',
            value: 'kshitijbachhav005@gmail.com',
            href: 'mailto:kshitijbachhav005@gmail.com',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: '+91-9322391752',
            href: 'tel:+919322391752',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'KshitijBachhav',
            href: 'www.linkedin.com/in/kshitij-bachhav-789a59213',
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'KshitijBachhav',
            href: 'https://github.com/zacktiger',
        },
    ]

    return (
        <section id="contact" className="relative py-32 lg:py-40 px-6">
            <div className="max-w-4xl mx-auto">
                <SectionTitle subtitle="Let's Connect">
                    CONTACT
                </SectionTitle>

                <Card className="" delay={0.1}>
                    <div className="text-center mb-10">
                        <p className={`font-display text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            Interested in working together? Have a question? Feel free to reach out!
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon

                            return (
                                <motion.a
                                    key={info.label}
                                    href={info.href}
                                    target={info.href.startsWith('http') ? '_blank' : undefined}
                                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                    className={`
                    flex items-center gap-4 p-5 rounded-xl border transition-all duration-300
                    ${isDark
                                            ? 'border-neon-cyan/15 bg-dark-surface/50 hover:border-neon-cyan/50 hover:shadow-glow-cyan'
                                            : 'border-pastel-cyan/20 bg-light-surface/50 hover:border-pastel-cyan/50'
                                        }
                  `}
                                >
                                    <div
                                        className={`
                      p-3 rounded-xl
                      ${isDark ? 'bg-neon-cyan/5 border border-neon-cyan/20' : 'bg-pastel-cyan/10 border border-pastel-cyan/20'}
                    `}
                                    >
                                        <Icon size={20} className={isDark ? 'text-neon-cyan' : 'text-pastel-cyan'} />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-display tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                            {info.label}
                                        </p>
                                        <p className={`font-display text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                                            {info.value}
                                        </p>
                                    </div>
                                </motion.a>
                            )
                        })}
                    </div>

                    {/* CTA Button */}
                    <div className="mt-10 text-center">
                        <motion.a
                            href="mailto:kshitijbachhav005@gmail.com"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className={`
                inline-flex items-center gap-2 px-8 py-3 rounded-xl font-display font-semibold text-sm tracking-wider
                transition-all duration-300
                ${isDark
                                    ? 'bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-glow-cyan'
                                    : 'bg-pastel-cyan/10 border border-pastel-cyan/40 text-pastel-cyan hover:bg-pastel-cyan/20'
                                }
              `}
                        >
                            <Send size={16} />
                            SEND A MESSAGE
                        </motion.a>
                    </div>
                </Card>
            </div>
        </section>
    )
}
