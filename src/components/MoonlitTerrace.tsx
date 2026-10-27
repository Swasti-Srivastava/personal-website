import { useId, type CSSProperties } from 'react'
import { WatercolorCloud } from './WatercolorCloud'

type Wash = readonly [cx: number, cy: number, rx: number, ry: number, color: string, opacity: number]

// Pools of pigment over the section's periwinkle-to-midnight sky (1000×1000
// canvas): lavender and mauve carried over from dusk at the top, slate and
// periwinkle cloud banks, a little warmth low over the town.
const SKY: readonly Wash[] = [
  [500, 30, 720, 90, 'var(--color-dusk-lavender)', 0.3],
  [160, 160, 330, 120, 'var(--color-blue-periwinkle)', 0.4],
  [820, 230, 360, 110, 'var(--color-blue-slate)', 0.45],
  [420, 380, 560, 70, 'var(--color-blue-lavender)', 0.22],
  [80, 520, 260, 170, 'var(--color-blue-periwinkle)', 0.35],
  [920, 540, 280, 160, 'var(--color-blue-lavender)', 0.25],
  [520, 700, 680, 80, 'var(--color-blue-slate)', 0.4],
  [760, 800, 360, 60, 'var(--color-blue-amber)', 0.18],
]

// Stars: [x %, y %, size px, twinkle seconds, delay seconds].
const STARS: readonly (readonly [number, number, number, number, number])[] = [
  [8, 4, 3, 6, 0], [21, 9, 2, 7.5, 2], [37, 3, 2.5, 5.5, 4], [52, 7, 2, 8, 1],
  [63, 2.5, 3, 6.5, 3], [91, 12, 2.5, 7, 5], [44, 14, 2, 9, 6], [12, 21, 2, 6, 3.5],
  [96, 26, 2, 8.5, 1.5], [3, 36, 2.5, 7, 4.5], [70, 18, 2, 6, 2.5], [86, 4, 2, 7.5, 0.5],
]

// Town buildings along the far shore: [x, width, height] on a 1440 canvas.
const TOWN: readonly (readonly [number, number, number])[] = [
  [930, 22, 26], [950, 30, 36], [978, 24, 44], [1000, 34, 32], [1032, 22, 52],
  [1052, 30, 40], [1080, 26, 58], [1104, 36, 46], [1138, 24, 62], [1160, 32, 42],
  [1190, 26, 54], [1214, 34, 38], [1246, 24, 50], [1268, 32, 44], [1298, 26, 56],
  [1322, 34, 40], [1354, 26, 48], [1378, 32, 36], [1408, 32, 46],
]

function townLights() {
  const lights: { x: number; y: number }[] = []
  let seed = 11
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  for (const [x, width, height] of TOWN) {
    for (let y = 400 - height + 7; y < 394; y += 8) {
      for (let wx = x + 4; wx < x + width - 4; wx += 7) if (rand() < 0.34) lights.push({ x: wx, y })
    }
  }
  return lights
}
const LIGHTS = townLights()

// Wisteria: a raceme of small blossoms tapering downward from (0, 0).
function Raceme({ length, scale = 1, seed }: { length: number; scale?: number; seed: number }) {
  let s = seed
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280
  const blooms = []
  for (let i = 0; i < length; i++) {
    const t = i / length
    const spread = (1 - t) * 7 + 1.5
    const count = t < 0.75 ? 3 : 2
    for (let j = 0; j < count; j++) {
      blooms.push({
        x: (rand() - 0.5) * spread * 2,
        y: i * 5.2 + rand() * 2,
        r: (1 - t * 0.55) * (2.6 + rand() * 1.2),
        tone: rand(),
      })
    }
  }
  return (
    <g transform={`scale(${scale})`}>
      <path d={`M0 0V${length * 5}`} stroke="#5e6b4a" strokeWidth="0.8" />
      {blooms.map((b, i) => (
        <ellipse
          key={i}
          cx={b.x}
          cy={b.y}
          rx={b.r}
          ry={b.r * 0.8}
          fill={b.tone < 0.35 ? '#d6c4ec' : b.tone < 0.75 ? 'var(--color-blue-wisteria)' : '#8e78b8'}
          opacity="0.92"
        />
      ))}
    </g>
  )
}

// A curtain of wisteria for one top corner: a vine along the edge with
// racemes of varying length, each swaying slightly on its own timing.
function Wisteria({ side, className = '' }: { side: 'left' | 'right'; className?: string }) {
  const racemes = [
    { x: 18, y: 10, length: 26, seed: 3 },
    { x: 46, y: 6, length: 34, seed: 7 },
    { x: 78, y: 12, length: 22, seed: 11 },
    { x: 104, y: 8, length: 30, seed: 19 },
    { x: 132, y: 14, length: 18, seed: 23 },
    { x: 30, y: 60, length: 20, seed: 29 },
    { x: 8, y: 120, length: 24, seed: 31 },
  ]
  return (
    <svg
      viewBox="0 0 160 300"
      className={`overflow-visible ${side === 'right' ? '-scale-x-100' : ''} ${className}`}
    >
      <path d="M-10 4C30 14 70 2 110 10S150 16 170 8" fill="none" stroke="#5e6b4a" strokeWidth="3" strokeLinecap="round" />
      <path d="M2 0C10 60 0 120 6 200" fill="none" stroke="#5e6b4a" strokeWidth="2.4" strokeLinecap="round" />
      {[[30, 8], [60, 6], [90, 10], [120, 12], [6, 40], [4, 90], [8, 150]].map(([x, y], i) => (
        <path
          key={i}
          d="M0 0C4-3 10-4 14-3 10 1 5 2 0 0Z"
          transform={`translate(${x} ${y}) rotate(${i * 47 - 30}) scale(1.6)`}
          fill="#6f7d55"
          opacity="0.9"
        />
      ))}
      {racemes.map(({ x, y, length, seed }, i) => (
        <g key={seed} transform={`translate(${x} ${y})`}>
          {/* Sways from where it hangs; nested so the CSS transform doesn't
              replace the positioning transform above. */}
          <g
            className="anim-sway-soft"
            style={{ transformBox: 'view-box', transformOrigin: '0px 0px', animationDelay: `${-i * 1.3}s` } as CSSProperties}
          >
            <Raceme length={length} seed={seed} />
          </g>
        </g>
      ))}
    </svg>
  )
}

function Lantern({ className = '' }: { className?: string }) {
  return (
    <div className={`terrace-lantern ${className}`}>
      <div className="lantern-glow" />
      <svg viewBox="0 0 60 110" className="relative block h-auto w-full">
        <defs>
          <radialGradient id="lantern-flame" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="#fff4d6" />
            <stop offset="45%" stopColor="#ffd28a" />
            <stop offset="100%" stopColor="#d5a36b" stopOpacity="0.85" />
          </radialGradient>
        </defs>
        <path d="M30 2v8M24 10h12" stroke="#2b2a3a" strokeWidth="2" strokeLinecap="round" />
        <path d="M14 22 30 10l16 12Z" fill="#2f2c3d" />
        <rect x="16" y="22" width="28" height="56" rx="2" fill="url(#lantern-flame)" />
        <path d="M16 22v56M30 22v56M44 22v56M16 50h28" stroke="#2f2c3d" strokeWidth="2" />
        <path d="M12 78h36l-4 8H16Z" fill="#2f2c3d" />
        <path d="M22 86h16v20H22Z" fill="#2f2c3d" />
        <ellipse className="lantern-flame" cx="30" cy="58" rx="3.2" ry="6" fill="#fff8e6" />
      </svg>
    </div>
  )
}

// Books, a teacup, and a cat asleep beside them, resting on the balustrade.
function TerraceStillLife({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 110" className={className}>
      {/* Stacked books. */}
      <rect x="6" y="80" width="96" height="16" rx="2" fill="#7a3f4a" />
      <rect x="10" y="66" width="86" height="14" rx="2" fill="#4b5a7e" />
      <rect x="2" y="54" width="92" height="12" rx="2" fill="#a0784f" />
      <path d="M10 88h88M14 73h78M6 60h84" stroke="#f3e2c4" strokeOpacity="0.45" strokeWidth="1" />
      {/* Teacup on the books. */}
      <path d="M38 36h26c0 9-5 15-13 15s-13-6-13-15Z" fill="#efe4d2" />
      <path d="M64 39c5 0 6 7 0 8" fill="none" stroke="#efe4d2" strokeWidth="2.2" />
      <ellipse cx="51" cy="52" rx="18" ry="3" fill="#d8cbb7" />
      <path d="M40 41h22" stroke="#b79fd6" strokeWidth="2" />
      <g className="terrace-steam" fill="none" stroke="#f3ebe2" strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round">
        <path d="M46 31c-3-4 3-6 0-11" />
        <path d="M55 31c-3-4 3-6 0-11" />
      </g>
      {/* Sleeping cat, curled with its tail wrapped round. */}
      <g className="terrace-cat">
        <path d="M120 96c0-22 22-36 54-36 30 0 50 14 50 30 0 6-4 8-10 8H124c-3 0-4-1-4-2Z" fill="#59536f" />
        <path d="M126 80c8-12 26-19 48-19" fill="none" stroke="#e2b98a" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
        <path d="M206 64c10-2 18 4 18 12 0 6-6 10-14 10-10 0-16-5-16-11 0-6 5-10 12-11Z" fill="#625b7a" />
        <path d="M200 66l2-10 7 7M214 64l5-9 3 9" fill="#625b7a" />
        <path d="M204 76c2 1.5 4 1.5 6 0M213 76c2 1.5 4 1.5 6 0" stroke="#b9b2cc" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M124 96c-10 0-14-8-8-12s14 2 24 4" fill="none" stroke="#59536f" strokeWidth="7" strokeLinecap="round" />
        <path d="M140 72c14-8 34-10 50-4" fill="none" stroke="#5b5672" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// The Skills backdrop: a moonlit night over the lake town, seen from a
// terrace with wisteria, a lantern, and a cat asleep by some books. All of it
// sits behind the content, takes no pointer events, and is hidden from
// assistive tech.
export function MoonlitTerrace() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <div aria-hidden="true" className="moonlit-terrace pointer-events-none absolute inset-0 -z-10">
      <svg width="0" height="0" className="absolute">
        <filter id={`${id}-sky`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.008" numOctaves="3" seed="44" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="100" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="9" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.017 0.028" numOctaves="2" seed="51" result="grain" />
          <feColorMatrix in="grain" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.9 1.25" result="mottle" />
          <feComposite in="soft" in2="mottle" operator="in" />
        </filter>
        <filter id={`${id}-land`} x="-2%" y="-10%" width="104%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.04" numOctaves="3" seed="6" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
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
        className="terrace-sky absolute inset-0 size-full"
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

      {STARS.map(([x, y, size, duration, delay], i) => (
        <span
          key={i}
          className={`terrace-star anim-twinkle absolute ${i % 3 === 2 ? 'hidden md:block' : ''}`}
          style={
            {
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              '--twinkle-duration': `${duration}s`,
              '--twinkle-delay': `${-delay}s`,
            } as CSSProperties
          }
        />
      ))}

      {/* Crescent moon with a faint warm halo, upper right. */}
      <div className="terrace-moon absolute top-[calc(var(--spacing-section)_-_4rem)] right-[9%] size-[clamp(4.5rem,8vw,7.5rem)]">
        <div className="moon-halo" />
        <svg viewBox="0 0 100 100" className="relative block size-full">
          <defs>
            <mask id={`${id}-crescent`}>
              <rect width="100" height="100" fill="#fff" />
              <circle cx="66" cy="38" r="36" fill="#000" />
            </mask>
            <radialGradient id={`${id}-moon`} cx="35%" cy="60%" r="70%">
              <stop offset="0%" stopColor="#fffaf0" />
              <stop offset="100%" stopColor="#f1d9a8" />
            </radialGradient>
          </defs>
          <circle cx="46" cy="52" r="38" fill={`url(#${id}-moon)`} mask={`url(#${id}-crescent)`} />
        </svg>
      </div>

      {/* Slow clouds drifting across the night sky. */}
      <WatercolorCloud shape="large" tint="night" seed={71} duration={60} travel={60} delay={12}
        className="absolute top-[2%] -left-[12%] w-[min(34rem,80vw)] opacity-70" />
      <WatercolorCloud shape="medium" tint="night" seed={83} duration={52} travel={50} delay={30}
        className="absolute top-[calc(var(--spacing-section)_-_5.5rem)] right-[2%] w-[min(24rem,55vw)] opacity-60" />
      <WatercolorCloud shape="large" tint="night" seed={92} duration={66} travel={55} delay={8}
        className="absolute top-[40%] -right-[16%] hidden w-[min(32rem,42vw)] opacity-45 lg:block" />

      {/* Mountains, lake, and the lit town, above the terrace railing. */}
      <svg
        viewBox="0 0 1440 470"
        preserveAspectRatio="xMaxYMax slice"
        className="terrace-land absolute inset-x-0 bottom-[clamp(4.5rem,8vw,7.5rem)] h-[min(32rem,30%)] w-full"
      >
        <defs>
          <linearGradient id={`${id}-far`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-periwinkle)" />
            <stop offset="100%" stopColor="color-mix(in oklab, var(--color-blue-periwinkle) 60%, var(--color-blue-lavender))" />
          </linearGradient>
          <linearGradient id={`${id}-near`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--color-blue-slate) 70%, var(--color-blue-midnight))" />
            <stop offset="100%" stopColor="var(--color-blue-slate)" />
          </linearGradient>
          <linearGradient id={`${id}-lake`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklab, var(--color-blue-periwinkle) 70%, var(--color-blue-amber))" />
            <stop offset="40%" stopColor="var(--color-blue-slate)" />
            <stop offset="100%" stopColor="var(--color-blue-midnight)" />
          </linearGradient>
          <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-blue-lavender)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--color-blue-lavender)" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <g filter={`url(#${id}-land)`}>
          <path
            d="M0 330C80 300 140 270 210 290S320 250 390 268 500 300 570 276 690 222 760 250 880 300 960 272 1080 232 1150 258 1260 296 1340 276 1420 250 1440 256V400H0Z"
            fill={`url(#${id}-far)`}
            opacity="0.75"
          />
          <rect x="0" y="250" width="1440" height="150" fill={`url(#${id}-haze)`} />
          <path
            d="M0 372C100 350 170 336 250 350S390 378 480 362 640 330 730 350 860 380 940 370 1010 360 1060 366V400H0Z"
            fill={`url(#${id}-near)`}
            opacity="0.9"
          />
          <path d="M900 402C930 384 980 378 1060 378S1320 372 1400 378 1440 386 1440 388V402Z" fill="var(--color-blue-midnight)" />
          <rect x="0" y="400" width="1440" height="70" fill={`url(#${id}-lake)`} />
        </g>
        <g fill="var(--color-blue-midnight)">
          {TOWN.map(([x, width, height]) => (
            <path key={x} d={`M${x} 400V${400 - height}l${width / 2} -7 ${width / 2} 7V400Z`} />
          ))}
          {/* Church with a clock tower. */}
          <path d="M1222 400V318h16V400Z" />
          <path d="M1219 320l11-30 11 30Z" />
        </g>
        <circle cx="1230" cy="332" r="3.2" fill="var(--color-blue-ivory)" opacity="0.8" />
        <g filter={`url(#${id}-glow)`} fill="#ffd9a0">
          {LIGHTS.map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="2.4" height="3.2" rx="0.6" />
          ))}
        </g>
        {/* Light reflected on the water, gently shimmering. */}
        <g className="lake-shimmer" fill="#ffd9a0">
          {LIGHTS.filter((_, i) => i % 2 === 0).map(({ x, y }) => (
            <rect key={`r${x}-${y}`} x={x - 0.4} y={402 + (400 - y) * 0.25} width="2.6" height={6 + ((x * 7) % 9)} rx="1.2" opacity="0.45" />
          ))}
          <path d="M120 420h140M380 430h90M560 418h120M700 436h80" stroke="var(--color-blue-lavender)" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>

      {/* The terrace: wisteria from the top corners, the balustrade along
          the bottom, a lantern, and the still life on the railing. */}
      <Wisteria side="left" className="absolute top-0 -left-3 w-[clamp(4.5rem,13vw,12.5rem)] md:left-0" />
      <Wisteria side="left" className="absolute top-[30%] -left-6 hidden w-[clamp(6rem,10vw,9.5rem)] rotate-6 xl:block" />
      <Wisteria side="right" className="absolute top-0 right-0 hidden w-[clamp(6.5rem,12vw,11rem)] md:block" />

      <svg className="terrace-railing absolute inset-x-0 bottom-0 h-[clamp(4.5rem,8vw,7.5rem)] w-full">
        <defs>
          <linearGradient id={`${id}-stone`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a49aab" />
            <stop offset="100%" stopColor="#5f5970" />
          </linearGradient>
          <linearGradient id={`${id}-baluster`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8a8197" />
            <stop offset="45%" stopColor="#a69caf" />
            <stop offset="100%" stopColor="#5c566c" />
          </linearGradient>
          <pattern id={`${id}-balusters`} width="52" height="100%" patternUnits="userSpaceOnUse">
            <path d="M18 24c7 0 9 5 6 10-4 7-5 15 0 24 3 6 2 11-6 13v50h18V71c-8-2-9-7-6-13 5-9 4-17 0-24-3-5-1-10 6-10Z" fill={`url(#${id}-baluster)`} />
          </pattern>
        </defs>
        <g opacity="0.92">
          <rect x="0" y="18" width="100%" height="100%" fill={`url(#${id}-balusters)`} />
          <rect x="0" y="0" width="100%" height="22" rx="3" fill={`url(#${id}-stone)`} />
          <rect x="0" y="0" width="100%" height="3" fill="#d9d0de" opacity="0.5" />
          <rect x="0" y="19" width="100%" height="3" fill="#3f3a50" opacity="0.5" />
        </g>
      </svg>

      <Lantern className="absolute bottom-[clamp(4.5rem,8vw,7.5rem)] left-[2.5%] hidden w-[clamp(3.25rem,5vw,4.75rem)] lg:block" />
      <TerraceStillLife className="absolute bottom-[calc(clamp(4.5rem,8vw,7.5rem)_-_4px)] left-[8%] hidden w-[clamp(13rem,22vw,21rem)] md:block" />
    </div>
  )
}
