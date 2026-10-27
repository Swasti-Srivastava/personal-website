import { Container } from '../components/Container'
import { ProjectCard } from '../components/ProjectCard'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { SunsetSky } from '../components/SunsetSky'
import { PROJECTS } from '../data/projects'

// Desktop: three cards on the first row, then two wider cards per row. Tablet:
// two columns, with the final card spanning both. Mobile: a single column.
const span = (index: number) =>
  index < 3 ? 'lg:col-span-2' : `lg:col-span-3 ${index === PROJECTS.length - 1 ? 'md:col-span-2' : ''}`

export function Projects() {
  return (
    <Section id="projects">
      <SunsetSky />

      <Container>
        <SectionHeading id="projects" number="02" title="Projects" />
        <Reveal delay={120}>
          <p className="mt-8 text-lede">Click a project to explore its code.</p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-6 lg:gap-7">
          {PROJECTS.map((project, index) => (
            <li key={project.name} className={span(index)}>
              <Reveal delay={(index % 3) * 90} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
