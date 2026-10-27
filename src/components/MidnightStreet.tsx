import { useId, type CSSProperties } from 'react'
import { WatercolorCloud } from './WatercolorCloud'

type Wash = readonly [cx: number, cy: number, rx: number, ry: number, color: string, opacity: number]

// Pools of pigment over the section's midnight sky: periwinkle and lavender
// cloud banks carried over from the terrace, darkening toward the street.
const SKY: readonly Wash[] = [
  [520, 40, 720, 90, 'var(--color-blue-periwinkle)', 0.3],
  [180, 170, 340, 110, 'var(--color-blue-lavender)', 0.25],
  [840, 210, 360, 100, 'var(--color-blue-periwinkle)', 0.35],
  [420, 380, 560, 60, 'var(--color-blue-slate)', 0.35],
  [900, 520, 300, 140, 'var(--color-blue-slate)', 0.35],
  [120, 600, 300, 140, 'var(--color-blue-periwinkle)', 0.25],
]

// The far shore: buildings [x, width, height] on a 1440 canvas.
const SHORE: readonly (readonly [number, number, number])[] = [
  [820, 24, 30], [842, 30, 42], [870, 22, 36], [890, 34, 52], [922, 24, 40], [944, 30, 60],
  [972, 26, 46], [996, 34, 38], [1028, 24, 56], [1050, 32, 44], [1080, 26, 64], [1104, 34, 48],
  [1136, 24, 40], [1158, 32, 58], [1188, 28, 46], [1214, 34, 52], [1246, 26, 38], [1270, 34, 48],
  [1302, 28, 42], [1328, 32, 56], [1358, 26, 40], [1382, 34, 50], [1414, 26, 36],
]

function shoreLights() {
  const lights: { x: number; y: number }[] = []
  let seed = 23
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  for (const [x, width, height] of SHORE) {
    for (let y = 300 - height + 7; y < 294; y += 8) {
      for (let wx = x + 4; wx < x + width - 4; wx += 7) if (rand() < 0.36) lights.push({ x: wx, y })
    }
  }
  return lights
}
const LIGHTS = shoreLights()

// Puddles on the cobblestones: [x %, bottom %, width rem, ripple delay s].
const PUDDLES: readonly (readonly [number, number, number, number])[] = [
  [8, 5, 9, 0], [34, 2.5, 12, 2.2], [58, 6, 8, 4.1], [80, 3, 11, 1.3],
]

// Wisteria racemes hanging from the roofline: [x, y, length].
const WISTERIA: readonly (readonly [number, number, number])[] = [
  [40, 30, 140], [80, 24, 190], [122, 34, 120], [168, 26, 170], [214, 32, 110], [262, 22, 150],
  [312, 30, 95], [360, 26, 135], [420, 34, 90], [470, 28, 60], [520, 30, 60],
]

function wisteriaBlooms() {
  const blooms: { x: number; y: number; r: number; color: string }[] = []
  let seed = 5
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  const colors = ['#b79fd6', '#d6c4ec', '#8e78b8', '#c9a3dc']
  for (const [x, y, length] of WISTERIA) {
    for (let t = 0; t < length; t += 7) {
      const spread = (1 - t / length) * 10 + 2
      for (let j = 0; j < 2; j++) {
        blooms.push({ x: x + (rand() - 0.5) * spread * 2, y: y + t + rand() * 4, r: (1 - (t / length) * 0.5) * (4 + rand() * 2), color: colors[Math.floor(rand() * 4)] })
      }
    }
  }
  return blooms
}
const BLOOMS = wisteriaBlooms()

// Arched windows on the facade: [x, y, lit].
const WINDOWS: readonly (readonly [number, number, boolean])[] = [
  [70, 190, true], [210, 190, false], [350, 190, true], [490, 190, true],
  [70, 420, false], [210, 420, true], [350, 420, true], [490, 420, false],
]

// The old building on the left of the street: stone, arched windows (some
// lit), a wrought-iron balcony, and wisteria
// spilling from the roofline.
function Facade({ className = '' }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  return (
    <svg viewBox="0 0 600 900" preserveAspectRatio="xMaxYMax slice" className={className}>
      <defs>
        <linearGradient id={`${id}-wall`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#24263a" />
          <stop offset="70%" stopColor="#33344d" />
          <stop offset="100%" stopColor="#2a2b42" />
        </linearGradient>
        <radialGradient id={`${id}-lit`} cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#ffe3ad" />
          <stop offset="100%" stopColor="#d99a55" />
        </radialGradient>
        <radialGradient id={`${id}-warm`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f2b56e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f2b56e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="600" height="900" fill={`url(#${id}-wall)`} />
      {/* Stone courses. */}
      <g stroke="#1b1c2c" strokeOpacity="0.55" strokeWidth="1.5">
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M0 ${40 + i * 48}H600`} />
        ))}
        {Array.from({ length: 18 }, (_, i) =>
          Array.from({ length: 7 }, (_, j) => <path key={`${i}-${j}`} d={`M${(j * 96 + (i % 2) * 48) % 600} ${40 + i * 48}v48`} />),
        )}
      </g>
      {/* Warm wash from the windows and lantern on the stone. */}
      <ellipse cx="380" cy="560" rx="260" ry="320" fill={`url(#${id}-warm)`} />
      {/* Arched windows. */}
      {WINDOWS.map(([x, y, lit]) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x - 6} ${y + 166}V${y + 38}a46 46 0 0 1 92 0V${y + 166}Z`} fill="#17182a" />
          <path d={`M${x} ${y + 160}V${y + 40}a40 40 0 0 1 80 0V${y + 160}Z`} fill={lit ? `url(#${id}-lit)` : '#2c3048'} opacity={lit ? 0.95 : 1} />
          <path d={`M${x + 40} ${y}V${y + 160}M${x} ${y + 76}h80M${x} ${y + 118}h80`} stroke="#17182a" strokeWidth="4" />
          <rect x={x - 10} y={y + 164} width="100" height="9" fill="#1b1c2c" />
        </g>
      ))}
      {/* Balcony under the upper windows. */}
      <g stroke="#14152a" strokeWidth="3" fill="none">
        <path d="M40 372H600M40 404H600" />
        {Array.from({ length: 29 }, (_, i) => (
          <path key={i} d={`M${46 + i * 19} 372v32`} strokeWidth="2" />
        ))}
      </g>
    </svg>
  )
}

// The wisteria hanging along the top of the facade. An overlay with the
// facade's horizontal scale, so its sway moves only this small layer instead
// of repainting the whole building every frame. It's anchored to the top
// (the building itself is anchored to the street and cropped from above), so
// the vine always runs along the top of whatever part of the building shows.
function FacadeWisteria({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 900" preserveAspectRatio="xMaxYMin slice" className={className}>
      <path d="M0 28C80 40 160 18 260 30S440 40 600 24" stroke="#4d5a3a" strokeWidth="6" fill="none" />
      {WISTERIA.map(([x, y, length]) => (
        <path key={x} d={`M${x} ${y}v${length}`} stroke="#4d5a3a" strokeWidth="1.2" />
      ))}
      {BLOOMS.map((b, i) => (
        <ellipse key={i} cx={b.x} cy={b.y} rx={b.r} ry={b.r * 0.8} fill={b.color} opacity="0.92" />
      ))}
    </svg>
  )
}

// The Contact backdrop: a rainy midnight street by the water. The sky,
// distant shore, and wet cobblestones sit behind everything; the booth and
// the form are drawn on top. Decorative and click-through.
export function MidnightStreet() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <div aria-hidden="true" className="midnight-street pointer-events-none absolute inset-0 z-0">
      <svg width="0" height="0" className="absolute">
        <filter id={`${id}-sky`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.008" numOctaves="3" seed="61" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="100" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="9" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.017 0.028" numOctaves="2" seed="67" result="grain" />
          <feColorMatrix in="grain" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.9 1.25" result="mottle" />
          <feComposite in="soft" in2="mottle" operator="in" />
        </filter>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Painted night sky. Static, so the filter is rasterized once. */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="street-sky absolute inset-0 size-full"
        style={{ filter: `url(#${id}-sky)` }}
      >
        <defs>
          {SKY.map(([, , , , color], i) => (
            <radialGradient key={i} id={`${id}-w${i}`}>
              <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
              <stop offset="55%" style={{ stopColor: color, stopOpacity: 0.7 }} />
              <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
            </radialGradient>
          ))}
        </defs>
        {SKY.map(([cx, cy, rx, ry, , opacity], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}-w${i})`} opacity={opacity} />
        ))}
      </svg>

      {/* Crescent moon, upper right. */}
      <div className="street-moon absolute top-[calc(var(--spacing-section)_-_4rem)] right-[7%] size-[clamp(3.5rem,6vw,5.5rem)]">
        <div className="moon-halo" />
        <svg viewBox="0 0 100 100" className="relative block size-full">
          <defs>
            <mask id={`${id}-crescent`}>
              <rect width="100" height="100" fill="#fff" />
              <circle cx="66" cy="38" r="36" fill="#000" />
            </mask>
          </defs>
          <circle cx="46" cy="52" r="38" fill="#f7ecd2" mask={`url(#${id}-crescent)`} />
        </svg>
      </div>

      <WatercolorCloud shape="large" tint="night" seed={103} duration={70} travel={60} delay={18}
        className="absolute top-[3%] -left-[10%] w-[min(34rem,80vw)] opacity-60" />
      <WatercolorCloud shape="medium" tint="night" seed={117} duration={58} travel={50} delay={6}
        className="absolute top-[calc(var(--spacing-section)_-_5.5rem)] right-[10%] hidden w-[min(22rem,40vw)] opacity-55 md:block" />

      {/* Distant mountains and the lit far shore across the water. */}
      <svg
        viewBox="0 0 1440 380"
        preserveAspectRatio="xMaxYMax slice"
        className="street-shore absolute inset-x-0 bottom-[clamp(7rem,13vw,11rem)] h-[min(24rem,32%)] w-full"
      >
        <defs>
          <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--color-blue-slate) 70%, var(--color-blue-amber))" />
            <stop offset="100%" stopColor="var(--color-night-sky-deep)" />
          </linearGradient>
        </defs>
        <path
          d="M0 260C90 236 160 214 240 230S380 196 460 214 600 244 680 222 820 180 900 204 1040 240 1120 214 1260 178 1340 196 1440 206V300H0Z"
          fill="color-mix(in oklab, var(--color-blue-periwinkle) 55%, var(--color-night-sky))"
          opacity="0.8"
        />
        <path d="M780 302C820 286 880 280 960 280S1300 274 1400 280 1440 288 1440 290V302Z" fill="#141f30" />
        <g fill="#141f30">
          {SHORE.map(([x, width, height]) => (
            <path key={x} d={`M${x} 302V${300 - height}l${width / 2} -7 ${width / 2} 7V302Z`} />
          ))}
          <path d="M1092 302V200h16V302Z" />
          <path d="M1089 202l11-32 11 32Z" />
        </g>
        <circle cx="1100" cy="214" r="3.2" fill="var(--color-blue-ivory)" opacity="0.85" />
        <g filter={`url(#${id}-glow)`} fill="#ffd9a0">
          {LIGHTS.map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="2.4" height="3.2" rx="0.6" />
          ))}
        </g>
        <rect x="0" y="300" width="1440" height="80" fill={`url(#${id}-water)`} />
        {/* Waterfront railing. */}
        <g stroke="#0f1724" strokeWidth="3">
          <path d="M0 346H1440" />
          <path d="M0 360H1440" strokeWidth="1.5" />
        </g>
        <g fill="#0f1724">
          {Array.from({ length: 49 }, (_, i) => (
            <rect key={i} x={i * 30} y="342" width="3" height="38" />
          ))}
        </g>
      </svg>

      {/* Shimmering reflections, as an overlay with the shore's geometry so
          the shimmer animates on its own layer. */}
      <svg
        viewBox="0 0 1440 380"
        preserveAspectRatio="xMaxYMax slice"
        className="lake-shimmer absolute inset-x-0 bottom-[clamp(7rem,13vw,11rem)] h-[min(24rem,32%)] w-full"
      >
        <g fill="#ffd9a0">
          {LIGHTS.filter((_, i) => i % 2 === 0).map(({ x, y }) => (
            <rect key={`r${x}-${y}`} x={x - 0.4} y={302 + (300 - y) * 0.3} width="2.6" height={7 + ((x * 7) % 10)} rx="1.2" opacity="0.4" />
          ))}
        </g>
      </svg>

      {/* The old building beside the booth (wide screens, where the booth
          stands to the left of the form). */}
      <div className="street-facade absolute bottom-[clamp(5.5rem,11.5vw,9.5rem)] left-0 top-[16%] hidden w-[min(44vw,40rem)] lg:block">
        <Facade className="absolute inset-0 block size-full" />
        <FacadeWisteria className="facade-wisteria absolute inset-0 block size-full" />
      </div>

      {/* Wet cobblestone street with lamp-lit reflections. */}
      <div className="street-cobbles absolute inset-x-0 bottom-0 h-[clamp(7rem,13vw,11rem)]">
        {PUDDLES.map(([x, bottom, width, delay], i) => (
          <span
            key={i}
            className="street-puddle"
            style={{ left: `${x}%`, bottom: `${bottom}%`, width: `${width}rem`, '--ripple-delay': `${-delay}s` } as CSSProperties}
          />
        ))}
      </div>
    </div>
  )
}
