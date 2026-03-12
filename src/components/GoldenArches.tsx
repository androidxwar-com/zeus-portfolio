import { useEffect, useRef } from 'react'

/**
 * GoldenArches
 * ─────────────────────────────────────────────────────────────────────────
 * Effetto laterale della Hero section.
 * Due canvas affiancati all'immagine centrale con:
 *  - 7 archi bezier dorati pulsanti
 *  - Attrazione buco-nero verso il cursore (outer start + inner end + cp)
 *  - 3 linee verticali graduate per lato
 *  - Crossover X ai piedi del ritratto
 * ─────────────────────────────────────────────────────────────────────────
 */
export function GoldenArches() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftRef      = useRef<HTMLCanvasElement>(null)
  const rightRef     = useRef<HTMLCanvasElement>(null)
  const crossRef     = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const leftC     = leftRef.current
    const rightC    = rightRef.current
    const crossC    = crossRef.current
    if (!container || !leftC || !rightC || !crossC) return

    // ── Dims
    const VW = container.offsetWidth
    const VH = container.offsetHeight
    const SIDE_W = Math.round(VW / 2 - 10)

    leftC.width  = SIDE_W; leftC.height  = VH
    rightC.width = SIDE_W; rightC.height = VH
    crossC.width = VW;     crossC.height = VH

    const lCtx = leftC.getContext('2d')!
    const rCtx = rightC.getContext('2d')!
    const xCtx = crossC.getContext('2d')!

    // Portrait approximate metrics
    const pW    = Math.min(VW * 0.38, 300)
    const pH    = VH * 0.72
    const pX    = VW / 2
    const pY    = VH / 2
    const feetY = pY + pH / 2

    // Mouse state (global screen coords)
    let mx = -9999, my = -9999
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    // ── 7 arc definitions
    const arcDefs = [
      { y: VH * 0.10, amp: 10, period: 190, alpha: 0.28, thick: 0.5 },
      { y: VH * 0.22, amp: 18, period: 220, alpha: 0.50, thick: 0.9 },
      { y: VH * 0.34, amp: 12, period: 170, alpha: 0.40, thick: 0.75 },
      { y: VH * 0.47, amp: 22, period: 300, alpha: 0.60, thick: 1.2 },
      { y: VH * 0.60, amp: 15, period: 250, alpha: 0.45, thick: 0.85 },
      { y: VH * 0.73, amp: 10, period: 140, alpha: 0.35, thick: 0.65 },
      { y: VH * 0.84, amp: 14, period: 210, alpha: 0.38, thick: 0.75 },
    ]

    // ── Black-hole attraction
    const ATTRACT_RADIUS   = 200
    const ATTRACT_STRENGTH = 0.38

    function attract(absX: number, absY: number) {
      if (mx < 0) return { ox: 0, oy: 0 }
      const dx   = mx - absX
      const dy   = my - absY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > ATTRACT_RADIUS) return { ox: 0, oy: 0 }
      const force = Math.pow(1 - dist / ATTRACT_RADIUS, 1.6) * ATTRACT_STRENGTH
      return { ox: dx * force, oy: dy * force }
    }

    // ── Draw one side (left or right)
    function drawSide(ctx: CanvasRenderingContext2D, W: number, H: number, flip: boolean, sideOffsetX: number, t: number) {
      ctx.clearRect(0, 0, W, H)

      // Edge fog
      const fog = ctx.createLinearGradient(flip ? W : 0, 0, flip ? 0 : W, 0)
      fog.addColorStop(0,   'rgba(10,8,6,0.75)')
      fog.addColorStop(0.5, 'rgba(10,8,6,0)')
      ctx.fillStyle = fog
      ctx.fillRect(0, 0, W, H)

      // Vertical golden lines
      const vLines = [
        { x: flip ? W - 12 : 12, alpha: 0.50 },
        { x: flip ? W - 28 : 28, alpha: 0.28 },
        { x: flip ? W - 44 : 44, alpha: 0.14 },
      ]
      for (const v of vLines) {
        const grad = ctx.createLinearGradient(0, 0, 0, H)
        grad.addColorStop(0,   'rgba(255,204,102,0)')
        grad.addColorStop(0.2, `rgba(255,204,102,${v.alpha})`)
        grad.addColorStop(0.8, `rgba(255,204,102,${v.alpha})`)
        grad.addColorStop(1,   'rgba(255,204,102,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.moveTo(v.x, 0); ctx.lineTo(v.x, H); ctx.stroke()
      }

      // 7 bezier arcs with full-arc attraction
      for (const arc of arcDefs) {
        const wave  = Math.sin(t / arc.period) * arc.amp
        const pulse = Math.sin(t / arc.period + 1) * 0.10
        const yBase = arc.y + wave

        // Outer start (screen edge)
        const startXLocal = flip ? W : 0
        const startXAbs   = flip ? sideOffsetX + W : sideOffsetX
        const sAtt = attract(startXAbs, yBase)
        const sX = startXLocal + (flip ? -sAtt.ox : sAtt.ox)
        const sY = yBase + sAtt.oy

        // Inner end (near portrait)
        const endXLocal = flip ? W * 0.08 : W * 0.92
        const endXAbs   = sideOffsetX + endXLocal
        const eAtt = attract(endXAbs, yBase)
        const eX = endXLocal + (flip ? -eAtt.ox : eAtt.ox)
        const eY = yBase + eAtt.oy

        // Control points (blended)
        const cp1xB = flip ? W * 0.6 : W * 0.4
        const cp1yB = yBase - arc.amp
        const cp1x  = cp1xB + (flip ? -(sAtt.ox * 0.7 + eAtt.ox * 0.3) : (sAtt.ox * 0.7 + eAtt.ox * 0.3))
        const cp1y  = cp1yB + sAtt.oy * 0.7 + eAtt.oy * 0.3

        const cp2xB = flip ? W * 0.3 : W * 0.7
        const cp2yB = yBase + arc.amp * 0.5
        const cp2x  = cp2xB + (flip ? -(sAtt.ox * 0.3 + eAtt.ox * 0.7) : (sAtt.ox * 0.3 + eAtt.ox * 0.7))
        const cp2y  = cp2yB + sAtt.oy * 0.3 + eAtt.oy * 0.7

        const totalAtt = Math.abs(sAtt.ox) + Math.abs(sAtt.oy) + Math.abs(eAtt.ox) + Math.abs(eAtt.oy)

        ctx.strokeStyle = `rgba(255,204,102,${arc.alpha + pulse + (totalAtt > 10 ? 0.18 : 0)})`
        ctx.lineWidth   = arc.thick + (totalAtt > 10 ? 0.35 : 0)
        ctx.beginPath()
        ctx.moveTo(sX, sY)
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, eX, eY)
        ctx.stroke()

        // Inner dot
        const dA = Math.min(arc.alpha + pulse + (totalAtt > 5 ? 0.3 : 0), 0.9)
        ctx.fillStyle = `rgba(255,204,102,${dA * 1.4})`
        ctx.beginPath(); ctx.arc(eX, eY, 2, 0, Math.PI * 2); ctx.fill()

        // Outer dot
        ctx.fillStyle = `rgba(255,204,102,${arc.alpha * 0.5 + (totalAtt > 5 ? 0.15 : 0)})`
        ctx.beginPath(); ctx.arc(sX, sY, 1.4, 0, Math.PI * 2); ctx.fill()

        // Halo when attracted
        if (totalAtt > 10) {
          ctx.strokeStyle = 'rgba(255,204,102,0.18)'
          ctx.lineWidth = 0.5
          ctx.beginPath(); ctx.arc(eX, eY, 10, 0, Math.PI * 2); ctx.stroke()
          ctx.beginPath(); ctx.arc(sX, sY, 7, 0, Math.PI * 2); ctx.stroke()
        }
      }
    }

    // ── Draw crossover at feet
    function drawCrossover(ctx: CanvasRenderingContext2D, t: number) {
      ctx.clearRect(0, 0, VW, VH)

      const spreadX   = pW * 0.7
      const riseY     = 90
      const wave      = Math.sin(t / 180) * 8
      const pulse     = (Math.sin(t / 120) + 1) / 2
      const baseAlpha = 0.30 + pulse * 0.22

      const leftStart  = { x: pX - spreadX,       y: feetY - riseY + wave }
      const rightStart = { x: pX + spreadX,        y: feetY - riseY - wave }
      const leftEnd    = { x: pX + spreadX * 0.5,  y: feetY + riseY * 0.5 }
      const rightEnd   = { x: pX - spreadX * 0.5,  y: feetY + riseY * 0.5 }
      const crossPt    = { x: pX,                  y: feetY + wave * 0.5 }

      // Cursor attraction to crossover center
      const cAtt = attract(crossPt.x, crossPt.y)
      const cpX = crossPt.x + cAtt.ox
      const cpY = crossPt.y + cAtt.oy

      const draw = (sx: number, sy: number, ex: number, ey: number) => {
        const grad = ctx.createLinearGradient(sx, sy, ex, ey)
        grad.addColorStop(0,   'rgba(255,204,102,0)')
        grad.addColorStop(0.4, `rgba(255,204,102,${baseAlpha})`)
        grad.addColorStop(0.7, `rgba(255,204,102,${baseAlpha * 1.3})`)
        grad.addColorStop(1,   'rgba(255,204,102,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.0
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.quadraticCurveTo(cpX, cpY, ex, ey)
        ctx.stroke()
      }

      draw(leftStart.x, leftStart.y, leftEnd.x, leftEnd.y)
      draw(rightStart.x, rightStart.y, rightEnd.x, rightEnd.y)

      // Crossover glow dot
      ctx.fillStyle = `rgba(255,204,102,${baseAlpha * 1.8})`
      ctx.beginPath(); ctx.arc(cpX, cpY, 2.2, 0, Math.PI * 2); ctx.fill()

      // Orbiting micro-dots
      const theta = t / 60
      const orbitR = 11 + pulse * 5
      ctx.fillStyle = `rgba(255,204,102,${baseAlpha * 0.85})`
      ctx.beginPath(); ctx.arc(cpX + Math.cos(theta) * orbitR, cpY + Math.sin(theta) * orbitR, 1.2, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = `rgba(255,204,102,${baseAlpha * 0.55})`
      ctx.beginPath(); ctx.arc(cpX + Math.cos(theta + Math.PI) * orbitR * 0.7, cpY + Math.sin(theta + Math.PI) * orbitR * 0.7, 0.9, 0, Math.PI * 2); ctx.fill()
    }

    // ── Render loop
    let frameId: number
    let t = 0
    function tick() {
      t++
      drawSide(lCtx, SIDE_W, VH, false, 0,            t)
      drawSide(rCtx, SIDE_W, VH, true,  VW - SIDE_W,  t)
      drawCrossover(xCtx, t)
      frameId = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 15 }}
      aria-hidden
    >
      {/* Left side canvas */}
      <canvas
        ref={leftRef}
        className="absolute top-0 left-0 h-full pointer-events-none"
      />
      {/* Right side canvas */}
      <canvas
        ref={rightRef}
        className="absolute top-0 right-0 h-full pointer-events-none"
      />
      {/* Full-width crossover canvas */}
      <canvas
        ref={crossRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 6 }}
      />
    </div>
  )
}
