'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { collection } from '@/lib/collection'
import { site } from '@/lib/site'

const byId = (id: number) => collection.find((c) => c.id === id)

const tiles = [
  {
    title: 'The Nest',
    copy: 'Browse every revealed chimi and filter by charm family.',
    href: '/gallery',
    cta: 'Open the nest',
    image: byId(13)?.image ?? '',
    tone: 'bg-accent text-accent-foreground',
    external: false,
  },
  {
    title: 'The Story',
    copy: 'Discover how the chimis were born and what each charm brings.',
    href: '/#story',
    cta: 'Read the lore',
    image: byId(11)?.image ?? '',
    tone: 'bg-secondary text-secondary-foreground',
    external: false,
  },
  {
    title: 'Mint',
    copy: `${site.supply.toLocaleString()} chimis, one charm each, live on ${site.chain}.`,
    href: site.links.mint,
    cta: 'Go to mint',
    image: byId(15)?.image ?? '',
    tone: 'bg-primary text-primary-foreground',
    external: true,
  },
]

export function EntryTiles() {
  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            eyebrow="Pick a door"
            title="Three ways in"
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>

        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {tiles.map((tile, i) => {
            const inner = (
              <>
                <div
                  className={`art-ground relative aspect-[4/3] border-b-4 border-border ${tile.tone}`}
                >
                  <Image
                    src={tile.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="pixel-wiggle object-contain p-6"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-display text-base uppercase">
                    {tile.title}
                  </h3>
                  <p className="text-pretty text-xl leading-snug text-muted-foreground">
                    {tile.copy}
                  </p>
                  <span className="mt-auto pt-2 font-display text-[10px] uppercase text-primary">
                    {tile.cta} <span className="pixel-arrow">&rarr;</span>
                  </span>
                </div>
              </>
            )

            return (
              <ScrollReveal key={tile.title} variant="fade-up" delay={i * 150}>
                <li className="group flex">
                  {tile.external ? (
                    <a
                      href={tile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-box pixel-press pixel-lift flex flex-1 flex-col bg-card"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={tile.href}
                      className="pixel-box pixel-press pixel-lift flex flex-1 flex-col bg-card"
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              </ScrollReveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
