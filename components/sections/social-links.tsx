'use client'

import Image from 'next/image'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { PixelSparkles } from '@/components/pixel-sparkles'
import { site } from '@/lib/site'

const channels = [
  {
    label: 'Discord',
    href: site.links.discord,
    body: 'Where the Cove actually happens. Art drops, daydreaming, first look at everything.',
    tone: 'bg-primary text-primary-foreground',
    art: '/chimikinz/art/thumb/zipp.webp',
  },
  {
    label: 'X / Twitter',
    href: site.links.xFollowIntent,
    body: 'New drawings as they land, and not much else. No threads about roadmaps.',
    tone: 'bg-secondary text-secondary-foreground',
    art: '/chimikinz/art/thumb/whim.webp',
  },
]

export function SocialLinks() {
  return (
    <section className="relative overflow-hidden">
      <PixelSparkles count={18} speed={0.5} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <div className="flex flex-col items-center gap-4 text-center">
            <PixelTag className="bg-card text-cream">Come in</PixelTag>
            <h2 className="text-balance font-display text-2xl uppercase sm:text-3xl">
              Clover Cove is better with people in it
            </h2>
          </div>
        </ScrollReveal>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {channels.map((channel, i) => (
            <ScrollReveal key={channel.label} variant="fade-up" delay={i * 150}>
              <li className="h-full">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group pixel-box pixel-press pixel-lift flex h-full items-center gap-4 bg-card p-5"
                >
                  <div
                    className={`pixel-box-sm relative size-20 shrink-0 ${channel.tone}`}
                  >
                    <Image
                      src={channel.art}
                      alt=""
                      fill
                      sizes="80px"
                      className="art-smooth pixel-wiggle object-contain p-1"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-sm uppercase">
                      {channel.label}{' '}
                      <span className="pixel-arrow text-primary">&rarr;</span>
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-cream/70">
                      {channel.body}
                    </p>
                  </div>
                </a>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
