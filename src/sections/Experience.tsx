import { Container } from '../components/Container'
import { DuskLandscape } from '../components/DuskLandscape'
import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { FlyingBirds } from '../components/FlyingBirds'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'

export function Experience() {
  return (
    <Section id="experience">
      <DuskLandscape />
      <FlyingBirds />

      <Container>
        <SectionHeading id="experience" number="03" title="Experience" />
        <Reveal delay={120}>
          <p className="mt-8 text-lede">A journey of learning, building, and growing.</p>
        </Reveal>

        <div className="mt-14 lg:mt-20">
          <ExperienceTimeline />
        </div>
      </Container>
    </Section>
  )
}
