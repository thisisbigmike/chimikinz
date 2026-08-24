'use client'

import Image from 'next/image'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { fullSrc } from '@/lib/artwork'
import { latestDiscovery } from '@/lib/discoveries'
import { site } from '@/lib/site'

export function LatestDiscovery() {
  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <div className="pixel-box-lg grid items-stretch bg-card md:grid-cols-[1fr_1.1fr]">
            <div className="pixel-checker relative aspect-[4/3] w-full overflow-hidden border-b-4 border-border md:aspect-auto md:min-h-[380px] md:border-b-0 md:border-r-4">
              <Image
                src={fullSrc(latestDiscovery.slug)}
                alt={latestDiscovery.title}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="art-smooth pixel-float object-contain p-5"
              />
            </div>

            <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="size-3 shrink-0 animate-pulse bg-accent"
                  aria-hidden="true"
                />
                <PixelTag className="bg-accent text-accent-foreground">
                  {latestDiscovery.found}
                </PixelTag>
              </div>

              <div>
                <p className="font-display text-[10px] uppercase text-muted-foreground">
                  Latest discovery
                </p>
                <h2 className="mt-2 font-display text-2xl uppercase sm:text-3xl">
                  {latestDiscovery.title}
                </h2>
              </div>

              <p className="text-pretty text-2xl leading-snug text-muted-foreground">
                {latestDiscovery.note}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <PixelLink href="/gallery" size="md">
                  See it in the gallery
                </PixelLink>
                <span className="font-display text-[9px] uppercase text-muted-foreground">
                  New things turn up in {site.world} most weeks
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
