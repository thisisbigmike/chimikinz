import Image from 'next/image'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SeeMoreCards } from '@/components/see-more-cards'
import { cardSrc, chimiCardArt } from '@/lib/chimi-cards'
import { cn } from '@/lib/utils'

/**
 * The collector cards, as they are actually printed.
 *
 * Sized to a common height rather than a common width: the cards are not
 * all cut to the same proportions, so matching their widths would leave the
 * row ragged along the bottom. Each one is drawn with its own frame, so
 * there is no plate or ground under them here.
 */
/**
 * Three float variants, cycled across the row: same drift, different
 * durations and start delays, so the cards bob out of step with each other
 * rather than moving as one block. All three are switched off in the
 * reduced-motion block in globals.css.
 */
const FLOAT = ['pixel-float', 'pixel-float-delayed', 'pixel-float-slow']

export function ChimiCards() {
  if (chimiCardArt.length === 0) return null

  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="The card"
            title="Chimi Cardz"
            body="Every Chimi is printed on one — the number, the stats, the feeling it embodies and a line of its own."
            className="mx-auto"
          />
        </ScrollReveal>

        {/* A swipeable rail on a phone, a grid from `sm` up.
            Scroll-snap rather than a carousel script: the browser already
            does the momentum, the snapping and the keyboard, and there is
            nothing here that needs a slide index. The negative margin lets
            the cards run to the edge of the screen while the padding keeps
            the first and last one clear of it. */}
        <ul
          className={cn(
            '-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2',
            'rail-scroll',
            'sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3',
          )}
        >
          {chimiCardArt.map((card, index) => (
            <li
              key={card.slug}
              className="w-[78%] shrink-0 snap-center sm:w-auto sm:shrink"
            >
              <ScrollReveal variant="fade-up" delay={index * 100}>
                {/* The float sits on this inner box, not on the
                    ScrollReveal wrapper — that animates a transform of its
                    own on the way in, and the two would fight. */}
                <div
                  className={cn(
                    'relative h-[420px] w-full sm:h-[460px] lg:h-[520px]',
                    FLOAT[index % FLOAT.length],
                  )}
                >
                  <Image
                    src={cardSrc(card.slug)}
                    alt={card.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
                    className="art-smooth object-contain"
                  />
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal variant="fade-up">
          <div className="flex justify-center">
            <SeeMoreCards />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
