'use client'

import Image from 'next/image'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { PixelSparkles } from '@/components/pixel-sparkles'
import { fullSrc } from '@/lib/artwork'
import { site, stats } from '@/lib/site'

export function Hero() {
  return (
    /**
     * The hero is the one section that does not keep the sun's hours.
     *
     * It is painted with the flat cream the scene behind it was drawn
     * on — `--art-ground` pinned to the file's own `#feeebc`, sampled from
     * its corners — so the artwork has no edge to give it away. That paper
     * does not swap with the theme, so the ink on top must not either:
     * `text-night` and the two linework variables are pinned here, or a
     * reader on `data-theme=dark` gets cream type on cream paper. Nightfall
     * never reaches this far up the page anyway (it starts at 53%).
     */
    <section className="art-ground relative isolate overflow-hidden border-b-4 border-border text-night [--art-ground:#feeebc] [--line:var(--night)] [--shade:var(--night)]">
      <PixelSparkles count={16} speed={0.6} />

      {/**
       * The four of them, behind the copy rather than under it.
       *
       * Behind the copy, so the section keeps its own height — the scene
       * fits the hero instead of the hero growing to fit the scene. 70rem
       * is a cap, not a width: bleeding it edge to edge would blow the four
       * of them up to fill the screen, so past the cap the flat cream takes
       * over and `hero-art-fade` dissolves the two side edges. 52% centres
       * the crop on the stretch they occupy rather than the empty sky above
       * or the rail below.
       *
       * The scene itself carries `opacity-60`, so it reads as a print on the
       * cream rather than a photo behind the type; `hero-art-veil` is the
       * second half of that, and the two together are what let the copy sit
       * on top of it.
       */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-art-fade absolute inset-y-0 left-1/2 w-[min(100%,70rem)] -translate-x-1/2">
          <Image
            src={fullSrc('on-the-rail')}
            alt=""
            fill
            priority
            sizes="(min-width: 1120px) 70rem, 100vw"
            className="art-smooth object-cover object-[center_52%] opacity-60"
          />
        </div>
        <div className="hero-art-veil absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
        <ScrollReveal variant="pixel-pop" delay={0}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <PixelTag className="bg-accent text-accent-foreground">
              {site.supply.toLocaleString()} lucky chimis
            </PixelTag>
          </div>
        </ScrollReveal>

        {/* The signature element: the wordmark itself. */}
        <ScrollReveal variant="fade-up" delay={100}>
          <h1 className="font-display text-4xl uppercase leading-[1.1] sm:text-5xl lg:text-6xl">
            <span className="pixel-text-shadow-primary">{site.name}</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200}>
          {/* 85, not the 75 the muted copy uses elsewhere: this paragraph is
              printed straight onto the artwork, and the extra ten points are
              what took the worst case — 24px text over the black hoodie —
              clear of the 4.5:1 floor rather than only the 3.0 one large
              text is allowed. The scene's own 60% opacity has since lifted
              that hoodie most of the way to the cream, so this is now margin
              on top of margin; it stays because the art is the thing likely
              to be swapped, not the type. */}
          <p className="max-w-xl text-pretty text-2xl leading-snug text-night/85">
            Every chimi is drawn by hand and born with one charm of its own —
            a horn, a halo, a hood, a habit. Collect one and the luck is yours
            to keep.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={300}>
          <PixelLink href={site.links.mint} external size="lg">
            Mint on {site.chain}
          </PixelLink>
        </ScrollReveal>

        <dl className="mt-2 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} variant="pixel-pop" delay={400 + i * 100}>
              <div className="pixel-box-sm bg-cream px-3 py-3 text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-base uppercase">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-lg uppercase text-night/60">
                  {stat.label}
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
