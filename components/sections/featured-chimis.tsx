'use client'

import { CollectionCard } from '@/components/collection-card'
import { PixelLink } from '@/components/pixel/pixel-button'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { featuredChimis } from '@/lib/collection'

export function FeaturedChimis() {
  return (
    <section className="border-b-4 border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Fresh out the sketchbook"
              title="A few from the collection"
              body="Twelve are out in the open. The rest stay hidden until mint."
            />
            <PixelLink href="/gallery" variant="bone">
              View all
            </PixelLink>
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredChimis.map((chimi, index) => (
            <ScrollReveal key={chimi.id} variant="scale-up" delay={index * 100}>
              <li>
                <CollectionCard chimi={chimi} priority={index < 2} />
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
