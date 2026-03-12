import { useEffect, useRef } from 'react'

/**
 * WebGLBackground
 * ─────────────────────────────────────────────────────────────────────────
 * Fase 2: Alta Densità Visiva — implementato su Canvas2D nativo invece di
 * React Three Fiber per garantire compatibilità e stabilità (no peer deps
 * conflicts con react@18).
 * 
 * Effetti:
 * - 300 particelle in moto browniano continuo
 * - Velocità/dimensione aumenta in proporzione a window.lenis.velocity
 * - Connessione tra particelle vicine (effetto rete) con alpha proporzionale
 * - Tutto in GPU tramite requestAnimationFrame
 * ─────────────────────────────────────────────────────────────────────────
 */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  baseVx: number
  baseVy: number
}

export function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrameId: number
    let particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      const COUNT = 300
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        baseVx: (Math.random() - 0.5) * 0.4,
        baseVy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.15,
      }))
    }

    const draw = () => {
      // Get lenis velocity if available
      // @ts-ignore
      const velocity = window.lenis?.velocity ?? 0
      const warpFactor = Math.min(Math.abs(velocity) * 0.015, 1.5)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply warp speed: boost velocity based on scroll
        p.vx = p.baseVx * (1 + warpFactor * 4)
        p.vy = p.baseVy * (1 + warpFactor * 4)

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle: purple glow matches brand
        const alpha = p.opacity * (1 + warpFactor * 0.5)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * (1 + warpFactor * 0.3), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${Math.min(alpha, 0.9)})`
        ctx.fill()

        // Draw connections to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 100

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animFrameId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
