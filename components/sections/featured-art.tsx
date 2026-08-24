'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PixelLink } from '@/components/pixel/pixel-button'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { artwork, thumbSrc } from '@/lib/artwork'
import { cn } from '@/lib/utils'

/** A hand-picked handful — the pieces worth leading with. */
const featuredSlugs = [
  'the-crossing',
  'wrapped-crown',
  'first-sea',
  'tiger-suit',
  'night-hill',
  'blue-braid',
  'four-windows',
  'bone-mask',
]

const featured = featuredSlugs
  .map((slug) => artwork.find((piece) => piece.slug === slug))
  .filter((piece): piece is NonNullable<typeof piece> => Boolean(piece))

export function FeaturedArt() {
  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="From the archive"
              title="A few worth stopping on"
              body="Everything is drawn by hand, one at a time. These are some of the ones we keep coming back to."
            />
            <PixelLink href="/gallery" variant="ink">
              Open the gallery
            </PixelLink>
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((piece, i) => (
            <ScrollReveal key={piece.slug} variant="scale-up" delay={(i % 4) * 90}>
              <li className="h-full">
                <Link
                  href="/gallery"
                  aria-label={`${piece.title} — open the gallery`}
                  className={cn(
                    'group pixel-box pixel-press flex h-full flex-col bg-card',
                  )}
                >
                  <div className="art-ground relative aspect-square w-full overflow-hidden border-b-4 border-border">
                    <Image
                      src={thumbSrc(piece.slug)}
                      alt={piece.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="art-smooth object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="p-3 text-left font-display text-[10px] uppercase">
                    {piece.title}
                  </span>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
