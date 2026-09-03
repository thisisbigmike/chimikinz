'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'
import type { Chimi } from '@/lib/chimis'
import { cn } from '@/lib/utils'

/** How far a finger has to travel across the deck to count as a swipe, in px. */
const SWIPE_THRESHOLD = 40

/**
 * The Chimis as a carousel: one of them front and centre, the rest waiting
 * either side of it.
 *
 * This replaced a drifting marquee. The marquee showed four Chimis equally
 * and asked you to pick; this shows one and asks you to look at it, which is
 * the right shape for a cast of characters — they have faces, and faces want
 * a stage rather than a queue.
 *
 * Geometry lives in two custom properties rather than in the transforms:
 * `--card-w` is the focused card's width and `--step` is how far one position
 * sits from the next. Every card is placed at a whole number of steps from
 * the middle, so widening the deck at a breakpoint is one value to change and
 * the arrows, which sit at a fraction of a step, follow it on their own.
 *
 * Every card stays in the DOM, in order, and stays a real link — none of it
 * is `aria-hidden`. A card off to the side is dimmed and untouchable by
 * pointer, but tabbing to it still works and brings it to the middle, so the
 * keyboard path and the visible state never disagree.
 */
export function ChimiRail({
  chimis,
  className,
  label = 'The Chimis',
}: {
  chimis: Chimi[]
  className?: string
  /** Names the carousel for screen readers. */
  label?: string
}) {
  const [index, setIndex] = useState(0)
  /** Where a finger went down, so pointer-up can tell a swipe from a tap. */
  const swipeStartRef = useRef<number | null>(null)
  const count = chimis.length

  const go = useCallback(
    (direction: 1 | -1) => {
      setIndex((current) => (current + direction + count) % count)
    },
    [count],
  )

  /**
   * Signed distance from the focused card, taking the short way round: with
   * four Chimis the one three to the right is really one to the left, and
   * placing it there is what stops the deck lurching when the index wraps.
   */
  const half = Math.floor(count / 2)
  const offsetOf = (i: number) => {
    let d = i - index
    if (d > half) d -= count
    if (d < -half) d += count
    return d
  }

  if (count === 0) return null

  return (
    <div className={cn('relative', className)}>
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            go(1)
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault()
            go(-1)
          }
        }}
        onPointerDown={(event) => {
          swipeStartRef.current = event.clientX
        }}
        onPointerUp={(event) => {
          const start = swipeStartRef.current
          swipeStartRef.current = null
          if (start === null) return
          const travelled = event.clientX - start
          // Dragging right pulls the previous card in, the way a finger on a
          // physical deck would. Anything shorter than the threshold is a
          // tap, and belongs to the link underneath.
          if (travelled <= -SWIPE_THRESHOLD) go(1)
          else if (travelled >= SWIPE_THRESHOLD) go(-1)
        }}
        onPointerCancel={() => {
          swipeStartRef.current = null
        }}
        className={cn(
          'relative touch-pan-y overflow-hidden py-8 outline-none focus-visible:ring-4 focus-visible:ring-primary',
          // The deck's two measurements. `--step` is a touch under a full
          // card width on a phone, so the neighbours still show a usable
          // sliver instead of sitting off the edge of the screen.
          '[--card-w:min(64vw,300px)] [--step:calc(var(--card-w)*0.92)]',
          'sm:[--card-w:272px] sm:[--step:var(--card-w)]',
          'lg:[--card-w:320px]',
        )}
      >
        {/* Sets the deck's height. The cards themselves are all absolutely
            positioned — they have to be, to sit on top of each other — so
            without one left in the flow the container would collapse to
            nothing. Measuring a real tile rather than guessing at a height
            keeps it right if the nameplate's type ever changes. */}
        <div aria-hidden="true" className="invisible mx-auto w-[var(--card-w)]">
          <ChimiTile chimi={chimis[0]} />
        </div>

        {chimis.map((chimi, i) => {
          const d = offsetOf(i)
          const focused = d === 0
          const near = Math.abs(d) <= 1
          return (
            <div
              key={chimi.slug}
              className={cn(
                'absolute left-1/2 top-8 w-[var(--card-w)] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none',
                !focused && 'pointer-events-none',
              )}
              style={{
                transform: `translateX(-50%) translateX(calc(var(--step) * ${d})) scale(${
                  focused ? 1 : 0.74
                })`,
                // Anything past the immediate neighbours is stacked behind
                // them waiting its turn, not on show.
                opacity: focused ? 1 : near ? 0.72 : 0,
                zIndex: 20 - Math.abs(d),
              }}
            >
              <ChimiTile
                chimi={chimi}
                dimmed={!focused}
                onFocus={() => setIndex(i)}
              />
            </div>
          )
        })}
      </div>

      {/* The arrows sit in the gaps either side of the focused card and point
          inwards, at it — each says "bring this neighbour to the middle"
          rather than naming a direction of travel. 0.56 of a step lands in
          the middle of that gap at every breakpoint. */}
      {count > 1 ? (
        <div className="pointer-events-none absolute inset-0 z-30">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => go(direction)}
              aria-label={
                direction === -1
                  ? 'Show the previous Chimi'
                  : 'Show the next Chimi'
              }
              style={{
                transform: `translate(-50%,-50%) translateX(calc(var(--step) * ${
                  direction * 0.56
                }))`,
              }}
              className="pixel-box-sm pixel-press pointer-events-auto absolute left-1/2 top-1/2 flex size-10 items-center justify-center bg-card font-display text-sm text-foreground"
            >
              <span aria-hidden="true">{direction === -1 ? '→' : '←'}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

/** One portrait. The whole tile is the link — tap anywhere, get the card. */
function ChimiTile({
  chimi,
  dimmed = false,
  onFocus,
}: {
  chimi: Chimi
  /** Off to the side: kept legible, but clearly not the one on show. */
  dimmed?: boolean
  onFocus?: () => void
}) {
  return (
    <Link
      href={`/chimis/${chimi.slug}`}
      onFocus={onFocus}
      className={cn(
        'group pixel-box pixel-press block w-full bg-card',
        dimmed && 'saturate-75',
      )}
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
          alt={`${chimi.name}, the Chimi of ${chimi.emotion.toLowerCase()}`}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 272px, 64vw"
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
