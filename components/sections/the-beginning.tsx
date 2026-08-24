'use client'

import { PixelHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { site } from '@/lib/site'

export function TheBeginning() {
  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <PixelHeading as="h2" className="text-2xl sm:text-3xl">
            The Beginning
          </PixelHeading>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={100}>
          <p className="text-pretty text-2xl leading-snug text-muted-foreground">
            Every great world starts with a single seed. For {site.name},
            that seed was a simple idea: what if emotions had tiny
            companions?
          </p>
        </ScrollReveal>
        <ScrollReveal variant="fade-up" delay={200}>
          <p className="text-pretty text-2xl leading-snug text-foreground">
            That question became {site.world}, and this is only the
            beginning.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
