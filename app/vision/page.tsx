import Image from 'next/image'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelLink } from '@/components/pixel/pixel-button'
import {
  PixelPanel,
  PixelTag,
  SectionHeading,
} from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { brandArt } from '@/lib/collection'
import { site } from '@/lib/site'
import {
  goals,
  pillars,
  values,
  visionClosing,
  visionIntro,
  visionStatement,
} from '@/lib/vision'

export const metadata: Metadata = {
  title: 'Vision',
  description: `Where ${site.name} is going and what it is setting out to achieve.`,
}

export default function VisionPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main>
        {/* Statement */}
        <section className="border-b-4 border-border">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-20">
            <div className="flex flex-col items-start gap-6">
              <ScrollReveal variant="pixel-pop">
                <PixelTag className="bg-accent text-accent-foreground">
                  Project vision
                </PixelTag>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={100}>
                <h1 className="font-display text-3xl uppercase leading-[1.15] sm:text-4xl lg:text-5xl">
                  <span className="pixel-text-shadow-primary text-foreground">
                    Where we&rsquo;re going
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={200}>
                <p className="max-w-xl text-pretty text-2xl leading-snug text-foreground">
                  {visionStatement}
                </p>
              </ScrollReveal>

              <ScrollReveal variant="fade-up" delay={300}>
                <p className="max-w-xl text-pretty text-2xl leading-snug text-muted-foreground">
                  {visionIntro}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="scale-up" delay={150}>
              <div className="pixel-box-lg art-ground pixel-tilt relative aspect-square w-full overflow-hidden bg-card">
                <Image
                  src={brandArt.group}
                  alt="The Chimikinz cast gathered together"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="chimi-bob object-contain p-6"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Pillars — what the project stands on */}
        <section className="border-b-4 border-border bg-muted">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                eyebrow="What we're building"
                title="The things this is built on"
                align="center"
                className="mx-auto"
              />
            </ScrollReveal>

            <ul className="mt-10 grid gap-6 lg:grid-cols-3">
              {pillars.map((pillar, i) => (
                <ScrollReveal
                  key={pillar.title}
                  variant="fade-up"
                  delay={i * 150}
                >
                  <li className="h-full">
                    <PixelPanel className="h-full">
                      <span className="font-display text-[10px] uppercase text-primary">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-2 font-display text-sm uppercase">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-pretty text-xl leading-snug text-muted-foreground">
                        {pillar.body}
                      </p>
                    </PixelPanel>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Goals — what we want to achieve */}
        <section className="border-b-4 border-border bg-night text-cream">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                eyebrow="What we want to achieve"
                title="The goals, in order"
                className="[&_p]:text-cream/70"
              />
            </ScrollReveal>

            <ol className="mt-10 grid gap-6 lg:grid-cols-3">
              {goals.map((goal, i) => (
                <ScrollReveal key={goal.title} variant="fade-up" delay={i * 150}>
                  <li className="flex h-full flex-col gap-4 border-4 border-cream bg-cream/5 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-[10px] uppercase text-secondary">
                        {goal.horizon}
                      </span>
                      <PixelTag className="border-cream bg-cream/10">
                        {String(i + 1).padStart(2, '0')}
                      </PixelTag>
                    </div>
                    <h3 className="font-display text-sm uppercase">
                      {goal.title}
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-cream/70">
                      {goal.body}
                    </p>
                  </li>
                </ScrollReveal>
              ))}
            </ol>
          </div>
        </section>

        {/* Values */}
        <section className="border-b-4 border-border">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <SectionHeading
                eyebrow="How we work"
                title="What we hold to"
                align="center"
                className="mx-auto"
              />
            </ScrollReveal>

            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <ScrollReveal
                  key={value.title}
                  variant="scale-up"
                  delay={i * 120}
                >
                  <li className="pixel-box flex h-full flex-col gap-3 bg-card p-5">
                    <span
                      className="size-4 shrink-0 bg-accent"
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-xs uppercase">
                      {value.title}
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-muted-foreground">
                      {value.body}
                    </p>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing */}
        <section className="border-b-4 border-border bg-muted">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <p className="text-pretty text-2xl leading-snug text-foreground">
                {visionClosing}
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={150}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PixelLink href="/collections" size="lg">
                  See the collections
                </PixelLink>
                <PixelLink
                  href={site.links.discord}
                  external
                  variant="bone"
                  size="lg"
                >
                  Join the Discord
                </PixelLink>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
