import { useId } from 'react'
import { Blossom, Bud, FLORA_INK, FloraDefs, Leaf, type Pigment } from './Flora'

type BlossomSpec = readonly [x: number, y: number, r: number, pigment: Pigment, turn: number]
type BudSpec = readonly [x: number, y: number, angle: number, pigment: Pigment]
type LeafSpec = readonly [x: number, y: number, angle: number, size: number]

type Arrangement = {
  stems: readonly string[]
  blossoms: readonly BlossomSpec[]
  buds: readonly BudSpec[]
  leaves: readonly LeafSpec[]
}

// Two hand-composed arrangements on a 260×420 canvas, growing up from the
// bottom edge. The tall stems stay on the outer side (x < 150 on the left,
// x > 110 on the right) so they fit beside the project grid; the low branches
// spread inward only near the bottom, below the cards.
const ARRANGEMENTS = {
  left: {
    stems: [
      'M58 420C56 360 48 300 52 240C55 190 50 140 62 90C66 70 70 55 72 44',
      'M64 420C70 380 86 340 96 300C104 270 108 240 117 210',
      'M52 420C44 390 30 360 22 320C18 300 16 285 18 274',
      'M53 232C70 220 84 200 91 182',
      'M57 150C44 132 36 118 31 105',
      'M64 86C80 78 92 70 99 61',
      'M70 420C100 405 140 392 175 372C195 360 210 352 222 347',
      'M66 420C110 418 150 412 193 401',
      'M140 391C146 378 150 368 152 360',
      'M52 240C40 232 34 224 31 216',
      'M60 120C72 110 80 104 87 101',
      'M100 300C112 296 122 292 130 290',
    ],
    blossoms: [
      [72, 38, 17.4, 'rose', 8],
      [118, 202, 15.2, 'peach', 30],
      [18, 266, 13.8, 'coral', -12],
      [30, 98, 12.3, 'peach', 20],
      [228, 343, 14.5, 'rose', 40],
      [152, 353, 10.9, 'coral', 0],
      [29, 209, 10, 'rose', 10],
      [92, 98, 9.5, 'coral', 25],
      [135, 289, 10, 'rose', 0],
    ],
    buds: [
      [92, 178, 25, 'coral'],
      [100, 58, 40, 'rose'],
      [196, 400, 75, 'coral'],
    ],
    leaves: [
      [52, 300, -150, 22],
      [54, 272, -25, 21],
      [50, 205, -160, 18],
      [58, 182, -25, 17],
      [60, 124, -25, 17],
      [56, 112, -150, 15],
      [98, 296, -60, 20],
      [105, 262, -125, 17],
      [28, 345, -125, 20],
      [112, 402, -30, 20],
      [170, 375, -38, 17],
      [192, 366, -150, 15],
    ],
  },
  right: {
    stems: [
      'M205 420C208 370 214 320 208 270C204 230 210 190 203 156',
      'M212 420C222 380 236 350 240 310C242 290 238 270 243 256',
      'M200 420C192 390 176 360 168 330C162 310 160 290 157 276',
      'M208 262C222 248 232 236 236 223',
      'M205 190C192 176 184 166 181 153',
      'M198 420C168 410 128 398 92 384C72 376 58 372 46 370',
      'M120 394C112 382 108 372 108 364',
      'M202 420C170 418 130 416 88 410',
      'M209 300C222 296 232 292 239 292',
      'M206 230C194 222 186 214 181 206',
    ],
    blossoms: [
      [202, 148, 16.7, 'coral', 15],
      [244, 249, 13, 'rose', -20],
      [156, 268, 14.5, 'peach', 5],
      [39, 368, 12.3, 'peach', 35],
      [108, 356, 13.8, 'rose', -8],
      [244, 292, 9.5, 'peach', 10],
      [177, 201, 10, 'rose', -15],
    ],
    buds: [
      [237, 219, 30, 'rose'],
      [180, 149, -20, 'coral'],
      [84, 409, -80, 'coral'],
    ],
    leaves: [
      [208, 322, -30, 21],
      [210, 300, -155, 20],
      [206, 224, -150, 17],
      [204, 200, -30, 17],
      [236, 332, -40, 17],
      [170, 352, -140, 20],
      [160, 302, -150, 15],
      [150, 401, -150, 20],
      [92, 385, -120, 17],
      [70, 378, -30, 15],
    ],
  },
} as const satisfies Record<string, Arrangement>

type WatercolorBouquetProps = {
  side: keyof typeof ARRANGEMENTS
  className?: string
}

// A corner cluster of watercolor wildflowers growing up from the bottom edge.
// Decorative only.
export function WatercolorBouquet({ side, className = '' }: WatercolorBouquetProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const { stems, blossoms, buds, leaves } = ARRANGEMENTS[side]

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 260 420" className={className}>
      <defs>
        <FloraDefs id={id} />
      </defs>

      <g filter={`url(#${id}-wet)`}>
        <g fill="none" stroke={FLORA_INK} strokeWidth="2" strokeLinecap="round">
          {stems.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {leaves.map(([x, y, angle, size]) => (
          <Leaf key={`${x}-${y}`} x={x} y={y} angle={angle} size={size} />
        ))}
        {buds.map(([x, y, angle, pigment]) => (
          <Bud key={`${x}-${y}`} id={id} x={x} y={y} angle={angle} pigment={pigment} />
        ))}
        {blossoms.map(([x, y, r, pigment, turn]) => (
          <Blossom key={`${x}-${y}`} id={id} x={x} y={y} r={r} pigment={pigment} turn={turn} />
        ))}
      </g>
    </svg>
  )
}
