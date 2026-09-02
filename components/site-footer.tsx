'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PixelLink } from '@/components/pixel/pixel-button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { fullSrc } from '@/lib/artwork'
import { brandArt } from '@/lib/collection'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'The Chimis', href: '/chimis' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'The Workshop', href: '/workshop' },
      { label: 'The Journey', href: '/journey' },
      // Kept off the main nav until the OpenSea drop is live.
      { label: 'Collections', href: '/collections' },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'X / Twitter', href: site.links.x, external: true },
      { label: 'Discord', href: site.links.discord, external: true },
      { label: 'Mint', href: site.links.mint, external: true },
    ],
  },
]

/**
 * `backdrop` is the footer's own sky. The home page hands that job to
 * `NightOutro`, which paints one Night Hill across the last section and
 * this one together — so there the footer is a transparent block sitting on
 * a scene it does not own. Everywhere else it is still the only thing at
 * the bottom of the page, and paints its own.
 */
export function SiteFooter({ backdrop = true }: { backdrop?: boolean }) {
  return (
    <footer
      className={cn(
        'relative overflow-hidden border-t-4 border-border text-cream',
        backdrop && 'isolate bg-night',
      )}
    >
      {backdrop && (
        <>
        {/**
         * The footer's sky — Night Hill, the scene the page has been walking
         * toward. The nightfall ramp lands the whole site on `--night` by the
         * time you reach the bottom (see globals.css), and this art is painted
         * in the same cool blue-purple those last keyframes cross through, so
         * it reads as where the sunset ended rather than a picture dropped
         * into a slab.
         *
         * The layers sit on `-z-10` inside the footer's own stacking context:
         * `bg-night` paints first, these tint it, and the content above is
         * untouched — no `z-10` needed on every column.
         */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {/* The sky, full bleed. Cropped high onto the drifting cloud layer so
              it is atmosphere rather than subject — this is what the corners of
              the footer are wearing. Desktop only: once the columns stack, the
              scene below already fills the width, and a second copy of the same
              art underneath it would just double-expose the clouds and wash out
              the type. */}
          <Image
            src={fullSrc('night-hill')}
            alt=""
            fill
            sizes="100vw"
            className="art-smooth hidden object-cover object-[center_26%] opacity-[0.3] lg:block"
          />

          {/* The scene itself, held to a centred box narrower than the footer.
              Scaling it down is the only way the chimi and the hill it stands
              on both fit a band this wide and this short: at full bleed the
              figure alone is taller than the footer's content, so its legs run
              off the bottom edge with no ground under them. At this size the
              crop lands sky above the head and hill below the feet. */}
          <div className="absolute inset-y-0 left-1/2 w-full max-w-[64rem] -translate-x-1/2">
            <Image
              src={fullSrc('night-hill')}
              alt=""
              fill
              sizes="100vw"
              className="art-smooth object-cover object-[center_60%] opacity-[0.55]"
            />
            {/* Melts into the full-bleed sky either side, so the box has no
                edges of its own. */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--night)_0%,transparent_22%,transparent_78%,var(--night)_100%)] opacity-70" />
          </div>

          {/* Evens out the sky, which is the lightest part of the art and sits
              directly behind the link columns. */}
          <div className="absolute inset-0 bg-night/25" />
          {/* Both edges dissolve into `--night`: the top so the seam with the
              page above disappears, the bottom so the copyright bar keeps the
              near-black it was already printed on. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--night)_0%,transparent_34%,transparent_58%,var(--night)_100%)]" />
        </div>
        </>
      )}

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <ScrollReveal variant="fade-up" delay={0}>
          <div className="flex flex-col gap-4">
            <p className="font-display text-lg uppercase">{site.name}</p>
            <p className="max-w-xs text-pretty text-xl text-cream/70">
              {site.tagline}
            </p>
            <div className="art-ground pixel-box-sm relative size-28 p-1">
              <Image
                src={brandArt.builder}
                alt=""
                fill
                sizes="112px"
                className="chimi-bob object-contain"
              />
            </div>
          </div>
        </ScrollReveal>

        {columns.map((column, i) => (
          <ScrollReveal key={column.heading} variant="fade-up" delay={(i + 1) * 120}>
            <nav aria-label={column.heading}>
              <h2 className="mb-4 font-display text-[10px] uppercase text-secondary">
                {column.heading}
              </h2>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl text-cream/80 underline-offset-4 transition-colors duration-200 hover:text-secondary hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xl text-cream/80 underline-offset-4 transition-colors duration-200 hover:text-secondary hover:underline"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </ScrollReveal>
        ))}

        <ScrollReveal variant="fade-up" delay={360}>
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[10px] uppercase text-secondary">
              Catch the luck
            </h2>
            <p className="text-xl text-cream/70">
              {site.supply.toLocaleString()} chimis, minting on {site.chain}.
            </p>
            <PixelLink href={site.links.discord} external variant="secondary">
              Join Discord
            </PixelLink>
          </div>
        </ScrollReveal>
      </div>

      <div className="border-t-4 border-cream/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-lg text-cream/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All charms reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pixel-box-sm pixel-press bg-secondary text-secondary-foreground px-4 py-2 font-display text-xs uppercase flex items-center gap-2 hover:bg-secondary/90 transition-colors self-start sm:self-auto"
          >
            <span>✋</span> Push Me To Top <span>👆</span>
          </button>
          <p>Drawn by hand on {site.chain}.</p>
        </div>
      </div>
    </footer>
  )
}
