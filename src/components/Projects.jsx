import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Gamepad2, Globe, CheckSquare, FileArchive } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import SectionTitle from './SectionTitle'

const projects = [
    {
        id: 'technex-gamejam',
        title: 'Technex GameJam Project',
        subtitle: 'Game Development, Logic Design',
        date: 'January 2026',
        icon: Gamepad2,
        accent: 'pink',
        description: 'Designed and developed a complete game prototype within 48 hours in a 4-member team. Won 1st Prize for innovation, gameplay mechanics, and system design.',
        bullets: [
            'Implemented game logic, collision detection, and physics handling',
            'Used Git for version control and branch management under time constraints',
        ],
        tags: ['Game Dev', 'Physics', 'Git', 'Team Work'],
    },
    {
        id: 'developer-portfolio',
        title: 'Personal Developer Portfolio',
        subtitle: 'React, Node.js, CSS',
        date: '2024',
        icon: Globe,
        accent: 'cyan',
        description: 'Built a responsive portfolio website to showcase projects, skills, and experience with a clean, modern design.',
        bullets: [
            'Developed reusable UI components using React Hooks',
            'Created Node.js backend for contact form and email notifications',
            'Deployed on Vercel with continuous deployment',
        ],
        tags: ['React', 'Node.js', 'Vercel', 'CI/CD'],
    },
    {
        id: 'task-management',
        title: 'Task Management System',
        subtitle: 'MERN Stack',
        date: 'December 2025',
        icon: CheckSquare,
        accent: 'pink',
        description: 'A full-stack web app supporting task creation, update, deletion, and tracking with authentication.',
        bullets: [
            'RESTful APIs with Express.js and CRUD operations with MongoDB',
            'JWT authentication and role-based access control',
            'React Context API for scalable state management',
        ],
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    },
    {
        id: 'file-compressor',
        title: 'File Compressor Tool',
        subtitle: 'C++, Data Structures (STL)',
        date: 'November 2025',
        icon: FileArchive,
        accent: 'cyan',
        description: 'Lossless file compression tool using Huffman Coding achieving ~40% size reduction for text files.',
        bullets: [
            'Binary trees and priority queues from STL for efficient encoding',
            'Low-level file I/O, memory optimization, and bit-level operations',
        ],
        tags: ['C++', 'Huffman Coding', 'STL', 'Algorithms'],
    },
]

export default function Projects() {
    const { isDark } = useTheme()
    const [expandedIndex, setExpandedIndex] = useState(null)
    const [hitFlash, setHitFlash] = useState(null)
    const sectionRef = useRef(null)

    const toggle = (index) => {
        setExpandedIndex(prev => (prev === index ? null : index))
    }

    // Listen for laser-hit events — flash only (toggle handled by native onClick)
    useEffect(() => {
        const handler = (e) => {
            const projectId = e.detail?.projectId
            const idx = projects.findIndex(p => p.id === projectId)
            if (idx >= 0) {
                setHitFlash(idx)
                setTimeout(() => setHitFlash(null), 400)
            }
        }
        const section = sectionRef.current
        if (section) {
            section.addEventListener('laser-hit', handler)
            return () => section.removeEventListener('laser-hit', handler)
        }
    }, [])

    return (
        <section id="projects" className="relative py-32 lg:py-40 px-6" ref={sectionRef}>
            <div className="max-w-3xl mx-auto">
                <SectionTitle subtitle="Things I've Built">
                    PROJECTS
                </SectionTitle>

                <div className="flex flex-col gap-3">
                    {projects.map((project, index) => {
                        const Icon = project.icon
                        const isP = project.accent === 'pink'
                        const isOpen = expandedIndex === index
                        const isHit = hitFlash === index

                        return (
                            <motion.div
                                key={project.id}
                                className="overflow-hidden"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                {/* Clickable title row */}
                                <button
                                    data-project-id={project.id}
                                    onClick={() => toggle(index)}
                                    className={`
                                        project-item w-full text-left flex items-center gap-4 px-6 py-5
                                        rounded-xl border transition-all duration-300
                                        ${isHit ? 'laser-hit-flash' : ''}
                                        ${isDark
                                            ? isOpen
                                                ? 'bg-dark-card border-white/10'
                                                : 'bg-dark-card/40 border-white/5 hover:border-white/10 hover:bg-dark-card/70'
                                            : isOpen
                                                ? 'bg-light-card border-black/10'
                                                : 'bg-light-card/40 border-black/5 hover:border-black/8 hover:bg-light-card/70'
                                        }
                                    `}
                                    style={isOpen ? {
                                        borderLeftWidth: '3px',
                                        borderLeftColor: isDark
                                            ? isP ? '#e879f9' : '#22d3ee'
                                            : isP ? '#b48ad8' : '#6ec6c0',
                                    } : {}}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`
                                            p-2 rounded-lg shrink-0
                                            ${isDark
                                                ? isP ? 'bg-neon-pink/8 text-neon-pink' : 'bg-neon-cyan/8 text-neon-cyan'
                                                : isP ? 'bg-pastel-purple/10 text-pastel-purple' : 'bg-pastel-cyan/10 text-pastel-cyan'
                                            }
                                        `}
                                    >
                                        <Icon size={18} />
                                    </div>

                                    {/* Title & date */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className={`font-display font-semibold text-base ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                            {project.title}
                                        </h3>
                                        <p className={`text-xs tracking-wider mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                            {project.date} — {project.subtitle}
                                        </p>
                                    </div>

                                    {/* Chevron */}
                                    <motion.div
                                        animate={{ rotate: isOpen ? 90 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className={`shrink-0 ${isDark
                                            ? isP ? 'text-neon-pink/50' : 'text-neon-cyan/50'
                                            : isP ? 'text-pastel-purple/60' : 'text-pastel-cyan/60'
                                            }`}
                                    >
                                        <ChevronRight size={18} />
                                    </motion.div>
                                </button>

                                {/* Expandable content */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                height: { type: 'spring', damping: 22, stiffness: 180 },
                                                opacity: { duration: 0.25 },
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div
                                                className={`
                                                    px-6 py-6 mx-1 mb-1 rounded-b-xl border-x border-b
                                                    ${isDark
                                                        ? 'bg-dark-surface/50 border-white/5'
                                                        : 'bg-light-surface/50 border-black/5'
                                                    }
                                                `}
                                                style={{
                                                    borderLeftWidth: '3px',
                                                    borderLeftColor: isDark
                                                        ? isP ? '#e879f9' : '#22d3ee'
                                                        : isP ? '#b48ad8' : '#6ec6c0',
                                                }}
                                            >
                                                {/* Description */}
                                                <motion.p
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.05 }}
                                                    className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
                                                >
                                                    {project.description}
                                                </motion.p>

                                                {/* Bullets */}
                                                <motion.ul
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.1 }}
                                                    className={`space-y-2 mb-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                                                >
                                                    {project.bullets.map((b, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm">
                                                            <span className={`mt-1 ${isDark ? (isP ? 'text-neon-pink/70' : 'text-neon-cyan/70') : (isP ? 'text-pastel-purple/80' : 'text-pastel-cyan/80')}`}>
                                                                ▸
                                                            </span>
                                                            {b}
                                                        </li>
                                                    ))}
                                                </motion.ul>

                                                {/* Tags */}
                                                <motion.div
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.15 }}
                                                    className="flex flex-wrap gap-2"
                                                >
                                                    {project.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className={`
                                                                text-[11px] font-display tracking-wider px-2.5 py-1 rounded-full border
                                                                ${isDark
                                                                    ? isP
                                                                        ? 'border-neon-pink/15 text-neon-pink/60 bg-neon-pink/5'
                                                                        : 'border-neon-cyan/15 text-neon-cyan/60 bg-neon-cyan/5'
                                                                    : isP
                                                                        ? 'border-pastel-purple/25 text-pastel-purple/70 bg-pastel-purple/5'
                                                                        : 'border-pastel-cyan/25 text-pastel-cyan/70 bg-pastel-cyan/5'
                                                                }
                                                            `}
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
