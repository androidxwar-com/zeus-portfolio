import { motion } from 'framer-motion'

const socials = [
    { label: 'Telegram', href: 'https://t.me/Fvck_fedd', icon: '✈' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fahd-taraoui', icon: '⊞' },
    { label: 'Twitter / X', href: '#', icon: '✕', comingSoon: true },
    { label: 'Email', href: 'mailto:taraoui.fahd.to@gmail.com', icon: '✉' },
]

export function ContactSection() {
    return (
        <section className="relative py-32 px-6 md:px-16 overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

            <div className="relative max-w-5xl mx-auto">
                {/* Big CTA headline */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/35 mb-6">Let's build something great</p>
                    <h2
                        className="text-[11vw] md:text-[8vw] font-extrabold tracking-tighter uppercase leading-[0.88]"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Say Hello.
                    </h2>
                </motion.div>

                {/* Split: info left, socials right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Left — info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-sm text-white/55 leading-loose mb-8">
                            I'm open to freelance projects, full-time roles and long-term collaborations.
                            If you're building something ambitious — let's talk.
                        </p>

                        <a
                            href="mailto:taraoui.fahd.to@gmail.com"
                            className="group inline-flex items-center gap-3 text-sm font-semibold py-3.5 px-7 rounded-full border border-white/20 hover:border-white/60 hover:bg-white/5 transition-all duration-300"
                        >
                            <span>Start a conversation</span>
                            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                        </a>
                    </motion.div>

                    {/* Right — social links */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="flex flex-col gap-3"
                    >
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={(s as any).comingSoon ? undefined : s.href}
                                target={(s as any).comingSoon ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className={`group flex items-center justify-between glass rounded-xl px-5 py-4 transition-all duration-300 ${(s as any).comingSoon
                                        ? 'opacity-40 cursor-default'
                                        : 'hover:border-white/25 hover:bg-white/5 cursor-pointer'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-white/25 group-hover:text-white/60 transition-colors font-mono text-sm">{s.icon}</span>
                                    <span className="text-sm font-medium">{s.label}</span>
                                    {(s as any).comingSoon && (
                                        <span className="text-[9px] tracking-widest uppercase text-white/30 border border-white/15 rounded-full px-2 py-0.5">Soon</span>
                                    )}
                                </div>
                                {!(s as any).comingSoon && (
                                    <span className="text-white/20 group-hover:text-white/50 group-hover:translate-x-1 transition-all duration-200 text-sm">→</span>
                                )}
                            </a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export function Footer() {
    return (
        <footer className="py-10 border-t border-white/8 text-center">
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/25">
                © {new Date().getFullYear()} Fahd Taraoui · Crafted with precision
            </p>
        </footer>
    )
}
