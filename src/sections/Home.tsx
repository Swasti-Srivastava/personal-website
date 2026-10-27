import type { CSSProperties } from 'react'
import {
  BerrySprig,
  Butterfly,
  LeafSprig,
  Pencil,
  Petal,
  Sparkle,
  Wildflower,
} from '../components/Botanicals'
import { Container } from '../components/Container'
import { Divider } from '../components/Divider'
import { HandNote } from '../components/HandNote'
import { Navigation } from '../components/Navigation'
import { PortraitFrame } from '../components/PortraitFrame'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { WatercolorCloud } from '../components/WatercolorCloud'

// Per-element timing for the looping decorations, so nothing moves in unison.
const timing = (name: string, duration: number, delay: number) =>
  ({ [`--${name}-duration`]: `${duration}s`, [`--${name}-delay`]: `${-delay}s` }) as CSSProperties

const degree = 'font-display text-[clamp(1.0625rem,0.95rem+0.3vw,1.25rem)] leading-snug'

export function Home() {
  return (
    <Section id="home" className="flex min-h-svh flex-col pt-0">
      {/* Soft morning light in the upper corner. */}
      <div
        aria-hidden="true"
        className="watercolor pointer-events-none absolute -top-[18%] -right-[12%] -z-10 h-[75vh] w-[60vw]"
      />

      {/* White watercolor clouds, behind everything. On narrow screens they
          move into empty space beside the portrait and below the text; the
          middle one only appears when the columns sit side by side. */}
      <WatercolorCloud
        shape="large"
        seed={4}
        duration={30}
        travel={60}
        delay={8}
        className="absolute top-[47%] -right-[30%] -z-10 w-[min(44rem,75vw)] lg:top-[7%] lg:-right-[8%] lg:w-[min(44rem,46vw)]"
      />
      <WatercolorCloud
        shape="medium"
        seed={11}
        duration={22}
        travel={40}
        delay={3}
        className="absolute top-[20%] left-[39%] -z-10 hidden w-[min(17rem,19vw)] lg:block"
      />
      <WatercolorCloud
        shape="small"
        seed={19}
        duration={26}
        travel={35}
        delay={14}
        className="absolute bottom-[1%] -left-[6%] -z-10 w-[min(23rem,42vw)] lg:bottom-[9%] lg:-left-[4%]"
      />

      <Navigation />

      <Container className="flex flex-1 items-center">
        <div className="grid w-full items-start gap-x-12 gap-y-16 py-14 lg:grid-cols-12 lg:py-20">
          {/* Left: professional introduction. */}
          <Reveal className="lg:col-span-6 lg:pt-12">
            <h1 id="home-heading" className="relative text-display">
              <span className="block">Savi</span>
              <span className="block italic">Srivastava</span>
              <Sparkle
                className="anim-twinkle absolute top-[0.05em] left-[2.05em] w-[0.11em]"
                style={timing('twinkle', 6, 3)}
              />
              <Sparkle
                className="anim-twinkle absolute top-[0.97em] left-[3.8em] w-[0.08em]"
                style={timing('twinkle', 7.5, 5.5)}
              />
            </h1>

            <Divider className="mt-10 max-w-[30rem]" />
            <dl className="mt-6 grid max-w-[30rem] grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2">
              <dt className="text-eyebrow uppercase">Major</dt>
              <dd className={degree}>Applied Mathematics, B.S.</dd>
              <dt className="text-eyebrow uppercase">Minor</dt>
              <dd className={degree}>Computer Science</dd>
            </dl>
            <p className="mt-6 text-eyebrow uppercase">
              University of California,{' '}
              <span className="whitespace-nowrap">Santa Cruz ·</span>{' '}
              <span className="whitespace-nowrap">Class of 2028</span>
            </p>

            <p className="mt-10 max-w-[29rem] font-display text-[clamp(1.3rem,1.1rem+0.6vw,1.5rem)] leading-[1.45]">
              I’m a third-year student at UC Santa Cruz with a passion for technology and AI. I love
              exploring different areas of tech, working on new projects, and learning new things
              along the way. I’m always excited to take on new challenges, collaborate with others,
              and keep building my skills.
            </p>
          </Reveal>

          {/* Right: portrait and personality. */}
          <div className="relative lg:col-span-6">
            <Petal
              className="anim-petal absolute top-[32%] -left-2 hidden w-4 -rotate-12 lg:block"
              style={timing('petal', 11, 4)}
            />

            <Reveal delay={250}>
              <div className="relative isolate mx-auto w-full max-w-[32rem] px-10 pt-10 pb-12 sm:px-16">
                {/* Watercolor washes behind the photo: peach below, cream above. */}
                <div
                  aria-hidden="true"
                  className="watercolor anim-drift absolute inset-x-2 top-[22%] bottom-0 -z-10"
                />
                <div
                  aria-hidden="true"
                  className="watercolor absolute inset-x-8 top-0 bottom-[35%] -z-10"
                  style={{ '--wash': 'var(--color-morning-sky-deep)' } as CSSProperties}
                />

                <Wildflower className="anim-sway absolute bottom-6 left-0 h-[58%] -rotate-3" />
                <LeafSprig className="anim-sway-soft absolute top-1 right-0 w-28 rotate-6" />
                <BerrySprig className="absolute right-2 bottom-3 w-16 -rotate-6" />
                <Sparkle className="anim-twinkle absolute top-6 left-6 w-3" style={timing('twinkle', 5, 0)} />
                <Sparkle className="anim-twinkle absolute top-14 left-1 w-2" style={timing('twinkle', 6.5, 2.5)} />
                <Sparkle className="anim-twinkle absolute right-1 bottom-28 w-3" style={timing('twinkle', 4.5, 1.2)} />

                <PortraitFrame
                  src="/images/savi-portrait.jpg"
                  alt="Savi smiling in a red gingham top, standing in an open iron gateway framed by white climbing flowers"
                  caption="Swasti “Savi” Srivastava"
                />

                <Petal className="anim-petal absolute top-[20%] left-4 w-4 -rotate-12" style={timing('petal', 12, 0)} />
                <Petal className="anim-petal absolute top-[42%] right-3 w-3.5 rotate-45" style={timing('petal', 15, 6)} />
                <Petal className="anim-petal absolute top-1 left-[30%] w-3.5 rotate-12" style={timing('petal', 9.5, 2)} />
                <Butterfly className="absolute top-[27%] left-0 w-9" />
              </div>
            </Reveal>

            {/* Personal interests, like a journal entry beside the photo. */}
            <Reveal delay={400}>
              <div className="relative mx-auto mt-4 max-w-[28rem]">
                <div
                  aria-hidden="true"
                  className="watercolor absolute -top-3 -left-6 -z-10 h-16 w-48"
                />
                <div className="flex items-end gap-4">
                  <HandNote className="shrink-0">off the clock</HandNote>
                  <Divider className="mb-2.5 flex-1" />
                  <Pencil className="mb-1 w-14 shrink-0 -rotate-12" />
                </div>
                <p className="mt-4 leading-[1.8] sm:pl-8">
                  When I’m not studying or working on something, you’ll probably find me listening
                  to indie music, drawing, or planning my next trip. I love exploring new places,
                  trying new things, and picking up random interests along the way.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
