import type { ReactNode } from 'react'
import type { SectionId } from '../config/sections'
import { skyVars } from '../lib/sky'

type SectionProps = {
  id: SectionId
  children: ReactNode
  className?: string
}

// Every page section: the anchor target plus its slice of the day-to-night
// sky. Expects a heading with id `${id}-heading` inside.
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`sky py-section ${className}`}
      style={skyVars(id)}
    >
      {children}
    </section>
  )
}
