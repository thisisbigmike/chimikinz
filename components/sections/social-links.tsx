'use client'

import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { PixelSparkles } from '@/components/pixel-sparkles'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

/**
 * The two brand marks, inline.
 *
 * Lucide is the site's icon set but carries no brand logos — its `X` is the
 * close cross, not the company — so these are the official marks as paths.
 * They fill with `currentColor`, which is the plate's own ink.
 */
function DiscordMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  )
}

function XMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

/**
 * Not a brand mark. Giphy's logo is a wordmark, and a wrong redrawing of
 * someone's logo is worse than none — so this plate says what it is in the
 * site's own display face, which sits with the pixel work anyway.
 */
function GifMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid place-items-center font-display text-[10px] leading-none tracking-tight',
        className,
      )}
    >
      GIF
    </span>
  )
}

const channels = [
  {
    label: 'Discord',
    href: site.links.discord,
    body: 'Where the Cove actually happens. Art drops, daydreaming, first look at everything.',
    tone: 'bg-primary text-primary-foreground',
    Mark: DiscordMark,
  },
  {
    label: 'X / Twitter',
    href: site.links.xFollowIntent,
    body: 'New drawings as they land, and not much else. No threads about roadmaps.',
    tone: 'bg-secondary text-secondary-foreground',
    Mark: XMark,
  },
  {
    label: 'Giphy',
    href: site.links.giphy,
    body: 'Every GIF we have made, in one place. Find them all here — and add your own.',
    tone: 'bg-primary text-primary-foreground',
    Mark: GifMark,
    /* Odd one out: sits centred on its own row below the pair. */
    solo: true,
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
            <ScrollReveal
              key={channel.label}
              variant="fade-up"
              delay={i * 150}
              /**
               * An odd number of cards leaves the last one stranded in the
               * left column. It spans the row instead and then takes a
               * single column's width back — half the row less half the
               * `gap-6` between them — so it lands centred at exactly the
               * width of the two above rather than stretching across both.
               *
               * Below `sm` the grid is one column and every card is full
               * width already, so none of this applies.
               */
              className={
                channel.solo
                  ? 'sm:col-span-2 sm:w-[calc(50%-0.75rem)] sm:justify-self-center'
                  : undefined
              }
            >
              <li className="h-full">
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group pixel-box pixel-press pixel-lift flex h-full items-center gap-4 bg-card p-5"
                >
                  <div
                    className={`pixel-box-sm grid size-14 shrink-0 place-items-center ${channel.tone}`}
                  >
                    <channel.Mark className="size-7" />
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
