export type Collection = {
  slug: string
  name: string
  blurb: string
  cover: string
  /** Shown on the card as a small stat pair. */
  supply: string
  status: 'Minting soon' | 'Live' | 'In the sketchbook'
  /**
   * Where the card sends people once `launched` (lib/site.ts) is true.
   * Fill these in with the real OpenSea collection URLs before launch.
   */
  opensea: string
}

export const collections: Collection[] = [
  {
    slug: 'genesis',
    name: 'Chimikinz Genesis',
    blurb:
      'The full cast. 4,444 chimis drawn by hand, each one born with a single charm of its own.',
    cover: '/chimikinz/chimikins-logo-group.png',
    supply: '4,444',
    status: 'Minting soon',
    // TODO: real OpenSea URL
    opensea: 'https://opensea.io/collection/chimikinz',
  },
  {
    slug: 'the-four-chimis',
    name: 'The Four Chimis',
    blurb:
      'Clov, Moss, Whim and Zipp — the four feelings that started Clover Cove and still lead it.',
    cover: '/chimikinz/art/full/line-up.webp',
    supply: '4',
    status: 'In the sketchbook',
    // TODO: real OpenSea URL
    opensea: 'https://opensea.io/collection/chimikinz',
  },
  {
    slug: 'clover-cove',
    name: 'Clover Cove',
    blurb:
      'Scenes from the world the chimis live in — the streets, the shops and the strange weather.',
    cover: '/chimikinz/art/full/clover-cove-sign.webp',
    supply: 'TBA',
    status: 'In the sketchbook',
    // TODO: real OpenSea URL
    opensea: 'https://opensea.io/collection/chimikinz',
  },
]
