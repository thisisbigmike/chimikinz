import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ChimiProfile } from '@/components/chimi-profile'
import { mainChimis, rareChimis } from '@/lib/chimis'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'The Chimis',
  description: `Meet the Chimis of ${site.world} — the feelings that grew into characters.`,
}

export default function ChimisPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main>
        {/* Intro */}
        <section className="border-b-4 border-border">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
            <ScrollReveal variant="pixel-pop">
              <PixelTag className="bg-secondary text-secondary-foreground">
                The residents
              </PixelTag>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={100}>
              <h1 className="text-balance font-display text-3xl uppercase leading-[1.15] sm:text-4xl">
                <span className="pixel-text-shadow-primary">The Chimis</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200}>
              <p className="max-w-2xl text-pretty text-2xl leading-snug text-muted-foreground">
                Every Chimi starts as a feeling. Four of them arrived first and
                between them worked out what {site.world} was going to be —
                what it looks like, how fast it moves, and how forgiving it is
                when you get something wrong.
              </p>
            </ScrollReveal>

            {/* Quick jump — a small thing to notice on the way down */}
            <ScrollReveal variant="fade-up" delay={300}>
              <ul className="flex flex-wrap items-center justify-center gap-3">
                {mainChimis.map((chimi) => (
                  <li key={chimi.slug}>
                    <a
                      href={`#${chimi.slug}`}
                      className="pixel-box-sm pixel-press inline-flex items-center gap-2 bg-card px-3 py-2 font-display text-[10px] uppercase"
                    >
                      <span
                        className="size-3 shrink-0 border-2 border-border"
                        style={{ backgroundColor: chimi.accent }}
                        aria-hidden="true"
                      />
                      {chimi.name}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>

        {/* The four */}
        {mainChimis.map((chimi, i) => (
          <ChimiProfile key={chimi.slug} chimi={chimi} flipped={i % 2 === 1} />
        ))}

        {/* Rare personalities — renders only once one exists */}
        {rareChimis.length > 0 ? (
          <section className="border-b-4 border-border bg-muted">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
              <ScrollReveal variant="fade-up">
                <SectionHeading
                  align="center"
                  eyebrow="Rarely seen"
                  title="The rare ones"
                  body="Personalities that turn up once in a long while."
                  className="mx-auto"
                />
              </ScrollReveal>
            </div>
            {rareChimis.map((chimi, i) => (
              <ChimiProfile
                key={chimi.slug}
                chimi={chimi}
                flipped={i % 2 === 1}
              />
            ))}
          </section>
        ) : (
          <section className="border-b-4 border-border bg-muted">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-14 text-center sm:px-6 lg:py-20">
              <ScrollReveal variant="fade-up">
                <PixelTag className="bg-card">More to come</PixelTag>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={100}>
                <h2 className="text-balance font-display text-xl uppercase sm:text-2xl">
                  Others are still arriving
                </h2>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={200}>
                <p className="text-pretty text-2xl leading-snug text-muted-foreground">
                  Hope, nostalgia, courage, and a few feelings nobody has found
                  the word for yet. They turn up in the gallery long before they
                  turn up here.
                </p>
              </ScrollReveal>
              <ScrollReveal variant="fade-up" delay={300}>
                <PixelLink href="/gallery" size="lg">
                  Go look for them
                </PixelLink>
              </ScrollReveal>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
