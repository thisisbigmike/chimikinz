'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

/** The clip's own background, sampled from it, so the square never shows an edge. */
const GROUND = '#f9f1ca'

/** Held this long at minimum, or a fast load makes it flash and vanish. */
const MINIMUM_MS = 900
/** Let go after this no matter what, so a stalled asset cannot trap anyone. */
const CEILING_MS = 8000
/** Long enough for the fade to finish before it leaves the tree. */
const FADE_MS = 500

/**
 * The screen the site opens behind: a chimi pushing the loading bar along.
 *
 * Rendered on the server as part of the first HTML rather than mounted by an
 * effect, so it is already covering the page at first paint instead of
 * appearing a frame late over content that has started to show.
 *
 * It lifts on `window.load` — everything the page asked for has arrived —
 * held to a floor so a cached load does not flash it, and cut off at a
 * ceiling so a resource that never resolves cannot leave someone stuck
 * behind it. Only full page loads see it: the component sits in the root
 * layout and does not remount as you move around the site.
 */
export function LoadingScreen() {
  /** The lift has begun — fading, no longer taking clicks. */
  const [lifting, setLifting] = useState(false)
  /** Out of the tree entirely. */
  const [gone, setGone] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const started = performance.now()
    let hold: ReturnType<typeof setTimeout>

    const lift = () => {
      const waited = performance.now() - started
      hold = setTimeout(() => setLifting(true), Math.max(0, MINIMUM_MS - waited))
    }

    if (document.readyState === 'complete') lift()
    else window.addEventListener('load', lift, { once: true })

    const ceiling = setTimeout(() => setLifting(true), CEILING_MS)

    return () => {
      clearTimeout(hold)
      clearTimeout(ceiling)
      window.removeEventListener('load', lift)
    }
  }, [])

  useEffect(() => {
    if (!lifting) return
    const timer = setTimeout(() => setGone(true), FADE_MS)
    return () => clearTimeout(timer)
  }, [lifting])

  if (gone) return null

  return (
    <>
      {/* Without scripting nothing would ever lift this, so it is never
          shown in the first place. */}
      <noscript>
        <style>{`#loading-screen{display:none}`}</style>
      </noscript>

      <div
        id="loading-screen"
        role="status"
        aria-live="polite"
        className={cn(
          'fixed inset-0 z-[200] grid place-items-center transition-opacity ease-out',
          lifting && 'pointer-events-none opacity-0',
        )}
        style={{ background: GROUND, transitionDuration: `${FADE_MS}ms` }}
      >
        <div className="w-[min(86vw,520px)]">
          {reduced ? (
            /* A bar that fills is the whole animation, so a reader who
               asked for less motion gets the still it starts from. */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/chimikinz/loading/loading-poster.webp"
              alt=""
              aria-hidden="true"
              className="block w-full"
            />
          ) : (
            <video
              src="/chimikinz/loading/loading.mp4"
              poster="/chimikinz/loading/loading-poster.webp"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="block w-full"
            />
          )}
        </div>

        <span className="sr-only">Loading Chimikinz</span>
      </div>
    </>
  )
}
