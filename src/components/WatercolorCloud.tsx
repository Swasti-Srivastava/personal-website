import { useId, type CSSProperties } from 'react'

type Circle = readonly [cx: number, cy: number, r: number]
type Ellipse = readonly [cx: number, cy: number, rx: number, ry: number]

type CloudShape = {
  base: Ellipse
  puffs: readonly Circle[]
  shade: Ellipse
}

// Cumulus silhouettes: a flat-ish base with rounded puffs piled on top. The
// filter roughens every edge, so the circles read as painted, not drawn.
const SHAPES = {
  large: {
    base: [300, 185, 235, 34],
    puffs: [
      [130, 170, 42],
      [195, 140, 60],
      [280, 112, 80],
      [372, 124, 66],
      [445, 152, 50],
      [505, 172, 34],
      [240, 165, 50],
      [340, 165, 55],
    ],
    shade: [310, 194, 225, 26],
  },
  medium: {
    base: [300, 175, 170, 28],
    puffs: [
      [180, 160, 38],
      [240, 130, 55],
      [315, 115, 62],
      [385, 140, 46],
      [430, 163, 30],
    ],
    shade: [305, 184, 165, 20],
  },
  small: {
    base: [300, 175, 140, 24],
    puffs: [
      [205, 160, 32],
      [260, 135, 46],
      [325, 130, 50],
      [385, 155, 34],
    ],
    shade: [300, 183, 130, 16],
  },
} as const satisfies Record<string, CloudShape>

type WatercolorCloudProps = {
  shape: keyof typeof SHAPES
  seed: number
  /** Seconds for one pass across; the cloud then drifts back. */
  duration: number
  /** Horizontal drift in px either side of its resting place. */
  travel: number
  /** Pigment: milky white (default), sunset blush, lavender, or night blue-gray. */
  tint?: keyof typeof TINTS
  delay?: number
  className?: string
}

// Puff core → edge colors, and the underside shade, for each tint.
const TINTS = {
  white: {
    core: '#fff',
    edge: '#fff',
    shade: 'var(--color-morning-sky-deep)',
    shadeDeep: 'color-mix(in oklab, var(--color-morning-sky-deep) 80%, var(--color-morning-ink))',
  },
  blush: {
    core: 'color-mix(in oklab, var(--color-golden-blush) 70%, white)',
    edge: 'var(--color-golden-blush)',
    shade: 'var(--color-golden-coral)',
    shadeDeep: 'var(--color-golden-sky-deep)',
  },
  night: {
    core: 'color-mix(in oklab, var(--color-blue-lavender) 55%, var(--color-blue-slate))',
    edge: 'color-mix(in oklab, var(--color-blue-periwinkle) 60%, var(--color-blue-slate))',
    shade: 'var(--color-blue-slate)',
    shadeDeep: 'var(--color-blue-midnight)',
  },
  lavender: {
    core: 'color-mix(in oklab, var(--color-golden-lavender) 60%, white)',
    edge: 'color-mix(in oklab, var(--color-golden-lavender) 80%, var(--color-golden-blush))',
    shade: 'color-mix(in oklab, var(--color-golden-lavender) 80%, var(--color-golden-sky-deep))',
    shadeDeep: 'color-mix(in oklab, var(--color-golden-lavender) 70%, var(--color-golden-ink))',
  },
} as const

// A hand-painted cloud that drifts slowly back and forth.
// Purely decorative: hidden from assistive tech and click-through.
export function WatercolorCloud({
  shape,
  seed,
  duration,
  travel,
  tint = 'white',
  delay = 0,
  className = '',
}: WatercolorCloudProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const { base, puffs, shade } = SHAPES[shape]
  const colors = TINTS[tint]

  return (
    <div
      aria-hidden="true"
      className={`anim-cloud pointer-events-none ${className}`}
      style={
        {
          '--cloud-duration': `${duration}s`,
          '--cloud-delay': `${-delay}s`,
          '--cloud-travel': `${travel}px`,
        } as CSSProperties
      }
    >
      <svg viewBox="0 0 600 260" className="block h-auto w-full overflow-visible">
        <defs>
          <radialGradient id={`${id}-puff`} cx="45%" cy="35%" r="70%">
            <stop offset="0%" style={{ stopColor: colors.core, stopOpacity: 0.97 }} />
            <stop offset="70%" style={{ stopColor: colors.edge, stopOpacity: 0.85 }} />
            <stop offset="100%" style={{ stopColor: colors.edge, stopOpacity: 0.6 }} />
          </radialGradient>
          <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: colors.shade, stopOpacity: 0 }} />
            <stop offset="60%" style={{ stopColor: colors.shade, stopOpacity: 0.75 }} />
            <stop offset="100%" style={{ stopColor: colors.shadeDeep, stopOpacity: 0.45 }} />
          </linearGradient>

          {/* Broad warp for an irregular silhouette, fine warp for ragged
              wet edges, light blur to feather, low-frequency mottling. */}
          <filter
            id={`${id}-paint`}
            x="-10%"
            y="-25%"
            width="120%"
            height="150%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed={seed} result="warp" />
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="22" xChannelSelector="R" yChannelSelector="G" result="shape" />
            <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed={seed + 1} result="fine" />
            <feDisplacementMap in="shape" in2="fine" scale="7" xChannelSelector="R" yChannelSelector="B" result="ragged" />
            <feGaussianBlur in="ragged" stdDeviation="2.2" result="soft" />
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.035" numOctaves="2" seed={seed + 2} result="grain" />
            <feColorMatrix in="grain" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.6 1.2" result="mottle" />
            <feComposite in="soft" in2="mottle" operator="in" />
          </filter>
        </defs>

        <g filter={`url(#${id}-paint)`}>
          <ellipse cx={base[0]} cy={base[1]} rx={base[2]} ry={base[3]} fill={`url(#${id}-puff)`} />
          {puffs.map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={`url(#${id}-puff)`} />
          ))}
          <ellipse cx={shade[0]} cy={shade[1]} rx={shade[2]} ry={shade[3]} fill={`url(#${id}-shade)`} />
        </g>
      </svg>
    </div>
  )
}
