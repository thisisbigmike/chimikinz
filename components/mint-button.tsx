'use client'

import { useState } from 'react'
import { ComingSoonModal } from '@/components/coming-soon-modal'
import { PixelButton } from '@/components/pixel/pixel-button'
import { site } from '@/lib/site'

/**
 * The "Mint on Ethereum" call to action. The mint is not open yet, so the
 * slab opens the Coming Soon modal instead of going anywhere — it keeps its
 * full weight as the page's main CTA rather than sitting there dead.
 *
 * When the mint opens, swap the button for a `PixelLink` to
 * `site.links.mint` and this wrapper can go.
 */
export function MintButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <PixelButton
        size="lg"
        className={className}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        Mint on {site.chain}
      </PixelButton>

      {open ? (
        <ComingSoonModal
          title="The mint"
          body={
            <>
              <span className="text-foreground">The mint</span> is not open
              yet. The chimis are still getting their charms in order —
              opening {site.launch}.
            </>
          }
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  )
}
