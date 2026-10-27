import type { ReactNode } from 'react'

type HandNoteProps = {
  children: ReactNode
  className?: string
}

// A short handwritten aside in Caveat. Keep to a few words, a few times per page.
export function HandNote({ children, className = '' }: HandNoteProps) {
  return <p className={`hand ${className}`}>{children}</p>
}
