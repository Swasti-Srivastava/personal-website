import type { ReactNode, RefObject } from 'react'
import { CONTACT } from '../config/contact'

// ---- Entry illustrations -------------------------------------------------

function Envelope() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 48" className="entry-art">
      <rect x="4" y="8" width="56" height="36" rx="2" fill="#cdbfe6" stroke="#7d68ad" strokeWidth="1" />
      <path d="M4 10 32 30 60 10" fill="#b7a3dc" stroke="#7d68ad" strokeWidth="1" strokeLinejoin="round" />
      <path d="M4 44 24 26M60 44 40 26" stroke="#7d68ad" strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx="32" cy="30" r="6.5" fill="#9b2c3a" />
      <path d="M29 30c0-2 1.4-3 3-3s3 1 3 3-1.6 3-3 4c-1.4-1-3-2-3-4Z" fill="#c2505c" />
      <path d="M48 14c3-2 6-1 7 1M50 18c2-1 4 0 5 1" stroke="#6e7b56" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="47" cy="14" r="1.6" fill="#e7a6c1" />
      <circle cx="49.5" cy="19" r="1.3" fill="#d6c4ec" />
    </svg>
  )
}

// Pressed flower on a perforated postage stamp.
function Stamp() {
  const holes = []
  for (let i = 0; i < 7; i++) {
    holes.push([10 + i * 7.3, 4], [10 + i * 7.3, 44])
    if (i < 6) holes.push([6, 9 + i * 6.4], [58, 9 + i * 6.4])
  }
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 48" className="entry-art">
      <rect x="6" y="4" width="52" height="40" fill="#f6ecd8" stroke="#b49a78" strokeWidth="0.8" />
      {holes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.7" fill="var(--color-blue-ivory)" />
      ))}
      <rect x="11" y="9" width="42" height="30" fill="#e9dcc3" stroke="#b49a78" strokeWidth="0.6" />
      <path d="M32 37c0-8 1-14 0-20" stroke="#6e7b56" strokeWidth="1.1" fill="none" />
      <path d="M32 30c-5-1-8-4-9-8 5 1 8 4 9 8ZM32 26c4-1 7-4 8-8-5 1-7 4-8 8Z" fill="#7f8c63" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="32" cy="13.5" rx="2.6" ry="3.6" transform={`rotate(${a} 32 17)`} fill="#c9a3dc" />
      ))}
      <circle cx="32" cy="17" r="1.6" fill="#f7e2a8" />
    </svg>
  )
}

function Postcard() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 64 48" className="entry-art">
      <rect x="4" y="6" width="56" height="38" rx="2" fill="#1f2c48" stroke="#c9a46a" strokeWidth="1" />
      <rect x="7.5" y="9.5" width="49" height="31" rx="1" fill="none" stroke="#c9a46a" strokeOpacity="0.5" strokeWidth="0.6" />
      <path d="M26 15a9 9 0 1 0 8 13 7 7 0 1 1-8-13Z" fill="#f7ecd2" />
      {[[42, 15, 1.2], [48, 24, 0.9], [14, 18, 1], [18, 33, 0.8], [44, 34, 1.1], [52, 14, 0.7]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#f7ecd2" />
      ))}
      <path d="M38 22l1 2.4 2.4 1-2.4 1-1 2.4-1-2.4-2.4-1 2.4-1Z" fill="#f2d39a" />
    </svg>
  )
}

function Arrow() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 12" className="entry-arrow">
      <path d="M1 6h20M16 1.5 21 6l-5 4.5" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type EntryProps = {
  number: string
  title: string
  subtitle: string
  href: string
  art: ReactNode
  external?: boolean
}

function Entry({ number, title, subtitle, href, art, external }: EntryProps) {
  return (
    <li>
      <a
        href={href}
        className="directory-entry"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="entry-number">{number}</span>
        {art}
        <span className="min-w-0 flex-1">
          <span className="entry-title">{title}</span>
          <span className="entry-subtitle">
            {subtitle}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </span>
        </span>
        <Arrow />
      </a>
    </li>
  )
}

// ---- Directory -----------------------------------------------------------

type ContactDirectoryProps = {
  open: boolean
  onClose: () => void
  /** Receives focus when the directory opens. */
  headingRef: RefObject<HTMLHeadingElement | null>
}

// An antique telephone directory that rises into view once the visitor picks
// up the phone, listing three ways to get in touch. Plain links only; nothing
// is sent anywhere.
export function ContactDirectory({ open, onClose, headingRef }: ContactDirectoryProps) {
  if (!open) return null

  return (
    <div id="contact-directory" className="directory-page">
      <div aria-hidden="true" className="directory-sheet" />
      {/* Paperclip, stamps, and lavender: decoration only. */}
      <svg aria-hidden="true" focusable="false" viewBox="0 0 20 52" className="directory-clip">
        <path d="M6 44V10a4 4 0 0 1 8 0v32a6 6 0 0 1-12 0V14" fill="none" stroke="#9aa0ad" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span aria-hidden="true" className="directory-stamps">
        <Stamp />
      </span>

      <div className="relative">
        <button type="button" className="directory-close" onClick={onClose} aria-label="Close contact directory">
          <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16">
            <path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <h3 ref={headingRef} tabIndex={-1} className="directory-heading">
          Who would you like to reach?
        </h3>
        <div aria-hidden="true" className="directory-divider">
          <span />
          <svg viewBox="0 0 24 10" className="w-6">
            <path d="M12 1 15 5 12 9 9 5Z M2 5h6M16 5h6" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span />
        </div>

        <ul className="directory-entries">
          <Entry
            number="01"
            title="Write me a letter"
            subtitle={CONTACT.email}
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent('Hello Savi!')}`}
            art={<Envelope />}
          />
          <Entry
            number="02"
            title="Let’s connect"
            subtitle="Find me on LinkedIn!"
            href={CONTACT.linkedin}
            art={<Stamp />}
            external
          />
          <Entry
            number="03"
            title="Explore my code"
            subtitle="Check out my GitHub!"
            href={CONTACT.github}
            art={<Postcard />}
            external
          />
        </ul>

        <p className="directory-signoff">
          With love,
          <br />
          Savi <span aria-hidden="true">♡</span>
        </p>
      </div>
    </div>
  )
}
