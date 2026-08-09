'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { OddlingCard } from '@/components/oddling-card'
import {
  oddlings,
  rarities,
  families,
  type Oddling,
  type Rarity,
  rarityStyle,
} from '@/lib/oddlings'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

export default function GalleryPage() {
  const [search, setSearch] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'All'>('All')
  const [selectedFamily, setSelectedFamily] = useState<string>('All')
  const [selectedOddling, setSelectedOddling] = useState<Oddling | null>(null)

  const filteredOddlings = useMemo(() => {
    return oddlings.filter((item) => {
      const matchesRarity =
        selectedRarity === 'All' || item.rarity === selectedRarity
      const matchesFamily =
        selectedFamily === 'All' || item.family === selectedFamily
      const query = search.toLowerCase().trim()
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.charm.toLowerCase().includes(query) ||
        item.traits.some(
          (t) =>
            t.label.toLowerCase().includes(query) ||
            t.value.toLowerCase().includes(query),
        )

      return matchesRarity && matchesFamily && matchesSearch
    })
  }, [search, selectedRarity, selectedFamily])

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="The Nest"
            title="Explore the Oddlings"
            body="Every oddling is drawn by hand with its own charm and traits. Search by name, filter by rarity or family."
          />

          {/* Controls Bar */}
          <div className="pixel-box bg-card p-6 flex flex-col gap-6">
            {/* Search Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="search-input" className="font-display text-xs uppercase">
                Search Oddlings
              </label>
              <input
                id="search-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, charm, or trait..."
                className="w-full border-4 border-foreground bg-background px-4 py-3 font-display text-sm focus:outline-none focus:ring-4 focus:ring-primary"
              />
            </div>

            {/* Filters Group */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Rarity Filter */}
              <div className="flex flex-col gap-2">
                <span className="font-display text-[11px] uppercase text-muted-foreground">
                  Rarity
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRarity('All')}
                    className={cn(
                      'pixel-press border-3 border-foreground px-3 py-1.5 font-display text-[10px] uppercase',
                      selectedRarity === 'All'
                        ? 'bg-foreground text-background'
                        : 'bg-background text-foreground hover:bg-muted',
                    )}
                  >
                    All ({oddlings.length})
                  </button>
                  {rarities.map((r) => {
                    const count = oddlings.filter((o) => o.rarity === r).length
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSelectedRarity(r)}
                        className={cn(
                          'pixel-press border-3 border-foreground px-3 py-1.5 font-display text-[10px] uppercase',
                          selectedRarity === r
                            ? 'bg-foreground text-background'
                            : 'bg-background text-foreground hover:bg-muted',
                        )}
                      >
                        {r} ({count})
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Family Filter */}
              <div className="flex flex-col gap-2">
                <span className="font-display text-[11px] uppercase text-muted-foreground">
                  Family
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedFamily('All')}
                    className={cn(
                      'pixel-press border-3 border-foreground px-3 py-1.5 font-display text-[10px] uppercase',
                      selectedFamily === 'All'
                        ? 'bg-foreground text-background'
                        : 'bg-background text-foreground hover:bg-muted',
                    )}
                  >
                    All
                  </button>
                  {families.map((fam) => (
                    <button
                      key={fam}
                      type="button"
                      onClick={() => setSelectedFamily(fam)}
                      className={cn(
                        'pixel-press border-3 border-foreground px-3 py-1.5 font-display text-[10px] uppercase',
                        selectedFamily === fam
                          ? 'bg-foreground text-background'
                          : 'bg-background text-foreground hover:bg-muted',
                      )}
                    >
                      {fam}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between font-display text-xs uppercase text-muted-foreground pt-2">
            <span>
              Showing {filteredOddlings.length} of {oddlings.length} revealed
            </span>
            {(selectedRarity !== 'All' ||
              selectedFamily !== 'All' ||
              search) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setSelectedRarity('All')
                  setSelectedFamily('All')
                }}
                className="underline hover:text-primary"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Oddlings Grid */}
          {filteredOddlings.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredOddlings.map((oddling) => (
                <li
                  key={oddling.id}
                  onClick={() => setSelectedOddling(oddling)}
                  className="cursor-pointer"
                >
                  <OddlingCard oddling={oddling} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="pixel-box bg-card p-12 text-center flex flex-col items-center justify-center gap-4">
              <div className="size-12 border-2 border-foreground bg-secondary/30 grid place-items-center">
                <Search className="size-6 text-foreground" />
              </div>
              <h3 className="font-display text-lg uppercase">No Oddlings Found</h3>
              <p className="text-xl text-muted-foreground">
                No charm matches your query. Try resetting your search or filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setSelectedRarity('All')
                  setSelectedFamily('All')
                }}
                className="pixel-box-sm bg-primary text-primary-foreground px-4 py-2 font-display text-xs uppercase"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Oddling Detail Modal */}
        {selectedOddling && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4"
            onClick={() => setSelectedOddling(null)}
          >
            <div
              className="pixel-box-lg bg-card w-full max-w-2xl p-6 sm:p-8 flex flex-col gap-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedOddling(null)}
                className="absolute top-4 right-4 pixel-box-sm bg-primary text-primary-foreground w-10 h-10 font-display text-sm grid place-items-center"
              >
                X
              </button>

              <div className="grid gap-6 sm:grid-cols-2 items-center">
                <div className="pixel-checker relative aspect-square border-4 border-foreground bg-background">
                  <Image
                    src={selectedOddling.image}
                    alt={selectedOddling.name}
                    fill
                    className="object-contain p-4"
                  />
                  <span
                    className={cn(
                      'absolute top-0 left-0 border-b-4 border-r-4 border-foreground px-3 py-1 font-display text-xs uppercase',
                      rarityStyle[selectedOddling.rarity],
                    )}
                  >
                    {selectedOddling.rarity}
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs text-muted-foreground">
                        #{String(selectedOddling.id).padStart(4, '0')}
                      </span>
                      <PixelTag className="bg-secondary">
                        {selectedOddling.family}
                      </PixelTag>
                    </div>
                    <h2 className="font-display text-2xl uppercase mt-1">
                      {selectedOddling.name}
                    </h2>
                  </div>

                  <div className="border-t-4 border-b-4 border-foreground py-3">
                    <span className="font-display text-[10px] uppercase text-muted-foreground block mb-1">
                      Charm Lore
                    </span>
                    <p className="text-2xl leading-snug text-foreground">
                      "{selectedOddling.charm}"
                    </p>
                  </div>

                  <div>
                    <span className="font-display text-[10px] uppercase text-muted-foreground block mb-2">
                      Traits
                    </span>
                    <ul className="grid grid-cols-2 gap-2">
                      {selectedOddling.traits.map((t) => (
                        <li
                          key={t.label}
                          className="pixel-box-sm bg-background p-2 text-center"
                        >
                          <span className="block font-display text-[9px] uppercase text-muted-foreground">
                            {t.label}
                          </span>
                          <span className="block font-display text-xs uppercase text-foreground">
                            {t.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={site.links.mint}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-box pixel-press bg-primary text-primary-foreground text-center py-3 font-display text-xs uppercase mt-2"
                  >
                    Mint on {site.chain} &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
