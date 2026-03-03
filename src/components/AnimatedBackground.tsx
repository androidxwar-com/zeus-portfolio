import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* ─── Floating Orbs (Aurora Nebula) ─────────────────────────────── */
const orbs = [
    { w: 700, h: 700, color: 'rgba(139,92,246,0.12)', top: '5%', left: '-10%', dur: 18, delay: 0 },
    { w: 500, h: 500, color: 'rgba(6,182,212,0.09)', top: '30%', left: '70%', dur: 22, delay: 3 },
    { w: 800, h: 600, color: 'rgba(139,92,246,0.07)', top: '60%', left: '20%', dur: 28, delay: 6 },
    { w: 400, h: 400, color: 'rgba(236,72,153,0.08)', top: '80%', left: '80%', dur: 20, delay: 9 },
    { w: 600, h: 600, color: 'rgba(34,197,94,0.06)', top: '15%', left: '50%', dur: 24, delay: 4 },
]

/* ─── Canvas particle system ─────────────────────────────────────── */
function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animId: number
        const particles: {
            x: number; y: number; vx: number; vy: number
            r: number; alpha: number; alphaDir: number
        }[] = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = document.documentElement.scrollHeight
        }
        resize()
        window.addEventListener('resize', resize)

        // Spawn particles
        const COUNT = 90
        for (let i = 0; i < COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.4 + 0.3,
                alpha: Math.random() * 0.45 + 0.05,
                alphaDir: Math.random() > 0.5 ? 1 : -1,
            })
        }

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach((p) => {
                // drift
                p.x += p.vx
                p.y += p.vy
                // pulse opacity
                p.alpha += p.alphaDir * 0.004
                if (p.alpha > 0.55 || p.alpha < 0.04) p.alphaDir *= -1
                // wrap
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
                ctx.fill()
            })
            animId = requestAnimationFrame(tick)
        }
        tick()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 0, opacity: 0.55 }}
        />
    )
}

/* ─── Grid lines overlay ────────────────────────────────────────── */
function GridLines() {
    return (
        <div
            className="fixed inset-0 pointer-events-none"
            style={{
                zIndex: 0,
                backgroundImage: `
          linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
        `,
                backgroundSize: '80px 80px',
                maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
            }}
        />
    )
}

/* ─── Main export ────────────────────────────────────────────────── */
export function AnimatedBackground() {
    return (
        <>
            {/* Particle field */}
            <ParticleCanvas />

            {/* Subtle perspective grid */}
            <GridLines />

            {/* Slow aurora orbs */}
            {orbs.map((orb, i) => (
                <motion.div
                    key={i}
                    className="fixed rounded-full pointer-events-none"
                    style={{
                        width: orb.w,
                        height: orb.h,
                        background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
                        top: orb.top,
                        left: orb.left,
                        filter: 'blur(90px)',
                        zIndex: 0,
                    }}
                    animate={{
                        x: [0, 40, -30, 20, 0],
                        y: [0, -30, 20, -15, 0],
                        scale: [1, 1.08, 0.95, 1.04, 1],
                    }}
                    transition={{
                        duration: orb.dur,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: orb.delay,
                    }}
                />
            ))}
        </>
    )
}
