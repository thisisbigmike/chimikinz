export type ArtGroup = 'four' | 'characters' | 'scenes'

/**
 * Gallery filter buckets. The gallery only renders a filter for a category
 * that actually has pieces in it, so adding the first `gifs` or `collabs`
 * entry below makes that filter appear on its own.
 */
export type ArtCategory =
  | 'chimis'
  | 'ones'
  | 'cards'
  | 'scenes'
  | 'gifs'
  | 'collabs'
  | 'community'

export type Artwork = {
  slug: string
  title: string
  group: ArtGroup
  category: ArtCategory
  alt: string
  /** Wide pieces span two columns on the wall. */
  wide?: boolean
}

/** Grid image — small, for the wall. */
export const thumbSrc = (slug: string) => `/chimikinz/art/thumb/${slug}.webp`
/** Lightbox image — larger, only fetched when a piece is opened. */
export const fullSrc = (slug: string) => `/chimikinz/art/full/${slug}.webp`

/**
 * The logo mark — the same trimmed, transparent head the site header wears.
 * The gallery art file it came from carries a lot of empty canvas, which
 * only reads as centred inside a panel; unframed it needs the tight crop.
 */
export const chimiMark = '/chimikinz/chimi-mark.png'

export const artwork: Artwork[] = [
  // ── The four ──────────────────────────────────────────────────────────
  {
    slug: 'clov',
    title: 'Clov',
    group: 'four',
    category: 'chimis',
    alt: 'Clov, an orange Chimi in a white and orange hoodie holding a helmet',
  },
  {
    slug: 'moss',
    title: 'Moss',
    group: 'four',
    category: 'chimis',
    alt: 'Moss, a green Chimi in a black hoodie and backwards cap throwing a peace sign',
  },
  {
    slug: 'whim',
    title: 'Whim',
    group: 'four',
    category: 'chimis',
    alt: 'Whim, a lilac Chimi with orange hair in a pink hoodie, arms folded',
  },
  {
    slug: 'zipp',
    title: 'Zipp',
    group: 'four',
    category: 'chimis',
    alt: 'Zipp, a Chimi in a blue hoodie and propeller cap playing a handheld console',
  },

  // ── Characters ────────────────────────────────────────────────────────
  {
    slug: 'blue-braid',
    title: 'Blue Braid',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi with a long blue braid, tattooed arms and a buckled belt',
  },
  {
    slug: 'red-coat',
    title: 'Red Coat',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi in an open red coat with a scar under one eye',
  },
  {
    slug: 'gold-hoop',
    title: 'Gold Hoop',
    group: 'characters',
    category: 'ones',
    alt: 'A spiky-haired Chimi in a pale blue hoodie with a gold hoop earring',
  },
  {
    slug: 'white-smoke',
    title: 'White Smoke',
    group: 'characters',
    category: 'ones',
    alt: 'A red-eyed Chimi with white curling hair and a white coat, wreathed in smoke',
  },
  {
    slug: 'yellow-onesie',
    title: 'Yellow Onesie',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi sitting in a yellow dog onesie',
  },
  {
    slug: 'white-hood',
    title: 'White Hood',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi in a white hood and blue shirt with a gold sword on its back',
  },
  {
    slug: 'green-antennae',
    title: 'Green Antennae',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi in a green hood with antennae and a printed tee',
  },
  {
    slug: 'ball-cap',
    title: 'Ball Cap',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi in a red and white ball cap and a blue and green jacket',
  },
  {
    slug: 'tiger-suit',
    title: 'Tiger Suit',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi in a tiger onesie holding a lit sparkler and a stop sign',
  },
  {
    slug: 'wrapped-crown',
    title: 'Wrapped Crown',
    group: 'characters',
    category: 'ones',
    alt: 'A bandage-wrapped Chimi with a glowing purple eye, eyepatch and small gold crown',
  },
  {
    slug: 'cat-on-head',
    title: 'Cat On Head',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi in an orange hoodie and green hood with a black cat perched on its head',
  },
  {
    slug: 'skull-cap',
    title: 'Skull Cap',
    group: 'characters',
    category: 'ones',
    alt: 'A pale Chimi with a skull-painted face in a black bucket hat and hoodie',
  },
  {
    slug: 'pug-rider',
    title: 'Pug Rider',
    group: 'characters',
    category: 'ones',
    alt: 'A green-eyed Chimi in a blue coat and striped scarf with a pug sitting on its head',
  },
  {
    slug: 'bone-mask',
    title: 'Bone Mask',
    group: 'characters',
    category: 'ones',
    alt: 'A Chimi in a black robe and orange hair wearing a horned bone mask',
  },

  // ── Scenes ────────────────────────────────────────────────────────────
  {
    slug: 'the-whole-cast',
    title: 'The Whole Cast',
    group: 'scenes',
    category: 'scenes',
    alt: 'A wide group portrait of the entire Chimikinz cast crowded together',
    wide: true,
  },
  {
    slug: 'line-up',
    title: 'Line Up',
    group: 'scenes',
    category: 'scenes',
    alt: 'A character sheet showing Zipp, Moss, Whim and Clov from the front and back',
  },
  {
    slug: 'four-faces',
    title: 'Four Faces',
    group: 'scenes',
    category: 'scenes',
    alt: 'Four Chimi head portraits arranged in a square',
  },
  {
    slug: 'the-card-deck',
    title: 'The Card Deck',
    group: 'scenes',
    category: 'cards',
    alt: 'Four Chimikinz trading cards spread across a wooden desk with clovers',
  },
  {
    slug: 'clover-cove-sign',
    title: 'Clover Cove',
    group: 'scenes',
    category: 'scenes',
    alt: 'A Chimi sitting on the Clover Cove road sign at night',
  },
  {
    slug: 'the-crossing',
    title: 'The Crossing',
    group: 'scenes',
    category: 'scenes',
    alt: 'Four Chimis walking across a zebra crossing in commuter clothes',
  },
  {
    slug: 'desk-chair',
    title: 'Desk Chair',
    group: 'scenes',
    category: 'scenes',
    alt: 'A Chimi curled up asleep in an office chair',
  },
  {
    slug: 'signal-blanket',
    title: 'Signal',
    group: 'scenes',
    category: 'scenes',
    alt: 'A Chimi wrapped in a blanket sitting on top of a giant signal icon',
  },
  {
    slug: 'four-windows',
    title: 'Four Windows',
    group: 'scenes',
    category: 'scenes',
    alt: 'Chimis looking out of four windows, each showing a different season',
  },
  {
    slug: 'cone-hat',
    title: 'Cone Hat',
    group: 'scenes',
    category: 'scenes',
    alt: 'A small Chimi almost entirely hidden under a traffic cone',
  },
  {
    slug: 'the-long-grass',
    title: 'The Long Grass',
    group: 'scenes',
    category: 'scenes',
    alt: 'A Chimi walking a path through tall sunlit grass',
  },
  {
    slug: 'green-rain',
    title: 'Green Rain',
    group: 'scenes',
    category: 'scenes',
    alt: 'A hooded Chimi standing among a crowd of reaching hands under green rain',
  },
  {
    slug: 'apple-nap',
    title: 'Apple Nap',
    group: 'scenes',
    category: 'scenes',
    alt: 'Two Chimis resting on and inside a giant halved apple',
  },
  {
    slug: 'come-on-then',
    title: 'Come On Then',
    group: 'scenes',
    category: 'scenes',
    alt: 'One Chimi pulling another along by the hand',
  },
  {
    slug: 'the-calendar',
    title: 'The Calendar',
    group: 'scenes',
    category: 'scenes',
    alt: 'A Chimi in a suit leaning against a giant desk calendar with a briefcase',
  },
  {
    slug: 'watering-day',
    title: 'Watering Day',
    group: 'scenes',
    category: 'scenes',
    alt: 'A Chimi watering a small sprout in a pot',
  },
  {
    slug: 'night-hill',
    title: 'Night Hill',
    group: 'scenes',
    category: 'scenes',
    alt: 'A lone Chimi standing on a dark hill under a starry sky',
  },
  {
    slug: 'the-ring',
    title: 'The Ring',
    group: 'scenes',
    category: 'scenes',
    alt: 'Chimis arranged head to toe in a circle',
  },
  {
    slug: 'first-sea',
    title: 'First Sea',
    group: 'scenes',
    category: 'scenes',
    alt: 'A Chimi standing alone at the shoreline looking out at the sea',
  },
  {
    slug: 'the-worry-book',
    title: 'The Worry Book',
    group: 'scenes',
    category: 'scenes',
    alt: 'Chimis around a giant open book listing worries that turned out fine in the end',
  },
  {
    slug: 'keyboard-field',
    title: 'Keyboard Field',
    group: 'scenes',
    category: 'scenes',
    alt: 'Two Chimis resting on a giant keyboard lying in grass',
  },
  {
    slug: 'what-if-it-does',
    title: 'What If It Does',
    group: 'scenes',
    category: 'scenes',
    alt: 'Two Chimis talking in tall grass at sunset',
  },
]

export const artGroups: { id: ArtGroup; label: string; blurb: string }[] = [
  {
    id: 'four',
    label: 'The Four',
    blurb: 'Clov, Moss, Whim and Zipp — the ones who started it.',
  },
  {
    id: 'characters',
    label: 'Characters',
    blurb: 'One-off chimis, drawn one at a time and dressed for the occasion.',
  },
  {
    id: 'scenes',
    label: 'Scenes',
    blurb: 'Days out, quiet moments and the odd bit of trouble in Clover Cove.',
  },
]

export const artworkByGroup = (group: ArtGroup) =>
  artwork.filter((piece) => piece.group === group)

/** Filter labels. Order here is the order the filter row renders in. */
export const artCategories: { id: ArtCategory; label: string }[] = [
  { id: 'chimis', label: 'Chimis' },
  { id: 'ones', label: '1/1s' },
  { id: 'cards', label: 'Cards' },
  { id: 'scenes', label: 'Scenes' },
  { id: 'gifs', label: 'GIFs' },
  { id: 'collabs', label: 'Collabs' },
  { id: 'community', label: 'Community' },
]

/** Only the categories that actually have pieces, with their counts. */
export const activeCategories = () =>
  artCategories
    .map((c) => ({
      ...c,
      count: artwork.filter((piece) => piece.category === c.id).length,
    }))
    .filter((c) => c.count > 0)
