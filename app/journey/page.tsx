import Image from 'next/image'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { chapters, statusLabel } from '@/lib/journey'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'The Journey',
  description: `How ${site.world} grew, from a sketchbook habit to a world.`,
}

const statusStyle = {
  past: 'bg-card text-foreground',
  now: 'bg-primary text-primary-foreground',
  ahead: 'bg-secondary text-secondary-foreground',
} as const

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main>
        {/* Intro */}
        <section className="border-b-4 border-foreground">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
            <ScrollReveal variant="pixel-pop">
              <PixelTag className="bg-accent text-accent-foreground">
                How we got here
              </PixelTag>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={100}>
              <h1 className="text-balance font-display text-3xl uppercase leading-[1.15] sm:text-4xl">
                <span className="pixel-text-shadow-primary">The Journey</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={200}>
              <p className="max-w-2xl text-pretty text-2xl leading-snug text-muted-foreground">
                Not a roadmap — a history. This is how {site.world} actually
                grew, and it gets another chapter whenever the world does.
              </p>
            </ScrollReveal>

            {/* Chapter rail */}
            <ScrollReveal variant="fade-up" delay={300}>
              <ol className="flex flex-wrap items-center justify-center gap-2">
                {chapters.map((chapter, i) => (
                  <li key={chapter.slug} className="flex items-center gap-2">
                    <a
                      href={`#${chapter.slug}`}
                      className={cn(
                        'pixel-box-sm pixel-press px-3 py-2 font-display text-[9px] uppercase',
                        chapter.status === 'now'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card',
                      )}
                    >
                      {chapter.title}
                    </a>
                    {i < chapters.length - 1 ? (
                      <span
                        className="hidden size-2 rotate-45 bg-foreground sm:block"
                        aria-hidden="true"
                      />
                    ) : null}
                  </li>
                ))}
              </ol>
            </ScrollReveal>
          </div>
        </section>

        {/* Chapters */}
        {chapters.map((chapter, i) => {
          const flipped = i % 2 === 1
          return (
            <section
              key={chapter.slug}
              id={chapter.slug}
              className={cn(
                'scroll-mt-24 border-b-4 border-foreground',
                chapter.status === 'now' && 'bg-muted',
              )}
            >
              <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
                {/* Art */}
                <ScrollReveal
                  variant={flipped ? 'slide-right' : 'slide-left'}
                  className={cn(flipped && 'lg:order-2')}
                >
                  <div className="pixel-box-lg pixel-checker pixel-tilt relative aspect-[4/3] w-full overflow-hidden bg-card">
                    <Image
                      src={chapter.art}
                      alt={chapter.artAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      priority={i === 0}
                      className="art-smooth object-contain p-4"
                    />
                  </div>
                </ScrollReveal>

                {/* Words */}
                <ScrollReveal
                  variant={flipped ? 'slide-left' : 'slide-right'}
                  delay={120}
                  className={cn(flipped && 'lg:order-1')}
                >
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-display text-[10px] uppercase text-muted-foreground">
                        Chapter {String(i + 1).padStart(2, '0')}
                      </span>
                      <PixelTag className={statusStyle[chapter.status]}>
                        {statusLabel[chapter.status]}
                      </PixelTag>
                    </div>

                    <div>
                      <p className="font-display text-[10px] uppercase text-primary">
                        {chapter.era}
                      </p>
                      <h2 className="mt-2 font-display text-2xl uppercase sm:text-3xl">
                        {chapter.title}
                      </h2>
                    </div>

                    <p className="text-pretty text-2xl leading-snug text-foreground">
                      {chapter.lead}
                    </p>

                    <div className="flex flex-col gap-4 border-t-4 border-foreground pt-5">
                      {chapter.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 32)}
                          className="text-pretty text-xl leading-relaxed text-muted-foreground"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          )
        })}

        {/* Closing */}
        <section className="border-b-4 border-foreground">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
            <ScrollReveal variant="fade-up">
              <h2 className="text-balance font-display text-xl uppercase sm:text-2xl">
                The next chapter is still being drawn
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <p className="text-pretty text-2xl leading-snug text-muted-foreground">
                Everything new shows up in the gallery first, usually before
                anyone has decided what it means.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={200}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <PixelLink href="/gallery" size="lg">
                  See the gallery
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
