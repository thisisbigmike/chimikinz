'use client'

import type * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { site } from '@/lib/site'

/**
 * Shown when someone reaches for something that is not open yet — a
 * collection before the OpenSea drop, or the mint before it goes live.
 * Flip `launched` in lib/site.ts to send collections to OpenSea instead.
 *
 * Same plate as the closed Workshop (app/workshop/page.tsx), so every
 * "not yet" on the site reads as the same object.
 *
 * `body` overrides the sentence under the heading; without it the modal
 * reads as the collection case it was first written for.
 */
export function ComingSoonModal({
  title,
  body,
  onClose,
}: {
  title: string
  body?: React.ReactNode
  onClose: () => void
}) {
  /**
   * Rendered through a portal on purpose. `ScrollReveal` animates with a
   * transform, and a transformed ancestor becomes the containing block for
   * `position: fixed` — so a modal opened from a button inside one (the
   * mint CTA is inside two) lays itself out against that button instead of
   * the viewport, and arrives as a squeezed column. Going out to <body>
   * puts it back on the viewport wherever it is opened from.
   */
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setContainer(document.body)
  }, [])

  /**
   * Clicking the backdrop dismisses — but only when the press *started*
   * there. A click event fires on the nearest common ancestor of the press
   * and the release, so selecting text in the plate and letting go outside
   * it would otherwise read as a click on the backdrop and shut the modal
   * out from under the reader.
   */
  const pressedBackdrop = useRef(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (!container) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
      /* Above the sticky header, which sits at z-50. */
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night/80 p-4"
      onPointerDown={(e) => {
        pressedBackdrop.current = e.target === e.currentTarget
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && pressedBackdrop.current) onClose()
      }}
    >
      <div
        className="pixel-box-lg pixel-slide-up relative flex w-full max-w-lg flex-col items-center gap-5 bg-card p-6 text-center sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="pixel-box-sm pixel-press absolute right-4 top-4 grid size-10 place-items-center bg-primary font-display text-sm text-primary-foreground"
        >
          X
        </button>

        <PixelTag className="bg-secondary text-secondary-foreground">
          Not yet
        </PixelTag>

        <h2
          id="coming-soon-title"
          className="text-balance font-display text-2xl uppercase sm:text-3xl"
        >
          <span className="pixel-text-shadow-primary">Coming Soon</span>
        </h2>

        <p className="text-pretty text-2xl leading-snug text-muted-foreground">
          {body ?? (
            <>
              <span className="text-foreground">{title}</span> is not on
              OpenSea yet. The chimis are still getting their charms in order
              — launching {site.launch}.
            </>
          )}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <PixelLink href={site.links.discord} external size="md">
            Join the Discord
          </PixelLink>
          <PixelLink href={site.links.x} external variant="bone" size="md">
            Follow on X
          </PixelLink>
        </div>
      </div>
    </div>,
    container,
  )
}
