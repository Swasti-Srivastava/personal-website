type PortraitFrameProps = {
  caption?: string
  className?: string
} & (
  | { src: string; alt: string }
  | { src?: undefined; alt?: undefined }
)

// An old photograph mounted on paper and taped to the page. Pass `src` and
// `alt` to show a real photo; without them a labeled placeholder is shown.
export function PortraitFrame({ src, alt, caption, className = '' }: PortraitFrameProps) {
  return (
    <figure className={`portrait-frame ${className}`}>
      <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
        <filter id="paper-deckle">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div aria-hidden="true" className="portrait-paper" />

      <div className="relative p-3.5 pb-14 sm:p-4 sm:pb-16">
        <div className="portrait-photo">
          {src ? (
            <img src={src} alt={alt} decoding="async" className="h-full w-full object-cover object-[50%_30%]" />
          ) : (
            <div className="portrait-placeholder">
              <p className="text-eyebrow uppercase">Insert picture of self here</p>
            </div>
          )}
        </div>
      </div>

      {caption && (
        <figcaption className="hand absolute inset-x-0 bottom-3 text-center text-[1.4rem] sm:bottom-4">
          {caption}
        </figcaption>
      )}

      <span aria-hidden="true" className="tape" />
    </figure>
  )
}
