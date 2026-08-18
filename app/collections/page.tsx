import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import {
  anyCollectionLive,
  collections,
  type Collection,
} from '@/lib/collections'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Collections',
  description: `Every Chimikinz drop and where to find it. ${site.supply.toLocaleString()} hand-drawn oddlings minting on ${site.chain}.`,
}

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <ScrollReveal variant="fade-up">
            <SectionHeading
              eyebrow="Collections"
              title="Where the oddlings live"
              body={
                anyCollectionLive
                  ? 'Pick a drop to open it on OpenSea. Every trade happens on-chain — the site just points the way.'
                  : `Nothing is trading yet. Each drop below opens on OpenSea the moment it goes live — ${site.launch} is the target.`
              }
            />
          </ScrollReveal>

          {!anyCollectionLive ? (
            <ScrollReveal variant="fade-up" delay={80}>
              <div className="pixel-box flex flex-col gap-4 bg-secondary p-5 text-secondary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex flex-col gap-1">
                  <p className="font-display text-sm uppercase">
                    Mint hasn&apos;t opened yet
                  </p>
                  <p className="text-xl">
                    Get on the allowlist in Discord so you&apos;re first through
                    the door.
                  </p>
                </div>
                <PixelLink
                  href={site.links.discord}
                  external
                  variant="ink"
                  className="shrink-0"
                >
                  Join Discord
                </PixelLink>
              </div>
            </ScrollReveal>
          ) : null}

          <ul className="grid gap-8 lg:grid-cols-3">
            {collections.map((collection, i) => (
              <ScrollReveal
                key={collection.id}
                variant="scale-up"
                delay={i * 120}
              >
                <li className="h-full">
                  <CollectionCard collection={collection} />
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal variant="fade-up">
            <div className="pixel-box flex flex-col gap-4 bg-card p-6 sm:p-8">
              <h2 className="font-display text-lg uppercase">
                Buying safely
              </h2>
              <p className="max-w-3xl text-pretty text-xl text-muted-foreground">
                Chimikinz only ever lists from this site and the official
                accounts below. If you find a Chimikinz collection anywhere else
                before launch, it isn&apos;t ours. Check the contract address
                against the one posted in Discord before you sign anything.
              </p>
              <div className="flex flex-wrap gap-3">
                <PixelLink href={site.links.x} external variant="bone" size="sm">
                  X / Twitter
                </PixelLink>
                <PixelLink
                  href={site.links.discord}
                  external
                  variant="bone"
                  size="sm"
                >
                  Discord
                </PixelLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function CollectionCard({ collection }: { collection: Collection }) {
  const live = collection.status === 'live' && Boolean(collection.opensea)

  const art = (
    <div className="pixel-checker art-smooth relative aspect-[4/3] overflow-hidden border-b-4 border-foreground">
      <Image
        src={collection.image}
        alt={collection.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className={live ? 'pixel-zoom object-cover' : 'object-cover opacity-55'}
      />

      {live ? (
        <PixelTag className="absolute left-0 top-0 border-l-0 border-t-0 bg-accent text-accent-foreground">
          Live
        </PixelTag>
      ) : (
        // Pre-launch: the art is still shown, just sealed behind the notice.
        <div className="absolute inset-0 grid place-items-center bg-foreground/45">
          <span className="pixel-box-sm bg-secondary px-4 py-2 font-display text-xs uppercase text-secondary-foreground">
            Coming Soon
          </span>
        </div>
      )}
    </div>
  )

  const body = (
    <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
      <h2 className="font-display text-base uppercase">{collection.name}</h2>
      <p className="flex-1 text-pretty text-xl leading-snug text-muted-foreground">
        {collection.blurb}
      </p>

      <dl className="grid grid-cols-3 gap-2">
        {collection.facts.map((fact) => (
          <div
            key={fact.label}
            className="pixel-box-sm bg-background px-2 py-2 text-center"
          >
            <dt className="font-display text-[9px] uppercase text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-1 font-display text-[10px] uppercase">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {live ? (
        <span className="pixel-box pixel-press mt-1 inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 font-display text-xs uppercase text-primary-foreground">
          View on OpenSea &rarr;
        </span>
      ) : (
        <span className="mt-1 inline-flex items-center justify-center gap-2 border-4 border-dashed border-muted-foreground/50 px-6 py-3 font-display text-xs uppercase text-muted-foreground">
          Opens on launch
        </span>
      )}
    </div>
  )

  // Live drops are a real link out; locked ones are inert on purpose, so there
  // is nothing to click through to an empty storefront.
  if (live) {
    return (
      <a
        href={collection.opensea}
        target="_blank"
        rel="noopener noreferrer"
        className="pixel-box pixel-lift group flex h-full flex-col bg-card"
      >
        {art}
        {body}
      </a>
    )
  }

  return (
    <div
      aria-label={`${collection.name} — coming soon`}
      className="pixel-box flex h-full flex-col bg-card"
    >
      {art}
      {body}
    </div>
  )
}
