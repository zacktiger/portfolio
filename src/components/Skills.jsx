import { motion } from 'framer-motion'
import {
    Code2, Database, Layout, Cpu,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Card from './Card'
import SectionTitle from './SectionTitle'

const skillCategories = [
    {
        title: 'Languages',
        icon: Code2,
        color: 'cyan',
        skills: [
            { name: 'C++', tags: ['DSA', 'STL', 'OOP', 'Huffman Coding'], usedIn: 'File Compressor, 200+ DSA problems' },
            { name: 'JavaScript', tags: ['ES6+', 'async/await', 'DOM', 'Node'], usedIn: 'Portfolio, Task Manager' },
            { name: 'Python', tags: ['scripting', 'NumPy', 'automation'], usedIn: 'Data analysis scripts' },
            { name: 'SQL', tags: ['queries', 'joins', 'indexing'], usedIn: 'Task Manager DBMS' },
        ],
    },
    {
        title: 'Frameworks & Libraries',
        icon: Layout,
        color: 'pink',
        skills: [
            { name: 'React.js', tags: ['hooks', 'state mgmt', 'routing', 'animations'], usedIn: 'Portfolio, Task Manager' },
            { name: 'Node.js', tags: ['Express', 'REST APIs', 'middleware'], usedIn: 'Task Manager API, Portfolio backend' },
            { name: 'Django', tags: ['ORM', 'views', 'templates'], usedIn: 'Internal project tools' },
            { name: 'Framer Motion', tags: ['animations', 'gestures', 'layout'], usedIn: 'Portfolio site' },
        ],
    },
    {
        title: 'Databases & Tools',
        icon: Database,
        color: 'cyan',
        skills: [
            { name: 'MongoDB', tags: ['CRUD', 'aggregation', 'Mongoose'], usedIn: 'Task Manager' },
            { name: 'MySQL', tags: ['joins', 'normalization', 'triggers'], usedIn: 'Academic projects' },
            { name: 'Git & GitHub', tags: ['branches', 'PRs', 'CI/CD'], usedIn: 'All projects' },
        ],
    },
    {
        title: 'Core Concepts',
        icon: Cpu,
        color: 'pink',
        skills: [
            { name: 'DSA', tags: ['trees', 'graphs', 'DP', 'sorting'], usedIn: '200+ problems, GameJam' },
            { name: 'OOP', tags: ['inheritance', 'polymorphism', 'SOLID'], usedIn: 'File Compressor, Task Manager' },
            { name: 'RESTful APIs', tags: ['CRUD', 'auth', 'JWT', 'middleware'], usedIn: 'Task Manager API' },
            { name: 'OS & Networks', tags: ['processes', 'TCP/IP', 'sockets'], usedIn: 'Academic coursework' },
        ],
    },
]

function SkillItem({ skill, color, isDark, delay }) {
    const isP = color === 'pink'

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="mb-5 last:mb-0"
        >
            {/* Skill name */}
            <h4 className={`font-display font-semibold text-sm tracking-wide mb-1.5 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                {skill.name}
            </h4>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2">
                {skill.tags.map(tag => (
                    <span
                        key={tag}
                        className={`
                            text-[10px] font-display tracking-wider px-2 py-0.5 rounded-full
                            ${isDark
                                ? isP
                                    ? 'bg-neon-pink/8 text-neon-pink/60 border border-neon-pink/10'
                                    : 'bg-neon-cyan/8 text-neon-cyan/60 border border-neon-cyan/10'
                                : isP
                                    ? 'bg-pastel-purple/8 text-pastel-purple/70 border border-pastel-purple/15'
                                    : 'bg-pastel-cyan/8 text-pastel-cyan/70 border border-pastel-cyan/15'
                            }
                        `}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Used in */}
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                <span className={isDark ? (isP ? 'text-neon-pink/40' : 'text-neon-cyan/40') : (isP ? 'text-pastel-purple/50' : 'text-pastel-cyan/50')}>
                    Used in:{' '}
                </span>
                {skill.usedIn}
            </p>
        </motion.div>
    )
}

export default function Skills() {
    const { isDark } = useTheme()

    return (
        <section id="skills" className="relative py-32 lg:py-40 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionTitle subtitle="Technologies & Expertise">
                    SKILLS
                </SectionTitle>

                <div className="grid sm:grid-cols-2 gap-8">
                    {skillCategories.map((category, index) => {
                        const Icon = category.icon
                        const isP = category.color === 'pink'

                        return (
                            <Card
                                key={category.title}
                                className=""
                                glowColor={category.color}
                                delay={index * 0.1}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        className={`
                                            p-2.5 rounded-xl border
                                            ${isDark
                                                ? isP ? 'border-neon-pink/30 bg-neon-pink/5' : 'border-neon-cyan/30 bg-neon-cyan/5'
                                                : isP ? 'border-pastel-purple/30 bg-pastel-purple/5' : 'border-pastel-cyan/30 bg-pastel-cyan/5'
                                            }
                                        `}
                                    >
                                        <Icon
                                            size={20}
                                            className={isDark
                                                ? isP ? 'text-neon-pink' : 'text-neon-cyan'
                                                : isP ? 'text-pastel-purple' : 'text-pastel-cyan'
                                            }
                                        />
                                    </div>
                                    <h3
                                        className={`
                                            font-heading text-sm font-semibold tracking-widest uppercase
                                            ${isDark
                                                ? isP ? 'text-neon-pink' : 'text-neon-cyan'
                                                : isP ? 'text-pastel-purple' : 'text-pastel-cyan'
                                            }
                                        `}
                                    >
                                        {category.title}
                                    </h3>
                                </div>

                                {category.skills.map((skill, i) => (
                                    <SkillItem
                                        key={skill.name}
                                        skill={skill}
                                        color={category.color}
                                        isDark={isDark}
                                        delay={0.2 + i * 0.08}
                                    />
                                ))}
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
