import { useId, type CSSProperties } from 'react'
import { Sparkle } from './Botanicals'
import { FloralSpray } from './FloralSpray'
import { WatercolorBouquet } from './WatercolorBouquet'
import { WatercolorCloud } from './WatercolorCloud'

type Wash = readonly [cx: number, cy: number, rx: number, ry: number, color: Pigment, opacity: number]
type Pigment = keyof typeof PIGMENTS

const PIGMENTS = {
  peach: 'var(--color-golden-peach)',
  coral: 'var(--color-golden-coral)',
  blush: 'var(--color-golden-blush)',
  lavender: 'var(--color-golden-lavender)',
  rose: 'var(--color-golden-sky-deep)',
  sun: 'var(--color-golden-sun)',
} as const

// Loose pools of pigment on a 1000×1000 canvas stretched over the section:
// warm light around the sun at the upper right, long sunset streaks through
// the middle, lavender and rose gathering toward the edges and the bottom.
const WASHES: readonly Wash[] = [
  [840, 95, 330, 150, 'sun', 0.55],
  [610, 175, 520, 75, 'peach', 0.5],
  [130, 110, 300, 130, 'lavender', 0.5],
  [380, 300, 640, 70, 'blush', 0.55],
  [800, 400, 380, 50, 'coral', 0.4],
  [60, 470, 250, 190, 'lavender', 0.45],
  [960, 560, 250, 170, 'peach', 0.45],
  [470, 560, 520, 55, 'coral', 0.3],
  [520, 700, 660, 85, 'blush', 0.5],
  [120, 800, 300, 140, 'rose', 0.4],
  [890, 840, 330, 150, 'lavender', 0.5],
  [500, 930, 600, 80, 'lavender', 0.35],
]

// Flowering branches along both edges, framing the grid from the first row
// down. They grow from just past the screen edge (so they're cropped
// naturally) and reach inward behind the cards. Right-side sprays are flipped
// and use different seeds, so the two sides never mirror each other.
const SPRAYS = [
  { seed: 3, angle: 76, length: 240, side: 'left', sway: false, className: 'top-[24%] -left-[3rem]' },
  { seed: 11, angle: 68, length: 220, side: 'left', sway: true, className: 'top-[37%] -left-[2.5rem]' },
  { seed: 19, angle: 80, length: 250, side: 'left', sway: false, className: 'top-[53%] -left-[3.5rem]' },
  { seed: 37, angle: 72, length: 210, side: 'left', sway: false, className: 'top-[68%] -left-[2rem]' },
  { seed: 7, angle: 78, length: 235, side: 'right', sway: false, className: 'top-[20%] -right-[3rem]' },
  { seed: 23, angle: 70, length: 225, side: 'right', sway: true, className: 'top-[35%] -right-[2.5rem]' },
  { seed: 29, angle: 82, length: 215, side: 'right', sway: false, className: 'top-[51%] -right-[3rem]' },
  { seed: 43, angle: 74, length: 230, side: 'right', sway: false, className: 'top-[66%] -right-[2rem]' },
] as const

const twinkle = (duration: number, delay: number) =>
  ({ '--twinkle-duration': `${duration}s`, '--twinkle-delay': `${-delay}s` }) as CSSProperties

// The Projects sunset: a painted sky, a setting sun, clouds around the edges,
// and a few sketches. Everything sits behind the section's content, takes no
// pointer events, and is hidden from assistive tech.
export function SunsetSky() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <div aria-hidden="true" className="sunset-sky pointer-events-none absolute inset-0 -z-10">
      {/* The watercolor filter is applied to the stretched washes from CSS, so
          it runs in screen pixels: the texture keeps the same grain on any
          screen shape instead of stretching with the canvas. */}
      <svg width="0" height="0" className="absolute">
        <filter id={`${id}-paint`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.004 0.008" numOctaves="3" seed="8" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="100" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feGaussianBlur in="shape" stdDeviation="9" result="soft" />
          <feTurbulence type="fractalNoise" baseFrequency="0.017 0.028" numOctaves="2" seed="13" result="grain" />
          <feColorMatrix in="grain" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -0.9 1.25" result="mottle" />
          <feComposite in="soft" in2="mottle" operator="in" />
        </filter>
      </svg>

      {/* Painted washes. Static, so the filter is rasterized once. */}
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        style={{ filter: `url(#${id}-paint)` }}
      >
        <defs>
          {Object.entries(PIGMENTS).map(([name, color]) => (
            <radialGradient key={name} id={`${id}-${name}`}>
              <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
              <stop offset="55%" style={{ stopColor: color, stopOpacity: 0.75 }} />
              <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
            </radialGradient>
          ))}
        </defs>
        <g>
          {WASHES.map(([cx, cy, rx, ry, color, opacity]) => (
            <ellipse
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              rx={rx}
              ry={ry}
              fill={`url(#${id}-${color})`}
              opacity={opacity}
            />
          ))}
        </g>
      </svg>

      {/* The setting sun, half hidden behind lavender and blush clouds. They
          are placed relative to the section's top padding so the whole group
          stays above the heading divider at every width; on phones it sits
          higher and smaller, clear of the subtitle. */}
      <div className="sunset-sun absolute top-[1.5rem] -right-[6%] size-[min(17rem,40vw)] md:top-[max(0rem,calc(var(--spacing-section)_-_10.5rem))] md:right-[16%] md:size-[min(17rem,46vw)]" />
      <WatercolorCloud
        shape="large"
        tint="lavender"
        seed={41}
        duration={34}
        travel={40}
        delay={10}
        className="absolute top-[4.5rem] -right-[22%] w-[min(34rem,58vw)] opacity-90 md:top-[calc(var(--spacing-section)_-_6.5rem)] md:-right-[6%] md:w-[min(34rem,78vw)]"
      />
      <WatercolorCloud
        shape="medium"
        tint="blush"
        seed={23}
        duration={27}
        travel={35}
        delay={4}
        className="absolute top-[calc(var(--spacing-section)_-_3rem)] right-[14%] hidden w-[min(22rem,52vw)] md:block"
      />

      {/* Clouds around the outer edges. */}
      <WatercolorCloud
        shape="medium"
        tint="blush"
        seed={52}
        duration={31}
        travel={45}
        delay={18}
        className="absolute top-0 -left-[8%] w-[min(26rem,60vw)] md:top-[1.5rem]"
      />
      <WatercolorCloud
        shape="small"
        seed={31}
        duration={24}
        travel={35}
        delay={8}
        className="absolute top-[3.5rem] left-[36%] hidden w-[min(14rem,30vw)] opacity-80 md:block"
      />
      <WatercolorCloud
        shape="large"
        tint="lavender"
        seed={63}
        duration={38}
        travel={50}
        delay={22}
        className="absolute top-[40%] -left-[16%] hidden w-[min(30rem,40vw)] opacity-80 lg:block"
      />
      <WatercolorCloud
        shape="medium"
        tint="blush"
        seed={77}
        duration={29}
        travel={40}
        delay={12}
        className="absolute top-[58%] -right-[13%] hidden w-[min(26rem,36vw)] lg:block"
      />
      <WatercolorCloud
        shape="small"
        seed={85}
        duration={26}
        travel={30}
        delay={5}
        className="absolute top-[28%] -right-[5%] hidden w-[min(14rem,22vw)] opacity-80 lg:block"
      />
      <WatercolorCloud
        shape="large"
        tint="blush"
        seed={91}
        duration={36}
        travel={45}
        delay={16}
        className="absolute bottom-[1%] -left-[12%] w-[min(32rem,70vw)] opacity-90"
      />
      <WatercolorCloud
        shape="medium"
        tint="lavender"
        seed={97}
        duration={32}
        travel={40}
        delay={2}
        className="absolute -right-[8%] bottom-[6%] w-[min(26rem,60vw)] opacity-85"
      />

      {/* Watercolor wildflowers growing up from both bottom corners, and a
          few sparkles around the rim. */}
      {SPRAYS.map(({ seed, angle, length, side, className, sway }) => (
        <FloralSpray
          key={seed}
          seed={seed}
          angle={angle}
          length={length}
          className={`spray absolute hidden md:block ${side === 'right' ? '-scale-x-100' : ''} ${sway ? 'anim-sway-soft' : ''} ${className}`}
        />
      ))}
      <WatercolorBouquet side="left" className="bouquet absolute bottom-0 left-0" />
      <WatercolorBouquet side="right" className="bouquet absolute right-0 bottom-0" />

      <Sparkle className="anim-twinkle absolute top-[4.5rem] right-[30%] w-3" style={twinkle(5, 0)} />
      <Sparkle className="anim-twinkle absolute top-[9rem] right-[3%] w-2.5" style={twinkle(6.5, 2.5)} />
      <Sparkle className="anim-twinkle absolute top-[3rem] right-[18%] w-2" style={twinkle(7, 4.5)} />
      <Sparkle className="anim-twinkle absolute top-[34%] left-[2.5%] hidden w-2.5 xl:block" style={twinkle(6, 1.5)} />
      <Sparkle className="anim-twinkle absolute top-[50%] right-[2.5%] hidden w-3 xl:block" style={twinkle(5.5, 3)} />
      <Sparkle className="anim-twinkle absolute bottom-[30%] left-[3%] hidden w-2 xl:block" style={twinkle(7.5, 5)} />
    </div>
  )
}
