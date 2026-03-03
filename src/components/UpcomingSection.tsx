import { motion } from 'framer-motion'

const upcoming = [
    {
        codename: 'PROJECT ARGOS',
        title: 'Visual AI Agent',
        status: 'In Development',
        desc: 'An autonomous AI agent that perceives and controls your computer environment through vision: from "open YouTube and play a Jazz track" to "open Excel and fill in the data I\'ll dictate." Full desktop control. Zero clicks required.',
        tags: ['Computer Vision', 'Agentic AI', 'Desktop Automation', 'Multi-Modal LLM'],
        color: 'rgba(139,92,246,0.8)',
        icon: '👁',
        eta: 'Q3 2025',
    },
    {
        codename: 'PROJECT MINI-FED',
        title: 'Cognitive Companion AI',
        status: 'Research Phase',
        desc: 'Tiny AI entities — each engineered at the intersection of psychology, mental health science, and conversational AI. Designed to listen, understand emotional context, and provide genuine cognitive support for the human on the other side of the screen.',
        tags: ['Psychology-Driven AI', 'Emotional Intelligence', 'Conversational AI', 'Mental Health Tech'],
        color: 'rgba(6,182,212,0.8)',
        icon: '🧠',
        eta: 'Q4 2025',
    },
    {
        codename: 'PROJECT ORACLE',
        title: 'Autonomous Trading Intelligence',
        status: 'Architecture Phase',
        desc: 'A market prediction engine trained on multi-source financial signals, capable of managing live trading accounts with full autonomy. Integrates adaptive risk models, real-time sentiment analysis, and decision logic that self-calibrates to market regime shifts.',
        tags: ['Financial AI', 'Algorithmic Trading', 'Predictive Modelling', 'Risk Intelligence'],
        color: 'rgba(251,191,36,0.8)',
        icon: '📈',
        eta: '2026',
    },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
}

const card = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export function UpcomingSection() {
    return (
        <section className="relative py-32 px-6 md:px-16 overflow-hidden">
            {/* Ambient glow behind the section */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 60%, rgba(139,92,246,0.05) 0%, transparent 70%)',
                }}
            />

            <div className="relative max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">What's next</p>
                    <h2
                        className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Coming Soon
                    </h2>
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="flex flex-col gap-5"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {upcoming.map((project, i) => (
                        <motion.div
                            key={i}
                            variants={card}
                            whileHover={{ x: 6, transition: { duration: 0.3 } }}
                            className="glass rounded-2xl p-7 relative overflow-hidden group"
                        >
                            {/* Left accent bar */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: project.color }}
                            />

                            {/* Background glow on hover */}
                            <div
                                className="absolute -right-20 -top-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle, ${project.color.replace('0.8', '0.12')} 0%, transparent 70%)`,
                                    filter: 'blur(40px)',
                                }}
                            />

                            <div className="flex items-start justify-between flex-wrap gap-4">
                                <div className="flex items-start gap-5 flex-1 min-w-0">
                                    <span className="text-3xl mt-0.5 flex-shrink-0">{project.icon}</span>

                                    <div className="flex-1 min-w-0">
                                        {/* Codename */}
                                        <p
                                            className="text-[10px] tracking-[0.4em] uppercase mb-1 font-mono"
                                            style={{ color: project.color }}
                                        >
                                            {project.codename}
                                        </p>

                                        <h3
                                            className="text-xl font-extrabold mb-2 tracking-tight"
                                            style={{ fontFamily: 'var(--font-display)' }}
                                        >
                                            {project.title}
                                        </h3>

                                        <p className="text-sm text-white/60 leading-relaxed mb-5 max-w-2xl">
                                            {project.desc}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/45"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: ETA + Status badge */}
                                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                    <span
                                        className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full border font-medium"
                                        style={{
                                            borderColor: project.color.replace('0.8', '0.35'),
                                            color: project.color,
                                            background: project.color.replace('0.8', '0.08'),
                                        }}
                                    >
                                        {project.status}
                                    </span>
                                    <span className="text-[11px] text-white/25 tracking-wide font-mono">ETA {project.eta}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
