import { site } from '@/lib/site'

/**
 * The drops shown on /collections.
 *
 * A collection with `status: 'soon'` renders as a locked card — no link out,
 * a COMING SOON seal over the art. Flip it to `'live'` and give it an
 * `opensea` URL on launch day and the same card becomes the door to OpenSea.
 * Nothing else needs touching.
 */
export type CollectionStatus = 'live' | 'soon'

export type Collection = {
  id: string
  name: string
  blurb: string
  /** Shown on the card face — supply, chain, mint window, that sort of thing. */
  facts: { label: string; value: string }[]
  image: string
  /** Describe the art, not the file. */
  alt: string
  status: CollectionStatus
  /** Only followed when `status` is `'live'`. */
  opensea?: string
}

export const collections: Collection[] = [
  {
    id: 'genesis',
    name: 'Genesis Oddlings',
    blurb:
      'The founding nest. Every one of the 4,444 drawn by hand, each carrying a single charm nothing else in the collection repeats.',
    facts: [
      { label: 'Supply', value: site.supply.toLocaleString() },
      { label: 'Chain', value: site.chain },
      { label: 'Mint', value: site.launch },
    ],
    // The wide banner crops badly in a 4:3 card, so the nest ring stands in.
    image: '/chimikinz/art/chimi-circle.png',
    alt: 'Chimis of every size arranged in a circle, largest to smallest',
    status: 'soon',
    opensea: site.links.opensea,
  },
  {
    id: 'the-four',
    name: 'The Four',
    blurb:
      'Clov, Moss, Whim and Zipp — the leads the whole world was drawn around. A short, deliberately tiny set.',
    facts: [
      { label: 'Supply', value: '4' },
      { label: 'Chain', value: site.chain },
      { label: 'Drop', value: 'With Genesis' },
    ],
    image: '/chimikinz/cast/cards.jpg',
    alt: 'Four collectible cards for Moss, Whim, Clov and Zipp laid out on a wooden table',
    status: 'soon',
    opensea: site.links.opensea,
  },
  {
    id: 'one-offs',
    name: 'One-Offs',
    blurb:
      'Hand-drawn singles that never became a trait — costumes, crossovers and jokes that only work once.',
    facts: [
      { label: 'Supply', value: '1 of 1' },
      { label: 'Chain', value: site.chain },
      { label: 'Drop', value: 'Post-mint' },
    ],
    image: '/chimikinz/chimis/tiger-onesie.png',
    alt: 'A Chimi in a tiger onesie wearing a stop sign pendant and holding a lit firework',
    status: 'soon',
    opensea: site.links.opensea,
  },
]

/** True once anything at all is actually trading. */
export const anyCollectionLive = collections.some((c) => c.status === 'live')
