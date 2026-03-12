import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

import zeusImg from '../assets/projects/zeus_wide.png'
import stormImg from '../assets/projects/storm.png'
import aetherImg from '../assets/projects/aether.png'
import roootImg from '../assets/projects/rooot_wide.png'

interface Project {
    id: string
    title: string
    subtitle: string
    desc: string
    longDesc: string
    tags: string[]
    year: string
    size: 'wide' | 'normal'
    gradient: string
    image: string
}

const projects: Project[] = [
    {
        id: 'zeus',
        title: 'Zeus Heart Core',
        subtitle: 'Multi-Agent AI Engine',
        desc: 'A production-grade orchestration engine for autonomous AI agents with real-time workflow execution.',
        longDesc: 'Zeus Heart Core is the flagship AI engine — a sophisticated multi-agent orchestration system designed from the ground up for production environments. It features semantic routing, LLM integration via Groq and OpenAI, a visual node-based workflow editor (Blocchi), IPC-level communication across Electron windows, and a real-time execution pipeline with observable state. The mental model: a programmable brain that thinks, routes, and executes in parallel.',
        tags: ['Electron', 'React', 'Python', 'LangChain', 'Groq', 'TypeScript'],
        year: '2024',
        size: 'wide',
        gradient: 'from-violet-900/60 via-purple-900/40 to-transparent',
        image: zeusImg,
    },
    {
        id: 'storm',
        title: 'Storm Core UI',
        subtitle: 'Visual Workflow Canvas',
        desc: 'An Aurora-styled infinite canvas with node-based flow editing, real-time IPC communication and a minimap.',
        longDesc: 'Storm Core is the visual interface that powers Zeus. An infinite dot-grid canvas where AI nodes can be created, connected, and executed. Nodes use Aurora-style mesh gradient styling with per-category accent colours. Features include GPU-accelerated rendering, zoom and pan with mouse/trackpad, a minimap for spatial orientation, and a custom IPC bridge that streams execution events from the backend to the canvas in real time.',
        tags: ['React', 'Canvas API', 'Framer Motion', 'Electron', 'TypeScript'],
        year: '2024',
        size: 'normal',
        gradient: 'from-cyan-900/60 via-sky-900/40 to-transparent',
        image: stormImg,
    },
    {
        id: 'aether',
        title: 'Aether Core',
        subtitle: 'Vocal AI Interface',
        desc: 'A voice-first interaction layer for AI — wake-word detection, streaming TTS/STT and ambient visualisations.',
        longDesc: 'Aether Core is a vocal AI interface built with an AudioEngine Typescript module that handles WebAudio API processing, wake-word detection, streaming STT with Whisper-compatible APIs, and real-time TTS playback. The UI renders an ambient waveform visualisation that reacts to the audio signal using Canvas2D. The result is a conversation experience that feels alive — whispering, breathing, responding.',
        tags: ['TypeScript', 'WebAudio API', 'Electron', 'React', 'Whisper'],
        year: '2023',
        size: 'normal',
        gradient: 'from-emerald-900/60 via-teal-900/40 to-transparent',
        image: aetherImg,
    },
    {
        id: 'rooot',
        title: 'ROOOT Platform',
        subtitle: 'Agentic Product Builder',
        desc: 'An end-to-end SaaS scaffold that deploys fully functional product pages with integrated AI chatbot support.',
        longDesc: 'ROOOT is a product platform that allows founders to deploy beautiful, high-converting landing pages with built-in Groq-powered chatbots. The chatbot dynamically switches between male and female personas for each session, providing a seamless customer support simulation. Designed for speed: a founder can go from idea to live product in under 48 hours.',
        tags: ['Next.js', 'Groq', 'Tailwind', 'Vercel', 'PostgreSQL'],
        year: '2023',
        size: 'wide',
        gradient: 'from-orange-900/60 via-amber-900/40 to-transparent',
        image: roootImg,
    },
]

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
    return (
        <motion.div
            layoutId={`card-${project.id}`}
            onClick={onClick}
            variants={cardVariant}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className={`glass rounded-2xl overflow-hidden cursor-pointer group select-none ${project.size === 'wide' ? 'md:col-span-2' : ''}`}
        >
            {/* Image header */}
            <div className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden group-hover:opacity-90 transition-opacity`}>
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                <span className="absolute bottom-5 right-5 text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold z-10">{project.year}</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-6">
                <h3 className="text-lg font-bold mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                <p className="text-xs text-white/40 mb-3 tracking-wide">{project.subtitle}</p>
                <p className="text-sm text-white/65 leading-relaxed mb-5">{project.desc}</p>

                <div className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                        <span key={t} className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/45">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    return (
        <>
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Modal card - shared layout */}
            <motion.div
                layoutId={`card-${project.id}`}
                className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-16 md:top-20 md:w-[640px] glass-strong rounded-2xl overflow-hidden z-50"
                style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}
            >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative flex-shrink-0 overflow-hidden`}>
                    <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" />
                    <span className="absolute bottom-5 right-5 text-[10px] tracking-[0.3em] uppercase text-white/50 font-bold z-10">{project.year}</span>
                    {/* Close btn */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white/80 hover:bg-white hover:text-black transition-all z-20"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-extrabold mb-1" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h2>
                    <p className="text-sm text-white/40 mb-6 tracking-wide">{project.subtitle}</p>
                    <p className="text-sm text-white/70 leading-relaxed mb-8">{project.longDesc}</p>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                            <span key={t} className="text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-full bg-white/6 border border-white/15 text-white/60">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export function ProjectsSection() {
    const [selected, setSelected] = useState<Project | null>(null)

    return (
        <section className="relative py-32 px-6 md:px-16">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] tracking-[0.4em] uppercase text-white/40 mb-3">Selected works</p>
                    <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                        Projects
                    </h2>
                </motion.div>

                {/* Bento grid */}
                <LayoutGroup>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {projects.map((p) => (
                            <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
                        ))}
                    </motion.div>

                    <AnimatePresence>
                        {selected && (
                            <ProjectModal project={selected} onClose={() => setSelected(null)} />
                        )}
                    </AnimatePresence>
                </LayoutGroup>
            </div>
        </section>
    )
}
