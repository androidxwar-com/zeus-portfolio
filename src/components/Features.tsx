import { motion } from "framer-motion"
import { Wand2, Layers, Zap, Share2, Type, PenTool } from "lucide-react"

const features = [
    {
        icon: Wand2,
        title: "Animate in seconds",
        desc: "Presets for everything. Fade, Slide, Scale, and more.",
        color: "bg-purple-500/10 text-purple-400",
        size: "col-span-1 md:col-span-2",
    },
    {
        icon: Layers,
        title: "Figma Integration",
        desc: "Import your designs in one click and start animating.",
        color: "bg-blue-500/10 text-blue-400",
        size: "col-span-1",
    },
    {
        icon: Zap,
        title: "4K Export",
        desc: "Export as MP4, GIF, or Lottie. Crystal clear quality.",
        color: "bg-green-500/10 text-green-400",
        size: "col-span-1",
    },
    {
        icon: Share2,
        title: "Collaboration",
        desc: "Work together with your team in real-time.",
        color: "bg-orange-500/10 text-orange-400",
        size: "col-span-1 md:col-span-2",
    },
    {
        icon: Type,
        title: "Text Effects",
        desc: "Typewriter, Wiggle, Glitch. Make words pop.",
        color: "bg-pink-500/10 text-pink-400",
        size: "col-span-1",
    },
    {
        icon: PenTool,
        title: "Vector Tools",
        desc: "Draw and edit paths directly in the browser.",
        color: "bg-yellow-500/10 text-yellow-400",
        size: "col-span-1",
    }
]

export function Features() {
    return (
        <section className="py-24 px-6 bg-neutral-950">
            <div className="container max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Everything you need to <br />
                        <span className="text-neutral-400">create stunning motion.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className={`p-8 rounded-3xl border border-white/5 bg-neutral-900/50 backdrop-blur-sm hover:bg-neutral-900 transition-colors group ${feature.size}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                            <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}
