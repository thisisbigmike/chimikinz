import { cn } from '@/lib/utils'

/**
 * Scrolling announcement rail — the pudgy-style beat between sections.
 * The track is duplicated so a -50% translate loops seamlessly.
 * Pauses on hover. Diamond separators spin on hover.
 */
export function PixelMarquee({
  items,
  tone = 'ink',
  className,
}: {
  items: readonly string[]
  tone?: 'ink' | 'primary' | 'secondary'
  className?: string
}) {
  const tones = {
    ink: 'pixel-invert',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
  } as const

  return (
    <div
      className={cn(
        'marquee-container flex overflow-hidden border-y-4 border-border py-3',
        tones[tone],
        className,
      )}
    >
      <div className="marquee-track flex shrink-0 items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex shrink-0 items-center gap-6 px-6 font-display text-[10px] uppercase tracking-tight sm:text-xs"
                aria-hidden={copy === 1 ? 'true' : undefined}
              >
                <span>{item}</span>
                <span className="pixel-diamond-spin size-2 shrink-0 rotate-45 bg-current" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
