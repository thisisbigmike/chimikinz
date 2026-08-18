'use client'

import Image from 'next/image'
import { PixelLink } from '@/components/pixel/pixel-button'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { artwork, brandImages } from '@/lib/art'
import { cn } from '@/lib/utils'

/** A six-piece taste of the gallery — scenes first, portraits after. */
const preview = [
  'clover-cove-sign',
  'crosswalk',
  'what-if',
  'tiger-onesie',
  'hollow-mask',
  'beach-day',
].map((id) => artwork.find((piece) => piece.id === id)!)

export function ArtWall() {
  return (
    <section className="border-b-4 border-foreground">
      {/* Full-bleed cast strip — the whole nest in one line. */}
      <ScrollReveal variant="fade-up">
        <div className="art-smooth relative h-40 w-full border-b-4 border-foreground bg-secondary sm:h-56 lg:h-64">
          <Image
            src={brandImages.bannerWide}
            alt="The full cast of Chimikinz oddlings gathered together for a group portrait"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </ScrollReveal>

      <div className="mx-auto flex max-w-7xl flex-col px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            eyebrow="The Gallery"
            title="Drawn one at a time"
            body="Scenes from Clover Cove and portraits of the Chimis who live there. This is a handful — the whole wall is a click away."
          />
        </ScrollReveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((piece, i) => (
            <ScrollReveal key={piece.id} variant="scale-up" delay={i * 110}>
              <li>
                <article className="pixel-box pixel-lift group flex h-full flex-col bg-card">
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
                  </div>
                  <div className="flex flex-col gap-1 p-5">
                    <h3 className="font-display text-sm uppercase transition-transform duration-200 group-hover:-translate-y-0.5">
                      {piece.title}
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-muted-foreground">
                      {piece.caption}
                    </p>
                  </div>
                </article>
              </li>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal variant="fade-up" delay={200}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <PixelLink href="/gallery" size="lg">
              See all {artwork.length} pieces
            </PixelLink>
            <PixelLink href="/collections" variant="bone" size="lg">
              Collections
            </PixelLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
