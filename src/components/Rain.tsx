import { useEffect, useRef } from 'react'

type Drop = {
  x: number
  y: number
  length: number
  speed: number
  layer: number
}

type Layer = { alpha: number; width: number; speed: readonly [number, number]; length: readonly [number, number] }

// Three depth layers per preset: far drops are fainter, thinner, and slower.
const PRESETS = {
  // Skills: the first rain of the night. Short, sparse, slow.
  drizzle: {
    area: 20000,
    slant: 0.13,
    layers: [
      { alpha: 0.12, width: 0.7, speed: [210, 270], length: [5, 8] },
      { alpha: 0.18, width: 0.85, speed: [260, 330], length: [7, 10] },
      { alpha: 0.26, width: 1, speed: [320, 400], length: [9, 13] },
    ],
  },
  // Contact: steady rainfall. More drops, longer and faster, still calm.
  rain: {
    area: 5000,
    slant: 0.16,
    layers: [
      { alpha: 0.2, width: 0.85, speed: [560, 680], length: [14, 20] },
      { alpha: 0.3, width: 1.05, speed: [680, 820], length: [18, 26] },
      { alpha: 0.42, width: 1.3, speed: [820, 960], length: [24, 34] },
    ],
  },
} as const satisfies Record<string, { area: number; slant: number; layers: readonly Layer[] }>

type RainProps = {
  preset?: keyof typeof PRESETS
  /** Drops per screenful relative to the preset's default (1). */
  density?: number
  /** Start lighter at the section's top edge and build as it scrolls in. */
  rampIn?: boolean
  className?: string
}

// Rain drawn on a canvas the size of the viewport. It sticks to the screen
// while its section scrolls past, pauses when the section is out of view or
// the tab is hidden, and draws a single still frame under reduced motion.
// Decorative only: it never takes pointer events.
export function Rain({ preset = 'drizzle', density = 1, rampIn = false, className = '' }: RainProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!wrapper || !canvas || !context) return

    const { area, slant, layers } = PRESETS[preset]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const random = (min: number, max: number) => min + Math.random() * (max - min)
    let drops: Drop[] = []
    let width = 0
    let height = 0
    let frame = 0
    let last = 0
    let inView = false

    const spawn = (drop: Drop, anywhere: boolean) => {
      const layer = layers[drop.layer]
      drop.speed = random(layer.speed[0], layer.speed[1])
      drop.length = random(layer.length[0], layer.length[1])
      drop.y = anywhere ? random(-height * 0.1, height) : random(-height * 0.25, -drop.length)
      drop.x = random(-height * slant, width)
    }

    // How far the section has scrolled in (0–1), for rampIn. Measured on
    // scroll and resize rather than every frame, so animating never forces a
    // layout pass.
    let ramp = 1
    const measureRamp = () => {
      if (!rampIn) return
      const top = wrapper.getBoundingClientRect().top
      ramp = Math.min(1, Math.max(0, (window.innerHeight - top) / window.innerHeight))
    }

    const resize = () => {
      measureRamp()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = Math.min(520, Math.round(((width * height) / area) * density))
      drops = Array.from({ length: count }, (_, i) => {
        const drop = { x: 0, y: 0, length: 0, speed: 0, layer: i % layers.length }
        spawn(drop, true)
        return drop
      })
      draw()
    }

    // One path per layer, so each layer is a single stroke call.
    const draw = () => {
      const shown = Math.round(drops.length * (0.3 + 0.7 * ramp))
      context.clearRect(0, 0, width, height)
      layers.forEach((layer, index) => {
        context.beginPath()
        for (let i = 0; i < shown; i++) {
          const drop = drops[i]
          if (drop.layer !== index) continue
          context.moveTo(drop.x, drop.y)
          context.lineTo(drop.x - drop.length * slant, drop.y - drop.length)
        }
        context.strokeStyle = `rgba(214, 222, 242, ${layer.alpha})`
        context.lineWidth = layer.width
        context.lineCap = 'round'
        context.stroke()
      })
    }

    const tick = (time: number) => {
      const dt = Math.min(0.05, (time - (last || time)) / 1000)
      last = time

      for (const drop of drops) {
        drop.x += drop.speed * slant * dt
        drop.y += drop.speed * dt
        if (drop.y - drop.length > height || drop.x - drop.length * slant > width) spawn(drop, false)
      }
      draw()
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (frame || !inView || document.hidden || reduced.matches) return
      last = 0
      frame = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    const sync = () => (inView && !document.hidden && !reduced.matches ? start() : (stop(), draw()))

    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      measureRamp()
      sync()
    })
    const sizing = new ResizeObserver(resize)
    visibility.observe(wrapper)
    sizing.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    reduced.addEventListener('change', sync)
    if (rampIn) window.addEventListener('scroll', measureRamp, { passive: true })

    return () => {
      stop()
      visibility.disconnect()
      sizing.disconnect()
      document.removeEventListener('visibilitychange', sync)
      reduced.removeEventListener('change', sync)
      window.removeEventListener('scroll', measureRamp)
    }
  }, [preset, density, rampIn])

  return (
    <div ref={wrapperRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="sticky top-0 block h-svh w-full" />
    </div>
  )
}
