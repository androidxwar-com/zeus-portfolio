import { Features } from "./components/Features"
import { Hero } from "./components/Hero"
import { Navbar } from "./components/Navbar"

function App() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-purple-500/30">
            <Navbar />
            <main>
                <Hero />
                <Features />
            </main>

            <footer className="py-12 border-t border-white/10 text-center text-neutral-500 text-sm">
                <p>© 2024 Jitter Replica (Unofficial). Built for demonstration.</p>
            </footer>
        </div>
    )
}

export default App
