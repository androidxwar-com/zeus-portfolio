import { motion } from 'framer-motion'

const articles = [
    {
        title: 'Building a Multi-Agent AI Engine from Zero',
        category: 'AI Engineering',
        readTime: '9 min read',
        excerpt: 'How I designed the orchestration layer for Zeus Heart Core — routing, memory, and real-time execution across autonomous agents.',
        color: '#8b5cf6',
        date: 'Jan 2024',
    },
    {
        title: 'Why Clean Architecture Still Wins in 2024',
        category: 'Architecture',
        readTime: '7 min read',
        excerpt: 'The principles behind the dependency rule and why layered architecture keeps complex projects alive long after the initial sprint.',
        color: '#06b6d4',
        date: 'Nov 2023',
    },
    {
        title: 'Framer Motion: Beyond the Basics',
        category: 'Animation',
        readTime: '11 min read',
        excerpt: 'Deep-diving into layoutId, shared element transitions, and scroll-linked animations. The techniques that make portfolios win Awwwards.',
        color: '#10b981',
        date: 'Sep 2023',
    },
    {
        title: 'The Electron Architecture I\'d Build Again',
        category: 'Desktop Engineering',
        readTime: '8 min read',
        excerpt: 'Multi-window apps, IPC bridge patterns, and why most Electron guides teach you the wrong mental model. Here\'s the right one.',
        color: '#f59e0b',
        date: 'Jul 2023',
    },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
}

const card = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

export function BlogSection() {
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
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">Writing</p>
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                        Blog
                    </h2>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    {articles.map((a, i) => (
                        <motion.article
                            key={i}
                            variants={card}
                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            className="glass rounded-2xl overflow-hidden group cursor-pointer"
                        >
                            {/* Gradient top bar */}
                            <div
                                className="h-1 w-full"
                                style={{ background: `linear-gradient(90deg, ${a.color}, transparent)` }}
                            />

                            <div className="p-7">
                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border font-medium"
                                        style={{ borderColor: `${a.color}40`, color: a.color, background: `${a.color}12` }}
                                    >
                                        {a.category}
                                    </span>
                                    <span className="text-[10px] text-white/30 tracking-wide">{a.readTime}</span>
                                    <span className="ml-auto text-[10px] text-white/25 tracking-wide">{a.date}</span>
                                </div>

                                <h3
                                    className="text-base font-bold leading-snug mb-3 group-hover:text-white transition-colors"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                >
                                    {a.title}
                                </h3>
                                <p className="text-sm text-white/55 leading-relaxed">{a.excerpt}</p>

                                <div className="mt-5 flex items-center gap-1.5 text-white/30 group-hover:text-white/60 transition-colors text-xs">
                                    <span>Read article</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
