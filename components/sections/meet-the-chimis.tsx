'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { mainChimis } from '@/lib/chimis'

export function MeetTheChimis() {
  return (
    <section className="border-b-4 border-border bg-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="Meet the Chimis"
            title="Four feelings, four friends"
            body="The ones who arrived first and decided what Clover Cove was going to be like."
            className="mx-auto"
          />
        </ScrollReveal>

        <ul className="mt-10 grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mainChimis.map((chimi, i) => (
            <ScrollReveal key={chimi.slug} variant="scale-up" delay={i * 150}>
              <li className="h-full">
                <Link
                  href={`/chimis/${chimi.slug}`}
                  className="group pixel-box pixel-press flex h-full flex-col bg-card"
                >
                  <div
                    className="relative aspect-square overflow-hidden border-b-4 border-border"
                    style={{ backgroundColor: `${chimi.accent}22` }}
                  >
                    <Image
                      src={chimi.thumb}
                      alt={chimi.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="art-smooth pixel-zoom object-contain p-3"
                    />
                    <PixelTag
                      className="absolute left-0 top-0 border-l-0 border-t-0 text-night"
                      style={{ backgroundColor: chimi.accent }}
                    >
                      {chimi.emotion}
                    </PixelTag>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <h3 className="font-display text-sm uppercase transition-transform duration-200 group-hover:-translate-y-0.5">
                      {chimi.name}
                    </h3>
                    <p className="text-pretty text-xl leading-snug text-muted-foreground">
                      {chimi.personality}
                    </p>
                    <span className="mt-auto pt-2 font-display text-[9px] uppercase text-primary">
                      See {chimi.name}&apos;s card{' '}
                      <span className="pixel-arrow">&rarr;</span>
                    </span>
                  </div>
                </Link>
              </li>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal variant="fade-up" delay={300}>
          <div className="mt-10">
            <PixelLink href="/chimis" variant="bone" size="lg">
              Meet them properly
            </PixelLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
