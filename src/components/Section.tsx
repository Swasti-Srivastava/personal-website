import { useEffect, useRef, type ReactNode } from 'react'
import type { SectionId } from '../config/sections'
import { skyVars } from '../lib/sky'

type SectionProps = {
  id: SectionId
  children: ReactNode
  className?: string
}

// Every page section: the anchor target plus its slice of the day-to-night
// sky. Expects a heading with id `${id}-heading` inside.
//
// While a section is well off screen it is marked `data-offscreen`, which
// pauses its CSS animations (see index.css) so nothing animates unseen. The
// attribute is set directly, so this never re-renders the section.
export function Section({ id, children, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete section.dataset.offscreen
        else section.dataset.offscreen = ''
      },
      // Resume a little before the section scrolls into view.
      { rootMargin: '300px 0px' },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`sky py-section ${className}`}
      style={skyVars(id)}
    >
      {children}
    </section>
  )
}
