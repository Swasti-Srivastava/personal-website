import { useEffect, useRef, useState } from 'react'
import { ContactDirectory } from '../components/ContactDirectory'
import { Container } from '../components/Container'
import { Divider } from '../components/Divider'
import { MidnightStreet } from '../components/MidnightStreet'
import { Rain } from '../components/Rain'
import { Reveal } from '../components/Reveal'
import { Section } from '../components/Section'
import { SectionHeading } from '../components/SectionHeading'
import { TelephoneBooth } from '../components/TelephoneBooth'

const RING_MS = 800

// Layers, back to front: the street scene, the telephone booth, the rain
// (which falls in front of the booth), then the
// heading, directory, and footer on top so they stay crisp and clickable.
// The booth rings until the visitor picks up (clicks it); answering brings up
// the directory. Closing it leaves the booth quiet, ready to be picked up again.
export function Contact() {
  const [open, setOpen] = useState(false)
  const [ringing, setRinging] = useState(false)
  // A call is coming in until the visitor first picks up.
  const [answered, setAnswered] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const boothRef = useRef<HTMLButtonElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const ringTimer = useRef(0)
  const focusAfter = useRef<'heading' | 'booth' | null>(null)

  useEffect(() => () => window.clearTimeout(ringTimer.current), [])

  // Move focus once the directory has rendered its new state.
  useEffect(() => {
    if (focusAfter.current === 'heading') headingRef.current?.focus({ preventScroll: true })
    if (focusAfter.current === 'booth') boothRef.current?.focus({ preventScroll: true })
    focusAfter.current = null
  }, [open])

  const openDirectory = () => {
    focusAfter.current = 'heading'
    setOpen(true)
    // Stacked layout: the directory sits below the booth, so bring it into view.
    if (window.matchMedia('(width < 64rem)').matches) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      requestAnimationFrame(() => noteRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }))
    }
  }

  const pickUp = () => {
    setAnswered(true)
    setRinging(true)
    window.clearTimeout(ringTimer.current)
    ringTimer.current = window.setTimeout(() => setRinging(false), RING_MS)
    openDirectory()
  }

  const close = () => {
    focusAfter.current = 'booth'
    setOpen(false)
  }

  return (
    <Section id="contact" className="pb-0">
      <MidnightStreet />
      <Rain preset="rain" rampIn className="z-[2]" />

      <Container className="contact-layout">
        <div className="contact-heading relative z-[3]">
          <SectionHeading id="contact" number="05" title="Contact" />
          <Reveal delay={120}>
            <p className="mt-8 text-lede">
              You’ve reached the end of the story…
              <br />
              but we can keep in touch.
            </p>
          </Reveal>
        </div>

        <div className="contact-booth relative z-[1]">
          <button
            ref={boothRef}
            type="button"
            className="booth-button"
            data-ringing={ringing || undefined}
            data-calling={!answered || undefined}
            aria-expanded={open}
            aria-controls="contact-directory"
            aria-label="Open contact directory"
            onClick={pickUp}
          >
            <TelephoneBooth className="block h-auto w-full" />
          </button>
        </div>

        <div ref={noteRef} className="contact-note relative z-[3] scroll-mt-8">
          <p aria-hidden={open} className="contact-prompt" data-hidden={open || undefined}>
            <svg aria-hidden="true" focusable="false" viewBox="0 0 90 50" className="prompt-arrow">
              <path d="M86 8C62 2 30 6 14 30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M8 22 13 33 24 28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Pick up the phone to connect ♡
          </p>
          <ContactDirectory
            open={open}
            onClose={close}
            headingRef={headingRef}
          />
        </div>
      </Container>

      <footer className="contact-footer relative z-[3]">
        <Container>
          <Divider className="opacity-60" />
          <div className="flex flex-col items-center gap-3 py-8 text-sm sm:flex-row sm:justify-between">
            <p>
              Made with <span aria-hidden="true">♡</span>
              <span className="sr-only">love</span> by Savi Srivastava
            </p>
            <p>© 2026 Savi Srivastava</p>
            <a href="#home" className="contact-top link-ink">
              Back to Top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </Container>
      </footer>
    </Section>
  )
}
