import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TimelineContent from './components/TimelineContent'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

function AppContent() {
    const { isDark } = useTheme()

    return (
        <div className={isDark ? 'dark' : 'light'}>
            <div
                className={`
                    min-h-screen transition-colors duration-500
                    ${isDark ? 'bg-grid-dark text-white' : 'bg-grid-light text-gray-900'}
                `}
            >
                <CustomCursor />
                <Navbar />
                <main>
                    <Hero />
                    <TimelineContent />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    )
}
