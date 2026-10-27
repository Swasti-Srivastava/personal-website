import type { CSSProperties, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

// Gently fades and lifts its children in the first time they scroll into view.
export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
