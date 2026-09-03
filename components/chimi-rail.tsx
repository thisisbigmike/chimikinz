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
 * The deck has no arrow buttons. The cards either side are the control — they
 * are big, they are obviously the next thing along, and a button floated over
 * the middle card only ever covered the face it was meant to be showing off.
 * So a card off to the side is a button that brings itself to the middle, and
 * the card in the middle is a link to that Chimi. One rule, and where you
 * click is what you get.
 *
 * Geometry lives in two custom properties rather than in the transforms:
 * `--card-w` is the focused card's width and `--step` is how far one position
 * sits from the next. Every card is placed at a whole number of steps from
 * the middle, so widening the deck at a breakpoint is one value to change.
 *
 * Every card stays in the DOM, in order, and none of it is `aria-hidden`.
 * Tabbing to a card off to the side brings it to the middle, so the keyboard
 * path and the visible state never disagree.
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
  /**
   * A swipe ends over a card, and that card is a link or a button — without
   * this the gesture would fire whatever it happened to finish on top of.
   */
  const swipedRef = useRef(false)
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
          swipedRef.current = false
        }}
        onPointerUp={(event) => {
          const start = swipeStartRef.current
          swipeStartRef.current = null
          if (start === null) return
          const travelled = event.clientX - start
          if (Math.abs(travelled) < SWIPE_THRESHOLD) return
          // Dragging right pulls the previous card in, the way a finger on a
          // physical deck would.
          swipedRef.current = true
          go(travelled < 0 ? 1 : -1)
        }}
        onPointerCancel={() => {
          swipeStartRef.current = null
        }}
        onClickCapture={(event) => {
          // Swallow the click a finished swipe leaves behind, before it
          // reaches the card underneath.
          if (!swipedRef.current) return
          event.preventDefault()
          event.stopPropagation()
          swipedRef.current = false
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
          <ChimiTile chimi={chimis[0]} focused />
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
                // Only the three on show can be clicked. The rest are stacked
                // behind them at nothing, waiting their turn.
                !near && 'pointer-events-none',
              )}
              style={{
                transform: `translateX(-50%) translateX(calc(var(--step) * ${d})) scale(${
                  focused ? 1 : 0.74
                })`,
                opacity: focused ? 1 : near ? 0.72 : 0,
                zIndex: 20 - Math.abs(d),
              }}
            >
              <ChimiTile
                chimi={chimi}
                focused={focused}
                onSelect={() => setIndex(i)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * One portrait, and one of two things depending on where it is sitting.
 *
 * In the middle it is a link to the Chimi's page — a real anchor, so it opens
 * in a new tab on a middle click and offers the usual menu on a right click.
 * Off to the side it is a button that brings itself to the middle: it does
 * not navigate, so it must not be an anchor, and a screen reader is told
 * which of the two it has landed on rather than having to guess.
 */
function ChimiTile({
  chimi,
  focused,
  onSelect,
}: {
  chimi: Chimi
  focused: boolean
  onSelect?: () => void
}) {
  const shell = 'group pixel-box pixel-press block w-full bg-card'

  const face = (
    <>
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

      {/* The nameplate. The arrow means "this opens their card", so it belongs
          to the middle one only — the others go no further than the middle. */}
      <div className="flex items-center justify-between gap-3 p-3">
        <span className="font-display text-sm uppercase">{chimi.name}</span>
        {focused ? (
          <span
            aria-hidden="true"
            className="pixel-arrow font-display text-sm text-primary"
          >
            &rarr;
          </span>
        ) : null}
      </div>
    </>
  )

  if (focused) {
    return (
      <Link href={`/chimis/${chimi.slug}`} className={shell}>
        {face}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      onFocus={onSelect}
      aria-label={`Bring ${chimi.name} to the front`}
      className={cn(shell, 'text-left saturate-75')}
    >
      {face}
    </button>
  )
}
