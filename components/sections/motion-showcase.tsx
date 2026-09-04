'use client'

import { useEffect, useRef } from 'react'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { motionLoops } from '@/lib/motion'

/** Seconds of travel each clip gets. The strip's pace, in one number. */
const SECONDS_PER_CLIP = 8.5

/** How long after a hand leaves the strip before it drifts again, in ms. */
const RESUME_AFTER = 1200

/** How far one arrow-key press moves the strip, in px. */
const KEY_STEP = 180

/**
 * The loops, as a strip you can drift with or push around yourself.
 *
 * A grid of four sat still and asked to be read. A strip that drifts says
 * what these actually are — offcuts of a place that keeps moving whether or
 * not you are looking at it — and it takes as many clips as we have without
 * needing a row that divides evenly.
 *
 * It is a real scroll container rather than a CSS marquee, which is what
 * makes it draggable: a finger, a trackpad, a held mouse button and a pair
 * of arrow keys all move the same `scrollLeft`, and the drift is nothing
 * more than that number going up on its own each frame. The two copies of
 * the list are what make it endless — the position wraps at one copy's
 * width, so there is no end to reach in either direction. Hover still holds
 * it still.
 *
 * `.rail-scroll` hides the scrollbar and pins `scroll-behavior: auto`, so
 * the smooth scrolling on <html> does not try to animate the per-frame
 * drift writes.
 */
export function MotionShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

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

  /** The drift, the wrap, and the mouse drag. */
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    /** One copy of the list: the distance a full lap travels. */
    const lap = () => strip.scrollWidth / 2

    let frame = 0
    let previous = 0
    let hovering = false
    let pressing = false
    let resumeAt = 0
    let dragging = false
    let dragPointer: number | null = null
    let grabbedAt = 0
    let grabbedFrom = 0
    /** Where the strip last came to rest, so `wrap` can tell which way it
     *  is heading. */
    let settled = strip.scrollLeft

    /*
     * Hold the position inside the first copy, so the second is only ever
     * the runway ahead.
     *
     * Two details, both about the seam at 0, where the rules would otherwise
     * meet. The backward wrap lands a pixel short of a full lap rather than
     * on it, or the forward rule would fire on the same value and send it
     * straight back. And it only fires when the strip is actually travelling
     * left: a forward wrap can land exactly on 0, and without the direction
     * check the very next call would read that as someone reaching for the
     * runway and throw the strip a full lap backwards.
     */
    const wrap = () => {
      const width = lap()
      if (width <= 0) return
      const leftward = strip.scrollLeft < settled
      if (strip.scrollLeft >= width) strip.scrollLeft -= width
      else if (leftward && strip.scrollLeft <= 0) strip.scrollLeft = width - 1
      settled = strip.scrollLeft
    }

    // Open a lap of runway to the left before anyone touches it, so the very
    // first gesture can go either way. Both copies are the same clips in the
    // same order, so there is nothing to see in the jump.
    strip.scrollLeft = Math.max(lap() - 1, 0)

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      // A backgrounded tab stops calling this, so the first frame back can
      // carry minutes. Capped, or the strip lurches on return.
      const elapsed = previous ? Math.min((now - previous) / 1000, 0.1) : 0
      previous = now
      if (hovering || pressing || now < resumeAt || reduced.matches) return
      const width = lap()
      if (width <= 0) return
      strip.scrollLeft +=
        (width / (motionLoops.length * SECONDS_PER_CLIP)) * elapsed
      wrap()
    }
    frame = requestAnimationFrame(tick)

    const onEnter = () => {
      hovering = true
    }
    const onLeave = () => {
      hovering = false
    }

    const onDown = (event: PointerEvent) => {
      pressing = true
      // Touch and trackpads already scroll this natively, and taking the
      // gesture over would cost the momentum that comes with them. Only a
      // held mouse button needs turning into a drag.
      if (event.pointerType !== 'mouse') return
      dragging = true
      dragPointer = event.pointerId
      grabbedAt = event.clientX
      grabbedFrom = strip.scrollLeft
      strip.setPointerCapture(event.pointerId)
    }

    const onMove = (event: PointerEvent) => {
      if (!dragging || event.pointerId !== dragPointer) return
      event.preventDefault()
      const width = lap()
      const next = grabbedFrom - (event.clientX - grabbedAt)
      // Wrapped here rather than left to `wrap`, so a drag can run off
      // either end without ever meeting the scroller's own stop at 0.
      strip.scrollLeft = width > 0 ? ((next % width) + width) % width : next
      settled = strip.scrollLeft
    }

    const onUp = () => {
      pressing = false
      resumeAt = performance.now() + RESUME_AFTER
      if (!dragging) return
      dragging = false
      if (dragPointer !== null && strip.hasPointerCapture(dragPointer)) {
        strip.releasePointerCapture(dragPointer)
      }
      dragPointer = null
    }

    // A mouse drag sets the position itself, already wrapped.
    const onScroll = () => {
      if (!dragging) wrap()
    }

    strip.addEventListener('mouseenter', onEnter)
    strip.addEventListener('mouseleave', onLeave)
    strip.addEventListener('pointerdown', onDown)
    strip.addEventListener('pointermove', onMove)
    strip.addEventListener('pointerup', onUp)
    strip.addEventListener('pointercancel', onUp)
    strip.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      strip.removeEventListener('mouseenter', onEnter)
      strip.removeEventListener('mouseleave', onLeave)
      strip.removeEventListener('pointerdown', onDown)
      strip.removeEventListener('pointermove', onMove)
      strip.removeEventListener('pointerup', onUp)
      strip.removeEventListener('pointercancel', onUp)
      strip.removeEventListener('scroll', onScroll)
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
            body="Small loops from around Clover Cove. Drag the strip either way, or hover to hold it still."
            className="mx-auto"
          />
        </ScrollReveal>
      </div>

      <div
        ref={stripRef}
        role="region"
        aria-label="Loops from Clover Cove"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
          event.preventDefault()
          stripRef.current?.scrollBy({
            left: event.key === 'ArrowRight' ? KEY_STEP : -KEY_STEP,
            behavior: 'smooth',
          })
        }}
        className="rail-scroll mt-10 flex cursor-grab select-none overflow-x-auto pb-14 outline-none focus-visible:ring-4 focus-visible:ring-primary active:cursor-grabbing lg:pb-20"
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
                    className="pointer-events-none block aspect-square w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
