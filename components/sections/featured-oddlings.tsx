'use client'

import { OddlingCard } from '@/components/oddling-card'
import { PixelLink } from '@/components/pixel/pixel-button'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { featuredOddlings } from '@/lib/oddlings'

export function FeaturedOddlings() {
  return (
    <section className="border-b-4 border-foreground bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Fresh out the sketchbook"
              title="Meet a few oddlings"
              body="Twelve are out in the open. The rest stay hidden until mint."
            />
            <PixelLink href="/gallery" variant="ink">
              View all
            </PixelLink>
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOddlings.map((oddling, index) => (
            <ScrollReveal key={oddling.id} variant="scale-up" delay={index * 100}>
              <li>
                <OddlingCard oddling={oddling} priority={index < 2} />
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
