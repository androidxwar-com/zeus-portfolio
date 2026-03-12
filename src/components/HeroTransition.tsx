import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * HeroTransition
 * ─────────────────────────────────────────────────────────────────────────
 * Effetto transizione ibrido tra Hero e Experience.
 * Combina 3 tecniche cinematiche:
 * 
 * 1. LIQUID DISSOLVE: gradiente che si espande e fonde il nero della Hero
 *    con il background della sezione successiva in modo organico
 * 
 * 2. SCANLINE SHUTTER: linee orizzontali animate che si chiudono come 
 *    tapparelle mentre sali dalla Hero, poi si aprono all'ingresso
 *    della sezione Experience
 * 
 * 3. Z-DEPTH REVEAL: la sezione Experience emerge da "dietro" via 
 *    perspective CSS 3D - si avvicina verso lo schermo man mano che scrolli
 * ─────────────────────────────────────────────────────────────────────────
 */
export function HeroTransition({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // ── 1. LIQUID DISSOLVE ──
  // Opacità del gradiente overlay che "fonde" la sezione
  const dissolveOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  // ── 2. SCANLINE SHUTTER ──
  // Le linee si chiudono (height aumenta) poi si aprono
  const scanlineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0, 0.7, 0.7, 0])
  const scanlineScaleY = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0])

  // ── 3. Z-DEPTH CRUSH ──
  // Il content emerge da dietro (scale e perspective)
  const contentScale = useTransform(scrollYProgress, [0, 0.4], [0.92, 1])
  const contentY = useTransform(scrollYProgress, [0, 0.4], [60, 0])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1])

  // Number of scanlines (ogni 8px circa)
  const SCANLINE_COUNT = 24

  return (
    <div ref={containerRef} className="relative">

      {/* ── LIQUID DISSOLVE LAYER ── */}
      {/* Gradiente che emerge dal top e si dissolve nel down */}
      <motion.div
        className="absolute inset-x-0 top-0 h-40 pointer-events-none z-20"
        style={{
          opacity: dissolveOpacity,
          background: 'linear-gradient(to bottom, #0a0806 0%, rgba(10,8,6,0.6) 60%, transparent 100%)',
        }}
      />

      {/* ── SCANLINE SHUTTER LAYER ── */}
      {/* Applica linee a tutta larghezza che si aprono e chiudono */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
        style={{ opacity: scanlineOpacity }}
      >
        {Array.from({ length: SCANLINE_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full"
            style={{
              top: `${(i / SCANLINE_COUNT) * 100}%`,
              height: `${100 / SCANLINE_COUNT}%`,
              backgroundColor: '#0a0806',
              transformOrigin: i % 2 === 0 ? 'left' : 'right',
              scaleX: scanlineScaleY,
            }}
          />
        ))}
      </motion.div>

      {/* ── Z-DEPTH CONTENT REVEAL ── */}
      {/* Il contenuto della sezione emerge da dietro usando perspective 3D */}
      <motion.div
        style={{
          scale: contentScale,
          y: contentY,
          opacity: contentOpacity,
        }}
      >
        {children}
      </motion.div>

    </div>
  )
}
