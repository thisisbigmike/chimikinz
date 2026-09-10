import Image from 'next/image'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { cardSrc, chimiCardArt } from '@/lib/chimi-cards'

/**
 * The collector cards, as they are actually printed.
 *
 * Sized to a common height rather than a common width: the cards are not
 * all cut to the same proportions, so matching their widths would leave the
 * row ragged along the bottom. Each one is drawn with its own frame, so
 * there is no plate or ground under them here.
 */
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

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {chimiCardArt.map((card, index) => (
            <li key={card.slug}>
              <ScrollReveal variant="fade-up" delay={index * 100}>
                <div className="relative h-[420px] w-full sm:h-[460px] lg:h-[520px]">
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
      </div>
    </section>
  )
}
