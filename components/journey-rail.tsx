'use client'

import { useEffect, useState } from 'react'
import { chapters } from '@/lib/journey'
import { cn } from '@/lib/utils'

/**
 * The chapter rail, as a progress trail.
 *
 * It used to light whichever chapter carried `status: 'now'`, which meant
 * the highlight sat in the middle of the rail before anyone had read a
 * word. It now follows the reader instead: the chapter they are in is
 * filled, and the next one fills as they scroll toward it, so the rail
 * reads as how far through they are.
 *
 * The plate is a fixed cream-and-ink pair rather than the themed card
 * colours — the same reasoning as the `slab` button. The fill is a light
 * green, and on dark the themed foreground is cream, which would leave
 * cream type sitting on it.
 */
export function JourneyRail() {
  /** Index of the chapter the reader is in. */
  const [active, setActive] = useState(0)
  /** How far through that chapter they are, 0–1. */
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      // Where the reader is reading, rather than the very top of the
      // window: a line a third down the viewport.
      const line = window.scrollY + window.innerHeight * 0.35

      let index = 0
      let through = 0

      chapters.forEach((chapter, i) => {
        const el = document.getElementById(chapter.slug)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        if (line < top) return
        index = i
        through = rect.height > 0 ? Math.min((line - top) / rect.height, 1) : 0
      })

      setActive(index)
      setProgress(through)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  /** Everything read is full, the next one is filling, the rest are empty. */
  const fillOf = (i: number) => {
    if (i <= active) return 1
    if (i === active + 1) return progress
    return 0
  }

  return (
    <ol className="flex flex-wrap items-center justify-center gap-2">
      {chapters.map((chapter, i) => (
        <li key={chapter.slug} className="flex items-center gap-2">
          <a
            href={`#${chapter.slug}`}
            aria-current={i === active ? 'location' : undefined}
            className="pixel-box-sm pixel-press relative overflow-hidden bg-cream px-3 py-2 font-display text-[9px] uppercase text-night"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 origin-left bg-primary transition-[width] duration-150 ease-linear motion-reduce:transition-none"
              style={{ width: `${fillOf(i) * 100}%` }}
            />
            <span className="relative">{chapter.title}</span>
          </a>
          {i < chapters.length - 1 ? (
            <span
              className="hidden size-2 rotate-45 bg-foreground sm:block"
              aria-hidden="true"
            />
          ) : null}
        </li>
      ))}
    </ol>
  )
}
