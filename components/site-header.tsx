'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

type Plate = { x: number; y: number; w: number; h: number }

/**
 * Where the plate sat on the page just left.
 *
 * `SiteHeader` is rendered by each page rather than by the root layout, so
 * a navigation unmounts it and mounts a fresh one — component state cannot
 * carry the old position across, and the plate would simply appear at the
 * new link with nothing to travel from. This sits outside the component so
 * it survives that, and the new header glides out of the old one's place.
 * A full reload clears it, which is right: there is nowhere to come from.
 */
let lastPlate: Plate | null = null

/** The glide itself. Long enough to read as travel, short enough to lead. */
const GLIDE = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), width 420ms cubic-bezier(0.22, 1, 0.36, 1)'

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

  /**
   * The green plate behind the current page is one element that slides,
   * rather than a background switched on and off per link. It is measured
   * from the link it belongs to, so it keeps whatever width the word needs
   * and lands exactly on the box the link would have drawn itself.
   */
  const navRef = useRef<HTMLElement>(null)
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [plate, setPlate] = useState<Plate | null>(null)
  /** Off until the starting position has been painted — a transition needs
   *  somewhere to leave from. */
  const [gliding, setGliding] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const activeIndex = site.nav.findIndex((item) => isActive(item.href))

  useEffect(() => {
    const nav = navRef.current
    const link = linkRefs.current[activeIndex]

    // A route that is not in the nav — Collections, a Chimi's own page —
    // gets no plate rather than a stranded one.
    if (!nav || !link) {
      setPlate(null)
      return
    }

    const measure = (): Plate => {
      const bounds = nav.getBoundingClientRect()
      const box = link.getBoundingClientRect()
      return {
        x: box.left - bounds.left,
        y: box.top - bounds.top,
        w: box.width,
        h: box.height,
      }
    }

    const target = measure()
    const from = lastPlate
    lastPlate = target

    let frame = 0
    /* Guards the two listeners below. Until the glide has been started,
       neither may write to the plate — a stray measurement lands it on the
       target early and there is nothing left to travel. */
    let ready = false

    const moved =
      from &&
      (Math.abs(from.x - target.x) > 0.5 || Math.abs(from.w - target.w) > 0.5)

    if (moved) {
      // Put it back where the last page left it, unanimated...
      setGliding(false)
      setPlate(from)
      // ...then let that paint before moving. Two frames, because a
      // transition cannot start from a value the browser has not committed.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          setGliding(true)
          setPlate(target)
          ready = true
        })
      })
    } else {
      setPlate(target)
      frame = requestAnimationFrame(() => {
        setGliding(true)
        ready = true
      })
    }

    const remeasure = () => {
      if (!ready) return
      const next = measure()
      lastPlate = next
      setPlate(next)
    }

    // The display face is what sets these widths, so a late font swap moves
    // every link under the plate.
    void document.fonts?.ready.then(remeasure).catch(() => {})

    const observer = new ResizeObserver(remeasure)
    observer.observe(nav)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [activeIndex, pathname])

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

          <nav
            ref={navRef}
            aria-label="Main"
            className="relative hidden items-center gap-1 lg:flex"
          >
            {/* The plate. Its 4px border lands exactly where each link keeps
                a transparent one, so the box is the same size either way and
                nothing shifts as it arrives. */}
            {plate ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 border-4 border-border bg-secondary will-change-transform"
                style={{
                  transform: `translate(${plate.x}px, ${plate.y}px)`,
                  width: plate.w,
                  height: plate.h,
                  transition: gliding && !reduced ? GLIDE : 'none',
                }}
              />
            ) : null}

            {site.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  linkRefs.current[i] = el
                }}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={cn(
                  /* Above the plate, and keeping the transparent border so
                     the link measures the same whether it is current or not. */
                  'pixel-glow relative border-4 border-transparent px-3 py-2 font-display text-[10px] uppercase tracking-tight transition-colors',
                  !isActive(item.href) && 'hover:border-border hover:bg-secondary',
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
