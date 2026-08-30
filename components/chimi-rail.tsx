'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Chimi } from '@/lib/chimis'
import { cn } from '@/lib/utils'

/** Pixels per second the rail drifts on its own. Slow enough to read. */
const DRIFT_SPEED = 26
/** How long the rail holds still after a finger, wheel, or arrow nudge. */
const RESUME_DELAY = 1600
/** Gap between tiles, in px — matches the `gap-4` on the track. */
const TILE_GAP = 16

/**
 * The Chimis as a rail of portraits: a marquee you can actually use.
 *
 * It is a real scroll container rather than a CSS transform loop, so a
 * finger, a trackpad, and the arrow keys all drive it directly. On top of
 * that it drifts a few px a frame when nobody is touching it, and stops the
 * instant someone is — a moving thing you can still hit.
 *
 * The track is repeated `copies` times and the scroll position is wrapped
 * back by one copy's width whenever it crosses one, which is what makes the
 * loop seamless in both directions. Repeats are `aria-hidden` and untabbable,
 * so a screen reader and the tab key still see each Chimi exactly once.
 */
export function ChimiRail({
  chimis,
  className,
  label = 'The Chimis',
}: {
  chimis: Chimi[]
  className?: string
  /** Names the rail for screen readers. */
  label?: string
}) {
  const railRef = useRef<HTMLDivElement>(null)
  /** Hover / focus / finger-down: drift off while true. */
  const pausedRef = useRef(false)
  /** Timestamp to stay still until, after a deliberate nudge. */
  const holdUntilRef = useRef(0)
  /** Width of one copy of the track, and whether looping fits. */
  const loopRef = useRef({ copyWidth: 0, canLoop: false })
  /** Scroll events before this are the rail parking itself, not a person. */
  const ignoreScrollUntilRef = useRef(0)
  const reducedRef = useRef(false)
  const [hintDone, setHintDone] = useState(false)

  // Enough repeats that a single copy is always wider than the viewport —
  // otherwise there is nothing to wrap through and the loop cannot close.
  const copies = Math.max(4, Math.ceil(16 / Math.max(chimis.length, 1)))

  const hold = useCallback(() => {
    holdUntilRef.current = performance.now() + RESUME_DELAY
  }, [])

  /** Is the rail moving under its own steam right now? */
  const drifting = useCallback(
    (now: number) =>
      !reducedRef.current &&
      !document.hidden &&
      !pausedRef.current &&
      now >= holdUntilRef.current &&
      loopRef.current.canLoop,
    [],
  )

  /** Re-measure the track and park the rail inside the wrappable band. */
  const measure = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const copyWidth = rail.scrollWidth / copies
    const max = rail.scrollWidth - rail.clientWidth
    // The band is [copyWidth, 2 × copyWidth). Looping needs room for both of
    // its edges; with too few tiles for the screen it stays a plain rail.
    const canLoop = copyWidth > 0 && max > copyWidth * 2 + 4
    loopRef.current = { copyWidth, canLoop }
    if (canLoop && rail.scrollLeft < copyWidth) {
      ignoreScrollUntilRef.current = performance.now() + 100
      rail.scrollLeft = copyWidth
    }
  }, [copies])

  /** Keep the scroll position inside the band, wrapping by whole copies. */
  const wrap = useCallback(() => {
    const rail = railRef.current
    const { copyWidth, canLoop } = loopRef.current
    if (!rail || !canLoop) return
    if (rail.scrollLeft >= copyWidth * 2) rail.scrollLeft -= copyWidth
    else if (rail.scrollLeft < copyWidth) rail.scrollLeft += copyWidth
  }, [])

  const handleScroll = useCallback(() => {
    wrap()
    const now = performance.now()
    if (now < ignoreScrollUntilRef.current) return
    // Anything that moves the rail while the drift is suspended is a person,
    // which is the only reliable signal that the hint has been taken. Watching
    // for a pointer instead would fire on a page scroll that merely passes
    // over the rail, and the hint would vanish before it was ever read.
    if (!drifting(now)) setHintDone(true)
  }, [drifting, wrap])

  // Track the motion preference where the scroll handler can see it too.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      reducedRef.current = query.matches
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  // Measure once the tiles have laid out, and again whenever they resize.
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(rail)
    return () => observer.disconnect()
  }, [measure])

  // The drift itself.
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    let frame = 0
    let previous = 0

    const step = (now: number) => {
      frame = requestAnimationFrame(step)
      const elapsed = previous ? Math.min(now - previous, 64) : 0
      previous = now
      if (!drifting(now)) return
      rail.scrollLeft += (DRIFT_SPEED * elapsed) / 1000
      wrap()
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [drifting, wrap])

  /** One tile forward or back, for the pointer arrows and the arrow keys. */
  const nudge = useCallback(
    (direction: 1 | -1) => {
      const rail = railRef.current
      if (!rail) return
      const tile = rail.querySelector<HTMLElement>('[data-tile]')
      const distance = tile
        ? tile.offsetWidth + TILE_GAP
        : rail.clientWidth * 0.8
      hold()
      rail.scrollBy({ left: direction * distance, behavior: 'smooth' })
    },
    [hold],
  )

  return (
    <div className={cn('relative', className)}>
      {/* Edge fades: the rail runs off both sides of the page on purpose. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-background to-transparent sm:w-12"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-background to-transparent sm:w-16"
        aria-hidden="true"
      />

      {/* Swipe hint — points the way out of the right edge, and gets out of
          the way for good once anyone has taken the hint. Touch only: on
          pointer screens the right-hand arrow below does the same job, and
          the two would sit on top of each other. */}
      <div
        className={cn(
          'pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-2 transition-opacity duration-300 sm:hidden',
          hintDone && 'opacity-0',
        )}
        aria-hidden="true"
      >
        <span className="rail-nudge pixel-box-sm flex items-center gap-2 bg-accent px-3 py-2 font-display text-[9px] uppercase text-accent-foreground">
          Swipe
          <span className="text-sm leading-none">&rarr;</span>
        </span>
      </div>

      <div
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="rail-scroll flex overflow-x-auto py-8 outline-none focus-visible:ring-4 focus-visible:ring-primary"
        onScroll={handleScroll}
        onWheel={(event) => {
          // Sideways intent only — a page scroll passing over the rail
          // should leave it drifting.
          if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) hold()
        }}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') pausedRef.current = true
        }}
        onPointerLeave={() => {
          pausedRef.current = false
        }}
        onPointerDown={() => {
          pausedRef.current = true
          hold()
        }}
        onPointerUp={() => {
          pausedRef.current = false
        }}
        onPointerCancel={() => {
          pausedRef.current = false
        }}
        onFocus={() => {
          pausedRef.current = true
        }}
        onBlur={() => {
          pausedRef.current = false
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            nudge(1)
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault()
            nudge(-1)
          }
        }}
      >
        <div className="flex shrink-0 items-stretch gap-4 px-4 sm:px-6">
          {Array.from({ length: copies }, (_, copy) =>
            chimis.map((chimi) => (
              <ChimiTile
                key={`${copy}-${chimi.slug}`}
                chimi={chimi}
                duplicate={copy > 0}
              />
            )),
          )}
        </div>
      </div>

      {/* Pointer users get arrows too — a rail you can only swipe is a rail
          half the visitors never move. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-2 sm:flex">
        {([-1, 1] as const).map((direction) => (
          <button
            key={direction}
            type="button"
            onClick={() => nudge(direction)}
            aria-label={direction === 1 ? 'Next Chimis' : 'Previous Chimis'}
            className={cn(
              'pixel-box-sm pixel-press pointer-events-auto flex size-10 items-center justify-center bg-card font-display text-sm text-foreground',
              // Until someone moves the rail, the forward arrow nudges to
              // say which way it goes.
              direction === 1 && !hintDone && 'rail-nudge',
            )}
          >
            <span aria-hidden="true">{direction === 1 ? '→' : '←'}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** One portrait. The whole tile is the link — tap anywhere, get the card. */
function ChimiTile({
  chimi,
  duplicate,
}: {
  chimi: Chimi
  duplicate: boolean
}) {
  return (
    <Link
      data-tile
      href={`/chimis/${chimi.slug}`}
      aria-hidden={duplicate || undefined}
      tabIndex={duplicate ? -1 : undefined}
      className="group pixel-box pixel-press block w-[68vw] max-w-[320px] shrink-0 bg-card sm:w-[272px] lg:w-[320px]"
    >
      <div
        className="relative aspect-square w-full overflow-hidden border-b-4 border-border"
        style={{ backgroundColor: `${chimi.accent}22` }}
      >
        <span
          className="absolute inset-x-0 top-0 z-10 h-2"
          style={{ backgroundColor: chimi.accent }}
          aria-hidden="true"
        />
        <Image
          src={chimi.art}
          alt={
            duplicate
              ? ''
              : `${chimi.name}, the Chimi of ${chimi.emotion.toLowerCase()}`
          }
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 272px, 68vw"
          className="art-smooth pixel-wiggle object-contain p-4"
        />
      </div>

      {/* The nameplate. Everything else about them lives on their card. */}
      <div className="flex items-center justify-between gap-3 p-3">
        <span className="font-display text-sm uppercase">{chimi.name}</span>
        <span
          aria-hidden="true"
          className="pixel-arrow font-display text-sm text-primary"
        >
          &rarr;
        </span>
      </div>
    </Link>
  )
}
