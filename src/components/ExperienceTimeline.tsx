import { useEffect, useRef } from 'react'
import { EXPERIENCE } from '../data/experience'
import { ExperienceCard } from './ExperienceCard'
import { Reveal } from './Reveal'

// Builds a gently winding path through each marker's center: it starts a
// little above the first marker, passes through every marker in order, and alternates the
// direction of each bend so the line sways from side to side.
function windingPath(points: { x: number; y: number }[], height: number, sway: number) {
  if (!points.length) return ''
  const first = points[0]
  const all = [{ x: first.x, y: Math.max(0, first.y - 70) }, ...points, { x: points[points.length - 1].x, y: height }]
  let d = `M${all[0].x} ${all[0].y}`
  for (let i = 1; i < all.length; i++) {
    const a = all[i - 1]
    const b = all[i]
    // The lead-in above the first marker runs straight.
    const bend = i === 1 ? 0 : (i % 2 ? 1 : -1) * sway
    const third = (b.y - a.y) / 3
    d += `C${a.x + bend} ${a.y + third} ${b.x + bend} ${b.y - third} ${b.x} ${b.y}`
  }
  return d
}

// The alternating experience timeline. A thin amber line draws itself down
// the page as you scroll, and each marker lights up as the line reaches it.
// Under reduced motion the line is simply drawn in full.
export function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const list = listRef.current
    const svg = svgRef.current
    const path = pathRef.current
    if (!list || !svg || !path) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let markerYs: number[] = []
    let frame = 0

    const layout = () => {
      const box = list.getBoundingClientRect()
      const markers = [...list.querySelectorAll<HTMLElement>('.timeline-marker')]
      const points = markers.map((marker) => {
        const r = marker.getBoundingClientRect()
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top }
      })
      markerYs = points.map((p) => p.y)
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`)
      path.setAttribute('d', windingPath(points, box.height, box.width >= 900 ? 22 : 9))
      update()
    }

    const update = () => {
      frame = 0
      const box = list.getBoundingClientRect()
      const progress = reduced.matches
        ? 1
        : Math.min(1, Math.max(0, (window.innerHeight * 0.7 - box.top) / box.height))
      path.style.strokeDashoffset = String(1 - progress)
      const reach = progress * box.height
      list.querySelectorAll<HTMLElement>('.timeline-marker').forEach((marker, i) => {
        marker.dataset.lit = String(reach >= markerYs[i] - 4)
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const resize = new ResizeObserver(layout)
    resize.observe(list)
    window.addEventListener('scroll', onScroll, { passive: true })
    reduced.addEventListener('change', update)
    document.fonts?.ready.then(layout)
    layout()

    return () => {
      resize.disconnect()
      window.removeEventListener('scroll', onScroll)
      reduced.removeEventListener('change', update)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="relative">
      <svg ref={svgRef} aria-hidden="true" className="timeline-line pointer-events-none absolute inset-0 size-full overflow-visible">
        <path ref={pathRef} pathLength={1} />
      </svg>

      <ol ref={listRef} className="timeline">
        {EXPERIENCE.map((experience, index) => {
          const side = index % 2 ? 'right' : 'left'
          return (
            <li key={experience.company} className="timeline-item" data-side={side}>
              <span aria-hidden="true" className="timeline-connector" />
              <span aria-hidden="true" className="timeline-marker" data-lit="false" />
              <Reveal className={`reveal-from-${side}`}>
                <ExperienceCard experience={experience} />
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
