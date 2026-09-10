'use client'

import { useMemo } from 'react'
import ThumbnailSlider, {
  type ThumbnailSlide,
} from '@/components/ui/thumbnail-slider'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { artwork, fullSrc, thumbSrc } from '@/lib/artwork'

/**
 * The one-of-ones, as a slider: one on the stage, the rest on the strip.
 *
 * Fed from the `ones` bucket in lib/artwork, so a new 1/1 added there turns
 * up here and in the gallery at once with nothing to wire up twice.
 */
export function RarePersonalities() {
  const slides = useMemo<ThumbnailSlide[]>(
    () =>
      artwork
        .filter((piece) => piece.category === 'ones')
        .map((piece) => ({
          src: fullSrc(piece.slug),
          thumbnailSrc: thumbSrc(piece.slug),
          alt: piece.alt,
        })),
    [],
  )

  if (slides.length === 0) return null

  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="One of one"
            title="Rare Personalities"
            body="The chimis that turned up exactly once. Drag the strip, or pick one off the row underneath."
            className="mx-auto"
          />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100}>
          <ThumbnailSlider slides={slides} />
        </ScrollReveal>
      </div>
    </section>
  )
}
