'use client'

import Image from 'next/image'
import { Heart } from 'lucide-react'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { type CollectionChimi, rarityStyle } from '@/lib/collection'
import { useFavorites } from '@/lib/context/favorites-context'
import { cn } from '@/lib/utils'

export function CollectionCard({
  chimi,
  priority = false,
  showTraits = true,
}: {
  chimi: CollectionChimi
  priority?: boolean
  showTraits?: boolean
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(chimi.id)

  return (
    <article className="group pixel-box pixel-press flex flex-col bg-card relative">
      <div className="art-ground relative aspect-square overflow-hidden border-b-4 border-border">
        <Image
          src={chimi.image}
          alt={`${chimi.name}, a Chimikinz chimi`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="pixel-wiggle object-contain p-3"
        />
        <span
          className={cn(
            'absolute left-0 top-0 border-b-4 border-r-4 border-border px-2 py-1 font-display text-[9px] uppercase leading-none transition-transform duration-200',
            'group-hover:scale-110',
            rarityStyle[chimi.rarity],
          )}
        >
          {chimi.rarity}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(chimi.id)
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
          <h3 className="font-display text-sm uppercase">{chimi.name}</h3>
          <span className="font-display text-[10px] text-muted-foreground">
            #{String(chimi.id).padStart(4, '0')}
          </span>
        </div>

        <p className="text-pretty text-xl leading-snug text-muted-foreground">
          {chimi.charm}
        </p>

        {showTraits ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {chimi.traits.map((trait, i) => (
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
