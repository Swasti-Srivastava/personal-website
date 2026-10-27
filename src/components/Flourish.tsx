type FlourishProps = {
  className?: string
}

// A small centered ornament, like a printer's mark between passages.
export function Flourish({ className = '' }: FlourishProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 16"
      className={`block h-4 w-28 text-(--accent) ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path d="M4 8.4C22 7.6 34 8.6 46 8c3.5-.2 5.4-2.6 4-4.2-1.3-1.4-3.6.2-2.6 2" />
        <path d="M116 7.6C98 8.4 86 7.4 74 8c-3.5.2-5.4 2.6-4 4.2 1.3 1.4 3.6-.2 2.6-2" />
      </g>
      <path d="M60 4.2 63.6 8 60 11.8 56.4 8Z" fill="currentColor" />
    </svg>
  )
}
