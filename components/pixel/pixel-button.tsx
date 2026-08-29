import Link from 'next/link'
import type * as React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  /* The light slab. Fill and type both ride the theme, so it is a cream
     button with ink type by day and inverts to a dark one with cream type
     at nightfall — the 4px line and the offset shadow are what make it read
     as a button either way, not the fill. This replaced an `ink` variant
     that was `bg-foreground`: a black slab dropped on the light half of
     the page, which is the look it was meant to avoid. */
  bone: 'bg-card text-foreground',
  /* For a surface that inverts with the page — the `--panel` band. Always
     the opposite of the ink, so it is a dark button on the daylit green and
     a light one once that green falls to night. A fixed slab cannot do this:
     it would sink into the panel at one end of the ramp or the other. */
  invert: 'bg-foreground text-background',
} as const

const sizes = {
  sm: 'px-4 py-2 text-[10px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-xs sm:text-sm',
} as const

type BaseProps = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
  children: React.ReactNode
}

function classes({
  variant = 'primary',
  size = 'md',
  className,
}: Omit<BaseProps, 'children'>) {
  return cn(
    'pixel-box pixel-press inline-flex items-center justify-center gap-2 font-display uppercase leading-none tracking-tight',
    variants[variant],
    sizes[size],
    className,
  )
}

export function PixelLink({
  href,
  external,
  ...props
}: BaseProps & { href: string; external?: boolean }) {
  const { children, ...rest } = props

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes(rest)}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes(rest)}>
      {children}
    </Link>
  )
}

export function PixelButton({
  variant,
  size,
  className,
  children,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        classes({ variant, size, className }),
        'disabled:pointer-events-none disabled:opacity-50',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
