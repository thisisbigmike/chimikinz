/**
 * The one-of-one chimis, for the Rare Personalities section.
 *
 * Kept out of `lib/artwork.ts` on purpose: these are meant for that section
 * only, and anything added to the artwork list turns up on the gallery wall
 * as well. Move an entry over there if it should hang in both.
 *
 * Images live under /public/chimikinz/rare, in the same two sizes the
 * gallery uses — 1600px on the stage, 640px in the thumb strip:
 *   ffmpeg -y -i <source>.png -vf scale=1600:1600:flags=lanczos \
 *     -c:v libwebp -quality 82 public/chimikinz/rare/full/<slug>.webp
 *   ffmpeg -y -i <source>.png -vf scale=640:640:flags=lanczos \
 *     -c:v libwebp -quality 80 public/chimikinz/rare/thumb/<slug>.webp
 */

export type RarePersonality = {
  slug: string
  /** The chimi's name — the caption under the slider, and the thumb's label. */
  name: string
  /** What the piece shows, for screen readers. */
  alt: string
}

/** Stage image — 1600px square. */
export const rareFullSrc = (slug: string) =>
  `/chimikinz/rare/full/${slug}.webp`
/** Strip image — 640px square. */
export const rareThumbSrc = (slug: string) =>
  `/chimikinz/rare/thumb/${slug}.webp`

export const rarePersonalities: RarePersonality[] = [
  {
    slug: 'school-blazer',
    name: 'Lula',
    alt: 'Lula — a chimi with long blue hair pinned with a clover and a pencil, in a black school blazer, pleated skirt and a red-cross satchel',
  },
  {
    slug: 'candle-head',
    name: 'Roni',
    alt: 'Roni — a pale wax chimi with a lit flame on its head, wrapped in a deep red cloak with a blue gem at the collar',
  },
  {
    slug: 'red-tie',
    name: 'Dweebie',
    alt: 'Dweebie — a brown chimi in glasses, a white shirt and red tie with a backpack, a small dark companion floating beside it',
  },
  {
    slug: 'striped-sweater',
    name: 'Saya',
    alt: 'Saya — a black-haired chimi in a red and black striped sweater and dark jeans',
  },
  {
    slug: 'sailor-collar',
    name: 'Reddi',
    alt: 'Reddi — a red-haired chimi in a long tan coat with a sailor collar and a medal at the chest',
  },
  {
    slug: 'halo-hat',
    name: 'Rable',
    alt: 'Rable — a blue-haired chimi under a halo, in a goggled bucket hat and dark skirt, carrying a teddy bear',
  },
  {
    slug: 'green-hood',
    name: 'Tonki',
    alt: 'Tonki — a chimi in a green eared hood and orange vest with red boots, holding a small dark cat',
  },
]
