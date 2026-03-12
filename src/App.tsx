import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PsychotropicCursor } from './components/PsychotropicCursor'
import { Dock } from './components/Navbar'
import { TimelineSection } from './components/TimelineSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { UpcomingSection } from './components/UpcomingSection'
import { BlogSection } from './components/BlogSection'
import { AnimatedBackground } from './components/AnimatedBackground'
import { ContactSection, Footer } from './components/ContactSection'
import { HeroSection } from './components/Hero'
import { WebGLBackground } from './components/WebGLBackground'

function App() {
    // ── KINETIC ENGINE (Phase 1) ──
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true, 
            duration: 1.2, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        // Expose lenis globally for WebGLBackground to read velocity without context hooks
        // @ts-ignore
        window.lenis = lenis

        gsap.registerPlugin(ScrollTrigger)
        lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(lenis.raf)
            lenis.destroy()
            // @ts-ignore
            delete window.lenis
        }
    }, [])

    return (
        <div className="bg-black text-white min-h-screen film-grain cursor-none" style={{ backgroundColor: '#0a0806' }}>
                {/* PsychotropicCursor - attivo */}
                <PsychotropicCursor />

                {/* Animated background — Canvas2D particle sea (kinetic, velocity-reactive) */}
                <WebGLBackground />
                
                {/* Fallback CSS Animated background (legacy) — removed or kept behind WebGL */}
            <AnimatedBackground />
            {/* Dock Navigation (fixed bottom) */}
            <Dock />

            <main>
                {/* ── HERO SECTION ── */}
                <HeroSection />

                {/* ── THE EXPERIENCE ── */}
                <>
                    <TimelineSection />
                    <SkillsSection />
                    <ProjectsSection />
                    <BlogSection />
                    <UpcomingSection />
                    <ContactSection />
                    <Footer />
                </>
            </main>
        </div>
    )
}

export default App
