import { Container } from '../components/Container'
import { MoonlitTerrace } from '../components/MoonlitTerrace'
import { Rain } from '../components/Rain'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { SkillPanel } from '../components/SkillPanel'
import { SKILL_CATEGORIES } from '../data/skills'

export function Skills() {
  return (
    <Section id="skills">
      <MoonlitTerrace />
      {/* The first rain of the night: a drizzle over the scenery, beneath the
          skill panels. */}
      <Rain className="-z-10" />

      <Container className="pb-[clamp(3rem,6vw,5rem)]">
        <SectionHeading id="skills" number="04" title="Skills" />
        <Reveal delay={120}>
          <p className="mt-8 text-lede">Tools I use to bring ideas to life.</p>
        </Reveal>

        <div className="mt-16 space-y-[clamp(3.5rem,6vw,5rem)] lg:mt-20">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillPanel key={category.title} category={category} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
