import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

// Shared content width and side margins.
export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto w-full max-w-page px-gutter ${className}`}>{children}</div>
}
