'use client'

import { useCallback, useEffect, useState } from 'react'
import { PixelButton } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { artwork, type Artwork } from '@/lib/artwork'

/**
 * The "discover another" panel.
 *
 * The first render is deliberately deterministic (piece 0) so the server and
 * client agree; a fresh piece is rolled once on mount. That keeps every visit
 * feeling different without tripping a hydration mismatch.
 */
export function ChimiOfTheMoment({
  onOpen,
}: {
  onOpen?: (piece: Artwork) => void
}) {
  const [index, setIndex] = useState(0)
  const [rolling, setRolling] = useState(false)

  const roll = useCallback(() => {
    setIndex((current) => {
      if (artwork.length < 2) return current
      // Never land on the piece already showing.
      let next = current
      while (next === current) {
        next = Math.floor(Math.random() * artwork.length)
      }
      return next
    })
  }, [])

  useEffect(() => {
    roll()
  }, [roll])

  const discover = () => {
    setRolling(true)
    roll()
    window.setTimeout(() => setRolling(false), 320)
  }

  const piece = artwork[index]

  return (
    <section className="pixel-box-lg bg-card">
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="size-3 shrink-0 animate-pulse bg-primary" aria-hidden="true" />
          <PixelTag className="bg-secondary text-secondary-foreground">
            Chimi of the moment
          </PixelTag>
        </div>

        {/* The roll used to land as a burst on the artwork. With the art gone
            the name is the thing that changes, so it takes the animation. */}
        <div className={rolling ? 'pixel-burst' : undefined}>
          <h2 className="font-display text-2xl uppercase sm:text-3xl">
            {piece.title}
          </h2>
          <p className="mt-3 text-pretty text-2xl leading-snug text-muted-foreground">
            {piece.alt}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <PixelButton onClick={discover} size="lg" className="pixel-pulse">
            Discover another
          </PixelButton>
          <button
            type="button"
            onClick={() => onOpen?.(piece)}
            className="font-display text-[10px] uppercase text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          >
            Open this one
          </button>
        </div>

        <p className="font-display text-[9px] uppercase text-muted-foreground">
          Or just scroll — all {artwork.length} are below.
        </p>
      </div>
    </section>
  )
}
