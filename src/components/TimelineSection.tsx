import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const experiences = [
    {
        year: '2024 — Present',
        role: 'AI System Architect & Cognitive Strategist',
        company: 'Independent / Enterprise',
        type: 'work',
        desc: 'Architected multi-model neural environments and Enterprise-grade AI ecosystems. Designed an integrated IDE for agentic workflow automation, dynamic asset generation, and complex decision logic.',
        tags: ['Multi-Model Orchestration', 'Cognitive Density', 'Distributed Processing', 'Agentic Workflows'],
    },
    {
        year: '2024 — 2025',
        role: 'Marketing Director & AI Lead',
        company: 'Omnia Lead',
        type: 'work',
        desc: 'Orchestrated a proprietary AI-driven ecosystem disrupting legacy CRMs. Implemented a Hybrid Intelligence pipeline (95% neural / 5% human-in-the-loop) for the entire lead lifecycle, achieving 80% OpEx compression. Validated Product-Market Fit against 170+ competitors at global tech hubs like Gitex.',
        tags: ['Hybrid Intelligence', 'Legacy Disruption', 'Algorithmic Optimization', 'Data-Driven GTM'],
    },
    {
        year: '2021 — 2023',
        role: 'Operations & Process Optimizer',
        company: 'Catering Italia',
        type: 'work',
        desc: 'Engineered operational workflows and logistics for high-scale corporate and private events. Applied critical path management and dynamic resource allocation to optimize team distribution and guarantee seamless service execution.',
        tags: ['Dynamic Resource Allocation', 'Critical Path Management', 'Logistical Efficiency'],
    },
    {
        year: '2020',
        role: 'Strategic Consultant',
        company: 'Be',
        type: 'work',
        desc: 'Financial markets logic and strategic management consulting. Built and trained a 20+ person team, converting complex client requirements into concrete structural solutions and exceeding target KPIs.',
        tags: ['Financial Markets', 'Strategic Management', 'Team Leadership'],
    },
    {
        year: 'Academic & Specialisation',
        role: 'AI Specialist & Computer Science',
        company: 'UniTO / SAA / ITIS Pininfarina',
        type: 'milestone',
        desc: 'Academic foundation at Università degli Studi di Torino. Specialised in AI Methods and Tools (Infor-Elea x SAA). Deep hardware and systems logic background via Diploma in Electronics and Electrotechnics.',
        tags: ['AI Methods', 'Systems Logic', 'Electronics'],
    },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export function TimelineSection() {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.1'] })
    const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 60, damping: 20 })

    return (
        <section ref={ref} className="relative py-32 px-6 md:px-16 max-w-5xl mx-auto">
            {/* ── LIQUID DISSOLVE: top gradient. Incontra il gradient bottom della Hero. ── */}
            <div
                className="absolute inset-x-0 top-0 pointer-events-none z-10"
                style={{
                    height: '12rem',
                    background: 'linear-gradient(to bottom, #0a0806 0%, rgba(10,8,6,0.6) 50%, transparent 100%)',
                    marginLeft: '-1.5rem',
                    marginRight: '-1.5rem',
                    width: 'calc(100% + 3rem)',
                }}
            />
            {/* Section header */}
            <motion.div
                className="mb-20"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">My journey</p>
                <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                    Experience
                </h2>
            </motion.div>

            <div className="relative flex gap-12">
                {/* Scroll-progress vertical line */}
                <div className="relative hidden md:flex flex-col items-center flex-shrink-0 w-px">
                    <div className="absolute inset-0 bg-white/10 rounded-full" />
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-white rounded-full origin-top"
                        style={{ scaleY, height: '100%' }}
                    />
                </div>

                {/* Entries */}
                <motion.div
                    className="flex flex-col gap-14 flex-1"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="relative group"
                        >
                            {/* Dot on line */}
                            <span className="hidden md:block absolute -left-[calc(3rem+1px)] top-1 w-2 h-2 rounded-full bg-white/40 ring-2 ring-black group-hover:bg-white transition-colors duration-300" />

                            <div className="glass rounded-2xl p-6 hover:border-white/20 transition-all duration-500 group-hover:translate-x-1">
                                {/* Year */}
                                <p className="text-[10px] tracking-[0.3em] uppercase text-white/35 mb-2">{exp.year}</p>

                                <div className="flex items-start gap-3 mb-3">
                                    {exp.type === 'milestone' ? (
                                        <span className="mt-1 text-amber-400 text-sm">◆</span>
                                    ) : (
                                        <span className="mt-1 text-white/40 text-sm">→</span>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-semibold leading-tight">{exp.role}</h3>
                                        <p className="text-sm text-white/50">{exp.company}</p>
                                    </div>
                                </div>

                                <p className="text-sm text-white/60 leading-relaxed mb-4">{exp.desc}</p>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map((tag) => (
                                        <span key={tag} className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
