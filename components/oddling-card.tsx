'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { type Oddling, rarityStyle } from '@/lib/oddlings'
import { useFavorites } from '@/lib/context/favorites-context'
import { cn } from '@/lib/utils'

export function OddlingCard({
  oddling,
  priority = false,
  showTraits = true,
}: {
  oddling: Oddling
  priority?: boolean
  showTraits?: boolean
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(oddling.id)

  return (
    <article className="group pixel-box pixel-press flex flex-col bg-card relative">
      <div className="art-ground relative aspect-square overflow-hidden border-b-4 border-border">
        <Image
          src={oddling.image}
          alt={`${oddling.name}, a Chimikinz oddling`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="pixel-wiggle object-contain p-3"
        />
        <span
          className={cn(
            'absolute left-0 top-0 border-b-4 border-r-4 border-border px-2 py-1 font-display text-[9px] uppercase leading-none transition-transform duration-200',
            'group-hover:scale-110',
            rarityStyle[oddling.rarity],
          )}
        >
          {oddling.rarity}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(oddling.id)
          }}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className={cn(
            'absolute right-2 top-2 size-8 border-2 border-border grid place-items-center transition-all duration-200 z-10',
            fav ? 'bg-primary text-primary-foreground scale-110' : 'bg-background/90 text-foreground hover:bg-secondary',
          )}
        >
          <Heart className={cn('size-4', fav && 'fill-current')} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-sm uppercase">{oddling.name}</h3>
          <span className="font-display text-[10px] text-muted-foreground">
            #{String(oddling.id).padStart(4, '0')}
          </span>
        </div>

        <p className="text-pretty text-xl leading-snug text-muted-foreground">
          {oddling.charm}
        </p>

        {showTraits ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {oddling.traits.map((trait, i) => (
              <li
                key={trait.label}
                className="transition-all duration-200"
                style={{
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <PixelTag className="bg-background group-hover:bg-secondary/30 transition-colors duration-200">{trait.value}</PixelTag>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}
