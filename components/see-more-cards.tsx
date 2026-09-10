'use client'

import { useState } from 'react'
import { ComingSoonModal } from '@/components/coming-soon-modal'
import { PixelButton } from '@/components/pixel/pixel-button'
import { chimiCardArt } from '@/lib/chimi-cards'

/**
 * The way on from the cards that are finished.
 *
 * A button rather than a link, because it opens a dialog instead of going
 * anywhere — give it an href the day the rest of the deck is up.
 */
export function SeeMoreCards() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <PixelButton
        size="lg"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        See more
      </PixelButton>

      {open ? (
        <ComingSoonModal
          title="The rest of the deck"
          body={
            <>
              <span className="text-foreground">The rest of the deck</span> is
              still at the printer. {chimiCardArt.length} cards are done — the
              others are being drawn one at a time.
            </>
          }
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  )
}
