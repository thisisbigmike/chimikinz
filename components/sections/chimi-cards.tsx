import { ChimiCard } from '@/components/chimi-card'
import { SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { mainChimis } from '@/lib/chimis'

/**
 * The founding four as their full collector cards, laid out down the page.
 *
 * The rail higher up is a way in to a Chimi's own route; this is the same
 * cards read in place, for anyone who would rather scroll than click. They
 * carry `headingLevel={2}` so the page keeps the one `h1` it already has.
 */
export function ChimiCards() {
  if (mainChimis.length === 0) return null

  return (
    <section className="border-b-4 border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="The full card"
            title="Chimi Cards"
            body="Everything on the back of the box — feeling, traits, lore and where each one turns up."
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="flex flex-col gap-10 lg:gap-14">
          {mainChimis.map((chimi, index) => (
            <ScrollReveal
              key={chimi.slug}
              variant="fade-up"
              delay={index === 0 ? 100 : 0}
            >
              <ChimiCard chimi={chimi} headingLevel={2} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
