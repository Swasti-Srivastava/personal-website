import { useEffect, useRef, type CSSProperties } from 'react'
import type { SkillCategory } from '../data/skills'
import { Blossom, FLORA_INK, FloraDefs, Leaf } from './Flora'
import { Reveal } from './Reveal'

// Small hand-painted illustrations for the category labels.
function Emblem({ kind }: { kind: SkillCategory['emblem'] }) {
  const id = `emblem-${kind}`
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 64" className="skill-emblem">
      <defs>
        <FloraDefs id={id} />
        <radialGradient id={`${id}-brass`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f6e2b0" />
          <stop offset="100%" stopColor="#b98a4e" />
        </radialGradient>
      </defs>
      <g filter={`url(#${id}-wet)`}>
        {kind === 'sprig' && (
          <>
            <path d="M10 54C22 44 32 34 44 16" fill="none" stroke={FLORA_INK} strokeWidth="1.6" strokeLinecap="round" />
            <path d="M26 40c6-2 10-6 12-11" fill="none" stroke={FLORA_INK} strokeWidth="1.2" strokeLinecap="round" />
            <Leaf x={18} y={47} angle={-150} size={14} />
            <Leaf x={33} y={30} angle={-30} size={12} />
            <Blossom id={id} x={45} y={15} r={9} pigment="rose" turn={10} />
            <Blossom id={id} x={39} y={28} r={6.5} pigment="peach" turn={30} />
            <Blossom id={id} x={22} y={42} r={6} pigment="coral" turn={0} />
          </>
        )}
        {kind === 'book' && (
          <>
            <path d="M32 20C26 14 16 13 6 15v30c10-2 20-1 26 5Z" fill="#fbf2e2" stroke={FLORA_INK} strokeWidth="1" />
            <path d="M32 20c6-6 16-7 26-5v30c-10-2-20-1-26 5Z" fill="#fbf2e2" stroke={FLORA_INK} strokeWidth="1" />
            <path d="M6 45c10-2 20-1 26 5 6-6 16-7 26-5v3c-10-2-20-1-26 5-6-6-16-7-26-5Z" fill="#7a3f4a" />
            <path d="M11 22c5-1 10-.6 15 1.4M11 27c5-1 10-.6 15 1.4M11 32c5-1 10-.6 15 1.4M37 23.4c5-2 10-2.4 15-1.4M37 28.4c5-2 10-2.4 15-1.4M37 33.4c5-2 10-2.4 15-1.4" stroke={FLORA_INK} strokeOpacity="0.4" strokeWidth="0.8" fill="none" />
            <Blossom id={id} x={52} y={16} r={5} pigment="rose" turn={0} />
          </>
        )}
        {kind === 'compass' && (
          <>
            <circle cx="32" cy="32" r="25" fill={`url(#${id}-brass)`} stroke="#6e4f2c" strokeWidth="1.4" />
            <circle cx="32" cy="32" r="19" fill="#fbf2e2" stroke="#6e4f2c" strokeWidth="1" />
            <path d="M32 15v4M32 45v4M15 32h4M45 32h4" stroke="#6e4f2c" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M32 18 36 32 32 46 28 32Z" fill="#7a3f4a" stroke="#6e4f2c" strokeWidth="0.6" />
            <path d="M32 18 36 32H28Z" fill="#b5524f" />
            <circle cx="32" cy="32" r="2" fill="#6e4f2c" />
            <path d="M32 7v-3" stroke="#6e4f2c" strokeWidth="2.4" strokeLinecap="round" />
          </>
        )}
      </g>
    </svg>
  )
}

// A delicate corner flourish for the panel frame.
function Flourish({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 40 40" className={`skill-flourish ${className}`}>
      <path d="M2 38V14C2 7 7 2 14 2h24" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M8 30c0-10 4-18 14-22M8 22c3-1 6 0 7 3s-1 6-4 5" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="22" cy="8" r="1.4" fill="currentColor" />
    </svg>
  )
}

type SkillPanelProps = {
  category: SkillCategory
  index: number
}

// One category: a parchment label with its illustration, then every
// technology as a logo tile with its name underneath.
export function SkillPanel({ category, index }: SkillPanelProps) {
  const headingId = `skills-${category.emblem}`
  const gridRef = useRef<HTMLUListElement>(null)

  // Balance the rows: work out how many tiles fit across, how many rows that
  // takes, then cap each row at an even share (so 10 becomes 5 + 5 rather
  // than 9 + 1). The cap is a CSS max-width; flex-wrap does the rest.
  useEffect(() => {
    const grid = gridRef.current
    const frame = grid?.parentElement
    if (!grid || !frame) return
    const total = category.skills.length

    const balance = () => {
      const style = getComputedStyle(frame)
      const available = frame.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      const item = grid.firstElementChild?.getBoundingClientRect().width ?? 1
      const gap = parseFloat(getComputedStyle(grid).columnGap) || 0
      const fit = Math.max(1, Math.min(category.columns, Math.floor((available + gap) / (item + gap))))
      const rows = Math.ceil(total / fit)
      grid.style.setProperty('--cols', String(Math.ceil(total / rows)))
    }

    const observer = new ResizeObserver(balance)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [category])

  return (
    <Reveal delay={index * 120}>
      <section aria-labelledby={headingId} className="skill-panel">
        <Flourish className="top-2 left-2" />
        <Flourish className="top-2 right-2 -scale-x-100" />
        <Flourish className="bottom-2 left-2 -scale-y-100" />
        <Flourish className="right-2 bottom-2 -scale-100" />

        <div className="skill-label">
          <Emblem kind={category.emblem} />
          <h3 id={headingId} className="font-display text-[clamp(1.35rem,1.15rem+0.6vw,1.7rem)] leading-none">
            {category.title}
          </h3>
          <span className="skill-label-number">0{index + 1}</span>
        </div>

        <ul ref={gridRef} className="skill-grid" style={{ '--cols': category.columns } as CSSProperties}>
          {category.skills.map((skill, i) => (
            <li key={skill.name} className="skill" data-ai={skill.ai || undefined} style={{ '--i': i } as CSSProperties}>
              <span className="skill-tile">
                <img src={skill.logo} alt="" loading="lazy" decoding="async" className="skill-logo" />
              </span>
              <span className="skill-name">{skill.name}</span>
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  )
}
