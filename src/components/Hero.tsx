import { Button } from "./ui/Button"
import { motion } from "framer-motion"

// Floating animation variants
const floatingVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5 + i * 0.1,
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
        },
    }),
    float: (i: number) => ({
        y: [0, -10, 0],
        rotate: [0, i % 2 === 0 ? 1 : -1, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
        },
    }),
}

export function Hero() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300 backdrop-blur-sm"
                >
                    <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
                    Jitter for Figma is here
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
                >
                    Motion design <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        made simple.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-xl text-lg text-neutral-400 mb-8"
                >
                    Create professional animations in minutes. Use it for videos, apps, or social media. Runs in your browser.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <Button variant="primary" size="lg" className="text-lg h-14 px-8">
                        Try Jitter for free
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg h-14 px-8">
                        Watch video
                    </Button>
                </motion.div>

                {/* Mock Interface / Floating Elements */}
                <div className="mt-20 relative w-full max-w-5xl aspect-video rounded-xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm shadow-2xl overflow-hidden group">
                    {/* Fake UI Header */}
                    <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                    </div>

                    {/* Canvas Area */}
                    <div className="relative w-full h-full flex items-center justify-center p-12">
                        {/* Simulated Jitter Elements floating */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={floatingVariant}
                                initial="hidden"
                                animate={["visible", "float"]}
                                className={`absolute w-32 h-32 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center shadow-xl
                            ${i === 0 ? 'bg-purple-500/30 left-[20%] top-[30%]' : ''}
                            ${i === 1 ? 'bg-blue-500/30 right-[25%] top-[20%]' : ''}
                            ${i === 2 ? 'bg-pink-500/30 left-[40%] bottom-[20%]' : ''}
                        `}
                            >
                                <div className="w-16 h-16 rounded-full bg-white/20" />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}
