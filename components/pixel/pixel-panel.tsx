import type * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * The workhorse container: 4px ink border, square corners, hard offset shadow.
 * Optional title bar mimics a chunky window chrome.
 */
export function PixelPanel({
  title,
  tone = 'card',
  className,
  bodyClassName,
  children,
}: {
  title?: string
  tone?: 'card' | 'bone' | 'ink' | 'primary' | 'accent' | 'secondary'
  className?: string
  bodyClassName?: string
  children: React.ReactNode
}) {
  const tones = {
    card: 'bg-card text-card-foreground',
    bone: 'bg-background text-foreground',
    ink: 'pixel-invert',
    primary: 'bg-primary text-primary-foreground',
    accent: 'bg-accent text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
  } as const

  return (
    <div className={cn('pixel-box', tones[tone], className)}>
      {title ? (
        <div className="pixel-invert flex items-center gap-2 border-b-4 border-border px-4 py-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-2 bg-primary" />
            <span className="size-2 bg-secondary" />
            <span className="size-2 bg-accent" />
          </span>
          <h3 className="font-display text-[10px] uppercase tracking-tight">
            {title}
          </h3>
        </div>
      ) : null}
      <div className={cn('p-5 sm:p-6', bodyClassName)}>{children}</div>
    </div>
  )
}

/** Small square-cornered label chip. */
export function PixelTag({
  className,
  style,
  children,
}: {
  className?: string
  /** Lets a caller tint the chip with a per-character accent colour. */
  style?: React.CSSProperties
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center border-[3px] border-border px-2 py-1 font-display text-[9px] uppercase leading-none tracking-tight',
        className,
      )}
      style={style}
    >
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  className,
}: {
  eyebrow?: string
  title: string
  body?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <PixelTag className="bg-secondary text-secondary-foreground">
          {eyebrow}
        </PixelTag>
      ) : null}
      <h2 className="max-w-3xl text-balance font-display text-2xl uppercase sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {body ? (
        <p className="max-w-2xl text-pretty text-2xl text-muted-foreground">
          {body}
        </p>
      ) : null}
    </div>
  )
}

export function PixelHeading({
  as: Component = 'h2',
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: React.ReactNode
}) {
  return (
    <Component className={cn('font-display uppercase text-balance', className)}>
      {children}
    </Component>
  )
}

