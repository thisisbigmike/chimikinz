'use client'

import { useEffect, useRef } from 'react'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { motionLoops } from '@/lib/motion'

/**
 * The loops, as a marquee rather than a grid.
 *
 * A grid of four sat still and asked to be read. A strip that drifts says
 * what these actually are — offcuts of a place that keeps moving whether or
 * not you are looking at it — and it takes as many clips as we have without
 * needing a row that divides evenly.
 *
 * It reuses `.marquee-container` / `.marquee-track` from the announcement
 * rail: two copies of the list, a -50% translate, hover to pause, and the
 * reduced-motion block in globals.css already switches the scroll off. Only
 * the duration is overridden, because these are cards rather than words and
 * the rail's 34s would whip them past.
 */
export function MotionShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  /**
   * Twenty-two H.264 decoders is not something to leave running down the page.
   *
   * The clips only play while the strip is near the viewport, and never at
   * all for a reader who has asked for less motion — which is why none of
   * them carry `autoPlay`: the attribute would start them before this could
   * have an opinion, and a reduced-motion reader would catch a frame or two
   * of exactly what they asked not to see.
   */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const videos = Array.from(section.querySelectorAll('video'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let onScreen = false

    const sync = () => {
      const shouldPlay = onScreen && !reduced.matches
      for (const video of videos) {
        // A play() that loses a race with an unmount rejects; there is
        // nothing to recover, and an unhandled rejection in the console is
        // worse than the no-op.
        if (shouldPlay) void video.play().catch(() => {})
        else video.pause()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        sync()
      },
      // Start them just before they arrive, so the first card is already
      // moving by the time it is worth looking at.
      { rootMargin: '200px 0px' },
    )
    observer.observe(section)
    reduced.addEventListener('change', sync)

    return () => {
      observer.disconnect()
      reduced.removeEventListener('change', sync)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden border-b-4 border-border bg-muted"
    >
      <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:pt-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="Moving pictures"
            title="The Cove, in motion"
            body="Small loops from around Clover Cove. Hover the strip to hold it still."
            className="mx-auto"
          />
        </ScrollReveal>
      </div>

      <div className="marquee-container mt-10 flex overflow-hidden pb-14 lg:pb-20">
        {/* Not the rail's 34s: these are cards, and a card has to be on screen
            long enough to actually watch its loop come round. The duration
            tracks the number of clips — roughly 8.5s of travel each — so
            adding one lengthens the strip instead of speeding it up. */}
        <div
          className="marquee-track flex shrink-0 items-stretch"
          style={{ animationDuration: `${motionLoops.length * 8.5}s` }}
        >
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-stretch">
              {motionLoops.map((loop) => (
                <li
                  key={`${copy}-${loop.src}`}
                  className="shrink-0 px-3"
                  // The second copy exists only to close the loop. Announcing
                  // every clip twice would be the marquee's problem leaking
                  // into the page's meaning.
                  aria-hidden={copy === 1 ? 'true' : undefined}
                >
                  <div className="pixel-box art-ground w-[62vw] max-w-[300px] overflow-hidden sm:w-[260px] lg:w-[300px]">
                    <video
                      src={loop.src}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-label={copy === 1 ? undefined : loop.alt}
                      className="block aspect-square w-full object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
