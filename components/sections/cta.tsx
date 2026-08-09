'use client'

import Image from 'next/image'
import { PixelHeading } from '@/components/pixel/pixel-panel'
import { PixelLink } from '@/components/pixel/pixel-button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { PixelSparkles } from '@/components/pixel-sparkles'
import { site } from '@/lib/site'

export function Cta() {
  return (
    <section className="relative border-t-4 border-foreground bg-primary text-primary-foreground overflow-hidden">
      <PixelSparkles
        count={30}
        colors={['#ffc61a', '#fffaf0', '#2e9e4f', '#f0601c']}
        speed={0.8}
      />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center md:py-24">
        <ScrollReveal variant="fade-up">
          <div className="flex items-end justify-center gap-2">
            <Image
              src="/chimikinz/oddling-11.png"
              alt="A Chimikinz oddling waving"
              width={96}
              height={96}
              className="pixelated pixel-float w-16 md:w-24"
            />
            <Image
              src="/chimikinz/oddling-6.png"
              alt="A Chimikinz oddling with a halo"
              width={120}
              height={120}
              className="pixelated pixel-float-delayed w-20 md:w-32"
            />
            <Image
              src="/chimikinz/oddling-13.png"
              alt="A grinning Chimikinz oddling"
              width={96}
              height={96}
              className="pixelated pixel-float-slow w-16 md:w-24"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale-up" delay={100}>
          <PixelHeading as="h2" className="text-balance text-2xl md:text-4xl pixel-shimmer">
            Come get your charm
          </PixelHeading>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={200}>
          <p className="max-w-xl text-pretty text-xl leading-relaxed md:text-2xl">
            {site.supply.toLocaleString()} oddlings, one weird little family. Claim your luck, then
            come be strange with us.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={300}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PixelLink href={site.links.mint} external variant="ink" size="lg" className="pixel-pulse">
              Mint an oddling
            </PixelLink>
            <PixelLink href={site.links.discord} external variant="bone" size="lg">
              Join the Discord
            </PixelLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
