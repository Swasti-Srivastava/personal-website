// The time of day each section represents. Colors for each phase live in
// styles/index.css as --color-<phase>-* tokens.
export type Phase = 'morning' | 'golden' | 'dusk' | 'blue' | 'night'

// Single source of truth for the page's sections, in page order. The
// navigation, anchor ids, and day-to-night gradient all read from here.
export const SECTIONS = [
  { id: 'home', label: 'Home', phase: 'morning' },
  { id: 'projects', label: 'Projects', phase: 'golden' },
  { id: 'experience', label: 'Experience', phase: 'dusk' },
  { id: 'skills', label: 'Skills', phase: 'blue' },
  { id: 'contact', label: 'Contact', phase: 'night' },
] as const satisfies readonly { id: string; label: string; phase: Phase }[]

export type SectionId = (typeof SECTIONS)[number]['id']
