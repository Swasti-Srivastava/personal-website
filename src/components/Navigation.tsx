import { SECTIONS } from '../config/sections'
import { Container } from './Container'
import { Divider } from './Divider'

// Letterhead-style header at the top of Home. Not sticky: it scrolls away
// with the page. The rule beneath it runs edge to edge.
export function Navigation() {
  return (
    <header className="pt-6 sm:pt-8">
      <Container className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3">
        <a href="#home" className="text-[0.9375rem] leading-snug tracking-(--text-eyebrow--letter-spacing) uppercase">
          Savi Srivastava
        </a>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[1.03125rem] tracking-wide sm:gap-x-8">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="link-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Divider className="mt-5" />
    </header>
  )
}
