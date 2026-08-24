import Link from 'next/link'
import type * as React from 'react'
import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  bone: 'bg-card text-foreground',
  ink: 'bg-foreground text-background',
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
