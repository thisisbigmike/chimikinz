'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
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
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      {/* The bar floats now: no full-width fill and no bottom rule, so the
          page runs under it and shows in the gap on every side. The ink that
          used to be a `border-4` is this outer copy of the shape — see
          `.pixel-pill`, which cannot draw a border of its own. */}
      <div className="pixel-pill relative z-50 mx-auto max-w-7xl bg-border p-1">
        <div className="flex items-center justify-between gap-4 bg-background px-4 py-3 pixel-pill sm:px-6">
          <Link
            href="/"
            className="group flex items-center gap-3 font-display text-sm uppercase tracking-tight sm:text-base"
          >
            {/* The mark is the Chimi head itself — no plate behind it, so it
                sits on whichever background the theme is wearing. Decorative:
                the wordmark beside it already names the site. */}
            <Image
              src="/chimikinz/chimi-mark.png"
              alt=""
              width={40}
              height={40}
              priority
              aria-hidden="true"
              className="art-smooth size-10 shrink-0 transition-transform duration-200 group-hover:scale-110"
            />
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
          height needs no magic number: 100% here is the header's own height.
          The wrapper exists to clip the closed drawer, which otherwise parks a
          panel-width past the right edge and widens the page. Clipping it here
          rather than on <html> matters — an overflow on the root makes it the
          sticky header's containing scrollport and the header stops sticking. */}
      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-50 w-screen overflow-x-clip lg:hidden"
        aria-hidden={!open}
      >
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        inert={!open}
        className={cn(
          'pixel-drawer pointer-events-auto absolute inset-y-0 right-0 flex w-[min(18rem,80vw)] flex-col overflow-y-auto border-l-4 border-border bg-card',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* The drawer covers the bar, so the toggle underneath is no longer
            reachable. This sits in the same corner with the same padding and
            box, so closing happens where the reader last tapped. */}
        <div className="flex shrink-0 items-center justify-end border-b-4 border-border p-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="pixel-box-sm grid size-10 place-items-center bg-card"
          >
            <span className="sr-only">Close menu</span>
            <span className="relative block size-5" aria-hidden="true">
              <span className="absolute left-0 top-1/2 h-1 w-5 -translate-y-1/2 rotate-45 bg-foreground" />
              <span className="absolute left-0 top-1/2 h-1 w-5 -translate-y-1/2 -rotate-45 bg-foreground" />
            </span>
          </button>
        </div>

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
        </ul>
      </nav>
      </div>
    </header>
  )
}
