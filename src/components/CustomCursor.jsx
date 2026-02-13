import { useState, useEffect, useRef, useCallback } from 'react'

const isTouchDevice = () => 'ontouchstart' in window && navigator.maxTouchPoints > 0

const MAX_TRAIL = 28       // trail points buffer
const TRAIL_MAX_LEN = 55   // ~55px max visible trail
const TRAIL_DECAY = 6      // how fast old points fade (per second)

// ─── Particle system (energy sparks, only on collapsible clicks) ───
function createParticles(x, y) {
    const count = 6 + Math.floor(Math.random() * 4)
    const particles = []
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.8
        const speed = 35 + Math.random() * 50
        const size = 1.5 + Math.random() * 2
        const hue = Math.random() > 0.5 ? 187 : 310
        particles.push({ id: Date.now() + i, x, y, angle, speed, size, hue, life: 1 })
    }
    return particles
}

// Linear interpolate between two points, returning intermediate samples
function interpolate(a, b, spacing) {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < spacing) return []
    const steps = Math.floor(dist / spacing)
    const pts = []
    for (let i = 1; i <= steps; i++) {
        const t = i / (steps + 1)
        pts.push({ x: a.x + dx * t, y: a.y + dy * t, life: 1 })
    }
    return pts
}

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 })
    const [isVisible, setIsVisible] = useState(false)
    const [isTouch, setIsTouch] = useState(false)
    const canvasRef = useRef(null)
    const trailRef = useRef([])        // { x, y, life }
    const particlesRef = useRef([])
    const animRef = useRef(null)
    const lastPosRef = useRef(null)

    useEffect(() => { setIsTouch(isTouchDevice()) }, [])

    // Mouse tracking — feed trail with interpolated points
    useEffect(() => {
        if (isTouch) return
        const handleMove = (e) => {
            const nx = e.clientX
            const ny = e.clientY
            setPos({ x: nx, y: ny })
            if (!isVisible) setIsVisible(true)

            // Interpolate between last position and new one
            const last = lastPosRef.current
            if (last) {
                const interp = interpolate(last, { x: nx, y: ny }, 3)
                interp.forEach(p => trailRef.current.push(p))
            }
            trailRef.current.push({ x: nx, y: ny, life: 1 })

            // Keep buffer bounded
            if (trailRef.current.length > MAX_TRAIL * 3) {
                trailRef.current = trailRef.current.slice(-MAX_TRAIL * 2)
            }

            lastPosRef.current = { x: nx, y: ny }
        }
        const handleLeave = () => setIsVisible(false)
        const handleEnter = () => setIsVisible(true)

        window.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseleave', handleLeave)
        document.addEventListener('mouseenter', handleEnter)
        return () => {
            window.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseleave', handleLeave)
            document.removeEventListener('mouseenter', handleEnter)
        }
    }, [isVisible, isTouch])

    // Canvas render loop — smooth trail + click particles
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        let last = performance.now()
        const loop = (now) => {
            const dt = Math.min((now - last) / 1000, 0.05)
            last = now
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // ── Trail rendering ──
            // Decay trail points
            trailRef.current.forEach(p => { p.life -= TRAIL_DECAY * dt })
            trailRef.current = trailRef.current.filter(p => p.life > 0.01)

            const trail = trailRef.current
            if (trail.length >= 2) {
                // Compute cumulative distance from tip (newest point)
                // and cull points beyond TRAIL_MAX_LEN
                const distances = [0]
                for (let i = trail.length - 2; i >= 0; i--) {
                    const a = trail[i + 1]
                    const b = trail[i]
                    const dx = b.x - a.x
                    const dy = b.y - a.y
                    distances.unshift(distances[0] + Math.sqrt(dx * dx + dy * dy))
                }
                const totalLen = distances[0]

                // Draw trail as a smooth tapered stroke
                for (let i = 0; i < trail.length - 1; i++) {
                    const p0 = trail[i]
                    const p1 = trail[i + 1]
                    const distFromTip = totalLen - distances[i]

                    // Skip segments beyond max trail length
                    if (distFromTip > TRAIL_MAX_LEN) continue

                    // Taper: thickest at tip, thinnest at tail
                    const taper = 1 - (distFromTip / TRAIL_MAX_LEN)
                    const width = taper * 3.5 + 0.3
                    const alpha = taper * Math.min(p0.life, p1.life) * 0.7

                    if (alpha < 0.005) continue

                    ctx.save()
                    ctx.globalAlpha = alpha

                    // Bloom layer (wider, softer)
                    ctx.shadowColor = `rgba(232,121,249,${alpha * 0.6})`
                    ctx.shadowBlur = 10 + taper * 6
                    ctx.strokeStyle = `rgba(232,121,249,${alpha})`
                    ctx.lineWidth = width + 2
                    ctx.lineCap = 'round'
                    ctx.beginPath()
                    ctx.moveTo(p0.x, p0.y)
                    ctx.lineTo(p1.x, p1.y)
                    ctx.stroke()

                    // Core line (brighter, thinner)
                    ctx.shadowBlur = 4
                    ctx.shadowColor = `rgba(255,180,255,${alpha * 0.5})`
                    ctx.strokeStyle = `rgba(255,200,255,${alpha * 0.9})`
                    ctx.lineWidth = width * 0.5
                    ctx.beginPath()
                    ctx.moveTo(p0.x, p0.y)
                    ctx.lineTo(p1.x, p1.y)
                    ctx.stroke()

                    ctx.restore()
                }
            }

            // ── Particle rendering (click sparks) ──
            particlesRef.current = particlesRef.current.filter(p => p.life > 0)
            particlesRef.current.forEach(p => {
                p.x += Math.cos(p.angle) * p.speed * dt
                p.y += Math.sin(p.angle) * p.speed * dt
                p.life -= dt * 3.5
                p.speed *= 0.96

                const alpha = Math.max(0, p.life)
                ctx.save()
                ctx.globalAlpha = alpha
                ctx.shadowColor = `hsla(${p.hue}, 80%, 65%, ${alpha})`
                ctx.shadowBlur = 8
                const len = p.size * 2.5
                ctx.lineWidth = p.size * 0.8
                ctx.lineCap = 'round'
                ctx.strokeStyle = `hsla(${p.hue}, 80%, 65%, ${alpha})`
                ctx.beginPath()
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(p.x - Math.cos(p.angle) * len, p.y - Math.sin(p.angle) * len)
                ctx.stroke()
                ctx.restore()
            })

            animRef.current = requestAnimationFrame(loop)
        }
        animRef.current = requestAnimationFrame(loop)
        return () => {
            cancelAnimationFrame(animRef.current)
            window.removeEventListener('resize', resize)
        }
    }, [isTouch])

    // Click handler — particles + shake only on collapsible cards
    const shoot = useCallback((e) => {
        const x = e.clientX ?? e.touches?.[0]?.clientX
        const y = e.clientY ?? e.touches?.[0]?.clientY
        if (x == null) return

        const hitEl = document.elementFromPoint(x, y)
        const projectBtn = hitEl?.closest('[data-project-id]')

        if (projectBtn) {
            document.body.classList.add('screen-shake')
            setTimeout(() => document.body.classList.remove('screen-shake'), 100)
            particlesRef.current.push(...createParticles(x, y))
            setTimeout(() => {
                projectBtn.dispatchEvent(new CustomEvent('laser-hit', {
                    detail: { projectId: projectBtn.dataset.projectId },
                    bubbles: true,
                }))
            }, 0)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('click', shoot)
        return () => window.removeEventListener('click', shoot)
    }, [shoot])

    if (isTouch) return null

    return (
        <>
            {/* Trail + particle canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 99998,
                    pointerEvents: 'none',
                }}
            />

            {/* Triangular ship cursor */}
            {isVisible && (
                <div
                    style={{
                        position: 'fixed',
                        left: pos.x,
                        top: pos.y,
                        pointerEvents: 'none',
                        zIndex: 99999,
                        transform: 'translate(-10px, -10px)',
                    }}
                >
                    <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                        <defs>
                            <filter id="ship-glow">
                                <feGaussianBlur stdDeviation="1.2" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g filter="url(#ship-glow)">
                            <path
                                d="M10 1 L18 20 L14 17 L10 22 L6 17 L2 20 Z"
                                fill="rgba(232,121,249,0.7)"
                                stroke="rgba(232,121,249,0.9)"
                                strokeWidth="0.6"
                            />
                            <path
                                d="M10 6 L13 15 L7 15 Z"
                                fill="rgba(34,211,238,0.5)"
                            />
                            <line x1="4" y1="17" x2="8" y2="12" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5" />
                            <line x1="16" y1="17" x2="12" y2="12" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5" />
                        </g>
                    </svg>
                </div>
            )}
        </>
    )
}
