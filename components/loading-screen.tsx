'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/** The clip's own background, sampled from it, so the square never shows an edge. */
const GROUND = '#f9f1ca'

/** Held this long at minimum, or a fast load makes it flash and vanish. */
const MINIMUM_MS = 900
/** Let go after this no matter what, so a stalled asset cannot trap anyone. */
const CEILING_MS = 8000
/** Long enough for the fade to finish before it leaves the tree. */
const FADE_MS = 500

/** What each signal is worth. The last of them only lands on `window.load`. */
const WEIGHT = { started: 0.08, interactive: 0.27, images: 0.5, done: 0.15 }

/**
 * The screen the site opens behind: a chimi pushing the loading bar along.
 *
 * The bar is not a canned loop — it is the real load. The clip is held
 * paused and its playhead is driven from how much has actually arrived, so
 * the chimi walks it forward as things land and reaches the end exactly
 * when the page is ready. A cached load shoves it straight to full; a slow
 * one crawls, which is the honest thing for it to do.
 *
 * Progress is blended from three signals — the document reaching
 * interactive, the share of images that have decoded, and `window.load` —
 * and it is monotonic, so it never slides backwards when a late image
 * enlarges the denominator. A slow creep runs underneath so it is never
 * sitting still on a connection that has gone quiet.
 *
 * Rendered on the server as part of the first HTML rather than mounted by
 * an effect, so it is already covering the page at first paint. Only full
 * page loads see it: the component sits in the root layout and does not
 * remount as you move around the site.
 */
export function LoadingScreen() {
  const videoRef = useRef<HTMLVideoElement>(null)
  /** Where progress is heading — set by the signals below. */
  const target = useRef(0)
  /** Where the bar actually is — eased toward `target` each frame. */
  const shown = useRef(0)

  /** The lift has begun — fading, no longer taking clicks. */
  const [lifting, setLifting] = useState(false)
  /** Out of the tree entirely. */
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const started = performance.now()
    /* A bar that fills is the progress itself, so it is kept for everyone.
       What goes is the movement that is not carrying information: no
       easing between values and no idle creep, so it advances only when
       something has actually arrived. */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
    let frame = 0
    let hold: ReturnType<typeof setTimeout>
    let loaded = false

    /** Re-blend the signals. Never lets the target fall. */
    const retarget = () => {
      let next = WEIGHT.started

      if (document.readyState !== 'loading') next += WEIGHT.interactive

      const images = Array.from(document.images)
      if (images.length > 0) {
        const ready = images.filter((img) => img.complete).length
        next += WEIGHT.images * (ready / images.length)
      } else {
        next += WEIGHT.images
      }

      if (loaded) next = 1

      target.current = Math.max(target.current, Math.min(next, 1))
    }

    const onLoad = () => {
      loaded = true
      retarget()
      const waited = performance.now() - started
      hold = setTimeout(
        () => setLifting(true),
        Math.max(0, MINIMUM_MS - waited),
      )
    }

    if (document.readyState === 'complete') onLoad()
    else window.addEventListener('load', onLoad, { once: true })

    document.addEventListener('readystatechange', retarget)
    // Images finishing is the signal that moves most, and it is the one
    // with no event of its own — so listen on the capture phase, where
    // load events from individual <img>s can be seen.
    document.addEventListener('load', retarget, true)

    const tick = () => {
      frame = requestAnimationFrame(tick)

      // Under everything else, a creep toward nine tenths across the
      // ceiling, so a connection that goes silent still looks alive.
      const elapsed = performance.now() - started
      if (!loaded && !reduced) {
        target.current = Math.max(
          target.current,
          Math.min(0.9, (elapsed / CEILING_MS) * 0.9),
        )
      }

      shown.current += (target.current - shown.current) * (reduced ? 1 : 0.08)
      if (target.current - shown.current < 0.001) shown.current = target.current

      const video = videoRef.current
      if (video && video.readyState >= 1 && Number.isFinite(video.duration)) {
        // Sit a hair inside the end, or the last frame can snap back to 0.
        const at = Math.min(video.duration * shown.current, video.duration - 0.05)
        if (Math.abs(video.currentTime - at) > 0.03) video.currentTime = at
      }
    }
    frame = requestAnimationFrame(tick)

    const ceiling = setTimeout(() => setLifting(true), CEILING_MS)

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(hold)
      clearTimeout(ceiling)
      window.removeEventListener('load', onLoad)
      document.removeEventListener('readystatechange', retarget)
      document.removeEventListener('load', retarget, true)
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
          <video
            ref={videoRef}
            src="/chimikinz/loading/loading.mp4"
            poster="/chimikinz/loading/loading-poster.webp"
            muted
            playsInline
            /* No autoplay and no loop: the playhead is driven by the
               progress above, not by the clock. */
            preload="auto"
            aria-hidden="true"
            onLoadedMetadata={(e) => e.currentTarget.pause()}
            className="block w-full"
          />
        </div>

        <span className="sr-only">Loading Chimikinz</span>
      </div>
    </>
  )
}
