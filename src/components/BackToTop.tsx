import { useEffect, useRef } from 'react'

/** How long scrolling must pause before the button fades back in. */
const SETTLE_MS = 300

// A small floating "back to top" button. It only appears once the top
// navigation has scrolled out of view, and only while the page is at rest:
// it fades out during scrolling and back in ~300ms after scrolling stops.
// Visibility is set directly on the element (no React state), so scrolling
// never re-renders anything; while hidden the button is `inert`, so it can't
// be focused or clicked.
export function BackToTop() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const nav = document.querySelector('nav[aria-label="Primary"]')
    if (!button || !nav) return

    let navVisible = true
    let scrolling = false
    let timer = 0

    const render = () => {
      const show = !navVisible && !scrolling
      button.dataset.visible = String(show)
      button.inert = !show
    }

    const observer = new IntersectionObserver(([entry]) => {
      navVisible = entry.isIntersecting
      render()
    })
    observer.observe(nav)

    const onScroll = () => {
      if (!scrolling) {
        scrolling = true
        render()
      }
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        scrolling = false
        render()
      }, SETTLE_MS)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    render()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(timer)
    }
  }, [])

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
    // The button is about to hide, so hand keyboard focus to the top of the page.
    document.querySelector<HTMLElement>('nav[aria-label="Primary"]')?.closest('header')?.querySelector('a')?.focus({ preventScroll: true })
  }

  return (
    <button ref={buttonRef} type="button" className="back-to-top" data-visible="false" aria-label="Back to top" onClick={toTop}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" className="back-to-top-arrow">
        <path d="M8 13.5V3M3.5 7 8 2.5 12.5 7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span aria-hidden="true" className="back-to-top-label">
        top
      </span>
    </button>
  )
}
