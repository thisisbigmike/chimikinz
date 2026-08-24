'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ComingSoonModal } from '@/components/coming-soon-modal'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { collections, type Collection } from '@/lib/collections'
import { launched, site } from '@/lib/site'

export default function CollectionsPage() {
  const [pending, setPending] = useState<Collection | null>(null)

  /**
   * Before launch every card opens the modal. After launch the same click
   * goes straight to that collection's OpenSea page.
   */
  const open = (collection: Collection) => {
    if (launched && collection.opensea) {
      window.open(collection.opensea, '_blank', 'noopener,noreferrer')
      return
    }
    setPending(collection)
  }

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <ScrollReveal variant="fade-up">
            <SectionHeading
              eyebrow="The vault"
              title="Collections"
              body={`Every drop from the ${site.world} sketchbook. Open one to take it to OpenSea — the ones still being drawn will tell you so.`}
            />
          </ScrollReveal>

          {!launched ? (
            <ScrollReveal variant="fade-up" delay={100}>
              <div className="pixel-box flex flex-col gap-2 bg-secondary p-5 text-secondary-foreground sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display text-[11px] uppercase">
                  Mint is not live yet
                </p>
                <p className="text-xl">
                  Trading opens on OpenSea at launch — {site.launch}.
                </p>
              </div>
            </ScrollReveal>
          ) : null}

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection, i) => (
              <ScrollReveal
                key={collection.slug}
                variant="fade-up"
                delay={i * 150}
              >
                <li className="group flex h-full">
                  <button
                    type="button"
                    onClick={() => open(collection)}
                    className="pixel-box pixel-press pixel-lift flex flex-1 flex-col bg-card text-left"
                  >
                    <div className="art-ground relative aspect-[4/3] w-full overflow-hidden border-b-4 border-border">
                      <Image
                        src={collection.cover}
                        alt={collection.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        priority={i === 0}
                        className="art-smooth pixel-wiggle object-contain p-5"
                      />
                      <span className="absolute left-0 top-0 border-b-4 border-r-4 border-border bg-primary px-3 py-1 font-display text-[9px] uppercase leading-none text-primary-foreground">
                        {collection.status}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col gap-3 p-5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h2 className="font-display text-base uppercase">
                          {collection.name}
                        </h2>
                        <PixelTag className="bg-background">
                          {collection.supply}
                        </PixelTag>
                      </div>

                      <p className="text-pretty text-xl leading-snug text-muted-foreground">
                        {collection.blurb}
                      </p>

                      <span className="mt-auto pt-2 font-display text-[10px] uppercase text-primary">
                        {launched ? 'View on OpenSea' : 'Open collection'}{' '}
                        <span className="pixel-arrow">&rarr;</span>
                      </span>
                    </div>
                  </button>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </main>

      {pending ? (
        <ComingSoonModal
          title={pending.name}
          onClose={() => setPending(null)}
        />
      ) : null}

      <SiteFooter />
    </div>
  )
}
