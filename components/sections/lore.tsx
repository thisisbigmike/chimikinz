'use client'

import { PixelPanel, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { site } from '@/lib/site'

export function Lore() {
  return (
    <section className="border-b-4 border-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-14 text-center sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="The lore"
            title="What is Chimikinz?"
            className="mx-auto"
          />
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={100}>
          <PixelPanel bodyClassName="flex flex-col gap-4 p-6 text-left sm:p-8">
            <p className="text-pretty text-xl leading-snug text-muted-foreground">
              Hidden somewhere within the mind lies {site.world}, a peaceful
              world where emotions take shape as tiny creatures known as{' '}
              {site.name}.
            </p>
            <p className="text-pretty text-xl leading-snug text-muted-foreground">
              Some are born from hope. Others from curiosity, nostalgia,
              courage, or emotions too rare to describe. Every Chimi has a
              story, a personality, and a place within {site.world}.
            </p>
            <p className="text-pretty text-xl leading-snug text-muted-foreground">
              {site.name} is more than a collectible project — it&apos;s an
              expanding universe of characters, comics, animations, and
              stories designed to celebrate the emotions that make us human.
            </p>
          </PixelPanel>
        </ScrollReveal>
      </div>
    </section>
  )
}
