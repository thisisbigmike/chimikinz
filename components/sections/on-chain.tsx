'use client'

import Image from 'next/image'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { brandArt } from '@/lib/oddlings'
import { site } from '@/lib/site'

const points = [
  'Minted on Ethereum mainnet',
  'Holders vote on which oddlings get animated first',
  'Charm ledger tracks every trait on-chain',
]

export function OnChain() {
  return (
    <section className="border-b-4 border-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:py-20">
        <ScrollReveal variant="slide-left">
          <div className="pixel-box-lg pixel-checker pixel-tilt relative aspect-square bg-secondary overflow-hidden">
            <Image
              src={brandArt.bull}
              alt="A Chimikinz oddling in an orange hoodie waving beside a large bull wearing a CHIMIKINS cap, clovers at its feet"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="oddling-bob object-contain p-6"
            />
          </div>
        </ScrollReveal>

        <div className="flex flex-col items-start gap-6">
          <ScrollReveal variant="slide-right">
            <SectionHeading
              eyebrow={`Home on ${site.chain}`}
              title="The oddlings picked a bull to ride"
              body="Ethereum is fast, secure and full of people who appreciate true hand-drawn web3 art. It felt like the right home."
            />
          </ScrollReveal>

          <ul className="flex flex-col gap-3">
            {points.map((point, i) => (
              <ScrollReveal key={point} variant="fade-up" delay={i * 120}>
                <li className="flex items-start gap-3">
                  <span
                    className="mt-2 size-3 shrink-0 bg-primary"
                    aria-hidden="true"
                  />
                  <span className="text-xl leading-snug">{point}</span>
                </li>
              </ScrollReveal>
            ))}
          </ul>

          <ScrollReveal variant="pixel-pop" delay={400}>
            <div className="flex flex-wrap items-center gap-3">
              <PixelTag className="bg-accent text-accent-foreground">
                Mint: soon
              </PixelTag>
              <PixelTag className="bg-card">
                Supply: {site.supply.toLocaleString()}
              </PixelTag>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={500}>
            <PixelLink href={site.links.mint} external size="lg">
              Open the mint page
            </PixelLink>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
