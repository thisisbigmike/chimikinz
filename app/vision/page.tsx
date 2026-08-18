import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { roadmap, site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Vision',
  description:
    'Why Chimikinz exists, what it is setting out to build, and the rules it holds itself to along the way.',
}

/** The three things the project is actually trying to be. */
const pillars = [
  {
    title: 'Drawn, not generated',
    body: 'Every oddling is inked by hand. No trait generator shuffling the same six hats into 4,444 combinations. If a Chimi is wearing a traffic cone, someone sat down and drew the cone.',
    image: '/chimikinz/art/watering-can.png',
    alt: 'A Chimi watering a single small seedling in a pot',
  },
  {
    title: 'A world, not a wallet line',
    body: 'Clover Cove came first and the collection came out of it. Crosswalks, hilltops, bad wifi, quiet beaches — the art is about being small in a big place, and that is what the project keeps making.',
    image: '/chimikinz/art/four-windows.png',
    alt: 'Four windows showing the same wall across four different seasons',
  },
  {
    title: 'Slow, and finished',
    body: 'We would rather ship one thing that holds up than ten that do not. The charm ledger, the lore, the shorts — each lands when it is actually done, not when a calendar says so.',
    image: '/chimikinz/art/run-together.png',
    alt: 'One Chimi pulling another along by the hand at a run',
  },
]

/** Concrete outcomes, so the vision is checkable rather than vibes. */
const goals = [
  {
    horizon: 'At launch',
    items: [
      `All ${site.supply.toLocaleString()} oddlings minted on ${site.chain}, each with its charm and traits recorded on-chain.`,
      'Allowlist honoured first, so the people who showed up early get in before anyone else.',
      'Every holder can look up exactly what makes their oddling different.',
    ],
  },
  {
    horizon: 'First year',
    items: [
      'The charm ledger open to holders — the full trait and lore record, not a screenshot.',
      'Animated shorts putting the Chimis on screen instead of only on a wall.',
      'Community drops decided with holders rather than announced at them.',
    ],
  },
  {
    horizon: 'Longer out',
    items: [
      'Merch that looks like the art, made in runs small enough to stay good.',
      'Collaborations with artists who draw by hand too.',
      'Clover Cove standing on its own — a world people know before they know the token.',
    ],
  },
]

/** Commitments, stated plainly so they can be held against us. */
const principles = [
  'No roadmap promise we cannot fund ourselves.',
  'No paid-shill campaigns or bought floor activity.',
  'No surprise second collection that dilutes the first.',
  'The contract address is posted in Discord and nowhere else matters.',
]

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main>
        {/* Statement */}
        <section className="border-b-4 border-foreground">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20">
            <div className="flex flex-col items-start gap-6">
              <ScrollReveal variant="pixel-pop">
                <PixelTag className="bg-accent text-accent-foreground">
                  The Vision
                </PixelTag>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={100}>
                <h1 className="max-w-2xl text-balance font-display text-3xl uppercase leading-[1.15] sm:text-4xl lg:text-5xl">
                  <span className="pixel-text-shadow-primary text-foreground">
                    Make something small feel worth keeping
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={200}>
                <p className="max-w-xl text-pretty text-2xl leading-snug text-muted-foreground">
                  Chimikinz started as a sketchbook, not a pitch deck. The
                  ambition has not changed since: draw a world worth spending
                  time in, put {site.supply.toLocaleString()} of its residents
                  on-chain, and be the kind of project that is still here in a
                  few years because it never over-promised in the first place.
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={300}>
                <div className="flex flex-wrap items-center gap-4">
                  <PixelLink href="/collections" size="lg">
                    See the drops
                  </PixelLink>
                  <PixelLink href="/gallery" variant="gold" size="lg">
                    Browse the art
                  </PixelLink>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="scale-up" delay={150}>
              <div className="pixel-box-lg art-smooth relative aspect-square w-full overflow-hidden bg-card">
                <Image
                  src="/chimikinz/art/what-if.png"
                  alt="Two Chimis in tall grass at sunset. One asks what if it doesn’t work out; the other asks what if it does"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pillars */}
        <section className="border-b-4 border-foreground bg-muted">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-14 sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                eyebrow="What we're building"
                title="Three things we refuse to get wrong"
              />
            </ScrollReveal>

            <ul className="mt-10 grid gap-6 lg:grid-cols-3">
              {pillars.map((pillar, i) => (
                <ScrollReveal key={pillar.title} variant="scale-up" delay={i * 140}>
                  <li className="h-full">
                    <article className="pixel-box group flex h-full flex-col bg-card">
                      <div className="pixel-checker art-smooth relative aspect-[4/3] overflow-hidden border-b-4 border-foreground">
                        <Image
                          src={pillar.image}
                          alt={pillar.alt}
                          fill
                          sizes="(min-width: 1024px) 33vw, 100vw"
                          className="pixel-zoom object-contain p-3"
                        />
                      </div>
                      <div className="flex flex-col gap-3 p-5 sm:p-6">
                        <h3 className="font-display text-sm uppercase">
                          {pillar.title}
                        </h3>
                        <p className="text-pretty text-xl leading-snug text-muted-foreground">
                          {pillar.body}
                        </p>
                      </div>
                    </article>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Goals */}
        <section className="border-b-4 border-foreground">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-14 sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                eyebrow="What we want to achieve"
                title="The scoreboard we hold ourselves to"
                body="Vision is cheap without something to check it against. These are the outcomes — if they don't happen, we didn't do it."
              />
            </ScrollReveal>

            <ol className="mt-10 grid gap-6 lg:grid-cols-3">
              {goals.map((goal, i) => (
                <ScrollReveal key={goal.horizon} variant="fade-up" delay={i * 140}>
                  <li className="pixel-box flex h-full flex-col bg-card">
                    <div className="flex items-center gap-2 border-b-4 border-foreground bg-foreground px-4 py-3">
                      <span className="font-display text-[10px] uppercase text-secondary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[10px] uppercase text-background">
                        {goal.horizon}
                      </h3>
                    </div>
                    <ul className="flex flex-col gap-4 p-5 sm:p-6">
                      {goal.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 size-3 shrink-0 bg-primary"
                          />
                          <span className="text-pretty text-xl leading-snug text-muted-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Principles */}
        <section className="border-b-4 border-foreground bg-muted">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:py-20">
            <ScrollReveal variant="scale-up">
              <div className="pixel-box-lg art-smooth relative aspect-square w-full overflow-hidden bg-card">
                <Image
                  src="/chimikinz/art/hilltop-night.png"
                  alt="A Chimi standing alone on a dark hill under a wide cloudy night sky"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-6">
              <ScrollReveal variant="fade-up">
                <SectionHeading
                  eyebrow="What we won't do"
                  title="The short list"
                  body="Easier to keep a promise you wrote down."
                />
              </ScrollReveal>

              <ul className="flex flex-col gap-3">
                {principles.map((principle, i) => (
                  <ScrollReveal key={principle} variant="fade-up" delay={i * 90}>
                    <li className="pixel-box-sm flex items-start gap-3 bg-card p-4">
                      <span
                        aria-hidden="true"
                        className="mt-1 font-display text-sm text-primary"
                      >
                        ✕
                      </span>
                      <span className="text-pretty text-xl leading-snug">
                        {principle}
                      </span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it maps to the roadmap already published */}
        <section className="border-b-4 border-foreground">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-14 sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                eyebrow="Where we are"
                title="Vision, against the actual plan"
                body="The roadmap on the home page is the same one below — this is how far along it we are right now."
              />
            </ScrollReveal>

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {roadmap.map((phase, i) => (
                <ScrollReveal key={phase.phase} variant="pixel-pop" delay={i * 110}>
                  <li className="pixel-box flex h-full flex-col gap-3 bg-card p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-[10px] uppercase text-muted-foreground">
                        {phase.phase}
                      </span>
                      <PixelTag
                        className={
                          phase.status === 'done'
                            ? 'bg-accent text-accent-foreground'
                            : phase.status === 'active'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                        }
                      >
                        {phase.status === 'done'
                          ? 'Done'
                          : phase.status === 'active'
                            ? 'Now'
                            : 'Next'}
                      </PixelTag>
                    </div>
                    <h3 className="font-display text-sm uppercase">
                      {phase.title}
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-muted-foreground">
                      {phase.body}
                    </p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Close */}
        <section className="bg-foreground text-background">
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:py-20">
            <PixelTag className="bg-secondary text-secondary-foreground">
              Come along
            </PixelTag>
            <h2 className="max-w-3xl text-balance font-display text-2xl uppercase sm:text-3xl">
              None of this works without the people reading it
            </h2>
            <p className="max-w-2xl text-pretty text-2xl text-background/70">
              The allowlist opens in Discord, the drawings go up on X first, and
              the mint lands {site.launch}. If the vision sounds like something
              you want to be early to, that&apos;s where it starts.
            </p>
            <div className="flex flex-wrap gap-4">
              <PixelLink href={site.links.discord} external variant="gold" size="lg">
                Join Discord
              </PixelLink>
              <PixelLink href={site.links.x} external variant="bone" size="lg">
                Follow on X
              </PixelLink>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
