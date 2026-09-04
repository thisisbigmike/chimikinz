'use client'

import Image from 'next/image'
import { PixelButton } from '@/components/pixel/pixel-button'
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
     *
     * That same paper runs up behind the header, which paints no background
     * of its own: the section is pulled up by the bar's height and its
     * content pushed back down by the same, so nothing moves except the
     * cream, which now meets the top of the page instead of stopping under
     * a strip of a different colour. See `--header-h`.
     */
    <section className="art-ground relative isolate mt-[calc(var(--header-h)*-1)] overflow-hidden border-b-4 border-border pt-[var(--header-h)] text-night [--art-ground:#feeebc] [--line:var(--night)] [--shade:var(--night)]">
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

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 lg:py-20">
        <ScrollReveal variant="pixel-pop" delay={0}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <PixelTag className="bg-accent text-accent-foreground">
              Launching {site.launch}
            </PixelTag>
          </div>
        </ScrollReveal>

        {/* The signature element, and the one heading on the site whose
            size is arithmetic rather than taste.

            Press Start 2P is monospaced at 1em of advance per character, so
            this line is a fixed 22 chars × 0.98em ≈ 21.6em wide whatever the
            font-size — it does not reflow, it only fits or it does not. At
            lg that is 776px against the 848px this column now has, which is
            why the column above is `max-w-4xl` and not the `max-w-3xl` the
            one-word wordmark used to need. Going up one step to text-5xl
            costs 970px and breaks the line; so does keeping text-4xl in the
            narrower column. `text-balance` is for the small viewports below
            sm, where 21.6em cannot fit at any readable size and two even
            lines beat a widow. */}
        <ScrollReveal variant="fade-up" delay={100}>
          <h1 className="text-balance font-display text-2xl uppercase leading-[1.1] sm:text-3xl lg:text-4xl">
            <span className="pixel-text-shadow-primary">Welcome to {site.world}</span>
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
            Tiny beings born from emotions. A world where every Chimi begins
            as a feeling, growing into a unique companion with a story of
            its own.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={300}>
          {/* No link on it. `aria-disabled` rather than `disabled`, so the
              slab keeps its full weight — it is still the hero's one call to
              action — while a screen reader is told it cannot be acted on
              yet. Give it an href again when the mint opens. */}
          <PixelButton size="lg" aria-disabled="true">
            Mint on {site.chain}
          </PixelButton>
        </ScrollReveal>

        <dl className="mt-2 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              variant="pixel-pop"
              delay={400 + i * 100}
              /**
               * An odd number of stats leaves the last one stranded alone on
               * the bottom row of the two-column layout, hard against the
               * left edge. That one spans both columns instead and then
               * takes a single column's width back — half the row less half
               * the 0.75rem gap — so it lands centred at exactly the width
               * of the cards above it rather than shrink-to-fit.
               *
               * Above sm the grid is three columns, three stats fill it
               * evenly, and the whole thing reverts: `w-auto` alone would
               * leave `justify-self-center` sizing the card to its text, so
               * the stretch has to be handed back explicitly.
               */
              className={
                stats.length % 2 === 1 && i === stats.length - 1
                  ? 'col-span-2 w-[calc(50%-0.375rem)] justify-self-center sm:col-span-1 sm:w-auto sm:justify-self-stretch'
                  : undefined
              }
            >
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
