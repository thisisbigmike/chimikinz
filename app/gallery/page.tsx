'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  artGroups,
  artwork,
  artworkByGroup,
  chimiMark,
  fullSrc,
  thumbSrc,
} from '@/lib/artwork'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function GalleryPage() {
  /** Index into `artwork` — the lightbox walks the flat list. */
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])

  const step = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current
      return (current + delta + artwork.length) % artwork.length
    })
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

  const open = openIndex === null ? null : artwork[openIndex]

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-8">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                eyebrow="The gallery"
                title="Everything we've drawn"
                body={`Every piece from the ${site.world} sketchbook — the four who started it, the oddlings that followed, and the days they got up to something. Click any piece to open it.`}
              />
            </ScrollReveal>

            <ScrollReveal variant="scale-up" delay={150}>
              <div className="pixel-box-lg pixel-checker relative size-36 shrink-0 bg-card sm:size-44">
                <Image
                  src={chimiMark}
                  alt=""
                  fill
                  sizes="176px"
                  priority
                  className="art-smooth pixel-float object-contain p-3"
                />
              </div>
            </ScrollReveal>
          </div>

          <div className="flex items-center gap-3 font-display text-xs uppercase text-muted-foreground">
            <span className="h-1 flex-1 bg-foreground/20" />
            <span>{artwork.length} pieces</span>
            <span className="h-1 flex-1 bg-foreground/20" />
          </div>

          {/* The wall, one section per group */}
          {artGroups.map((group) => {
            const pieces = artworkByGroup(group.id)
            if (pieces.length === 0) return null

            return (
              <section key={group.id} className="flex flex-col gap-6">
                <ScrollReveal variant="fade-up">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b-4 border-foreground pb-4">
                    <h2 className="font-display text-lg uppercase sm:text-xl">
                      {group.label}
                    </h2>
                    <PixelTag className="bg-secondary text-secondary-foreground">
                      {pieces.length}
                    </PixelTag>
                    <p className="w-full text-pretty text-xl text-muted-foreground sm:w-auto sm:flex-1">
                      {group.blurb}
                    </p>
                  </div>
                </ScrollReveal>

                <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                  {pieces.map((piece, i) => (
                    <ScrollReveal
                      key={piece.slug}
                      variant="scale-up"
                      delay={(i % 4) * 80}
                      // Wide pieces keep their own height instead of
                      // stretching to match the square cards beside them.
                      className={cn(piece.wide && 'col-span-2 self-start')}
                    >
                      <li className="h-full">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenIndex(
                              artwork.findIndex((a) => a.slug === piece.slug),
                            )
                          }
                          aria-label={`Open ${piece.title}`}
                          className="group pixel-box pixel-press flex h-full w-full flex-col bg-card"
                        >
                          <div
                            className={cn(
                              'pixel-checker relative w-full overflow-hidden border-b-4 border-foreground',
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
              </section>
            )
          })}
        </div>
      </main>

      {/* Lightbox */}
      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 p-4"
          onClick={close}
        >
          <div
            className="pixel-box-lg pixel-slide-up relative flex w-full max-w-3xl flex-col bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pixel-checker relative aspect-square w-full border-b-4 border-foreground sm:aspect-[4/3]">
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
                  {(openIndex ?? 0) + 1} / {artwork.length}
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
