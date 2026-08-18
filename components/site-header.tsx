'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { PixelLink } from '@/components/pixel/pixel-button'
import { brandImages } from '@/lib/art'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b-4 border-foreground bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 font-display text-sm uppercase tracking-tight sm:text-base"
        >
          <span
            className="art-smooth relative grid size-9 shrink-0 place-items-center overflow-hidden border-4 border-foreground bg-primary transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          >
            <Image
              src={brandImages.logoHead}
              alt=""
              fill
              sizes="36px"
              className="object-contain p-0.5"
            />
          </span>
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="pixel-glow border-4 border-transparent px-3 py-2 font-display text-[10px] uppercase tracking-tight transition-colors hover:border-foreground hover:bg-secondary"
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

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="pixel-slide-down border-t-4 border-foreground bg-card lg:hidden"
        >
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href} className="border-b-4 border-foreground">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 font-display text-[11px] uppercase tracking-tight transition-colors hover:bg-secondary/30"
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
      ) : null}
    </header>
  )
}
