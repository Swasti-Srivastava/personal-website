type DividerProps = {
  className?: string
}

// A fine rule with a slight hand-drawn wobble. Stretches to any width while
// the stroke stays 1px.
export function Divider({ className = '' }: DividerProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 600 6"
      preserveAspectRatio="none"
      className={`divider block h-1.5 w-full ${className}`}
    >
      <path
        d="M1 3.4C80 2.6 150 4.2 240 3.1S420 2.4 505 3.6 575 3 599 3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
