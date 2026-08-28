'use client'

import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { site } from '@/lib/site'

export function CloverCoveBanner() {
  return (
    <section className="border-b-4 border-border bg-muted">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
        <ScrollReveal variant="pixel-pop">
          <PixelTag className="bg-accent text-accent-foreground">
            Launching {site.launch}
          </PixelTag>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100}>
          <h2 className="text-balance font-display text-2xl uppercase sm:text-3xl lg:text-4xl">
            Welcome to {site.world}
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200}>
          <p className="max-w-2xl text-pretty text-2xl leading-snug text-muted-foreground">
            Tiny beings born from emotions. A world where every Chimi begins
            as a feeling, growing into a unique companion with a story of
            its own.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PixelLink href={site.links.discord} external size="lg">
              Join Discord
            </PixelLink>
            <PixelLink
              href={site.links.xFollowIntent}
              external
              variant="bone"
              size="lg"
            >
              Follow on X
            </PixelLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
