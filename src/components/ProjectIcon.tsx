import type { ReactNode } from 'react'

// Thin-line editorial icons, one per project. Drawn on a 48×48 grid in the
// same pen as the botanicals; color comes from `currentColor`. Parts that
// move on hover are grouped and named (`i-*`, animated in index.css).
const ICONS = {
  'voice-bag': (
    <>
      <g className="i-bag">
        <path d="M11 18.5h21.5L30.6 40H12.9Z" />
        <path d="M16.5 18.5v-3.2a5.3 5.3 0 0 1 10.5 0v3.2" />
      </g>
      <g className="i-waves">
        <path d="M36.5 24.5c1.8 2 1.8 5.5 0 7.5M40.2 21.5c3.3 3.6 3.3 9.9 0 13.5" />
      </g>
    </>
  ),
  shield: (
    <g className="i-shield">
      <path d="M24 6.5 37.5 11v10.5c0 9-5.8 15.6-13.5 19.5-7.7-3.9-13.5-10.5-13.5-19.5V11Z" />
      <g className="i-nodes">
        <path d="M24 18.5 18.5 27.5M24 18.5l5.5 9M18.5 27.5h11" />
        <circle cx="24" cy="18.5" r="1.7" />
        <circle cx="18.5" cy="27.5" r="1.7" />
        <circle cx="29.5" cy="27.5" r="1.7" />
      </g>
    </g>
  ),
  car: (
    <>
      <g className="i-car">
        <path d="M7.5 33.5v-5.2l4.6-1.4 5-6.4h13.6l5.4 6.4 4.4 1.4v5.2" />
        <path d="M12.5 33.5h-5M20 33.5h8M40.5 33.5h-5" />
        <circle cx="16.2" cy="33.5" r="3.6" />
        <circle cx="31.8" cy="33.5" r="3.6" />
      </g>
      <g className="i-eye">
        <path d="M17.5 12c4.3-4.3 8.7-4.3 13 0-4.3 4.3-8.7 4.3-13 0Z" />
        <circle cx="24" cy="12" r="1.6" />
      </g>
    </>
  ),
  phone: (
    <>
      <g className="i-phone">
        <rect x="17" y="8" width="14" height="28" rx="3" transform="rotate(-16 24 22)" />
        <path d="M21.6 11.4l4.2-1.2" transform="rotate(-16 24 22)" />
      </g>
      <path d="M9.5 34.5c-2.2-2.5-3.2-5.6-3-8.8M38.5 9.5c2.2 2.5 3.2 5.6 3 8.8" />
      <path d="M14 42h20" strokeDasharray="1.5 3" />
    </>
  ),
  map: (
    <>
      <path d="M7.5 14.5 17.5 10.5l12 4 10.5-4v24l-10.5 4-12-4-10 4Z" />
      <path d="M17.5 10.5v24M29.5 14.5v24" opacity="0.6" />
      <path d="M11 32c3.5-4.5 8-1.5 11-6.5s5-4.5 6-4.5" strokeDasharray="1.5 2.5" />
      <g className="i-pin">
        <path d="M35 25.5c-2.6-3-4-5.2-4-7.1a4 4 0 0 1 8 0c0 1.9-1.4 4.1-4 7.1Z" />
        <circle cx="35" cy="18.4" r="1.3" />
      </g>
    </>
  ),
  hanger: (
    <g className="i-hanger">
      <path d="M21 13.5a3 3 0 1 1 4.3 2.7c-.9.5-1.3 1.3-1.3 2.3v2" />
      <path d="M24 20.5 8.2 31.6c-1.2.9-.6 2.9.9 2.9h29.8c1.5 0 2.1-2 .9-2.9Z" />
    </g>
  ),
  weather: (
    <>
      <g className="i-sun">
        <path d="M12.6 22.5a7 7 0 0 1 12.9-5.8" />
        <path d="M19 8.5v-3M10.2 12.2 8 10M6.5 21h-3M27.8 12.2 30 10" />
      </g>
      <g className="i-cloud">
        <path d="M16 37.5h19.5a6.2 6.2 0 0 0 .4-12.4 8.5 8.5 0 0 0-16.2 2.1A5.2 5.2 0 0 0 16 37.5Z" />
      </g>
    </>
  ),
} satisfies Record<string, ReactNode>

export type ProjectIconName = keyof typeof ICONS

type ProjectIconProps = {
  name: ProjectIconName
  className?: string
}

export function ProjectIcon({ name, className = '' }: ProjectIconProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {ICONS[name]}
    </svg>
  )
}
