import { Button } from "./ui/Button"
import { motion } from "framer-motion"

export function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5"
        >
            <div className="flex items-center gap-8">
                <a href="/" className="text-xl font-bold tracking-tight">
                    Jitter
                </a>
                <div className="hidden md:flex items-center gap-1">
                    <Button variant="ghost">Product</Button>
                    <Button variant="ghost">Templates</Button>
                    <Button variant="ghost">Pricing</Button>
                    <Button variant="ghost">Learn</Button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
                <Button variant="primary" size="default">Sign up free</Button>
            </div>
        </motion.nav>
    )
}
