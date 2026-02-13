import { useTheme } from '../context/ThemeContext'

export default function SectionTitle({ children, subtitle }) {
    const { isDark } = useTheme()

    return (
        <div className="text-center mb-16">
            <h2
                className={`
          font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider mb-4
          ${isDark ? 'gradient-text neon-text-cyan' : 'gradient-text-light'}
        `}
            >
                {children}
            </h2>
            {subtitle && (
                <p className={`font-display text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {subtitle}
                </p>
            )}
            <div
                className={`
          mx-auto mt-6 h-px w-24
          ${isDark
                        ? 'bg-gradient-to-r from-transparent via-neon-cyan to-transparent'
                        : 'bg-gradient-to-r from-transparent via-pastel-cyan to-transparent'
                    }
        `}
            />
        </div>
    )
}
