import { useId, type CSSProperties } from 'react'

// Small ink-sketch botanicals. Decorative only; color comes from `.sketch`.

type SketchProps = {
  className?: string
  style?: CSSProperties
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.1,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const

// Same pen, but leaves `fill` to each shape.
const outline = {
  stroke: 'currentColor',
  strokeWidth: 0.9,
  strokeLinejoin: 'round',
  vectorEffect: 'non-scaling-stroke',
} as const

export function Wildflower({ className = '' }: SketchProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 60 220" className={`sketch ${className}`}>
      <g {...stroke}>
        <path d="M30 218C28 180 34 140 29.5 100S26 52 31 30" />
        <path d="M29.6 150C19 143 12.5 133 10 119c10 4 17.5 14 19.6 31Z" />
        <path d="M17 131c4 5 8 10 12.4 18" />
        <path d="M30 118c10.5-8 16-18 18-30-10 3.5-16 13-18 30Z" />
        <path d="M30.4 76c5.5-8.5 9.5-15 13.6-23" />
        <path d="M44 53c-2.4-3.2-1-7 1.6-7.6 2.6 1.4 2.4 5.4-1.6 7.6Z" />
        <g transform="translate(31 22)">
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse key={angle} cx="0" cy="-8" rx="3.8" ry="7.6" transform={`rotate(${angle})`} />
          ))}
        </g>
      </g>
      <circle cx="31" cy="22" r="2.1" fill="currentColor" />
    </svg>
  )
}

const LEAVES = [
  { x: 22, y: 51, angle: -70 },
  { x: 38, y: 43, angle: 40 },
  { x: 56, y: 34, angle: -80 },
  { x: 72, y: 26, angle: 30 },
  { x: 90, y: 18, angle: -75 },
  { x: 106, y: 12, angle: 20 },
]

export function LeafSprig({ className = '' }: SketchProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 124 70" className={`sketch ${className}`}>
      <g {...stroke}>
        <path d="M4 64C30 52 62 34 116 10" />
        {LEAVES.map(({ x, y, angle }) => (
          <path
            key={x}
            d="M0 0C4-5.5 11-7.5 17-6.5 13-2 6.5.8 0 0Z"
            transform={`translate(${x} ${y}) rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  )
}

// A tiny hand-drawn four-point star.
export function Sparkle({ className = '', style }: SketchProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="-6 -6 12 12" className={`sketch ${className}`} style={style}>
      <path
        {...stroke}
        d="M0-5C.5-1.3 1.1-.6 5 0 1.1.6.5 1.3 0 5-.5 1.3-1.1.6-5 0-1.1-.6-.5-1.3 0-5Z"
      />
    </svg>
  )
}

export function BerrySprig({ className = '' }: SketchProps) {
  const leaf = 'M0 0C6-8 16-10.5 25-9 19-3 10 1 0 0Z'
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 80 90" className={`sketch ${className}`}>
      <g {...stroke}>
        <path d="M8 87C20 68 32 50 52 26" />
        <path d="M33 50c9-1 16-5 22-12" />
        <path d={leaf} transform="translate(17 74) rotate(-20)" />
        <path d={leaf} transform="translate(25 62) rotate(-150)" />
        <path d={leaf} transform="translate(43 37) rotate(-75)" />
        <circle cx="54.5" cy="23" r="3.2" />
        <circle cx="59" cy="36" r="2.8" />
        <circle cx="61.5" cy="28" r="2.3" />
      </g>
    </svg>
  )
}

// Not a botanical, but drawn in the same hand.
export function Pencil({ className = '' }: SketchProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 72 16" className={`sketch ${className}`}>
      <g {...stroke}>
        <path d="M5 4.5h49l12 3.5-12 3.5H5" />
        <path d="M5 4.5C2.6 4.5 1.5 6 1.5 8s1.1 3.5 3.5 3.5" />
        <path d="M5 4.5v7M10.5 4.5v7M13 4.5v7M54 4.5v7" />
        <path d="M16 8h37" opacity="0.5" />
      </g>
      <path d="M63 7 66.4 8 63 9Z" fill="currentColor" />
    </svg>
  )
}

// A single loose petal: a peach wash with an ink outline.
export function Petal({ className = '', style }: SketchProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 20 28" className={`sketch ${className}`} style={style}>
      <path
        d="M10 26.5C4 21 2.2 13.5 4.5 7.5 6 3.6 8.2 1.6 10 1.5c2.4.4 5.2 3.6 5.8 8.6.7 6-1.6 11.4-5.8 16.4Z"
        {...stroke}
        fill="var(--color-morning-accent)"
        fillOpacity="0.45"
      />
      <path d="M10 24.5C9.4 18 9.6 11 10.6 5.5" {...stroke} opacity="0.55" />
    </svg>
  )
}

// A tiny nature-journal butterfly. Each wing is its own group so CSS can flap
// them independently around the body (see `.butterfly` in index.css).
export function Butterfly({ className = '', style }: SketchProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const wing = (
    <>
      <path d="M0-1C4-10 12-15 16.5-10.5 19.5-6 12-.5 0 1Z" fill={`url(#${id}-wash)`} {...outline} />
      <path d="M0 1.5C6 2 12.5 5 11.5 10.5 9.5 15 3.5 11 0 3.5Z" fill={`url(#${id}-wash)`} {...outline} />
      <path d="M2.5-1.5C6-6 10-9 13.5-9.5M2 2.5C5 4.5 7.5 7 8.5 10" {...outline} opacity="0.5" />
      <circle cx="13" cy="-8.5" r="1.4" fill="var(--color-golden-accent)" opacity="0.45" />
    </>
  )

  return (
    <svg aria-hidden="true" focusable="false" viewBox="-20 -18 40 34" className={`sketch butterfly ${className}`} style={style}>
      <defs>
        <radialGradient id={`${id}-wash`} cx="20%" cy="50%" r="90%">
          <stop offset="0%" style={{ stopColor: 'var(--color-morning-accent)', stopOpacity: 0.35 }} />
          <stop offset="100%" style={{ stopColor: 'var(--color-golden-accent)', stopOpacity: 0.55 }} />
        </radialGradient>
      </defs>
      <g className="wing wing-left">
        <g transform="scale(-1 1)">{wing}</g>
      </g>
      <g className="wing wing-right">{wing}</g>
      <g {...stroke}>
        <path d="M0-3.5C.8-1 .8 6 0 9.5-.8 6-.8-1 0-3.5Z" fill="currentColor" />
        <path d="M-.4-3.6C-1.6-7.5-3.5-10-5.5-11.2M.4-3.6C1.6-7.5 3.5-10 5.5-11.2" />
      </g>
    </svg>
  )
}
