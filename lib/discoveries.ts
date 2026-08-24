/**
 * "Latest discovery" — the most recent thing found in Clover Cove.
 *
 * Newest first. The home page shows `discoveries[0]`, so adding a new entry
 * at the top is the whole update.
 */

export type Discovery = {
  /** Matches a slug in lib/artwork.ts. */
  slug: string
  title: string
  /** When it turned up, written how you'd say it out loud. */
  found: string
  note: string
}

export const discoveries: Discovery[] = [
  {
    slug: 'the-worry-book',
    title: 'The Worry Book',
    found: 'Found this week',
    note: 'A book left open in the long grass, listing every worry that turned out fine in the end. It is much thicker than anyone expected, and still being added to.',
  },
  {
    slug: 'apple-nap',
    title: 'Apple Nap',
    found: 'Found last week',
    note: 'An apple big enough to sleep inside, which two Chimis discovered at roughly the same moment and are still negotiating over.',
  },
  {
    slug: 'green-rain',
    title: 'Green Rain',
    found: 'Found earlier',
    note: 'The strange weather at the edge of the Cove. Harmless, apparently, though nobody stays out in it long.',
  },
]

export const latestDiscovery = discoveries[0]
