import { motion } from 'framer-motion'

const skillGroups = [
    {
        category: 'AI Architecture & Logic',
        color: 'rgba(139,92,246,0.6)',
        skills: ['LLM Orchestration', 'Multi-Model Design', 'Hybrid Intelligence (HITL)', 'Agentic Workflows', 'Prompt Optimization'],
    },
    {
        category: 'Engineering & Systems',
        color: 'rgba(6,182,212,0.6)',
        skills: ['System Architecture', 'Distributed Processing', 'IDE Development', 'Legacy CRM Disruption', 'Enterprise Ecosystems'],
    },
    {
        category: 'Cognitive & Problem Solving',
        color: 'rgba(34,197,94,0.6)',
        skills: ['AI Ethics & Accuracy', 'Fact Validation Pipelines', 'Cognitive Density Optimization', 'Critical Path Management'],
    },
    {
        category: 'Product Vision & Strategy',
        color: 'rgba(251,191,36,0.6)',
        skills: ['GTM Strategy', 'OpEx Compression', 'Business Tool Translation', 'Resource Allocation', 'Market Analysis'],
    },
    {
        category: 'Languages',
        color: 'rgba(236,72,153,0.6)',
        skills: ['Italian (Native)', 'English (B2)', 'French (A2)'],
    },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}

const card = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export function SkillsSection() {
    return (
        <section className="relative py-32 px-6 md:px-16 overflow-hidden">
            {/* Ambient blobs — one per skill category */}
            {skillGroups.map((g, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width: 500,
                        height: 500,
                        background: `radial-gradient(circle, ${g.color} 0%, transparent 70%)`,
                        top: i % 2 === 0 ? `${5 + i * 22}%` : `${15 + i * 18}%`,
                        left: i % 2 === 0 ? '-10%' : '60%',
                        filter: 'blur(80px)',
                        opacity: 0.18,
                    }}
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -25, 15, 0],
                    }}
                    transition={{
                        duration: 12 + i * 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 1.5,
                    }}
                />
            ))}

            <div className="relative max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">My toolkit</p>
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                        Skills
                    </h2>
                </motion.div>

                {/* Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {skillGroups.map((group, gi) => (
                        <motion.div
                            key={gi}
                            variants={card}
                            whileHover={{ y: -4, transition: { duration: 0.3 } }}
                            className="glass rounded-2xl p-7 relative overflow-hidden group"
                        >
                            {/* Card accent glow */}
                            <div
                                className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                style={{ background: `radial-gradient(circle, ${group.color} 0%, transparent 70%)`, filter: 'blur(30px)' }}
                            />

                            <h3 className="text-xs tracking-[0.3em] uppercase text-white/40 mb-5">{group.category}</h3>

                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/6 border border-white/10 text-white/80 hover:border-white/30 hover:text-white transition-all duration-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
