import { HeroSection } from './components/Hero'
import { Dock } from './components/Navbar'
import { TimelineSection } from './components/TimelineSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { UpcomingSection } from './components/UpcomingSection'
import { BlogSection } from './components/BlogSection'
import { AnimatedBackground } from './components/AnimatedBackground'
import { ContactSection, Footer } from './components/ContactSection'

function App() {
    return (
        <div className="bg-black text-white min-h-screen film-grain" style={{ backgroundColor: '#0a0806' }}>
            {/* Animated background — fixed, z-0, always behind content */}
            <AnimatedBackground />
            {/* Dock Navigation (fixed bottom) */}
            <Dock />

            <main>
                {/* ── HERO: Full-screen scroll-mapped image crossfade ── */}
                {/* DO NOT TOUCH — Approved by Host */}
                <HeroSection />

                {/* ── EXPERIENCE TIMELINE ── */}
                <TimelineSection />

                {/* ── SKILLS (Ambient Blobs + Glassmorphism) ── */}
                <SkillsSection />

                {/* ── PROJECTS (Bento Grid + Shared Element Modal) ── */}
                <ProjectsSection />

                {/* ── BLOG / WRITING ── */}
                <BlogSection />

                {/* ── UPCOMING PROJECTS ── */}
                <UpcomingSection />

                {/* ── CONTACT ── */}
                <ContactSection />
            </main>

            <Footer />
        </div>
    )
}

export default App
