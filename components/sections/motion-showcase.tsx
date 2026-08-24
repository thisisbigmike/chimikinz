'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { motionClass, motionPieces } from '@/lib/motion'

export function MotionShowcase() {
  return (
    <section className="border-b-4 border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="Moving pictures"
            title="The Cove, in motion"
            body="Small loops from around Clover Cove. Hover one to hold it still."
            className="mx-auto"
          />
        </ScrollReveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {motionPieces.map((piece, i) => (
            <ScrollReveal key={piece.slug} variant="scale-up" delay={i * 120}>
              <li className="h-full">
                <figure className="motion-card pixel-box flex h-full flex-col bg-card">
                  <div className="art-ground relative aspect-square w-full overflow-hidden border-b-4 border-border">
                    <Image
                      src={piece.motionSrc ?? piece.still}
                      alt={piece.alt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      unoptimized={Boolean(piece.motionSrc)}
                      className={`art-smooth object-contain p-3 ${
                        // A real GIF animates itself; a still needs our help.
                        piece.motionSrc ? '' : motionClass[piece.motion]
                      }`}
                    />
                  </div>
                  <figcaption className="flex flex-1 flex-col gap-2 p-4">
                    <h3 className="font-display text-xs uppercase">
                      {piece.title}
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-muted-foreground">
                      {piece.caption}
                    </p>
                  </figcaption>
                </figure>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
