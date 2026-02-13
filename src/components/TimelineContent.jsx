import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    GraduationCap, MapPin, Calendar, Trophy,
    Code2, Database, Layout, Cpu,
    ChevronRight, Gamepad2, Globe, CheckSquare, FileArchive,
    Mail, Phone, Linkedin, Github, Send,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Card from './Card'
import TimelineSpine from './TimelineSpine'

// ══════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════

const skillCategories = [
    {
        title: 'Languages', icon: Code2, color: 'cyan',
        skills: [
            { name: 'C++', tags: ['DSA', 'STL', 'OOP', 'Huffman Coding'], usedIn: 'File Compressor, 200+ DSA problems' },
            { name: 'JavaScript', tags: ['ES6+', 'async/await', 'DOM', 'Node'], usedIn: 'Portfolio, Task Manager' },
            { name: 'Python', tags: ['scripting', 'NumPy', 'automation'], usedIn: 'Data analysis scripts' },
            { name: 'SQL', tags: ['queries', 'joins', 'indexing'], usedIn: 'Task Manager DBMS' },
        ],
    },
    {
        title: 'Frameworks & Libraries', icon: Layout, color: 'pink',
        skills: [
            { name: 'React.js', tags: ['hooks', 'state mgmt', 'routing', 'animations'], usedIn: 'Portfolio, Task Manager' },
            { name: 'Node.js', tags: ['Express', 'REST APIs', 'middleware'], usedIn: 'Task Manager API' },
            { name: 'Django', tags: ['ORM', 'views', 'templates'], usedIn: 'Internal project tools' },
            { name: 'Framer Motion', tags: ['animations', 'gestures', 'layout'], usedIn: 'Portfolio site' },
        ],
    },
    {
        title: 'Databases & Tools', icon: Database, color: 'cyan',
        skills: [
            { name: 'MongoDB', tags: ['CRUD', 'aggregation', 'Mongoose'], usedIn: 'Task Manager' },
            { name: 'MySQL', tags: ['joins', 'normalization', 'triggers'], usedIn: 'Academic projects' },
            { name: 'Git & GitHub', tags: ['branches', 'PRs', 'CI/CD'], usedIn: 'All projects' },
        ],
    },
    {
        title: 'Core Concepts', icon: Cpu, color: 'pink',
        skills: [
            { name: 'DSA', tags: ['trees', 'graphs', 'DP', 'sorting'], usedIn: '200+ problems, GameJam' },
            { name: 'OOP', tags: ['inheritance', 'polymorphism', 'SOLID'], usedIn: 'File Compressor, Task Manager' },
            { name: 'RESTful APIs', tags: ['CRUD', 'auth', 'JWT', 'middleware'], usedIn: 'Task Manager API' },
            { name: 'OS & Networks', tags: ['processes', 'TCP/IP', 'sockets'], usedIn: 'Academic coursework' },
        ],
    },
]

const projects = [
    {
        id: 'technex-gamejam', title: 'Technex GameJam Project', subtitle: 'Game Development, Logic Design',
        date: 'January 2026', icon: Gamepad2, accent: 'pink',
        description: 'Designed and developed a complete game prototype within 48 hours in a 4-member team. Won 1st Prize for innovation, gameplay mechanics, and system design.',
        bullets: ['Implemented game logic, collision detection, and physics handling', 'Used Git for version control and branch management under time constraints'],
        tags: ['Game Dev', 'Physics', 'Git', 'Team Work'],
    },
    {
        id: 'developer-portfolio', title: 'Personal Developer Portfolio', subtitle: 'React, Node.js, CSS',
        date: '2024', icon: Globe, accent: 'cyan',
        description: 'Built a responsive portfolio website to showcase projects, skills, and experience with a clean, modern design.',
        bullets: ['Developed reusable UI components using React Hooks', 'Created Node.js backend for contact form and email notifications', 'Deployed on Vercel with continuous deployment'],
        tags: ['React', 'Node.js', 'Vercel', 'CI/CD'],
    },
    {
        id: 'task-management', title: 'Task Management System', subtitle: 'MERN Stack',
        date: 'December 2025', icon: CheckSquare, accent: 'pink',
        description: 'A full-stack web app supporting task creation, update, deletion, and tracking with authentication.',
        bullets: ['RESTful APIs with Express.js and CRUD operations with MongoDB', 'JWT authentication and role-based access control', 'React Context API for scalable state management'],
        tags: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    },
    {
        id: 'file-compressor', title: 'File Compressor Tool', subtitle: 'C++, Data Structures (STL)',
        date: 'November 2025', icon: FileArchive, accent: 'cyan',
        description: 'Lossless file compression tool using Huffman Coding achieving ~40% size reduction for text files.',
        bullets: ['Binary trees and priority queues from STL for efficient encoding', 'Low-level file I/O, memory optimization, and bit-level operations'],
        tags: ['C++', 'Huffman Coding', 'STL', 'Algorithms'],
    },
]

// ══════════════════════════════════════════
//  SUB-COMPONENTS
// ══════════════════════════════════════════

function BioCard() {
    const { isDark } = useTheme()
    return (
        <Card glowColor="cyan">
            <h3 className={`font-heading text-lg font-semibold tracking-wider mb-4 ${isDark ? 'text-neon-cyan' : 'text-pastel-cyan'}`}>
                WHO I AM
            </h3>
            <p className={`font-body leading-relaxed mb-4 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                I'm a passionate Software Development Engineer specializing in Backend and Full Stack development.
                Currently pursuing my B.Tech in Internet of Things at IIIT Nagpur, I love building robust,
                scalable applications and solving complex problems.
            </p>
            <p className={`font-body leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                From winning game jams to building full-stack applications,
                I thrive on turning ideas into functional, elegant software.
            </p>
        </Card>
    )
}

function EducationCard() {
    const { isDark } = useTheme()
    return (
        <Card glowColor="pink">
            <h3 className={`font-heading text-lg font-semibold tracking-wider mb-6 ${isDark ? 'text-neon-pink' : 'text-pastel-purple'}`}>
                EDUCATION
            </h3>
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border ${isDark ? 'border-neon-pink/30 bg-neon-pink/5' : 'border-pastel-purple/30 bg-pastel-purple/5'}`}>
                    <GraduationCap size={24} className={isDark ? 'text-neon-pink' : 'text-pastel-purple'} />
                </div>
                <div>
                    <h4 className={`font-display font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>IIIT Nagpur</h4>
                    <p className={`font-body ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>B.Tech in Internet of Things (IoT)</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                        <span className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <MapPin size={14} /> Nagpur, Maharashtra
                        </span>
                        <span className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <Calendar size={14} /> 2023 – 2027
                        </span>
                    </div>
                </div>
            </div>

            <div className={`mt-8 p-4 rounded-xl border ${isDark ? 'border-neon-cyan/20 bg-neon-cyan/5' : 'border-pastel-cyan/20 bg-pastel-cyan/5'}`}>
                <div className="flex items-center gap-3 mb-2">
                    <Trophy size={18} className={isDark ? 'text-neon-cyan' : 'text-pastel-cyan'} />
                    <span className={`font-display font-semibold text-sm ${isDark ? 'text-neon-cyan' : 'text-pastel-cyan'}`}>ACHIEVEMENTS</span>
                </div>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    <li className="flex items-start gap-2">
                        <span className={isDark ? 'text-neon-pink' : 'text-pastel-purple'}>▸</span>
                        Winner (1st Place) — Technex GameJam 2024, IIT BHU
                    </li>
                    <li className="flex items-start gap-2">
                        <span className={isDark ? 'text-neon-pink' : 'text-pastel-purple'}>▸</span>
                        200+ DSA problems solved on LeetCode & GeeksForGeeks
                    </li>
                </ul>
            </div>
        </Card>
    )
}

function SkillCategoryCard({ category }) {
    const { isDark } = useTheme()
    const Icon = category.icon
    const isP = category.color === 'pink'

    return (
        <Card glowColor={category.color}>
            <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl border ${isDark
                    ? isP ? 'border-neon-pink/30 bg-neon-pink/5' : 'border-neon-cyan/30 bg-neon-cyan/5'
                    : isP ? 'border-pastel-purple/30 bg-pastel-purple/5' : 'border-pastel-cyan/30 bg-pastel-cyan/5'
                    }`}>
                    <Icon size={20} className={isDark
                        ? isP ? 'text-neon-pink' : 'text-neon-cyan'
                        : isP ? 'text-pastel-purple' : 'text-pastel-cyan'
                    } />
                </div>
                <h3 className={`font-heading text-sm font-semibold tracking-widest uppercase ${isDark
                    ? isP ? 'text-neon-pink' : 'text-neon-cyan'
                    : isP ? 'text-pastel-purple' : 'text-pastel-cyan'
                    }`}>
                    {category.title}
                </h3>
            </div>

            {category.skills.map(skill => (
                <div key={skill.name} className="mb-4 last:mb-0">
                    <h4 className={`font-display font-semibold text-sm tracking-wide mb-1 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                        {skill.name}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                        {skill.tags.map(tag => (
                            <span key={tag} className={`text-[10px] font-display tracking-wider px-2 py-0.5 rounded-full ${isDark
                                ? isP ? 'bg-neon-pink/8 text-neon-pink/60 border border-neon-pink/10' : 'bg-neon-cyan/8 text-neon-cyan/60 border border-neon-cyan/10'
                                : isP ? 'bg-pastel-purple/8 text-pastel-purple/70 border border-pastel-purple/15' : 'bg-pastel-cyan/8 text-pastel-cyan/70 border border-pastel-cyan/15'
                                }`}>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className={isDark ? (isP ? 'text-neon-pink/40' : 'text-neon-cyan/40') : (isP ? 'text-pastel-purple/50' : 'text-pastel-cyan/50')}>
                            Used in:&nbsp;
                        </span>
                        {skill.usedIn}
                    </p>
                </div>
            ))}
        </Card>
    )
}

function ProjectsCard() {
    const { isDark } = useTheme()
    const [expandedIndex, setExpandedIndex] = useState(null)
    const [hitFlash, setHitFlash] = useState(null)
    const cardRef = useRef(null)

    const toggle = (index) => setExpandedIndex(prev => (prev === index ? null : index))

    useEffect(() => {
        const handler = (e) => {
            const projectId = e.detail?.projectId
            const idx = projects.findIndex(p => p.id === projectId)
            if (idx >= 0) {
                setHitFlash(idx)
                setTimeout(() => setHitFlash(null), 400)
            }
        }
        const el = cardRef.current
        if (el) {
            el.addEventListener('laser-hit', handler)
            return () => el.removeEventListener('laser-hit', handler)
        }
    }, [])

    return (
        <Card glowColor="cyan" hover={false}>
            <div ref={cardRef} className="flex flex-col gap-3">
                {projects.map((project, index) => {
                    const Icon = project.icon
                    const isP = project.accent === 'pink'
                    const isOpen = expandedIndex === index
                    const isHit = hitFlash === index

                    return (
                        <div key={project.id} className="overflow-hidden">
                            <button
                                data-project-id={project.id}
                                onClick={() => toggle(index)}
                                className={`
                                    project-item w-full text-left flex items-center gap-4 px-5 py-4
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
                                <div className={`p-2 rounded-lg shrink-0 ${isDark
                                    ? isP ? 'bg-neon-pink/8 text-neon-pink' : 'bg-neon-cyan/8 text-neon-cyan'
                                    : isP ? 'bg-pastel-purple/10 text-pastel-purple' : 'bg-pastel-cyan/10 text-pastel-cyan'
                                    }`}>
                                    <Icon size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-display font-semibold text-base ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                                        {project.title}
                                    </h3>
                                    <p className={`text-xs tracking-wider mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {project.date} — {project.subtitle}
                                    </p>
                                </div>
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
                                        <div className={`px-5 py-5 mx-1 mb-1 rounded-b-xl border-x border-b ${isDark
                                            ? 'bg-dark-surface/50 border-white/5'
                                            : 'bg-light-surface/50 border-black/5'
                                            }`} style={{
                                                borderLeftWidth: '3px',
                                                borderLeftColor: isDark
                                                    ? isP ? '#e879f9' : '#22d3ee'
                                                    : isP ? '#b48ad8' : '#6ec6c0',
                                            }}>
                                            <p className={`text-sm leading-relaxed mb-3 ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
                                                {project.description}
                                            </p>
                                            <ul className={`space-y-2 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                                {project.bullets.map((b, bi) => (
                                                    <li key={bi} className="flex items-start gap-2 text-sm">
                                                        <span className={`mt-1 ${isDark ? (isP ? 'text-neon-pink/70' : 'text-neon-cyan/70') : (isP ? 'text-pastel-purple/80' : 'text-pastel-cyan/80')}`}>▸</span>
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map(tag => (
                                                    <span key={tag} className={`text-[11px] font-display tracking-wider px-2.5 py-1 rounded-full border ${isDark
                                                        ? isP ? 'border-neon-pink/15 text-neon-pink/60 bg-neon-pink/5' : 'border-neon-cyan/15 text-neon-cyan/60 bg-neon-cyan/5'
                                                        : isP ? 'border-pastel-purple/25 text-pastel-purple/70 bg-pastel-purple/5' : 'border-pastel-cyan/25 text-pastel-cyan/70 bg-pastel-cyan/5'
                                                        }`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

function ContactCard() {
    const { isDark } = useTheme()
    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'kshitijbachhav005@gmail.com', href: 'mailto:kshitijbachhav005@gmail.com' },
        { icon: Phone, label: 'Phone', value: '+91-9322391752', href: 'tel:+919322391752' },
        { icon: Linkedin, label: 'LinkedIn', value: 'KshitijBachhav', href: 'https://linkedin.com/in/KshitijBachhav' },
        { icon: Github, label: 'GitHub', value: 'KshitijBachhav', href: 'https://github.com/KshitijBachhav' },
    ]

    return (
        <Card glowColor="cyan">
            <div className="text-center mb-8">
                <p className={`font-display text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                    Interested in working together? Reach out!
                </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map(info => {
                    const Icon = info.icon
                    return (
                        <a
                            key={info.label}
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${isDark
                                ? 'border-neon-cyan/15 bg-dark-surface/50 hover:border-neon-cyan/50 hover:shadow-glow-cyan'
                                : 'border-pastel-cyan/20 bg-light-surface/50 hover:border-pastel-cyan/50'
                                }`}
                        >
                            <div className={`p-2.5 rounded-xl ${isDark ? 'bg-neon-cyan/5 border border-neon-cyan/20' : 'bg-pastel-cyan/10 border border-pastel-cyan/20'}`}>
                                <Icon size={18} className={isDark ? 'text-neon-cyan' : 'text-pastel-cyan'} />
                            </div>
                            <div>
                                <p className={`text-xs font-display tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{info.label}</p>
                                <p className={`font-display text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{info.value}</p>
                            </div>
                        </a>
                    )
                })}
            </div>
            <div className="mt-8 text-center">
                <a
                    href="mailto:kshitijbachhav005@gmail.com"
                    className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-display font-semibold text-sm tracking-wider transition-all duration-300 ${isDark
                        ? 'bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-glow-cyan'
                        : 'bg-pastel-cyan/10 border border-pastel-cyan/40 text-pastel-cyan hover:bg-pastel-cyan/20'
                        }`}
                >
                    <Send size={16} />
                    SEND A MESSAGE
                </a>
            </div>
        </Card>
    )
}

// ══════════════════════════════════════════
//  MAIN COMPONENT — builds timeline items array
// ══════════════════════════════════════════

export default function TimelineContent() {
    const items = [
        // ── About section ──
        { type: 'header', label: 'ABOUT ME', subtitle: 'Background & Education', sectionId: 'about' },
        { type: 'card', content: <BioCard /> },
        { type: 'card', content: <EducationCard /> },

        // ── Skills section ──
        { type: 'header', label: 'SKILLS', subtitle: 'Technologies & Expertise', sectionId: 'skills' },
        ...skillCategories.map(cat => ({
            type: 'card',
            content: <SkillCategoryCard category={cat} />,
        })),

        // ── Projects section ──
        { type: 'header', label: 'PROJECTS', subtitle: "Things I've Built", sectionId: 'projects' },
        { type: 'card', content: <ProjectsCard /> },

        // ── Contact section ──
        { type: 'header', label: 'CONTACT', subtitle: "Let's Connect", sectionId: 'contact' },
        { type: 'card', content: <ContactCard /> },
    ]

    return (
        <section>
            <TimelineSpine items={items} />
        </section>
    )
}
