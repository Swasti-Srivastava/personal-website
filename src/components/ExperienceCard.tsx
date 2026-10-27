import type { Experience } from '../data/experience'
import { ExperienceIcon } from './ExperienceIcon'

type ExperienceCardProps = {
  experience: Experience
}

// A cream stationery card: illustration, role, company, dates and place, and
// a few short points. Styling lives in `.exp-card` (styles/index.css).
export function ExperienceCard({ experience }: ExperienceCardProps) {
  const { title, company, location, dates, points, icon } = experience

  return (
    <article className="exp-card">
      <ExperienceIcon name={icon} className="size-20 shrink-0 sm:size-24" />
      <div className="min-w-0">
        <h3 className="font-display text-[clamp(1.45rem,1.25rem+0.5vw,1.75rem)] leading-tight">{title}</h3>
        <p className="mt-1 font-medium">{company}</p>
        <p className="exp-meta mt-1 text-sm">
          {dates} <span aria-hidden="true">·</span> {location}
        </p>
        <ul className="mt-4 space-y-2 text-[0.9375rem] leading-[1.6]">
          {points.map((point) => (
            <li key={point} className="exp-point">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
