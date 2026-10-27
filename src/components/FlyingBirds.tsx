import { useId, type CSSProperties } from 'react'

type Bird = {
  /** Vertical position within the section, as a percentage. */
  top: number
  /** Rendered width in px; smaller birds read as farther away. */
  size: number
  /** Seconds to cross the screen once. */
  speed: number
  /** How far through its crossing the bird is on page load (0–1). */
  phase: number
  /** Seconds per wingbeat cycle (flaps, then a glide). */
  flap: number
  /** Rise and fall of the flight path, in px. */
  bob: number
  /** Seconds per rise-and-fall. */
  bobSpeed: number
  direction: 'right' | 'left'
  /** Where it rests when motion is reduced, as a percentage of the width. */
  rest: number
  /** Only shown on wider screens. */
  wide?: boolean
}

// Six birds at different depths, speeds and heights. Far birds are small,
// pale, and slow; two nearer birds are larger. No two share timings, so they
// never fall into step.
const BIRDS: readonly Bird[] = [
  { top: 3, size: 90, speed: 42, phase: 0.15, flap: 3.1, bob: 40, bobSpeed: 9, direction: 'left', rest: 70 },
  { top: 65, size: 100, speed: 60, phase: 0.55, flap: 2.4, bob: 24, bobSpeed: 7, direction: 'left', rest: 52, wide: true },
  { top: 24, size: 200, speed: 52, phase: 0.8, flap: 2.8, bob: 30, bobSpeed: 8, direction: 'right', rest: 88 },
  { top: 87, size: 100, speed: 68, phase: 0.35, flap: 2.2, bob: 20, bobSpeed: 6.5, direction: 'left', rest: 4, wide: true },
  { top: 57, size: 130, speed: 46, phase: 0.62, flap: 3.4, bob: 36, bobSpeed: 10, direction: 'right', rest: 86, wide: true },
  { top: 72, size: 30, speed: 64, phase: 0.05, flap: 2.6, bob: 26, bobSpeed: 7.5, direction: 'left', rest: 6 },
  { top: 15, size: 100, speed: 64, phase: 0.05, flap: 2.6, bob: 26, bobSpeed: 7.5, direction: 'right', rest: 6 },
  { top: 90, size: 30, speed: 64, phase: 0.05, flap: 2.6, bob: 26, bobSpeed: 7.5, direction: 'left', rest: 6 },
  { top: 38, size: 210, speed: 64, phase: 0.05, flap: 2.6, bob: 26, bobSpeed: 7.5, direction: 'right', rest: 6 },
  { top: 30, size: 120, speed: 64, phase: 0.05, flap: 2.6, bob: 26, bobSpeed: 7.5, direction: 'left', rest: 6 },
  { top: 80, size: 159, speed: 64, phase: 0.05, flap: 2.6, bob: 26, bobSpeed: 7.5, direction: 'right', rest: 6 },
]

// A small gull in watercolor washes, facing right: cream body, peach and
// pale-gold wings with a fine warm outline. The wings are separate groups so
// CSS can beat them; the far wing trails the near one slightly.
function BirdArt() {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const outline = { stroke: '#8a6a5c', strokeOpacity: 0.55, strokeWidth: 0.8, strokeLinejoin: 'round' } as const

  return (
    <svg viewBox="0 0 100 64" className="block h-auto w-full overflow-visible">
      <defs>
        <linearGradient id={`${id}-wing`} x1="0" y1="1" x2="0.3" y2="0">
          <stop offset="0%" stopColor="#fff6ea" />
          <stop offset="60%" stopColor="#f6d6b8" />
          <stop offset="100%" stopColor="#e3b98d" />
        </linearGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffaf1" />
          <stop offset="100%" stopColor="#efd9c2" />
        </linearGradient>
      </defs>
      <g className="bird-wing bird-wing-far">
        <path d="M54 34C50 22 42 12 30 6c5 10 9 19 15 28Z" fill="#e8c7a6" {...outline} />
      </g>
      <path d="M30 36 12 31l5 6-4 6 18-3Z" fill={`url(#${id}-wing)`} {...outline} />
      <path d="M26 37c10-6 30-8 44-6 5 .7 9-.5 12-2.5 3-2 7-1 7 1.5 0 2-2 3-4 3.5l-5 1.5C65 43 42 45 26 41Z" fill={`url(#${id}-body)`} {...outline} />
      <path d="M89 31.5l8 2-8 1.5Z" fill="#e7a978" {...outline} />
      <circle cx="84" cy="31" r="1" fill="#5b4a48" />
      <g className="bird-wing bird-wing-near">
        <path d="M58 35C54 20 44 8 26 2c7 12 12 23 20 34Z" fill={`url(#${id}-wing)`} {...outline} />
        <path d="M40 18c3 5 6 10 9 15" fill="none" stroke="#c99a74" strokeOpacity="0.5" strokeWidth="0.8" />
      </g>
    </svg>
  )
}

// Birds crossing the evening sky, flying over the experience cards. Decorative,
// click-through, and hidden from assistive tech. Each bird has three layers
// of motion: a slow horizontal crossing, a gentle rise and fall that makes the
// path curve, and wingbeats in bursts with glides between.
export function FlyingBirds() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {BIRDS.map((bird, index) => (
        <div
          key={index}
          className={`bird ${bird.wide ? 'hidden md:block' : ''}`}
          data-direction={bird.direction}
          style={
            {
              top: `${bird.top}%`,
              width: `${bird.size}px`,
              '--bird-speed': `${bird.speed}s`,
              '--bird-delay': `${-bird.phase * bird.speed}s`,
              '--bird-rest': `${bird.rest}vw`,
              '--bird-bob': `${bird.bob}px`,
              '--bird-bob-speed': `${bird.bobSpeed}s`,
              '--bird-flap': `${bird.flap}s`,
              opacity: bird.size < 70 ? 0.8 : 0.95,
            } as CSSProperties
          }
        >
          <div className="bird-bob">
            <div className="bird-body">
              <BirdArt />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
