import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * PsychotropicCursor
 * ─────────────────────────────────────────────────────────────────────────
 * Punto 2 Fase 1 dell'architettura "Utopia Max".
 * Un cursore magnetico globale che si muove calcolato in RAF tramite gsap.quickTo
 * Offre spring physics (inerzia) e reagisce al DOM fondendosi con i colori
 * (mix-blend-mode: difference).
 * ─────────────────────────────────────────────────────────────────────────
 */
export function PsychotropicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  
  // Riferimenti per evitare continui repaint React
  const mouse = useRef({ x: 0, y: 0 })
  // Stato visivo del cursore (default vs hover)
  const isHovering = useRef(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // gsap.quickTo è la funzione più performante per bindare il mouse alle properties
    // Crea una tween spring interpolata ad altissima frequenza.
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.6, ease: 'power3.out' })
    
    // Scale tween per gli stati magnetici
    const scaleTo = gsap.quickTo(cursor, 'scale', { duration: 0.4, ease: 'back.out(1.7)' })

    // --- Mouse Move Listener ---
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      
      // Center the custom cursor on the actual cursor position
      // assuming cursor is 32x32 px
      xTo(e.clientX - 16)
      yTo(e.clientY - 16)
    }

    // --- Hover Magnetism Listeners ---
    // In un framework DOM-lite, applichiamo un listener globale delegato per i link/bottoni
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // Cerca il tag 'A', 'BUTTON', o elementi con data-magnetic
      if (target.closest('a') || target.closest('button') || target.closest('[data-hover="true"]')) {
        isHovering.current = true
        scaleTo(2.5) // Esplode e si fonde
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a') || target.closest('button') || target.closest('[data-hover="true"]')) {
        isHovering.current = false
        scaleTo(1) // Torna normale
      }
    }

    // Bind listeners
    window.addEventListener('mousemove', onMouseMove)
    document.body.addEventListener('mouseover', onMouseOver)
    document.body.addEventListener('mouseout', onMouseOut)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.body.removeEventListener('mouseover', onMouseOver)
      document.body.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return (
    <>
      {/* 
        Il cursore vero e proprio.
        Absolute z-50, pointer-events-none è vitale altrimenti blocca i click.
        mix-blend-mode difference inverte i colori sottostanti creando l'effetto "psicotropo".
      */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: '#fff',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  )
}
