'use client'

import Image from 'next/image'
import { PixelPanel, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { brandArt } from '@/lib/collection'
import { site } from '@/lib/site'

const beats = [
  {
    title: 'Drawn, not generated',
    body: 'No trait machine spitting out combinations. Each chimi is inked by hand, which is why the odd ones look genuinely odd.',
  },
  {
    title: 'One charm each',
    body: 'A halo, a cracked skull, a burger for a hat. The charm is the character — it decides how the chimi behaves in the lore.',
  },
  {
    title: 'Luck is the point',
    body: 'Chimikinz was never meant to be serious. It is a small pile of good luck you can carry in your wallet.',
  },
]

export function Story() {
  return (
    <section
      id="story"
      className="scroll-mt-24 border-b-4 border-border bg-muted"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col gap-8">
          <ScrollReveal variant="fade-up">
            <SectionHeading
              eyebrow="The story"
              title="Where the chimis came from"
              body={`${site.name} started as a sketchbook habit — one strange little creature a night, each one luckier than the last.`}
            />
          </ScrollReveal>

          <ul className="flex flex-col gap-5">
            {beats.map((beat, i) => (
              <ScrollReveal key={beat.title} variant="slide-left" delay={i * 150}>
                <li>
                  <PixelPanel bodyClassName="p-5">
                    <h3 className="font-display text-xs uppercase">
                      {beat.title}
                    </h3>
                    <p className="mt-2 text-pretty text-xl leading-snug text-muted-foreground">
                      {beat.body}
                    </p>
                  </PixelPanel>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>

        <ScrollReveal variant="scale-up" delay={200}>
          <div className="pixel-box-lg art-ground pixel-tilt relative aspect-square bg-card lg:sticky lg:top-28 overflow-hidden">
            <Image
              src={brandArt.builder}
              alt="A Chimikinz chimi lying on the floor at a laptop, a tiny winged charm resting on its head"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="pixel-float object-contain p-6"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
