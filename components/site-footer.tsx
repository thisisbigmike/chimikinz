'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PixelLink } from '@/components/pixel/pixel-button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { brandArt } from '@/lib/oddlings'
import { site } from '@/lib/site'

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Gallery', href: '/gallery' },
      { label: 'Collections', href: '/collections' },
      { label: 'Vision', href: '/vision' },
      { label: 'Story', href: '/#story' },
      { label: 'Roadmap', href: '/#roadmap' },
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

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-foreground bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <ScrollReveal variant="fade-up" delay={0}>
          <div className="flex flex-col gap-4">
            <p className="font-display text-lg uppercase">{site.name}</p>
            <p className="max-w-xs text-pretty text-xl text-background/70">
              {site.tagline}
            </p>
            <div className="relative size-28">
              <Image
                src={brandArt.builder}
                alt=""
                fill
                sizes="112px"
                className="oddling-bob object-contain"
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
                        className="text-xl text-background/80 underline-offset-4 transition-colors duration-200 hover:text-secondary hover:underline"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xl text-background/80 underline-offset-4 transition-colors duration-200 hover:text-secondary hover:underline"
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
            <p className="text-xl text-background/70">
              {site.supply.toLocaleString()} oddlings, minting on {site.chain}.
            </p>
            <PixelLink href={site.links.discord} external variant="gold">
              Join Discord
            </PixelLink>
          </div>
        </ScrollReveal>
      </div>

      <div className="border-t-4 border-background/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-lg text-background/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All charms reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="pixel-box-sm pixel-press bg-secondary text-secondary-foreground px-4 py-2 font-display text-xs uppercase flex items-center gap-2 hover:bg-secondary/90 transition-all self-start sm:self-auto"
          >
            <span>✋</span> Push Me To Top <span>👆</span>
          </button>
          <p>Drawn by hand on {site.chain}.</p>
        </div>
      </div>
    </footer>
  )
}
