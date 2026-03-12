import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GoldenArches } from './GoldenArches'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Image crossfade
  const img1Opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0])
  const img2Opacity = useTransform(scrollYProgress, [0.4, 0.8, 1], [0, 1, 1])

  // Subtle upward parallax on the portrait
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  // Text parallax: rises faster than image
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  // Text fades early
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.9, 0])

  // Black overlay deepens on scroll
  const overlayOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  // Liquid Dissolve: gradiente che si rivela per ammorbidire la transizione alla prossima sezione
  const dissolveIntensity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1])

  const blindOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])
  const blindY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const blinds = Array.from({ length: 6 })

  return (
    <section ref={containerRef} className="relative h-[130vh]">
      {/* Sticky full-screen frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: '#0a0806' }}>


        {/* ── Background Venetian Blinds (Animated) ── */}
        <div className="absolute inset-0 flex">
          {blinds.map((_, i) => {
            const delay = i * 0.1
            return (
              <motion.div
                key={i}
                className="flex-1 h-full border-r border-[#1a1208]/30 relative"
                initial={{ backgroundColor: '#0a0806' }}
                animate={{
                  backgroundColor: ['#0a0806', '#140e06', '#0a0806'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                  delay,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2a1a08]/10 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#ffcc66]/5 to-transparent" />
              </motion.div>
            )
          })}
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none mix-blend-color-dodge"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(200, 140, 60, 0.08) 0%, transparent 60%)',
            opacity: blindOpacity,
            y: blindY,
          }}
        />

        {/* ── GOLDEN ARCHES: sopra le Venetian Blinds, sotto il ritratto e il testo ── */}
        <GoldenArches />

        {/* ── Portrait container ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ y: imageY }}
        >
          <div
            className="relative h-full"
            style={{ width: 'min(66vw, 900px)', maxHeight: '100vh' }}
          >
            {/* Hero Image 1 */}
            <motion.img
              src="/images/hero-1.jpg"
              alt="Fahd Taraoui — AI Engineer"
              className="absolute inset-0 w-full h-full object-contain object-center"
              style={{
                opacity: img1Opacity,
                imageRendering: 'auto',
              }}
              draggable={false}
            />

            {/* Hero Image 2 */}
            <motion.img
              src="/images/hero-2.jpg"
              alt="Fahd Taraoui — AI Engineer"
              className="absolute inset-0 w-full h-full object-contain object-center"
              style={{
                opacity: img2Opacity,
                imageRendering: 'auto',
              }}
              draggable={false}
            />

            {/* Soft vignette: only bottom fade */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 55%, rgba(10,8,6,0.7) 80%, #0a0806 100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Ambient top vignette */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(10,8,6,0.7), transparent)' }}
        />

        {/* ── Hero Typography ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 pointer-events-none z-10"
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Small label */}
          <motion.p
            className="mix-blend-text text-[10px] md:text-xs tracking-[0.35em] uppercase mb-3 text-white/60 font-light"
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 2.5, delay: 0.1, ease: [0.42, 0, 0.58, 1] }}
            style={{ opacity: 0, y: 40, willChange: 'transform, opacity' }}
          >
            AI Engineer & Software Architect
          </motion.p>

          {/* Main name */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 2.5,
              delay: 0.1,
              ease: [0.42, 0, 0.58, 1],
            }}
            style={{
              opacity: 0,
              y: 80,
              willChange: 'transform, opacity',
            }}
          >
            <h1
              className="mix-blend-text text-[11vw] md:text-[8.5vw] lg:text-[7.5vw] font-extrabold leading-[0.88] tracking-tighter text-center uppercase text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Taraoui<br />Fahd
            </h1>
          </motion.div>

          {/* Divider + subtitle */}
          <motion.div
            className="mix-blend-text flex items-center gap-4 mt-5"
            animate={{ opacity: 0.45, y: 0 }}
            transition={{ duration: 2.5, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
            style={{ opacity: 0, y: 40, willChange: 'transform, opacity' }}
          >
            <span className="w-10 h-px bg-white/40" />
            <p className="text-[10px] tracking-[0.22em] uppercase font-light text-white">
              Creator of Zeus Heart Core
            </p>
            <span className="w-10 h-px bg-white/40" />
          </motion.div>
        </motion.div>

        {/* ── LIQUID DISSOLVE: Bottom gradient - sempre visibile, si intensifica su scroll ── */}
        {/* Vive DENTRO lo sticky frame, quindi always on screen durante lo scroll della Hero */}
        <motion.div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-20"
          style={{
            height: '50vh',
            opacity: dissolveIntensity,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(10,8,6,0.3) 30%, rgba(10,8,6,0.7) 60%, rgba(10,8,6,0.95) 85%, #0a0806 100%)',
          }}
        />
        {/* Sub-gradient permanente che ammorbidisce sempre il bordo inferiore */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-19"
          style={{
            height: '15vh',
            background: 'linear-gradient(to bottom, transparent, #0a0806)',
          }}
        />

        {/* Scroll prompt */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          <span className="text-[9px] tracking-[0.35em] uppercase text-white">Scroll</span>
          <motion.div
            className="w-px h-7 bg-white/25"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
