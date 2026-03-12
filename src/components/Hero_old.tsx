import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Image crossfade: hero-1 fades out, hero-2 fades in
  const img1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0])
  const img2Opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.7], [0, 1, 1])

  // Subtle upward parallax on the portrait
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  // Text parallax: rises faster than image
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-50%'])

  // Text fades early
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [1, 0.9, 0])

  // Black overlay deepens on scroll for smooth transition to next section
  const overlayOpacity = useTransform(scrollYProgress, [0.4, 0.75], [0, 1])

  return (
    <section ref={containerRef} className="relative h-[280vh]">
      {/* Sticky full-screen frame — bg matches sampled photo black (#0a0806) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: '#0a0806' }}>

        {/* ── Portrait container: 3/4 viewport width, perfectly centered ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ y: imageY }}
        >
          {/*
            Image wrapper: portrait ratio, max 72vw wide, 100% screen height.
            object-contain keeps the full portrait visible without any crop.
            The natural black background of the photo merges with the page bg.
          */}
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
                WebkitFontSmoothing: 'antialiased',
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

            {/* Soft vignette: only bottom fade to merge with page */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 55%, rgba(10,8,6,0.7) 80%, #0a0806 100%)',
              }}
            />
          </div>
        </motion.div>

        {/* Ambient top vignette — uses photo-sampled black */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(10,8,6,0.7), transparent)' }}
        />

        {/* ── Hero Typography (floating above, mix-blend) ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-28 pointer-events-none z-10"
          style={{ y: textY, opacity: textOpacity }}
        >
          {/* Small label */}
          <motion.p
            className="mix-blend-text text-[10px] md:text-xs tracking-[0.35em] uppercase mb-3 text-white/60 font-light"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            AI Engineer & Software Architect
          </motion.p>

          {/* Main name */}
          <motion.h1
            className="mix-blend-text text-[13vw] md:text-[10vw] lg:text-[9vw] font-extrabold leading-[0.88] tracking-tighter text-center uppercase text-white"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Taraoui<br />Fahd
          </motion.h1>

          {/* Divider + subtitle */}
          <motion.div
            className="mix-blend-text flex items-center gap-4 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <span className="w-10 h-px bg-white/40" />
            <p className="text-[10px] tracking-[0.22em] uppercase font-light text-white">
              Creator of Zeus Heart Core
            </p>
            <span className="w-10 h-px bg-white/40" />
          </motion.div>
        </motion.div>

        {/* Black fade-out overlay on scroll — photo-matched tone */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20"
          style={{ backgroundColor: '#0a0806', opacity: overlayOpacity }}
        />

        {/* Scroll prompt */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{ opacity: useTransform(scrollYProgress, [0, 0.12], [0.35, 0]) }}
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
