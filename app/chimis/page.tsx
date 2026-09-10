import Image from 'next/image'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ChimiRail } from '@/components/chimi-rail'
import { RarePersonalities } from '@/components/sections/rare-personalities'
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
        {/* Intro.
         *
         * Same treatment as the home hero: the scene sits *behind* the copy
         * on pinned cream paper, so the section keeps its own height instead
         * of growing to fit the art. `--art-ground` does not swap with the
         * theme (it is the paper this ink was drawn for), so the ink on top
         * is pinned too — without that, a reader on dark gets cream type on
         * cream paper.
         *
         * The paper runs up behind the header too, which paints no
         * background of its own — only its inner pill does. The section is
         * pulled up by the bar's height and its content pushed back down by
         * the same, so nothing moves except the art, which now meets the top
         * of the page instead of stopping under a strip of flat cream. */}
        <section className="art-ground relative isolate mt-[calc(var(--header-h)*-1)] overflow-hidden border-b-4 border-border pt-[var(--header-h)] text-night [--line:var(--night)] [--shade:var(--night)]">
          {/* 70rem is a cap, not a width: bleeding the band edge to edge
              blows the four of them up past legibility, and past the cap the
              flat cream takes over while `hero-art-fade` dissolves the two
              side edges. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="hero-art-fade absolute inset-y-0 left-1/2 w-[min(100%,70rem)] -translate-x-1/2">
              <Image
                src="/chimikinz/chimis-walking.webp"
                alt=""
                fill
                priority
                sizes="(min-width: 1120px) 70rem, 100vw"
                className="art-smooth object-cover opacity-45"
              />
            </div>
            <div className="hero-art-veil absolute inset-0" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
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
              <p className="max-w-2xl text-pretty text-2xl leading-snug text-night/85">
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
                body="One Chimi at a time, front and centre. Step through them with the arrows, and tap any of them to open their card."
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

        <RarePersonalities />
      </main>

      <SiteFooter />
    </div>
  )
}
