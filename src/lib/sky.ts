import type { CSSProperties } from 'react'
import { SECTIONS, type Phase, type SectionId } from '../config/sections'

const token = (phase: Phase, name: string) => `var(--color-${phase}-${name})`

// CSS variables for a section's sky. Each section knows its neighbors'
// colors so the `.sky` gradient can blend into them at its edges: the bottom
// of one section and the top of the next meet at the same mixed color.
export function skyVars(id: SectionId): CSSProperties {
  const index = SECTIONS.findIndex((section) => section.id === id)
  const phase = SECTIONS[index].phase
  const prev = SECTIONS[index - 1]?.phase
  const next = SECTIONS[index + 1]?.phase

  return {
    '--sky-top': token(phase, 'sky'),
    '--sky-bottom': token(phase, 'sky-deep'),
    '--sky-from': prev ? token(prev, 'sky-deep') : token(phase, 'sky'),
    '--sky-to': next ? token(next, 'sky') : token(phase, 'sky-deep'),
    '--wash': token(phase, 'wash'),
    '--accent': token(phase, 'accent'),
    '--ink': token(phase, 'ink'),
  } as CSSProperties
}
