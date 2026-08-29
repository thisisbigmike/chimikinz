'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PixelLink } from '@/components/pixel/pixel-button'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  /** Any navigation closes the drawer — the links share a route on this site,
   *  so a click does not always unmount the header. */
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    /* The drawer sits over the page, so the page should not scroll behind it
       — and on this site scrolling also drives the theme, which would keep
       moving under a menu the reader is trying to use. */
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  /** Home only lights up on an exact match; the rest match their section. */
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b-4 border-border bg-background">
      <div className="relative z-50 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 font-display text-sm uppercase tracking-tight sm:text-base"
        >
          <span
            className="grid size-9 shrink-0 place-items-center border-4 border-border bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          >
            <span className="font-display text-xs">C</span>
          </span>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'pixel-glow border-4 border-transparent px-3 py-2 font-display text-[10px] uppercase tracking-tight transition-colors hover:border-border hover:bg-secondary',
                isActive(item.href) && 'border-border bg-secondary',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <PixelLink
            href={site.links.mint}
            external
            size="sm"
            className="hidden sm:inline-flex"
          >
            Mint
          </PixelLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="pixel-box-sm grid size-10 place-items-center bg-card lg:hidden"
          >
            <span className="sr-only">
              {open ? 'Close menu' : 'Open menu'}
            </span>
            <span className="flex flex-col gap-1" aria-hidden="true">
              <span
                className={cn(
                  'h-1 w-5 bg-foreground transition-transform duration-200',
                  open && 'translate-y-2 rotate-45',
                )}
              />
              <span
                className={cn(
                  'h-1 w-5 bg-foreground transition-opacity duration-200',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'h-1 w-5 bg-foreground transition-transform duration-200',
                  open && '-translate-y-2 -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Tapping the page behind the drawer closes it. Always rendered so it
          can fade out with the drawer instead of vanishing under it. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-30 bg-night/60 transition-opacity duration-200 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* Anchored to the header's bottom edge rather than the viewport, so the
          height needs no magic number: 100% here is the header's own height. */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        inert={!open}
        className={cn(
          'pixel-drawer absolute right-0 top-full z-40 flex h-[calc(100dvh_-_100%)] w-[min(18rem,80vw)] flex-col overflow-y-auto border-l-4 border-border bg-card lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <ul className="flex flex-col">
          {site.nav.map((item) => (
            <li key={item.href} className="border-b-4 border-border">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  'block px-5 py-4 font-display text-[11px] uppercase tracking-tight transition-colors hover:bg-secondary/30',
                  isActive(item.href) && 'bg-secondary',
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="p-4">
            <PixelLink
              href={site.links.mint}
              external
              size="md"
              className="w-full"
            >
              Mint on {site.chain}
            </PixelLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
