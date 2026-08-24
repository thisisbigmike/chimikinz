import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ChimiCard } from '@/components/chimi-card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { chimis, chimiBySlug } from '@/lib/chimis'
import { site } from '@/lib/site'

type Params = { params: Promise<{ slug: string }> }

/** All four prerender at build time; adding a Chimi adds a page. */
export function generateStaticParams() {
  return chimis.map((chimi) => ({ slug: chimi.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const chimi = chimiBySlug(slug)
  if (!chimi) return {}

  return {
    title: chimi.name,
    description: `${chimi.name}, the Chimi of ${chimi.emotion.toLowerCase()} in ${site.world}. ${chimi.personality}`,
    openGraph: {
      title: `${chimi.name} · ${site.name}`,
      description: chimi.personality,
      images: [{ url: chimi.art }],
    },
  }
}

export default async function ChimiDetailPage({ params }: Params) {
  const { slug } = await params
  const chimi = chimiBySlug(slug)
  if (!chimi) notFound()

  // Wrap around the roster so the pager never dead-ends.
  const order = chimis.findIndex((c) => c.slug === chimi.slug)
  const previous = chimis[(order - 1 + chimis.length) % chimis.length]
  const next = chimis[(order + 1) % chimis.length]
  const hasNeighbours = chimis.length > 1

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="flex flex-col gap-10">
          <Link
            href="/chimis"
            className="group w-fit font-display text-[10px] uppercase tracking-tight text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
              &larr;
            </span>{' '}
            All the Chimis
          </Link>

          <ScrollReveal variant="fade-up">
            <ChimiCard chimi={chimi} />
          </ScrollReveal>

          {/* The longer telling — everything the card has no room for. */}
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
              <div className="flex flex-col gap-5">
                <h2 className="font-display text-lg uppercase sm:text-xl">
                  {chimi.name}, at length
                </h2>
                {chimi.story.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-pretty text-xl leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-col gap-6">
                <blockquote
                  className="pixel-box-sm border-l-8 bg-card p-5"
                  style={{ borderLeftColor: chimi.accent }}
                >
                  <p className="text-pretty text-2xl leading-snug text-foreground">
                    &ldquo;{chimi.quote}&rdquo;
                  </p>
                </blockquote>

                <div className="pixel-box bg-card p-5">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-4 shrink-0 border-2 border-border"
                      style={{ backgroundColor: chimi.accent }}
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-[10px] uppercase text-muted-foreground">
                      Companion
                    </h3>
                  </div>
                  <p className="mt-3 font-display text-sm uppercase">
                    {chimi.companion.name}
                  </p>
                  <p className="mt-2 text-pretty text-xl leading-snug text-muted-foreground">
                    {chimi.companion.body}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Straight on to the next one */}
          {hasNeighbours ? (
            <nav
              aria-label="More Chimis"
              className="grid gap-4 border-t-4 border-border pt-8 sm:grid-cols-2"
            >
              {[
                { chimi: previous, direction: 'Previous', arrow: '←' },
                { chimi: next, direction: 'Next', arrow: '→' },
              ].map(({ chimi: neighbour, direction, arrow }) => (
                <Link
                  key={direction}
                  href={`/chimis/${neighbour.slug}`}
                  className="group pixel-box pixel-press flex items-center gap-4 bg-card p-4"
                >
                  <span
                    className="size-10 shrink-0 border-4 border-border"
                    style={{ backgroundColor: neighbour.accent }}
                    aria-hidden="true"
                  />
                  <span className="flex flex-col">
                    <span className="font-display text-[9px] uppercase text-muted-foreground">
                      {direction}
                    </span>
                    <span className="font-display text-sm uppercase">
                      {neighbour.name}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`pixel-arrow ml-auto font-display text-sm text-primary ${
                      direction === 'Previous' ? 'order-first' : ''
                    }`}
                  >
                    {arrow}
                  </span>
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
