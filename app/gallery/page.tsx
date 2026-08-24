'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ChimiOfTheMoment } from '@/components/chimi-of-the-moment'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  activeCategories,
  artwork,
  chimiMark,
  fullSrc,
  thumbSrc,
  type ArtCategory,
  type Artwork,
} from '@/lib/artwork'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function GalleryPage() {
  const [filter, setFilter] = useState<ArtCategory | 'all'>('all')
  /** Index into the *filtered* list — the lightbox walks what you can see. */
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const categories = useMemo(() => activeCategories(), [])

  const visible = useMemo(
    () =>
      filter === 'all'
        ? artwork
        : artwork.filter((piece) => piece.category === filter),
    [filter],
  )

  const close = useCallback(() => setOpenIndex(null), [])

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current
        return (current + delta + visible.length) % visible.length
      })
    },
    [visible.length],
  )

  /** Opening a specific piece (e.g. from the randomizer) clears the filter. */
  const openPiece = useCallback((piece: Artwork) => {
    setFilter('all')
    setOpenIndex(artwork.findIndex((a) => a.slug === piece.slug))
  }, [])

  useEffect(() => {
    if (openIndex === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [openIndex, close, step])

  const open = openIndex === null ? null : visible[openIndex]

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-8">
            <ScrollReveal variant="fade-up">
              <div className="flex flex-col gap-4">
                <PixelTag className="bg-secondary text-secondary-foreground">
                  The archive
                </PixelTag>
                <h1 className="text-balance font-display text-3xl uppercase leading-[1.15] sm:text-4xl">
                  <span className="pixel-text-shadow-primary">
                    Chimi Gallery
                  </span>
                </h1>
                <p className="max-w-xl text-pretty text-2xl leading-snug text-muted-foreground">
                  Everything drawn in {site.world} so far. Let it pick one for
                  you, or scroll the whole thing.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="scale-up" delay={150}>
              <div className="pixel-box-lg art-ground relative size-32 shrink-0 bg-card sm:size-40">
                <Image
                  src={chimiMark}
                  alt=""
                  fill
                  sizes="160px"
                  priority
                  className="art-smooth pixel-float object-contain p-3"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Chimi of the moment */}
          <ScrollReveal variant="fade-up" delay={100}>
            <ChimiOfTheMoment onOpen={openPiece} />
          </ScrollReveal>

          {/* Filters */}
          <div className="flex flex-col gap-4 border-t-4 border-border pt-6">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setFilter('all')
                  setOpenIndex(null)
                }}
                className={cn(
                  'pixel-box-sm pixel-press px-3 py-2 font-display text-[10px] uppercase',
                  filter === 'all'
                    ? 'bg-foreground text-background'
                    : 'bg-card hover:bg-secondary',
                )}
              >
                All ({artwork.length})
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setFilter(category.id)
                    setOpenIndex(null)
                  }}
                  className={cn(
                    'pixel-box-sm pixel-press px-3 py-2 font-display text-[10px] uppercase',
                    filter === category.id
                      ? 'bg-foreground text-background'
                      : 'bg-card hover:bg-secondary',
                  )}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>

            <p className="font-display text-[9px] uppercase text-muted-foreground">
              Showing {visible.length}{' '}
              {visible.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          {/* The wall */}
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((piece, i) => (
              <ScrollReveal
                key={piece.slug}
                variant="scale-up"
                delay={(i % 4) * 70}
                // Wide pieces keep their own height rather than stretching
                // to match the square cards beside them.
                className={cn(piece.wide && 'col-span-2 self-start')}
              >
                <li className="h-full">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    aria-label={`Open ${piece.title}`}
                    className="group pixel-box pixel-press flex h-full w-full flex-col bg-card"
                  >
                    <div
                      className={cn(
                        'art-ground relative w-full overflow-hidden border-b-4 border-border',
                        piece.wide ? 'aspect-[3/1]' : 'aspect-square',
                      )}
                    >
                      <Image
                        src={thumbSrc(piece.slug)}
                        alt={piece.alt}
                        fill
                        sizes={
                          piece.wide
                            ? '(min-width: 1024px) 50vw, 100vw'
                            : '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw'
                        }
                        className="art-smooth object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <span className="flex items-center justify-between gap-2 p-3 text-left font-display text-[10px] uppercase">
                      {piece.title}
                      <span className="pixel-arrow text-primary">+</span>
                    </span>
                  </button>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </main>

      {/* Lightbox */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/90 p-4"
          onClick={close}
        >
          <div
            className="pixel-box-lg pixel-slide-up relative flex w-full max-w-3xl flex-col bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="art-ground relative aspect-square w-full border-b-4 border-border sm:aspect-[4/3]">
              <Image
                src={fullSrc(open.slug)}
                alt={open.alt}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="art-smooth object-contain"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5">
              <div className="flex flex-col gap-1">
                <h2 className="font-display text-sm uppercase sm:text-base">
                  {open.title}
                </h2>
                <p className="text-xl leading-snug text-muted-foreground">
                  {open.alt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous piece"
                  className="pixel-box-sm pixel-press grid size-10 place-items-center bg-background font-display text-sm"
                >
                  &larr;
                </button>
                <span className="font-display text-[10px] uppercase text-muted-foreground">
                  {(openIndex ?? 0) + 1} / {visible.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next piece"
                  className="pixel-box-sm pixel-press grid size-10 place-items-center bg-background font-display text-sm"
                >
                  &rarr;
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="pixel-box-sm pixel-press absolute right-4 top-4 grid size-10 place-items-center bg-primary font-display text-sm text-primary-foreground"
            >
              X
            </button>
          </div>
        </div>
      ) : null}

      <SiteFooter />
    </div>
  )
}
