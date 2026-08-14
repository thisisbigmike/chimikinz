'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { chimis } from '@/lib/chimis'

export function MeetTheChimis() {
  return (
    <section className="border-b-4 border-foreground bg-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="Meet the Chimis"
            title="Four feelings, four friends"
          />
        </ScrollReveal>

        <ul className="mt-10 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {chimis.map((chimi, i) => (
            <ScrollReveal key={chimi.name} variant="scale-up" delay={i * 150}>
              <li>
                <article className="group pixel-box flex h-full flex-col bg-card">
                  <div className="pixel-checker relative aspect-square overflow-hidden border-b-4 border-foreground">
                    <Image
                      src={chimi.image}
                      alt={chimi.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="pixel-zoom object-contain p-4"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <h3 className="font-display text-sm uppercase transition-transform duration-200 group-hover:-translate-y-0.5">
                      🍀 {chimi.name}
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-muted-foreground">
                      {chimi.body}
                    </p>
                  </div>
                </article>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
