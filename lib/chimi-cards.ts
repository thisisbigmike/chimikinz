/**
 * The printed collector cards, as artwork.
 *
 * These are finished card designs — frame, stats, number and lore are all
 * drawn into the image — so the site shows them as pictures rather than
 * rebuilding them in markup. The coded `components/chimi-card.tsx` is a
 * different thing and still fronts each Chimi's own route.
 *
 * Images live under /public/chimikinz/cards, trimmed to the card and left
 * at their own proportions:
 *   sharp(src).trim({ threshold: 0 })
 *     .resize({ width: 1200, withoutEnlargement: true })
 *     .webp({ quality: 84, alphaQuality: 100 })
 */

export type ChimiCardArt = {
  slug: string
  /** Who the card is for — used for the caption and the alt text. */
  name: string
  alt: string
}

export const cardSrc = (slug: string) => `/chimikinz/cards/${slug}.webp`

export const chimiCardArt: ChimiCardArt[] = [
  {
    slug: 'clov',
    name: 'Clov',
    alt: 'Clov’s collector card, number 0001, on a peach ground: the optimist, embodies hope, with energy 8, socials 7 and chaos 4 out of 10',
  },
  {
    slug: 'zipp',
    name: 'Zipp',
    alt: 'Zipp’s collector card, number 0002, on a blue ground: the little whirlwind of Clover Cove, embodies chaos, with energy 10, socials 8 and chaos 10 out of 10',
  },
  {
    slug: 'dweebie',
    name: 'Dweebie',
    alt: 'Dweebie’s collector card, number 6, on a violet ground: a rare personality, The Daydreamer, whose companion is imagination',
  },
]
