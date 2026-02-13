import { useRef, useEffect, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'

// ─── Low-poly car shape (simple trapezoid + wheels) ───
function drawCar(ctx, x, y, w, h, color, glowColor) {
    ctx.save()
    ctx.shadowColor = glowColor
    ctx.shadowBlur = 18

    // Body bottom
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x - w / 2, y)
    ctx.lineTo(x + w / 2, y)
    ctx.lineTo(x + w / 2 - 4, y - h * 0.45)
    ctx.lineTo(x - w / 2 + 4, y - h * 0.45)
    ctx.closePath()
    ctx.fill()

    // Cabin (windshield trapezoid)
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.beginPath()
    ctx.moveTo(x - w / 2 + 8, y - h * 0.45)
    ctx.lineTo(x + w / 2 - 8, y - h * 0.45)
    ctx.lineTo(x + w / 2 - 14, y - h * 0.82)
    ctx.lineTo(x - w / 2 + 14, y - h * 0.82)
    ctx.closePath()
    ctx.fill()

    // Roof
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x - w / 2 + 14, y - h * 0.82)
    ctx.lineTo(x + w / 2 - 14, y - h * 0.82)
    ctx.lineTo(x + w / 2 - 16, y - h)
    ctx.lineTo(x - w / 2 + 16, y - h)
    ctx.closePath()
    ctx.fill()

    // Tail lights
    ctx.shadowBlur = 12
    ctx.shadowColor = '#ff2244'
    ctx.fillStyle = '#ff2244'
    ctx.fillRect(x - w / 2 + 1, y - 6, 5, 3)
    ctx.fillRect(x + w / 2 - 6, y - 6, 5, 3)

    // Headlights glow
    ctx.shadowColor = '#ffee88'
    ctx.fillStyle = '#ffee88'
    ctx.fillRect(x - w / 2 + 2, y - h * 0.42, 4, 2)
    ctx.fillRect(x + w / 2 - 6, y - h * 0.42, 4, 2)

    ctx.shadowBlur = 0
    ctx.restore()
}

// ─── Simple obstacle car ───
function drawObstacleCar(ctx, x, y, w, h, color) {
    ctx.save()
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.moveTo(x - w / 2, y)
    ctx.lineTo(x + w / 2, y)
    ctx.lineTo(x + w / 2 - 3, y - h * 0.5)
    ctx.lineTo(x - w / 2 + 3, y - h * 0.5)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = 'rgba(0,0,0,0.5)'
    ctx.beginPath()
    ctx.moveTo(x - w / 2 + 5, y - h * 0.5)
    ctx.lineTo(x + w / 2 - 5, y - h * 0.5)
    ctx.lineTo(x + w / 2 - 9, y - h * 0.85)
    ctx.lineTo(x - w / 2 + 9, y - h * 0.85)
    ctx.closePath()
    ctx.fill()

    // Tail lights
    ctx.shadowBlur = 8
    ctx.shadowColor = '#ff4466'
    ctx.fillStyle = '#ff4466'
    ctx.fillRect(x - w / 2 + 1, y - 4, 4, 2)
    ctx.fillRect(x + w / 2 - 5, y - 4, 4, 2)
    ctx.shadowBlur = 0
    ctx.restore()
}

export default function RetroCarGame() {
    const canvasRef = useRef(null)
    const { isDark } = useTheme()
    const keysRef = useRef({ left: false, right: false })
    const gameRef = useRef({
        carX: 0.5,  // 0..1 normalized position
        speed: 2,
        roadOffset: 0,
        obstacles: [],
        stars: [],
        buildings: [],
        initialized: false,
    })

    // Initialize stars and buildings once
    const initScene = useCallback((w) => {
        const g = gameRef.current
        if (g.initialized) return
        g.stars = Array.from({ length: 80 }, () => ({
            x: Math.random(),
            y: Math.random() * 0.45,
            size: Math.random() * 1.8 + 0.5,
            twinkle: Math.random() * Math.PI * 2,
        }))
        // Left buildings
        g.buildings = []
        for (let i = 0; i < 8; i++) {
            g.buildings.push({
                x: Math.random() * 0.2,
                w: Math.random() * 0.06 + 0.03,
                h: Math.random() * 0.15 + 0.08,
                side: 'left',
                windows: Math.floor(Math.random() * 3) + 2,
            })
        }
        // Right buildings
        for (let i = 0; i < 8; i++) {
            g.buildings.push({
                x: 0.8 + Math.random() * 0.2,
                w: Math.random() * 0.06 + 0.03,
                h: Math.random() * 0.15 + 0.08,
                side: 'right',
                windows: Math.floor(Math.random() * 3) + 2,
            })
        }
        // Initial obstacles
        g.obstacles = []
        for (let i = 0; i < 3; i++) {
            g.obstacles.push({
                lane: Math.random() * 0.6 + 0.2,
                z: 0.3 + i * 0.25,
                color: ['#e879f9', '#22d3ee', '#f97316'][i % 3],
            })
        }
        g.initialized = true
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animId

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = true
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = true
        }
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keysRef.current.left = false
            if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keysRef.current.right = false
        }
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            const rect = canvas.parentElement.getBoundingClientRect()
            canvas.width = rect.width * dpr
            canvas.height = rect.height * dpr
            ctx.scale(dpr, dpr)
            canvas.style.width = rect.width + 'px'
            canvas.style.height = rect.height + 'px'
        }
        resize()
        window.addEventListener('resize', resize)

        initScene(canvas.width)

        let lastTime = 0
        const loop = (time) => {
            const dt = Math.min((time - lastTime) / 1000, 0.05)
            lastTime = time

            const w = canvas.width / (window.devicePixelRatio || 1)
            const h = canvas.height / (window.devicePixelRatio || 1)
            const g = gameRef.current

            // Update car position
            if (keysRef.current.left) g.carX = Math.max(0.15, g.carX - 1.2 * dt)
            if (keysRef.current.right) g.carX = Math.min(0.85, g.carX + 1.2 * dt)

            g.roadOffset += g.speed * dt
            if (g.roadOffset > 1) g.roadOffset -= 1

            // Update obstacles
            g.obstacles.forEach(obs => {
                obs.z += g.speed * dt * 0.3
                if (obs.z > 1.1) {
                    obs.z = -0.1
                    obs.lane = Math.random() * 0.5 + 0.25
                    obs.color = ['#e879f9', '#22d3ee', '#f97316', '#a855f7'][Math.floor(Math.random() * 4)]
                }
            })

            // ─── DRAW ───
            ctx.clearRect(0, 0, w, h)

            const horizonY = h * 0.48
            const dark = isDark

            // Sky gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY)
            if (dark) {
                skyGrad.addColorStop(0, '#05050f')
                skyGrad.addColorStop(0.5, '#0c0820')
                skyGrad.addColorStop(0.85, '#1a0a3a')
                skyGrad.addColorStop(1, '#3a1060')
            } else {
                skyGrad.addColorStop(0, '#1a0a3a')
                skyGrad.addColorStop(0.5, '#3a1060')
                skyGrad.addColorStop(1, '#e060a0')
            }
            ctx.fillStyle = skyGrad
            ctx.fillRect(0, 0, w, horizonY)

            // Stars
            const t = time * 0.001
            g.stars.forEach(star => {
                const alpha = 0.4 + 0.5 * Math.sin(t * 1.5 + star.twinkle)
                ctx.fillStyle = `rgba(255,255,255,${alpha})`
                ctx.fillRect(star.x * w, star.y * h, star.size, star.size)
            })

            // Sun
            const sunX = w * 0.5
            const sunY = horizonY - h * 0.02
            const sunR = Math.min(w, h) * 0.13

            // Sun glow
            const sunGlow = ctx.createRadialGradient(sunX, sunY, sunR * 0.3, sunX, sunY, sunR * 2.5)
            sunGlow.addColorStop(0, 'rgba(255,240,100,0.3)')
            sunGlow.addColorStop(0.4, 'rgba(255,120,60,0.1)')
            sunGlow.addColorStop(1, 'rgba(255,60,120,0)')
            ctx.fillStyle = sunGlow
            ctx.fillRect(0, horizonY - sunR * 3, w, sunR * 4)

            // Sun body
            const sunBodyGrad = ctx.createLinearGradient(sunX, sunY - sunR, sunX, sunY + sunR * 0.3)
            sunBodyGrad.addColorStop(0, '#fff8a0')
            sunBodyGrad.addColorStop(0.4, '#ffaa44')
            sunBodyGrad.addColorStop(0.7, '#ff6688')
            sunBodyGrad.addColorStop(1, '#cc44aa')
            ctx.fillStyle = sunBodyGrad
            ctx.beginPath()
            ctx.arc(sunX, sunY, sunR, Math.PI, 0)
            ctx.fill()

            // Sun scanlines
            ctx.save()
            ctx.beginPath()
            ctx.arc(sunX, sunY, sunR, Math.PI, 0)
            ctx.clip()
            ctx.fillStyle = dark ? '#05050f' : '#1a0a3a'
            for (let i = 0; i < 12; i++) {
                const lineY = sunY - sunR + i * (sunR / 6)
                const lineH = 1 + i * 0.5
                ctx.fillRect(sunX - sunR, lineY, sunR * 2, lineH)
            }
            ctx.restore()

            // Buildings silhouette
            const bldgColor = dark ? '#08081a' : '#120828'
            ctx.fillStyle = bldgColor
            g.buildings.forEach(b => {
                const bx = b.x * w
                const bw = b.w * w
                const bh = b.h * h
                const by = horizonY - bh
                ctx.fillRect(bx, by, bw, bh + 4)

                // Windows
                ctx.fillStyle = dark ? 'rgba(255,230,120,0.4)' : 'rgba(255,200,100,0.5)'
                const winRows = b.windows
                const winCols = Math.max(2, Math.floor(bw / 8))
                const winW = 2.5
                const winH = 2.5
                for (let r = 0; r < winRows; r++) {
                    for (let c = 0; c < winCols; c++) {
                        if (Math.random() > 0.35) {
                            ctx.fillRect(
                                bx + 3 + c * (bw - 6) / winCols,
                                by + 4 + r * (bh - 8) / winRows,
                                winW, winH
                            )
                        }
                    }
                }
                ctx.fillStyle = bldgColor
            })

            // Ground
            const groundGrad = ctx.createLinearGradient(0, horizonY, 0, h)
            if (dark) {
                groundGrad.addColorStop(0, '#0a0418')
                groundGrad.addColorStop(1, '#000008')
            } else {
                groundGrad.addColorStop(0, '#1a0830')
                groundGrad.addColorStop(1, '#0a0418')
            }
            ctx.fillStyle = groundGrad
            ctx.fillRect(0, horizonY, w, h - horizonY)

            // ─── Perspective Grid with slow parallax drift ───
            const driftX = Math.sin(t * 0.5) * 2   // ±2px over ~12s cycle
            const driftY = Math.cos(t * 0.35) * 1  // ±1px vertical
            const vanishX = w * 0.5 + driftX
            const roadLeftClose = w * 0.05
            const roadRightClose = w * 0.95

            // Horizontal grid lines (receding)
            const numHLines = 20
            const gridColor = dark ? 'rgba(232,121,249,' : 'rgba(180,138,216,'
            for (let i = 0; i < numHLines; i++) {
                let t01 = (i / numHLines + g.roadOffset / numHLines) % 1
                // Perspective: closer lines are more spread apart
                const perspY = horizonY + (h - horizonY) * Math.pow(t01, 1.8)
                const alpha = 0.08 + t01 * 0.25
                ctx.strokeStyle = gridColor + alpha + ')'
                ctx.lineWidth = 0.5 + t01 * 1
                ctx.beginPath()
                ctx.moveTo(0, perspY)
                ctx.lineTo(w, perspY)
                ctx.stroke()
            }

            // Vertical grid lines (converging to vanishing point)
            const numVLines = 16
            const vertColor = dark ? 'rgba(34,211,238,' : 'rgba(110,198,192,'
            for (let i = 0; i <= numVLines; i++) {
                const t01 = i / numVLines
                const bottomX = roadLeftClose + (roadRightClose - roadLeftClose) * t01
                const alpha = 0.15 - Math.abs(t01 - 0.5) * 0.15
                ctx.strokeStyle = vertColor + (alpha + 0.05) + ')'
                ctx.lineWidth = 0.6
                ctx.beginPath()
                ctx.moveTo(vanishX, horizonY)
                ctx.lineTo(bottomX, h)
                ctx.stroke()
            }

            // Road center line glow
            ctx.strokeStyle = dark ? 'rgba(34,211,238,0.3)' : 'rgba(110,198,192,0.4)'
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(vanishX, horizonY)
            ctx.lineTo(w * 0.5, h)
            ctx.stroke()

            // ─── Obstacle cars ───
            g.obstacles.forEach(obs => {
                if (obs.z < 0) return
                const perspZ = Math.pow(obs.z, 1.8)
                const oy = horizonY + (h - horizonY) * perspZ
                const scale = perspZ
                const ox = vanishX + (obs.lane - 0.5) * (roadRightClose - roadLeftClose) * perspZ
                const cw = 20 + scale * 30
                const ch = 14 + scale * 22

                if (oy > horizonY && oy < h - 30) {
                    drawObstacleCar(ctx, ox, oy, cw, ch, obs.color)
                }
            })

            // ─── Player car ───
            const playerY = h - 30
            const playerX = roadLeftClose + (roadRightClose - roadLeftClose) * g.carX
            const carW = 48
            const carH = 36
            const carColor = dark ? '#22d3ee' : '#6ec6c0'
            const carGlow = dark ? 'rgba(34,211,238,0.6)' : 'rgba(110,198,192,0.6)'
            drawCar(ctx, playerX, playerY, carW, carH, carColor, carGlow)

            // ─── Controls hint ───
            ctx.fillStyle = dark ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.25)'
            ctx.font = '11px "Space Grotesk", sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText('← A/D or Arrow Keys to drive →', w / 2, h - 8)

            animId = requestAnimationFrame(loop)
        }

        animId = requestAnimationFrame(loop)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('resize', resize)
        }
    }, [isDark, initScene])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        />
    )
}
