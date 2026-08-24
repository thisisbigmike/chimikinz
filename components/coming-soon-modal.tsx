'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { site } from '@/lib/site'

/**
 * Shown when someone opens a collection before the OpenSea drop is live.
 * Flip `launched` in lib/site.ts to send them to OpenSea instead.
 */
export function ComingSoonModal({
  title,
  onClose,
}: {
  title: string
  onClose: () => void
}) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="coming-soon-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-night/80 p-4"
      onClick={onClose}
    >
      <div
        className="pixel-box-lg pixel-slide-up relative flex w-full max-w-lg flex-col items-center gap-5 bg-card p-6 text-center sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="pixel-box-sm pixel-press absolute right-4 top-4 grid size-10 place-items-center bg-primary font-display text-sm text-primary-foreground"
        >
          X
        </button>

        <div className="pixel-checker relative size-32 border-4 border-border bg-background">
          <Image
            src="/chimikinz/oddling-6.png"
            alt=""
            fill
            sizes="128px"
            className="pixel-float object-contain p-2"
          />
        </div>

        <PixelTag className="bg-secondary text-secondary-foreground">
          Not yet
        </PixelTag>

        <h2
          id="coming-soon-title"
          className="text-balance font-display text-xl uppercase sm:text-2xl"
        >
          Coming Soon
        </h2>

        <p className="text-pretty text-2xl leading-snug text-muted-foreground">
          <span className="text-foreground">{title}</span> is not on OpenSea
          yet. The oddlings are still getting their charms in order — we are
          almost there.
        </p>

        <p className="font-display text-[10px] uppercase text-muted-foreground">
          Launch: {site.launch}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <PixelLink href={site.links.discord} external size="md">
            Join the Discord
          </PixelLink>
          <PixelLink href={site.links.x} external variant="bone" size="md">
            Follow on X
          </PixelLink>
        </div>
      </div>
    </div>
  )
}
