import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ChimiRail } from '@/components/chimi-rail'
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
          </div>
        </section>

        {/* The four, as a rail of faces. Everything there is to say about
            any of them is on their own card, so this is just the way in. */}
        <section className="border-b-4 border-border">
          <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:pt-20">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                align="center"
                eyebrow="Swipe through"
                title="Pick a face"
                body="The rail drifts along on its own until you take hold of it. Any Chimi you tap opens their card."
                className="mx-auto"
              />
            </ScrollReveal>
          </div>
          <ChimiRail
            chimis={mainChimis}
            label="The four founding Chimis"
            className="pb-8 lg:pb-12"
          />
        </section>

        {/* Rare personalities — renders only once one exists */}
        {rareChimis.length > 0 ? (
          <section className="border-b-4 border-border">
            <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:pt-20">
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
            <ChimiRail
              chimis={rareChimis}
              label="The rare Chimis"
              className="pb-8 lg:pb-12"
            />
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
