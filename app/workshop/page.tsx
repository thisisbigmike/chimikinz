import Image from 'next/image'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { WorkshopBench } from '@/components/sections/workshop-bench'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { chimiBySlug } from '@/lib/chimis'
import { site, workshopOpen } from '@/lib/site'
import { steps } from '@/lib/workshop'

export const metadata: Metadata = {
  title: 'The Chimi Workshop',
  description: `How a chimi gets made in ${site.world} — feeling, scribble, line, colour, charm — and a bench where you can mix one yourself. Opening ${site.launch}.`,
}

export default function WorkshopPage() {
  /* Every section of the page, built and ready. While `workshopOpen` is
     false this same tree is what sits blurred behind the plate below, so
     the preview can never drift from the real thing. */
  const content = (
    <>
      {/* Intro */}
      <section className="border-b-4 border-border">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
          <ScrollReveal variant="pixel-pop">
            <PixelTag className="bg-accent text-accent-foreground">
              Where chimis get made
            </PixelTag>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-balance font-display text-3xl uppercase leading-[1.15] sm:text-4xl">
              <span className="pixel-text-shadow-primary">
                The Chimi Workshop
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="max-w-2xl text-pretty text-2xl leading-snug text-muted-foreground">
              All {site.supply.toLocaleString()} of them come off the same
              bench, in the same five steps, by hand. Here is the bench — and
              the order form, if you want a go at one yourself.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* The five steps */}
      <section className="border-b-4 border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:py-20">
          <ScrollReveal variant="fade-up">
            <SectionHeading
              eyebrow="The bench"
              title="Five steps, every time"
              body="No generator, no shortcut, no exceptions. A chimi that skips a step does not leave the room."
            />
          </ScrollReveal>

          <ol className="flex flex-col gap-6">
            {steps.map((step, i) => {
              const chimi = chimiBySlug(step.chimi)

              return (
                <li key={step.step}>
                  <ScrollReveal variant="fade-up" delay={i * 80}>
                    <article className="pixel-box flex flex-col gap-5 bg-card p-6 sm:flex-row sm:items-start sm:gap-6">
                      {/* Number plate */}
                      <span
                        aria-hidden="true"
                        className="pixel-box-sm grid size-14 shrink-0 place-items-center bg-primary font-display text-sm text-primary-foreground"
                      >
                        {step.step}
                      </span>

                      <div className="flex flex-1 flex-col gap-3">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                          <h3 className="font-display text-sm uppercase tracking-tight">
                            {step.title}
                          </h3>
                          <p className="text-xl leading-none text-muted-foreground">
                            {step.summary}
                          </p>
                        </div>
                        <p className="max-w-2xl text-pretty text-2xl leading-snug">
                          {step.body}
                        </p>
                      </div>

                      {/* The step illustrated by whoever shows it off best.
                          Decorative — the prose already carries the step. */}
                      {chimi ? (
                        <div className="pixel-box-sm art-ground shrink-0 self-start bg-background">
                          <Image
                            src={chimi.thumb}
                            alt=""
                            aria-hidden="true"
                            width={96}
                            height={96}
                            className="art-smooth size-24 object-contain"
                          />
                        </div>
                      ) : null}
                    </article>
                  </ScrollReveal>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* The charm bench */}
      <section className="border-b-4 border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:py-20">
          <ScrollReveal variant="fade-up">
            <SectionHeading
              eyebrow="Your turn"
              title="Work the bench"
              body="Pick a skin, a fit, a head and a charm. The order form fills itself in, and tells you which of the four your mix takes after."
            />
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120}>
            <WorkshopBench />
          </ScrollReveal>
        </div>
      </section>

      {/* Out the door */}
      <section>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
          <ScrollReveal variant="fade-up">
            <h2 className="text-balance font-display text-2xl uppercase sm:text-3xl">
              And then it leaves the bench
            </h2>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <p className="max-w-2xl text-pretty text-2xl leading-snug text-muted-foreground">
              Inked, coloured, named and carrying its charm — that is a
              chimi. {site.supply.toLocaleString()} of them, no two alike.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <PixelLink href="/chimis" size="lg">
                Meet the four
              </PixelLink>
              <PixelLink href="/gallery" variant="bone" size="lg">
                See the wall
              </PixelLink>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      {workshopOpen ? (
        <main>{content}</main>
      ) : (
        <main className="relative">
          {/* The workshop is finished but not open. The page is shown as a
              blurred preview rather than an empty placeholder — `inert` and
              the pointer-events lift take it out of reach of the keyboard,
              the mouse and the a11y tree, so the plate is the only thing
              anyone can actually read or use. */}
          <div
            aria-hidden="true"
            inert
            className="pointer-events-none select-none blur-[6px] sm:blur-[8px]"
          >
            {content}
          </div>

          {/* Rides the scroll: the plate stays centred in the viewport for
              the whole height of the preview behind it. */}
          <div className="pointer-events-none absolute inset-0 z-10">
            <div className="sticky top-0 flex h-svh items-center justify-center p-4">
              <div className="pixel-box-lg pixel-slide-up flex max-w-lg flex-col items-center gap-5 bg-card p-6 text-center sm:p-8">
                <PixelTag className="bg-secondary text-secondary-foreground">
                  Not yet
                </PixelTag>

                <h2 className="text-balance font-display text-2xl uppercase sm:text-3xl">
                  <span className="pixel-text-shadow-primary">Coming Soon</span>
                </h2>

                <p className="text-pretty text-2xl leading-snug text-muted-foreground">
                  The bench is still being set up. Five steps, a charm each,
                  and a place to mix one yourself — opening {site.launch}.
                </p>

                <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3">
                  <PixelLink href="/chimis" size="md">
                    Meet the four
                  </PixelLink>
                  <PixelLink
                    href={site.links.discord}
                    external
                    variant="bone"
                    size="md"
                  >
                    Get told first
                  </PixelLink>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      <SiteFooter />
    </div>
  )
}
