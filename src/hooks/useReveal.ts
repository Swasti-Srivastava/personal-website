import { useEffect, useRef, useState } from 'react'

// Reports when an element first scrolls into view. Pairs with the `.reveal`
// class; reduced-motion users see content immediately via CSS.
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
