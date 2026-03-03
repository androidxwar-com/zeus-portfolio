import { motion } from 'framer-motion'

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
}

const item = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
}

export function ZeusSection() {
    return (
        <section id="zeus" className="relative py-32 md:py-40 px-6">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/10 to-black pointer-events-none" />

            <motion.div
                className="relative max-w-6xl mx-auto"
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-100px' }}
            >
                {/* Section header */}
                <motion.div variants={item} className="mb-20 text-center">
                    <p className="text-xs tracking-[0.4em] uppercase text-violet-400/70 mb-4">Featured Project</p>
                    <h2
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Zeus <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Heart Core</span>
                    </h2>
                    <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        A <strong className="text-neutral-200">Cognitive Operating System</strong> built on Clean Architecture — not just an app, but an AI-first desktop environment.
                    </p>
                </motion.div>

                {/* Architecture Cards Grid */}
                <motion.div variants={item} className="grid md:grid-cols-3 gap-4 md:gap-6 mb-16">
                    <ArchCard
                        icon="🎭"
                        title="Presentation Layer"
                        desc="Storm Core & Studio themes — fully decoupled from business logic. Liquid UI adapts to context."
                        color="violet"
                    />
                    <ArchCard
                        icon="🧠"
                        title="Domain Layer"
                        desc="Pure business rules and data models. Technology-agnostic core logic for maximum portability."
                        color="cyan"
                    />
                    <ArchCard
                        icon="⚙️"
                        title="Infrastructure Layer"
                        desc="AI API drivers (Gemini, Groq, Claude), file system, IPC channels, sandboxed security."
                        color="emerald"
                    />
                </motion.div>

                {/* Feature pills */}
                <motion.div variants={item} className="flex flex-wrap justify-center gap-3">
                    {['Electron', 'Node.js', 'Multi-AI Fusion', 'Three.js', 'Clean Architecture', 'Multi-Agent System', 'Workflow Nodes'].map((tag) => (
                        <span
                            key={tag}
                            className="px-4 py-2 rounded-full text-xs tracking-wider uppercase glass border border-white/5 text-neutral-300 hover:text-white hover:border-violet-500/30 transition-all duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

function ArchCard({ icon, title, desc, color }: { icon: string; title: string; desc: string; color: string }) {
    const borderMap: Record<string, string> = {
        violet: 'hover:border-violet-500/30 hover:shadow-violet-500/5',
        cyan: 'hover:border-cyan-500/30 hover:shadow-cyan-500/5',
        emerald: 'hover:border-emerald-500/30 hover:shadow-emerald-500/5',
    }

    return (
        <motion.div
            className={`glass rounded-2xl p-6 md:p-8 border border-white/5 transition-all duration-500 hover:shadow-2xl ${borderMap[color]}`}
            whileHover={{ y: -4 }}
        >
            <span className="text-3xl mb-4 block">{icon}</span>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
        </motion.div>
    )
}
