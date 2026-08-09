'use client'

import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { roadmap } from '@/lib/site'
import { cn } from '@/lib/utils'

const statusStyle = {
  done: { label: 'Done', className: 'bg-accent text-accent-foreground' },
  active: { label: 'In progress', className: 'bg-primary text-primary-foreground' },
  next: { label: 'Next', className: 'bg-card text-foreground' },
} as const

export function Roadmap() {
  return (
    <section
      id="roadmap"
      className="scroll-mt-24 border-b-4 border-foreground bg-foreground text-background"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            eyebrow="Roadmap"
            title="Four phases, no filler"
            className="[&_p]:text-background/70"
          />
        </ScrollReveal>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roadmap.map((item, i) => {
            const status = statusStyle[item.status]
            return (
              <ScrollReveal key={item.phase} variant="fade-up" delay={i * 150}>
                <li
                  className={cn(
                    'flex flex-col gap-4 border-4 border-background bg-background/5 p-5 transition-all duration-300',
                    item.status === 'active' && 'bg-background/15 pixel-active-glow',
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-[10px] uppercase text-secondary">
                      {item.phase}
                    </span>
                    <PixelTag className={cn('border-foreground', status.className)}>
                      {status.label}
                    </PixelTag>
                  </div>
                  <h3 className="font-display text-sm uppercase">{item.title}</h3>
                  <p className="text-pretty text-xl leading-snug text-background/70">
                    {item.body}
                  </p>
                </li>
              </ScrollReveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
