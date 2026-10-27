import { useId, type ReactNode } from 'react'
import { FLORA_INK, FloraDefs } from './Flora'

// Small watercolor illustrations for the experience cards: soft washes with a
// fine brown ink line, in the same pen and pigments as the Projects flowers.
// `w(id, name)` refers to a wash gradient defined in <IconWashes>.
const w = (id: string, name: string) => `url(#${id}-${name})`

const WASHES = {
  cream: ['#fffaf2', '#f3e2cc'],
  leather: ['#c49a76', '#7e5640'],
  leatherDark: ['#a77c5c', '#5f3f2e'],
  lavender: ['#d9cfee', '#9d8fbf'],
  tan: ['#ead3b6', '#c3a07e'],
  steel: ['#e6e1ef', '#a9a2c0'],
} as const

function IconWashes({ id }: { id: string }) {
  return (
    <>
      <FloraDefs id={id} />
      {Object.entries(WASHES).map(([name, [light, dark]]) => (
        <linearGradient key={name} id={`${id}-${name}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      ))}
    </>
  )
}

const line = { stroke: FLORA_INK, strokeWidth: 1, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const ICONS: Record<ExperienceIconName, (id: string) => ReactNode> = {
  laptop: (id) => (
    <>
      <rect x="11" y="12" width="40" height="27" rx="2.5" fill={w(id, 'cream')} {...line} />
      <rect x="14.5" y="15.5" width="33" height="20" rx="1" fill={w(id, 'lavender')} />
      <path d="M17 31c4-5 8-7 12-4s7 1 10-3 5-3 7 0" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.2" />
      <path d="M5 41h52l4 7.5H1Z" fill={w(id, 'tan')} {...line} />
      <path d="M11 43.5h40M13 45.8h36" stroke={FLORA_INK} strokeOpacity="0.45" strokeWidth="0.8" strokeDasharray="2 1.6" />
      <path d="M26 47.2h10" {...line} strokeOpacity="0.6" />
    </>
  ),
  book: (id) => (
    <>
      <path d="M32 21C26 15.5 16 14.5 6 17v28c10-2.5 20-1.5 26 4Z" fill={w(id, 'cream')} {...line} />
      <path d="M32 21c6-5.5 16-6.5 26-4v28c-10-2.5-20-1.5-26 4Z" fill={w(id, 'cream')} {...line} />
      <path d="M6 45c10-2.5 20-1.5 26 4 6-5.5 16-6.5 26-4v3c-10-2.5-20-1.5-26 4-6-5.5-16-6.5-26-4Z" fill={w(id, 'rose')} {...line} />
      <path d="M11 24c5-1 10-.6 15 1.4M11 29c5-1 10-.6 15 1.4M11 34c5-1 10-.6 15 1.4M11 39c4-.8 8-.5 11 .8" stroke={FLORA_INK} strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
      <path d="M41 26.5 37.5 30l3.5 3.5M49 26.5l3.5 3.5-3.5 3.5M46.5 25l-3 10" fill="none" {...line} stroke="var(--color-dusk-periwinkle)" strokeWidth="1.2" />
      <path d="M38 39.5c4-1 8-1 13 .3" stroke={FLORA_INK} strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
    </>
  ),
  // A pair of lace-up ankle boots, the back one slightly darker and offset.
  boots: (id) => (
    <>
      <g transform="translate(9 -3)">
        <path d="M17 13h11v20c4 3 9 5 14 6 3 .7 5 3 5 6v2H23l-1 3h-6l-1-3c-1-8 2-12 2-16Z" fill={w(id, 'leatherDark')} {...line} />
        <path d="M15 47h32" {...line} strokeWidth="1.6" />
      </g>
      <path d="M13 17h11v20c4 3 9 5 14 6 3 .7 5 3 5 6v2H19l-1 3h-6l-1-3c-1-8 2-12 2-16Z" fill={w(id, 'leather')} {...line} />
      <path d="M11 51h32" {...line} strokeWidth="1.8" />
      <path d="M13 17h11v3H13Z" fill="#5f3f2e" fillOpacity="0.6" />
      <path d="M21 22l4 2.5M21 25l4-2.5M21 27l4 2.5M21 30l4-2.5M21 32l4 2.5M21 35l4-2.5" stroke="#f7e6cf" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M26 41c4 2 8 3 12 3.4" fill="none" stroke="#f7e6cf" strokeOpacity="0.5" strokeWidth="0.9" />
    </>
  ),
  teacup: (id) => (
    <>
      <g className="exp-steam" fill="none" stroke="var(--color-dusk-lavender)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M24 24c-3-3.5 3-5.5 0-9.5" />
        <path d="M32 23c-3-3.5 3-5.5 0-9.5" />
      </g>
      <ellipse cx="29" cy="49" rx="21" ry="4" fill={w(id, 'cream')} {...line} />
      <path d="M44 33c6-1 7.5 6.5 1.5 8.5" fill="none" {...line} strokeWidth="1.6" />
      <path d="M13 29h32c0 10-6.5 17-16 17S13 39 13 29Z" fill={w(id, 'cream')} {...line} />
      <path d="M14.5 34h29" stroke="var(--color-golden-rose)" strokeWidth="2.2" strokeOpacity="0.7" />
      <ellipse cx="29" cy="29" rx="16" ry="2.4" fill={w(id, 'peach')} {...line} />
    </>
  ),
  tag: (id) => (
    <>
      <path d="M38 8c6-5 13 0 9 6" fill="none" {...line} />
      <path d="M12 33 32 13h16v16L28 49Z" fill={w(id, 'peach')} {...line} />
      <circle cx="41.5" cy="19.5" r="2.6" fill={w(id, 'cream')} {...line} />
      <path d="M41.5 17C40 12 38 9 38 8" fill="none" {...line} />
      <path d="M22 34l9-9M26 38l7-7" stroke={FLORA_INK} strokeOpacity="0.5" strokeWidth="0.9" />
      <path d="M17 33l14 14" stroke="var(--color-golden-rose)" strokeOpacity="0.5" strokeWidth="2" />
    </>
  ),
  robot: (id) => (
    <>
      <path d="M32 8v7" {...line} />
      <circle cx="32" cy="7" r="2.6" fill={w(id, 'coral')} {...line} />
      <rect x="17" y="15" width="30" height="22" rx="6" fill={w(id, 'steel')} {...line} />
      <circle className="exp-eye" cx="25.5" cy="25" r="3.6" fill={w(id, 'cream')} {...line} />
      <circle className="exp-eye" cx="38.5" cy="25" r="3.6" fill={w(id, 'cream')} {...line} />
      <circle cx="25.5" cy="25.3" r="1.4" fill={FLORA_INK} />
      <circle cx="38.5" cy="25.3" r="1.4" fill={FLORA_INK} />
      <path d="M27 31.5c3 1.6 7 1.6 10 0" fill="none" {...line} />
      <rect x="21" y="39" width="22" height="15" rx="4" fill={w(id, 'lavender')} {...line} />
      <circle cx="32" cy="46.5" r="2.6" fill={w(id, 'peach')} {...line} />
      <path d="M21 43c-4 1-6 4-6 7M43 43c4 1 6 4 6 7" fill="none" {...line} strokeWidth="1.4" />
    </>
  ),
}

export type ExperienceIconName = 'laptop' | 'book' | 'boots' | 'teacup' | 'tag' | 'robot'

type ExperienceIconProps = {
  name: ExperienceIconName
  className?: string
}

export function ExperienceIcon({ name, className = '' }: ExperienceIconProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" className={`exp-icon ${className}`}>
      <defs>
        <IconWashes id={id} />
      </defs>
      <g filter={`url(#${id}-wet)`}>{ICONS[name](id)}</g>
    </svg>
  )
}
