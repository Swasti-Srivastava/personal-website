import { useId } from 'react'
import { WatercolorCloud } from './WatercolorCloud'

type Wash = readonly [cx: number, cy: number, rx: number, ry: number, color: string, opacity: number]

// Pools of pigment over the section's purple-to-periwinkle sky, on a
// 1000×1000 canvas: rose and peach carried down from the sunset at the top,
// lavender and mauve streaks through the middle, warm peach light gathering
// low on the horizon above the landscape.
const SKY: readonly Wash[] = [
  [500, 30, 700, 90, 'var(--color-golden-rose)', 0.35],
  [180, 140, 340, 110, 'var(--color-dusk-mauve)', 0.45],
  [780, 180, 380, 90, 'var(--color-dusk-peach)', 0.35],
  [420, 330, 560, 60, 'var(--color-dusk-lavender)', 0.4],
  [90, 470, 260, 160, 'var(--color-dusk-periwinkle)', 0.4],
  [900, 450, 280, 150, 'var(--color-dusk-mauve)', 0.4],
  [540, 560, 600, 55, 'var(--color-dusk-peach)', 0.28],
  [300, 650, 420, 70, 'var(--color-dusk-lavender)', 0.35],
  [500, 760, 720, 80, 'var(--color-dusk-peach)', 0.5],
  [820, 720, 300, 60, 'var(--color-golden-rose)', 0.3],
]

// The town on the right-hand shore: [x, width, height] for each building on a
// 1440-wide canvas, plus a church tower.
const BUILDINGS: readonly (readonly [number, number, number])[] = [
  [1035, 26, 30], [1058, 20, 42], [1076, 30, 34], [1104, 22, 52], [1124, 34, 40],
  [1156, 24, 58], [1178, 30, 44], [1206, 22, 66], [1226, 36, 48], [1260, 24, 38],
  [1282, 30, 54], [1310, 26, 42], [1334, 34, 60], [1366, 24, 46], [1388, 30, 52],
  [1416, 26, 40],
]

// Pitched, flat, and stepped roofs in turn so the skyline isn't uniform.
function roof(x: number, width: number, height: number) {
  const top = 414 - height
  switch (x % 3) {
    case 0:
      return `M${x} 414V${top}l${width / 2} -8 ${width / 2} 8V414Z`
    case 1:
      return `M${x} 414V${top}h${width}V414Z`
    default:
      return `M${x} 414V${top + 6}h${width * 0.35}v-6h${width * 0.3}v6h${width * 0.35}V414Z`
  }
}

// Lit windows: deterministic scatter so the town looks the same every visit.
function windows() {
  const lights: { x: number; y: number }[] = []
  let seed = 7
  const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280)
  for (const [x, width, height] of BUILDINGS) {
    for (let wy = 412 - height + 8; wy < 404; wy += 9) {
      for (let wx = x + 5; wx < x + width - 5; wx += 8) {
        if (rand() < 0.2) lights.push({ x: wx, y: wy })
      }
    }
  }
  return lights
}
const LIGHTS = windows()

// The Experience backdrop: a painted dusk sky, a few clouds, distant
// mountains, and a lake with a small lit town on the far shore. Everything
// sits behind the content, takes no pointer events, and is hidden from
// assistive tech.
export function DuskLandscape() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <div aria-hidden="true" className="dusk-landscape pointer-events-none absolute inset-0 -z-10">
      {/* Shared watercolor filters, applied from CSS in screen pixels. */}
      <svg width="0" height="0" className="absolute">
        <filter id={`${id}-sky`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.008" numOctaves="3" seed="21" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="100" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="9" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.017 0.028" numOctaves="2" seed="34" result="grain" />
          <feColorMatrix in="grain" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.9 1.25" result="mottle" />
          <feComposite in="soft" in2="mottle" operator="in" />
        </filter>
        <filter id={`${id}-land`} x="-2%" y="-10%" width="104%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="3" seed="5" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="6" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="12" result="grain" />
          <feColorMatrix in="grain" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.6 1.2" result="mottle" />
          <feComposite in="shape" in2="mottle" operator="in" />
        </filter>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>

      {/* Painted sky. Static, so the filter is rasterized once. */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="dusk-sky absolute inset-0 size-full"
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

      {/* A few soft clouds, mostly toward the edges. */}
      <WatercolorCloud shape="large" tint="blush" seed={17} duration={40} travel={40} delay={9}
        className="absolute top-[1%] -left-[10%] w-[min(30rem,70vw)] opacity-55" />
      <WatercolorCloud shape="medium" tint="lavender" seed={26} duration={34} travel={35} delay={3}
        className="absolute top-[3%] -right-[8%] w-[min(26rem,60vw)] opacity-60" />
      <WatercolorCloud shape="large" tint="lavender" seed={48} duration={44} travel={50} delay={20}
        className="absolute top-[30%] -right-[14%] hidden w-[min(30rem,40vw)] opacity-45 lg:block" />
      <WatercolorCloud shape="medium" tint="blush" seed={59} duration={38} travel={40} delay={14}
        className="absolute top-[47%] -left-[12%] hidden w-[min(26rem,36vw)] opacity-45 lg:block" />

      {/* Mountains, lake and town, anchored to the bottom right (where the
          town is) and cropped from the left to fit narrower screens. */}
      <svg
        viewBox="0 0 1440 520"
        preserveAspectRatio="xMaxYMax slice"
        className="dusk-land absolute inset-x-0 bottom-0 h-[min(40rem,36%)] w-full"
      >
        <defs>
          <linearGradient id={`${id}-glowband`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-dusk-peach)" stopOpacity="0" />
            <stop offset="70%" stopColor="var(--color-dusk-peach)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-dusk-glow)" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-dusk-lavender)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--color-dusk-lavender) 60%, var(--color-dusk-peach))" />
          </linearGradient>
          <linearGradient id={`${id}-near`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--color-dusk-periwinkle) 75%, var(--color-dusk-plum))" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--color-dusk-periwinkle) 50%, var(--color-dusk-mauve))" />
          </linearGradient>
          <linearGradient id={`${id}-lake`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--color-dusk-peach) 55%, var(--color-dusk-lavender))" />
            <stop offset="35%" stopColor="color-mix(in oklab, var(--color-dusk-lavender) 70%, var(--color-dusk-periwinkle))" />
            <stop offset="100%" stopColor="var(--color-dusk-sky-deep)" />
          </linearGradient>
        </defs>

        <g filter={`url(#${id}-land)`}>
          {/* Warm light low in the sky. */}
          <rect x="0" y="230" width="1440" height="185" fill={`url(#${id}-glowband)`} />
          {/* Far range: pale lavender, softly peaked. */}
          <path
            d="M0 360C70 330 120 300 190 318S300 270 360 290 470 330 540 300 650 240 720 270 840 320 920 292 1040 250 1110 278 1220 320 1300 296 1400 268 1440 280V420H0Z"
            fill={`url(#${id}-far)`}
            opacity="0.85"
          />
          {/* Near hills, deeper periwinkle. */}
          <path
            d="M0 392C90 370 150 352 230 368S360 396 450 378 600 344 690 366 820 398 900 386 980 370 1030 378V420H0Z"
            fill={`url(#${id}-near)`}
            opacity="0.9"
          />
          {/* The hill the town sits on. */}
          <path d="M1000 420C1020 400 1060 392 1120 392S1300 384 1380 390 1440 398 1440 400V420Z" fill="var(--color-dusk-plum)" opacity="0.85" />
          {/* Lake. */}
          <rect x="0" y="414" width="1440" height="106" fill={`url(#${id}-lake)`} />
          {/* Glints of horizon light on the water. */}
          <path
            d="M180 430h120M420 436h90M600 428h160M330 448h70M700 452h110M520 462h60M240 470h80M860 440h90"
            stroke="var(--color-dusk-glow)"
            strokeOpacity="0.45"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>

        {/* Town silhouettes with a church tower. */}
        <g fill="var(--color-dusk-plum)">
          {BUILDINGS.map(([x, width, height]) => (
            <path key={x} d={roof(x, width, height)} />
          ))}
          <path d="M1190 414V330h14V414Z" />
          <path d="M1187 332l10-22 10 22Z" />
        </g>

        {/* Warm windows and their reflections, with a soft glow. */}
        <g filter={`url(#${id}-glow)`} fill="var(--color-dusk-glow)">
          {LIGHTS.map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="2.6" height="3.4" rx="0.6" />
          ))}
          <rect x="1194.5" y="342" width="3" height="5" rx="1" />
        </g>
        <g fill="var(--color-dusk-glow)" opacity="0.35">
          {LIGHTS.filter((_, i) => i % 3 === 0).map(({ x, y }) => (
            <rect key={`r${x}-${y}`} x={x} y={414 + (414 - y) * 0.35} width="2" height="7" rx="1" />
          ))}
        </g>
      </svg>
    </div>
  )
}
