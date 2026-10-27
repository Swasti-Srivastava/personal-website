import { useId, useMemo } from 'react'
import { Blossom, Bud, FLORA_INK, FloraDefs, Leaf, type Pigment } from './Flora'

type Point = readonly [x: number, y: number]

type Plant = {
  stems: { d: string; width: number }[]
  leaves: { x: number; y: number; angle: number; size: number }[]
  buds: { x: number; y: number; angle: number; pigment: Pigment }[]
  blossoms: { x: number; y: number; r: number; pigment: Pigment; turn: number }[]
}

const PIGMENT_CHOICES: readonly Pigment[] = ['peach', 'rose', 'coral', 'rose', 'peach']

// Small deterministic PRNG so each spray grows the same way on every render.
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Smooth path through points: quadratic curves via segment midpoints.
function smoothPath(points: Point[]) {
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i]
    const mx = (x + points[i + 1][0]) / 2
    const my = (y + points[i + 1][1]) / 2
    d += `Q${x.toFixed(1)} ${y.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`
  }
  const [lx, ly] = points[points.length - 1]
  return `${d}L${lx.toFixed(1)} ${ly.toFixed(1)}`
}

// Grows a branching wildflower spray: a main stem that wanders slightly,
// twigs off alternating sides, leaves along the way, and a blossom or bud at
// every tip. Angles are in degrees, counterclockwise from +x (y up).
function growPlant(seed: number, angle: number, length: number): Plant {
  const rng = mulberry32(seed)
  const plant: Plant = { stems: [], leaves: [], buds: [], blossoms: [] }
  const pick = () => PIGMENT_CHOICES[Math.floor(rng() * PIGMENT_CHOICES.length)]

  const grow = (x: number, y: number, heading: number, len: number, depth: number) => {
    const segments = [9, 6, 4][depth]
    const step = len / segments
    const points: Point[] = [[x, y]]
    const headings = [heading]
    for (let i = 0; i < segments; i++) {
      heading += (rng() - 0.5) * (depth === 0 ? 9 : 14)
      x += Math.cos((heading * Math.PI) / 180) * step
      y -= Math.sin((heading * Math.PI) / 180) * step
      points.push([x, y])
      headings.push(heading)
    }
    plant.stems.push({ d: smoothPath(points), width: [2.1, 1.5, 1.1][depth] })

    if (depth < 2) {
      for (let i = 2; i < segments; i++) {
        if (rng() > (depth === 0 ? 0.72 : 0.5)) continue
        const side = i % 2 ? 1 : -1
        const childLength = len * (depth === 0 ? 0.32 + rng() * 0.24 : 0.45 + rng() * 0.2)
        grow(points[i][0], points[i][1], headings[i] + side * (28 + rng() * 30), childLength, depth + 1)
      }
    }

    for (let i = 1; i < segments; i++) {
      if (rng() > 0.68) continue
      const side = rng() < 0.5 ? -1 : 1
      plant.leaves.push({
        x: points[i][0],
        y: points[i][1],
        angle: -(headings[i] + side * (40 + rng() * 25)),
        size: (depth === 0 ? 18 : 14) + rng() * 8,
      })
    }

    const [tx, ty] = points[points.length - 1]
    const tipHeading = headings[headings.length - 1]
    if (depth === 0 || rng() < 0.72) {
      const r = depth === 0 ? 18 + rng() * 7 : depth === 1 ? 12 + rng() * 6 : 8 + rng() * 5
      plant.blossoms.push({ x: tx, y: ty, r, pigment: pick(), turn: rng() * 72 })
    } else {
      plant.buds.push({ x: tx, y: ty, angle: 90 - tipHeading, pigment: pick() })
    }
    if (rng() < 0.35) {
      const off = (rng() < 0.5 ? -1 : 1) * 60
      const bx = tx + Math.cos(((tipHeading + off) * Math.PI) / 180) * 9
      const by = ty - Math.sin(((tipHeading + off) * Math.PI) / 180) * 9
      plant.buds.push({ x: bx, y: by, angle: 90 - (tipHeading + off), pigment: pick() })
    }
  }

  grow(10, 292, angle, length, 0)
  // Larger blossoms paint last so they sit on top of the small ones.
  plant.blossoms.sort((a, b) => a.r - b.r)
  return plant
}

type FloralSprayProps = {
  seed: number
  /** Direction the main stem grows, in degrees from horizontal. */
  angle?: number
  length?: number
  className?: string
}

// A watercolor wildflower spray growing from the lower-left of its box (flip
// it with a negative x-scale for the right edge). Decorative only.
export function FloralSpray({ seed, angle = 62, length = 240, className = '' }: FloralSprayProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const plant = useMemo(() => growPlant(seed, angle, length), [seed, angle, length])

  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 300 300" overflow="visible" className={className}>
      <defs>
        <FloraDefs id={id} />
      </defs>
      <g filter={`url(#${id}-wet)`}>
        <g fill="none" stroke={FLORA_INK} strokeLinecap="round">
          {plant.stems.map(({ d, width }) => (
            <path key={d} d={d} strokeWidth={width} />
          ))}
        </g>
        {plant.leaves.map((leaf, i) => (
          <Leaf key={`l${i}`} {...leaf} />
        ))}
        {plant.buds.map((bud, i) => (
          <Bud key={`b${i}`} id={id} {...bud} size={8} />
        ))}
        {plant.blossoms.map((blossom, i) => (
          <Blossom key={`f${i}`} id={id} {...blossom} />
        ))}
      </g>
    </svg>
  )
}
