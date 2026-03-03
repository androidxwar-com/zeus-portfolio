import { motion } from 'framer-motion'

const testimonials = [
    {
        quote: 'Federico delivered something that genuinely surprised me. The architecture he proposed cut our backend complexity in half, and the AI layer he built was production-ready from day one.',
        name: 'Luca Marchetti',
        role: 'CTO · FinVault Italia',
        initial: 'L',
    },
    {
        quote: 'What separates him from other engineers is that he thinks in systems. Every component he writes anticipates what comes next. It\'s a rare skill, and it shows in the codebase.',
        name: 'Sophie Renard',
        role: 'Product Director · HelthOS',
        initial: 'S',
    },
    {
        quote: 'The animation work on our product page was something we had only seen on Awwwards-winning sites. He nailed a brief that three other studios had failed to deliver.',
        name: 'Max Krüger',
        role: 'Founder · Studio Drei',
        initial: 'M',
    },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
}

const card = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export function TestimonialsSection() {
    return (
        <section className="relative py-32 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">What they say</p>
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                        Testimonials
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={card}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="glass rounded-2xl p-7 flex flex-col gap-6 group"
                        >
                            {/* Large quote mark */}
                            <span className="text-5xl leading-none text-white/10 font-serif select-none">"</span>

                            <p className="text-sm text-white/70 leading-relaxed -mt-4 flex-1">{t.quote}</p>

                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/8">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                                    {t.initial}
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold">{t.name}</p>
                                    <p className="text-[11px] text-white/40">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
