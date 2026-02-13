import { useTheme } from '../context/ThemeContext'

/* ──────────────────────────────────────────
   NEON BRAIN — SVG retro-futuristic brain
   ────────────────────────────────────────── */
export function NeonBrain({ className = '' }) {
    const { isDark } = useTheme()
    const primary = isDark ? '#00fff5' : '#5ab8b0'
    const secondary = isDark ? '#ff00e5' : '#a060c8'

    return (
        <div className={`animate-float ${className}`}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="brain-glow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g filter="url(#brain-glow)" opacity="0.7">
                    {/* Left hemisphere */}
                    <path d="M35 75 C25 65, 20 50, 30 38 C35 30, 45 25, 55 28 C58 20, 65 18, 70 22"
                        stroke={primary} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M30 60 C25 55, 28 42, 38 38"
                        stroke={primary} strokeWidth="1" fill="none" strokeLinecap="round" />
                    <path d="M35 70 C30 65, 32 55, 40 50"
                        stroke={primary} strokeWidth="1" fill="none" strokeLinecap="round" />
                    {/* Right hemisphere */}
                    <path d="M85 75 C95 65, 100 50, 90 38 C85 30, 75 25, 65 28 C62 20, 55 18, 50 22"
                        stroke={secondary} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    <path d="M90 60 C95 55, 92 42, 82 38"
                        stroke={secondary} strokeWidth="1" fill="none" strokeLinecap="round" />
                    <path d="M85 70 C90 65, 88 55, 80 50"
                        stroke={secondary} strokeWidth="1" fill="none" strokeLinecap="round" />
                    {/* Brain stem */}
                    <path d="M55 75 L55 95 M65 75 L65 95 M55 95 C55 100, 65 100, 65 95"
                        stroke={primary} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    {/* Neural connections */}
                    <circle cx="42" cy="42" r="2" fill={primary} opacity="0.8" />
                    <circle cx="78" cy="42" r="2" fill={secondary} opacity="0.8" />
                    <circle cx="50" cy="35" r="1.5" fill={primary} opacity="0.6" />
                    <circle cx="70" cy="35" r="1.5" fill={secondary} opacity="0.6" />
                    <circle cx="60" cy="50" r="2" fill={primary} opacity="0.9" />
                    {/* Connection lines */}
                    <line x1="42" y1="42" x2="50" y2="35" stroke={primary} strokeWidth="0.5" opacity="0.4" />
                    <line x1="50" y1="35" x2="60" y2="50" stroke={primary} strokeWidth="0.5" opacity="0.4" />
                    <line x1="60" y1="50" x2="70" y2="35" stroke={secondary} strokeWidth="0.5" opacity="0.4" />
                    <line x1="70" y1="35" x2="78" y2="42" stroke={secondary} strokeWidth="0.5" opacity="0.4" />
                </g>
            </svg>
        </div>
    )
}

/* ──────────────────────────────────────────
   NEON CASSETTE — retro tape cassette
   ────────────────────────────────────────── */
export function NeonCassette({ className = '' }) {
    const { isDark } = useTheme()
    const primary = isDark ? '#00fff5' : '#5ab8b0'
    const secondary = isDark ? '#ff00e5' : '#a060c8'

    return (
        <div className={`animate-float-reverse ${className}`}>
            <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="cassette-glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g filter="url(#cassette-glow)" opacity="0.65">
                    {/* Cassette body */}
                    <rect x="10" y="15" width="120" height="70" rx="8" stroke={primary} strokeWidth="1.5" fill="none" />
                    {/* Label area */}
                    <rect x="25" y="22" width="90" height="30" rx="4" stroke={secondary} strokeWidth="1" fill="none" opacity="0.5" />
                    {/* Lines on label */}
                    <line x1="32" y1="30" x2="108" y2="30" stroke={secondary} strokeWidth="0.5" opacity="0.3" />
                    <line x1="32" y1="36" x2="108" y2="36" stroke={secondary} strokeWidth="0.5" opacity="0.3" />
                    <line x1="32" y1="42" x2="108" y2="42" stroke={secondary} strokeWidth="0.5" opacity="0.3" />
                    {/* Tape reels */}
                    <circle cx="45" cy="65" r="10" stroke={primary} strokeWidth="1" fill="none" />
                    <circle cx="45" cy="65" r="4" stroke={primary} strokeWidth="0.8" fill="none" />
                    <circle cx="95" cy="65" r="10" stroke={primary} strokeWidth="1" fill="none" />
                    <circle cx="95" cy="65" r="4" stroke={primary} strokeWidth="0.8" fill="none" />
                    {/* Tape between reels */}
                    <path d="M55 65 L85 65" stroke={secondary} strokeWidth="0.5" opacity="0.5" />
                    {/* Tape window */}
                    <rect x="38" y="56" width="64" height="18" rx="3" stroke={primary} strokeWidth="0.8" fill="none" opacity="0.4" />
                    {/* Screw holes */}
                    <circle cx="18" cy="22" r="2" stroke={primary} strokeWidth="0.5" fill="none" opacity="0.3" />
                    <circle cx="122" cy="22" r="2" stroke={primary} strokeWidth="0.5" fill="none" opacity="0.3" />
                    <circle cx="18" cy="78" r="2" stroke={primary} strokeWidth="0.5" fill="none" opacity="0.3" />
                    <circle cx="122" cy="78" r="2" stroke={primary} strokeWidth="0.5" fill="none" opacity="0.3" />
                </g>
            </svg>
        </div>
    )
}

/* ──────────────────────────────────────────
   NEON CD — spinning retro compact disc
   ────────────────────────────────────────── */
export function NeonCD({ className = '' }) {
    const { isDark } = useTheme()
    const primary = isDark ? '#00fff5' : '#5ab8b0'
    const secondary = isDark ? '#ff00e5' : '#a060c8'
    const tertiary = isDark ? '#b026ff' : '#8848d0'

    return (
        <div className={`animate-spin-slow ${className}`}>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="cd-glow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g filter="url(#cd-glow)" opacity="0.6">
                    {/* Outer ring */}
                    <circle cx="60" cy="60" r="50" stroke={primary} strokeWidth="1.5" fill="none" />
                    <circle cx="60" cy="60" r="48" stroke={primary} strokeWidth="0.5" fill="none" opacity="0.3" />
                    {/* Track grooves */}
                    <circle cx="60" cy="60" r="42" stroke={secondary} strokeWidth="0.3" fill="none" opacity="0.3" />
                    <circle cx="60" cy="60" r="36" stroke={primary} strokeWidth="0.3" fill="none" opacity="0.3" />
                    <circle cx="60" cy="60" r="30" stroke={secondary} strokeWidth="0.3" fill="none" opacity="0.3" />
                    <circle cx="60" cy="60" r="24" stroke={tertiary} strokeWidth="0.3" fill="none" opacity="0.3" />
                    {/* Inner ring */}
                    <circle cx="60" cy="60" r="18" stroke={secondary} strokeWidth="1" fill="none" />
                    {/* Center hole */}
                    <circle cx="60" cy="60" r="6" stroke={primary} strokeWidth="1.5" fill="none" />
                    <circle cx="60" cy="60" r="2" fill={primary} opacity="0.5" />
                    {/* Light reflections */}
                    <line x1="60" y1="12" x2="60" y2="18" stroke={primary} strokeWidth="0.5" opacity="0.4" />
                    <line x1="60" y1="102" x2="60" y2="108" stroke={primary} strokeWidth="0.5" opacity="0.4" />
                    <line x1="12" y1="60" x2="18" y2="60" stroke={secondary} strokeWidth="0.5" opacity="0.4" />
                    <line x1="102" y1="60" x2="108" y2="60" stroke={secondary} strokeWidth="0.5" opacity="0.4" />
                    {/* Rainbow reflection arcs */}
                    <path d="M30 30 A42 42 0 0 1 60 18" stroke={primary} strokeWidth="0.8" fill="none" opacity="0.25" />
                    <path d="M90 30 A42 42 0 0 1 102 60" stroke={secondary} strokeWidth="0.8" fill="none" opacity="0.25" />
                    <path d="M90 90 A42 42 0 0 1 60 102" stroke={tertiary} strokeWidth="0.8" fill="none" opacity="0.25" />
                </g>
            </svg>
        </div>
    )
}
