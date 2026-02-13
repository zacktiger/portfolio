import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Trophy } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Card from './Card'
import SectionTitle from './SectionTitle'

export default function About() {
    const { isDark } = useTheme()

    return (
        <section id="about" className="relative py-32 lg:py-40 px-6">
            <div className="max-w-6xl mx-auto">
                <SectionTitle subtitle="Background & Education">
                    ABOUT ME
                </SectionTitle>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Bio Card */}
                    <Card className="" delay={0.1}>
                        <h3
                            className={`
                font-heading text-lg font-semibold tracking-wider mb-4
                ${isDark ? 'text-neon-cyan' : 'text-pastel-cyan'}
              `}
                        >
                            WHO I AM
                        </h3>
                        <p className={`font-body leading-relaxed mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            I'm a passionate Software Development Engineer specializing in Backend and Full Stack development.
                            Currently pursuing my B.Tech in Internet of Things at IIIT Nagpur, I love building robust,
                            scalable applications and solving complex problems.
                        </p>
                        <p className={`font-body leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            From winning game jams to building full-stack applications,
                            I thrive on turning ideas into functional, elegant software.
                            My toolkit spans C++, JavaScript, Python and modern frameworks like React and Node.js.
                        </p>
                    </Card>

                    {/* Education Card */}
                    <Card className="" glowColor="pink" delay={0.2}>
                        <h3
                            className={`
                font-heading text-lg font-semibold tracking-wider mb-6
                ${isDark ? 'text-neon-pink' : 'text-pastel-purple'}
              `}
                        >
                            EDUCATION
                        </h3>
                        <div className="flex items-start gap-4">
                            <div
                                className={`
                  p-3 rounded-xl border
                  ${isDark ? 'border-neon-pink/30 bg-neon-pink/5' : 'border-pastel-purple/30 bg-pastel-purple/5'}
                `}
                            >
                                <GraduationCap
                                    size={24}
                                    className={isDark ? 'text-neon-pink' : 'text-pastel-purple'}
                                />
                            </div>
                            <div>
                                <h4 className={`font-display font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                    IIIT Nagpur
                                </h4>
                                <p className={`font-body ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    B.Tech in Internet of Things (IoT)
                                </p>
                                <div className="flex flex-wrap items-center gap-4 mt-3">
                                    <span
                                        className={`
                      flex items-center gap-1.5 text-sm
                      ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}
                                    >
                                        <MapPin size={14} /> Nagpur, Maharashtra
                                    </span>
                                    <span
                                        className={`
                      flex items-center gap-1.5 text-sm
                      ${isDark ? 'text-gray-400' : 'text-gray-500'}
                    `}
                                    >
                                        <Calendar size={14} /> 2023 – 2027
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Achievement highlight */}
                        <div
                            className={`
                mt-8 p-4 rounded-xl border
                ${isDark
                                    ? 'border-neon-cyan/20 bg-neon-cyan/5'
                                    : 'border-pastel-cyan/20 bg-pastel-cyan/5'
                                }
              `}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Trophy size={18} className={isDark ? 'text-neon-cyan' : 'text-pastel-cyan'} />
                                <span className={`font-display font-semibold text-sm ${isDark ? 'text-neon-cyan' : 'text-pastel-cyan'}`}>
                                    ACHIEVEMENTS
                                </span>
                            </div>
                            <ul className={`space-y-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                </div>
            </div>
        </section>
    )
}
