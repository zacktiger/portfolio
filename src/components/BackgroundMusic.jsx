import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function BackgroundMusic() {
    const { isDark } = useTheme()
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const [volume] = useState(0.35) // Background music volume (0-1)

    // Attempt autoplay muted, then wait for user interaction to unmute
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.volume = 0
        audio.muted = true
        audio.loop = true

        // Try autoplay muted
        const playPromise = audio.play()
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay succeeded (muted). 
                    // We'll unmute on first click.
                })
                .catch(() => {
                    // Autoplay blocked entirely — we'll start on first interaction
                })
        }
    }, [])

    // Listen for first user interaction anywhere on page
    const handleFirstInteraction = useCallback(() => {
        if (hasInteracted) return
        setHasInteracted(true)

        const audio = audioRef.current
        if (!audio) return

        audio.muted = false
        audio.volume = volume

        const playPromise = audio.play()
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true)
                })
                .catch(() => {
                    // Still blocked — user can manually click the button
                })
        }
    }, [hasInteracted, volume])

    useEffect(() => {
        const events = ['click', 'touchstart', 'keydown']
        events.forEach(event =>
            document.addEventListener(event, handleFirstInteraction, { once: false, passive: true })
        )
        return () => {
            events.forEach(event =>
                document.removeEventListener(event, handleFirstInteraction)
            )
        }
    }, [handleFirstInteraction])

    // Remove listeners after first interaction
    useEffect(() => {
        if (hasInteracted) {
            const events = ['click', 'touchstart', 'keydown']
            events.forEach(event =>
                document.removeEventListener(event, handleFirstInteraction)
            )
        }
    }, [hasInteracted, handleFirstInteraction])

    // Toggle music on/off via the button
    const toggleMusic = (e) => {
        e.stopPropagation()
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.muted = false
            audio.volume = volume
            const playPromise = audio.play()
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true)
                        if (!hasInteracted) setHasInteracted(true)
                    })
                    .catch(() => {
                        // Unable to play
                    })
            }
        }
    }

    // Equalizer bar animation for the playing state
    const EqualizerBars = () => (
        <div className="flex items-end gap-[2px] h-3">
            {[0, 1, 2, 3].map(i => (
                <motion.div
                    key={i}
                    className={`w-[3px] rounded-full ${
                        isDark ? 'bg-neon-cyan' : 'bg-pastel-cyan'
                    }`}
                    animate={{
                        height: isPlaying
                            ? [3, 8 + Math.random() * 4, 4, 10 + Math.random() * 2, 3]
                            : 3,
                    }}
                    transition={{
                        duration: 0.8 + i * 0.15,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    )

    return (
        <>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src="/bgm.mp3"
                loop
                preload="auto"
            />

            {/* Floating Music Toggle Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6, type: 'spring', stiffness: 200 }}
                className="fixed bottom-6 right-6 z-[100]"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                {/* Tooltip */}
                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={`
                                absolute bottom-full right-0 mb-3 px-3 py-1.5 rounded-lg text-xs font-display
                                tracking-wider whitespace-nowrap pointer-events-none
                                ${isDark
                                    ? 'bg-dark-surface/95 text-neon-cyan border border-neon-cyan/20 shadow-lg shadow-neon-cyan/5'
                                    : 'bg-light-surface/95 text-pastel-cyan border border-pastel-cyan/30 shadow-lg'
                                }
                            `}
                        >
                            {isPlaying ? 'PAUSE MUSIC' : 'PLAY MUSIC'}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulsing ring behind the button when playing */}
                {isPlaying && (
                    <motion.div
                        className={`
                            absolute inset-0 rounded-full
                            ${isDark ? 'border border-neon-cyan/30' : 'border border-pastel-cyan/40'}
                        `}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 0, 0.6],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                )}

                {/* Main Button */}
                <motion.button
                    onClick={toggleMusic}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`
                        relative w-12 h-12 rounded-full flex items-center justify-center
                        transition-all duration-500 cursor-pointer
                        ${isDark
                            ? isPlaying
                                ? 'bg-dark-surface/90 border border-neon-cyan/40 shadow-lg shadow-neon-cyan/20'
                                : 'bg-dark-surface/80 border border-gray-700/50 shadow-lg'
                            : isPlaying
                                ? 'bg-light-surface/90 border border-pastel-cyan/50 shadow-lg shadow-pastel-cyan/20'
                                : 'bg-light-surface/80 border border-gray-300/50 shadow-lg'
                        }
                        backdrop-blur-xl
                    `}
                    aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
                    id="music-toggle-btn"
                >
                    {isPlaying ? (
                        <div className="flex items-center gap-1">
                            <EqualizerBars />
                        </div>
                    ) : (
                        <VolumeX
                            size={18}
                            className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}
                        />
                    )}
                </motion.button>
            </motion.div>

            {/* Initial "Click anywhere" hint — shown only before first interaction */}
            <AnimatePresence>
                {!hasInteracted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 3, duration: 1 }}
                        className={`
                            fixed bottom-20 right-4 z-[99] px-3 py-2 rounded-lg text-[10px]
                            font-display tracking-[0.2em] uppercase pointer-events-none
                            ${isDark
                                ? 'bg-dark-surface/80 text-gray-500 border border-white/5'
                                : 'bg-light-surface/80 text-gray-400 border border-black/5'
                            }
                            backdrop-blur-md
                        `}
                    >
                        ♪ CLICK ANYWHERE FOR MUSIC
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
