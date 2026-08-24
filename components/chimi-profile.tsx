'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import type { Chimi } from '@/lib/chimis'
import { cn } from '@/lib/utils'

/**
 * One Chimi's full profile. Alternating sides give the page its rhythm as
 * you scroll, so `flipped` is set by index rather than stored on the data.
 */
export function ChimiProfile({
  chimi,
  flipped = false,
}: {
  chimi: Chimi
  flipped?: boolean
}) {
  return (
    <section
      id={chimi.slug}
      className="scroll-mt-24 border-b-4 border-border"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Artwork */}
        <ScrollReveal
          variant={flipped ? 'slide-right' : 'slide-left'}
          className={cn(flipped && 'lg:order-2')}
        >
          <div className="lg:sticky lg:top-28">
            <div
              className="pixel-box-lg pixel-tilt relative aspect-square w-full overflow-hidden"
              style={{ backgroundColor: `${chimi.accent}22` }}
            >
              <Image
                src={chimi.art}
                alt={`${chimi.name}, a Chimi of ${chimi.emotion.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="art-smooth pixel-float object-contain"
              />
            </div>

            {/* Quote sits under the art like a caption */}
            <div
              className="pixel-box-sm mt-5 border-l-8 bg-card p-4"
              style={{ borderLeftColor: chimi.accent }}
            >
              <p className="text-pretty text-2xl leading-snug text-foreground">
                &ldquo;{chimi.quote}&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Words */}
        <ScrollReveal
          variant={flipped ? 'slide-left' : 'slide-right'}
          delay={120}
          className={cn(flipped && 'lg:order-1')}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <PixelTag
                  className="text-night"
                  style={{ backgroundColor: chimi.accent }}
                >
                  {chimi.emotion}
                </PixelTag>
                <span
                  className="h-1 flex-1"
                  style={{ backgroundColor: chimi.accent }}
                  aria-hidden="true"
                />
              </div>

              <h2 className="font-display text-3xl uppercase sm:text-4xl">
                <Link
                  href={`/chimis/${chimi.slug}`}
                  className="group inline-flex items-center gap-3 hover:text-primary"
                >
                  {chimi.name}
                  <span
                    aria-hidden="true"
                    className="pixel-arrow font-display text-lg text-primary"
                  >
                    &rarr;
                  </span>
                </Link>
              </h2>

              <p className="text-pretty text-2xl leading-snug text-foreground">
                {chimi.personality}
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t-4 border-border pt-5">
              {chimi.story.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-pretty text-xl leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Traits */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-[10px] uppercase text-muted-foreground">
                Traits
              </h3>
              <ul className="grid grid-cols-2 gap-3">
                {chimi.traits.map((trait) => (
                  <li key={trait.label} className="pixel-box-sm bg-card p-3">
                    <span className="block font-display text-[9px] uppercase text-muted-foreground">
                      {trait.label}
                    </span>
                    <span className="mt-1 block text-xl leading-snug text-foreground">
                      {trait.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={`/chimis/${chimi.slug}`}
              className="pixel-box pixel-press w-fit bg-primary px-6 py-3 font-display text-xs uppercase text-primary-foreground"
            >
              See {chimi.name}&apos;s card
            </Link>

            {/* Companion */}
            <div className="pixel-box bg-card p-5">
              <div className="flex items-center gap-3">
                <span
                  className="size-4 shrink-0 border-2 border-border"
                  style={{ backgroundColor: chimi.accent }}
                  aria-hidden="true"
                />
                <h3 className="font-display text-[10px] uppercase text-muted-foreground">
                  Companion
                </h3>
              </div>
              <p className="mt-3 font-display text-sm uppercase">
                {chimi.companion.name}
              </p>
              <p className="mt-2 text-pretty text-xl leading-snug text-muted-foreground">
                {chimi.companion.body}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
