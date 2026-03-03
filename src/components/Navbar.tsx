import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface DockItemProps {
    icon: string
    label: string
    mouseX: ReturnType<typeof useMotionValue>
    onClick?: () => void
}

function DockItem({ icon, label, mouseX, onClick }: DockItemProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const [elCenterX, setElCenterX] = useState(0)

    // Track element center on mount and resize
    useEffect(() => {
        const updatePosition = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                setElCenterX(rect.left + rect.width / 2)
            }
        }
        updatePosition()
        window.addEventListener('resize', updatePosition)
        return () => window.removeEventListener('resize', updatePosition)
    }, [])

    // Distance from mouse to this icon center
    const distance = useTransform(mouseX, (val: number) => {
        return val - elCenterX
    })

    // Gaussian-like magnification: closer = bigger
    const scale = useTransform(distance, [-150, -75, 0, 75, 150], [1, 1.15, 1.5, 1.15, 1])
    const smoothScale = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 15 })

    // Y offset for magnified items (float up)
    const y = useTransform(smoothScale, [1, 1.5], [0, -8])

    return (
        <motion.button
            ref={ref}
            className="relative group flex flex-col items-center"
            style={{ scale: smoothScale, y }}
            onClick={onClick}
            whileTap={{ scale: 0.9 }}
        >
            {/* Icon container */}
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-lg md:text-xl transition-colors duration-200 group-hover:bg-white/15 group-hover:border-white/20">
                {icon}
            </div>
            {/* Tooltip */}
            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="glass-strong px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase whitespace-nowrap">
                    {label}
                </div>
            </div>
        </motion.button>
    )
}

export function Dock() {
    const mouseX = useMotionValue(Infinity)
    const [isVisible, setIsVisible] = useState(false)

    // Show dock after initial load delay
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 2000)
        return () => clearTimeout(timer)
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        mouseX.set(e.clientX)
    }, [mouseX])

    const handleMouseLeave = useCallback(() => {
        mouseX.set(Infinity)
    }, [mouseX])

    const scrollTo = (id: string) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const items = [
        { icon: '🏠', label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { icon: '⚡', label: 'Zeus', action: () => scrollTo('zeus') },
        { icon: '🔗', label: 'Projects', action: () => scrollTo('projects') },
        { icon: '🧠', label: 'Skills', action: () => scrollTo('skills') },
        { icon: '📬', label: 'Contact', action: () => scrollTo('contact') },
    ]

    return (
        <motion.nav
            className="fixed bottom-6 left-1/2 z-50"
            initial={{ y: 100, x: '-50%', opacity: 0 }}
            animate={isVisible ? { y: 0, x: '-50%', opacity: 1 } : { y: 100, x: '-50%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
            <motion.div
                className="glass-strong flex items-center gap-2 md:gap-3 px-4 py-3 rounded-2xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {items.map((item) => (
                    <DockItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        mouseX={mouseX}
                        onClick={item.action}
                    />
                ))}
            </motion.div>
        </motion.nav>
    )
}
