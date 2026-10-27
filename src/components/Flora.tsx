// Shared watercolor flower parts for the Projects sunset: blossoms, buds, and
// leaves painted with pigments that pool darker at their edges. Each SVG that
// uses them renders <FloraDefs id={...} /> once inside its <defs> and passes
// the same id to the parts, so gradient and filter references resolve locally.

export type Pigment = 'peach' | 'rose' | 'coral'

const PIGMENTS: Record<Pigment, string> = {
  peach: 'color-mix(in oklab, var(--color-golden-peach) 60%, var(--color-golden-coral))',
  rose: 'var(--color-golden-rose)',
  coral: 'color-mix(in oklab, var(--color-golden-coral) 82%, var(--color-golden-accent))',
}

/** Warm-brown ink for stems and outlines. */
export const FLORA_INK = 'color-mix(in oklab, var(--color-golden-accent) 50%, var(--color-golden-ink))'
const SAGE = 'var(--color-golden-leaf)'

// Rounded, slightly fan-shaped petal; teardrop bud; narrow leaf. Unit size.
const PETAL = 'M0 0C-.75-.2-.82-1.02 0-1.12.82-1.02.75-.2 0 0Z'
const BUD = 'M0 0C-.5-.5-.36-1.3 0-1.6.36-1.3.5-.5 0 0Z'
const LEAF = 'M0 0C.35-.26.9-.3 1.3 0 .9.3.35.26 0 0Z'

export function FloraDefs({ id }: { id: string }) {
  return (
    <>
      {Object.entries(PIGMENTS).map(([name, color]) => (
        <radialGradient key={name} id={`${id}-${name}`} cx="50%" cy="90%" r="95%">
          <stop offset="0%" style={{ stopColor: `color-mix(in oklab, ${color} 50%, white)`, stopOpacity: 1 }} />
          <stop offset="60%" style={{ stopColor: color, stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: `color-mix(in oklab, ${color} 70%, var(--color-golden-accent))`, stopOpacity: 1 }}
          />
        </radialGradient>
      ))}
      {/* Slightly uneven edges and blotchy pigment, like wet paint. */}
      <filter id={`${id}-wet`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5" result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.5" xChannelSelector="R" yChannelSelector="G" result="shape" />
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="9" result="grain" />
        <feColorMatrix in="grain" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.45 1.25" result="mottle" />
        <feComposite in="shape" in2="mottle" operator="in" />
      </filter>
    </>
  )
}

type BlossomProps = { id: string; x: number; y: number; r: number; pigment: Pigment; turn: number }

export function Blossom({ id, x, y, r, pigment, turn }: BlossomProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${turn})`}>
      {[0, 72, 144, 216, 288].map((a, i) => (
        <path
          key={a}
          d={PETAL}
          transform={`rotate(${a}) scale(${r * (i % 2 ? 0.9 : 1)})`}
          fill={`url(#${id}-${pigment})`}
          stroke={FLORA_INK}
          strokeWidth={0.6 / r}
          strokeOpacity="0.5"
        />
      ))}
      <circle r={r * 0.24} fill={FLORA_INK} opacity="0.8" />
      <circle r={r * 0.11} cx={r * 0.05} cy={-r * 0.06} fill="var(--color-golden-sun)" />
    </g>
  )
}

type BudProps = { id: string; x: number; y: number; angle: number; pigment: Pigment; size?: number }

export function Bud({ id, x, y, angle, pigment, size = 9 }: BudProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`}>
      <path d={BUD} fill={`url(#${id}-${pigment})`} stroke={FLORA_INK} strokeWidth={0.6 / size} strokeOpacity="0.6" />
      <path d="M0 0-.35-.55M0 0 .35-.55" stroke={SAGE} strokeWidth={1.4 / size} strokeLinecap="round" />
    </g>
  )
}

type LeafProps = { x: number; y: number; angle: number; size: number }

export function Leaf({ x, y, angle, size }: LeafProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`}>
      <path d={LEAF} fill={SAGE} fillOpacity="0.95" />
      <path d="M0 0H1.1" stroke={FLORA_INK} strokeWidth={0.7 / size} opacity="0.6" />
    </g>
  )
}
