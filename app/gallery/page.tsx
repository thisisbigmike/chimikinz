'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  artCategories,
  artwork,
  type ArtCategory,
  type ArtPiece,
} from '@/lib/art'
import { cn } from '@/lib/utils'

type Filter = ArtCategory | 'all'

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const pieces = useMemo(
    () =>
      filter === 'all'
        ? artwork
        : artwork.filter((piece) => piece.category === filter),
    [filter],
  )

  const active = openIndex === null ? null : (pieces[openIndex] ?? null)

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current
        // Wrap around so arrowing past either end keeps browsing.
        return (current + delta + pieces.length) % pieces.length
      })
    },
    [pieces.length],
  )

  // Arrow keys page through the open piece; Escape closes it.
  useEffect(() => {
    if (openIndex === null) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenIndex(null)
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [openIndex, step])

  // Don't let the page scroll behind the lightbox.
  useEffect(() => {
    if (openIndex === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [openIndex])

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <ScrollReveal variant="fade-up">
            <SectionHeading
              eyebrow="The Gallery"
              title="Every drawing, one wall"
              body="Scenes from Clover Cove, portraits of the Chimis and the reference sheets they were built from. Tap any piece to see it full size."
            />
          </ScrollReveal>

          {/* Shelf filter */}
          <div className="pixel-box flex flex-col gap-4 bg-card p-5 sm:p-6">
            <span className="font-display text-[11px] uppercase text-muted-foreground">
              Shelves
            </span>
            <div className="flex flex-wrap gap-2">
              <FilterButton
                active={filter === 'all'}
                onClick={() => setFilter('all')}
              >
                Everything ({artwork.length})
              </FilterButton>
              {artCategories.map((category) => {
                const count = artwork.filter(
                  (piece) => piece.category === category.id,
                ).length
                return (
                  <FilterButton
                    key={category.id}
                    active={filter === category.id}
                    onClick={() => setFilter(category.id)}
                  >
                    {category.label} ({count})
                  </FilterButton>
                )
              })}
            </div>
            <p className="text-xl text-muted-foreground">
              {filter === 'all'
                ? 'The full wall, newest shelves first.'
                : artCategories.find((c) => c.id === filter)?.blurb}
            </p>
          </div>

          {/* The wall */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pieces.map((piece, index) => (
              <ScrollReveal
                key={piece.id}
                variant="scale-up"
                delay={Math.min(index, 8) * 60}
              >
                <li>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    className="pixel-box pixel-lift group flex w-full flex-col bg-card text-left"
                  >
                    <div className="pixel-checker art-smooth relative aspect-square overflow-hidden border-b-4 border-foreground">
                      <Image
                        src={piece.src}
                        alt={piece.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className={cn(
                          'pixel-zoom',
                          piece.fit === 'cover'
                            ? 'object-cover'
                            : 'object-contain p-3',
                        )}
                      />
                      <PixelTag className="absolute left-0 top-0 border-l-0 border-t-0 bg-secondary text-secondary-foreground">
                        {
                          artCategories.find((c) => c.id === piece.category)
                            ?.label
                        }
                      </PixelTag>
                    </div>
                    <div className="flex flex-col gap-1 p-5">
                      <h2 className="font-display text-sm uppercase transition-transform duration-200 group-hover:-translate-y-0.5">
                        {piece.title}
                      </h2>
                      <p className="text-pretty text-xl leading-snug text-muted-foreground">
                        {piece.caption}
                      </p>
                    </div>
                  </button>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </main>

      {active ? (
        <Lightbox
          piece={active}
          position={`${(openIndex ?? 0) + 1} / ${pieces.length}`}
          onClose={() => setOpenIndex(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      ) : null}

      <SiteFooter />
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'pixel-press border-[3px] border-foreground px-3 py-1.5 font-display text-[10px] uppercase',
        active
          ? 'bg-foreground text-background'
          : 'bg-background text-foreground hover:bg-muted',
      )}
    >
      {children}
    </button>
  )
}

function Lightbox({
  piece,
  position,
  onClose,
  onPrev,
  onNext,
}: {
  piece: ArtPiece
  position: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-4"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="pixel-box-lg relative flex w-full max-w-4xl flex-col bg-card"
      >
        <div className="flex items-center justify-between gap-3 border-b-4 border-foreground bg-foreground px-4 py-3">
          <span className="font-display text-[10px] uppercase text-background">
            {piece.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-display text-[10px] uppercase text-background/60">
              {position}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="pixel-press grid size-8 place-items-center border-[3px] border-background bg-primary font-display text-[10px] text-primary-foreground"
            >
              X
            </button>
          </div>
        </div>

        <div className="pixel-checker art-smooth relative aspect-square max-h-[62vh] w-full sm:aspect-[4/3]">
          <Image
            src={piece.src}
            alt={piece.alt}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            priority
            className="object-contain p-4"
          />
        </div>

        <div className="flex flex-col gap-4 border-t-4 border-foreground p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-pretty text-xl text-muted-foreground">
            {piece.caption}
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={onPrev}
              className="pixel-box-sm pixel-press bg-card px-4 py-2 font-display text-[10px] uppercase"
            >
              &larr; Prev
            </button>
            <button
              type="button"
              onClick={onNext}
              className="pixel-box-sm pixel-press bg-primary px-4 py-2 font-display text-[10px] uppercase text-primary-foreground"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
