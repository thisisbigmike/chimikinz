/**
 * The history of Clover Cove, told as chapters rather than a roadmap.
 *
 * Add a chapter to the end as the world grows — the page renders whatever is
 * in this array, in order, and marks the first `now` chapter as where things
 * currently stand.
 */

export type Chapter = {
  slug: string
  /** Small label above the title — an era, not a date. */
  era: string
  title: string
  /** Lead paragraph, set larger on the page. */
  lead: string
  body: string[]
  /** `past` is done, `now` is where we are, `ahead` has not happened yet. */
  status: 'past' | 'now' | 'ahead'
  art: string
  artAlt: string
}

export const chapters: Chapter[] = [
  {
    slug: 'the-beginning',
    era: 'Before the map',
    title: 'The Beginning',
    lead: 'It started as one drawing a night, with no plan attached to it.',
    body: [
      'There was no collection, no supply number and no world. There was a sketchbook and a habit — one small creature a night, drawn to find out what it would turn into.',
      'The creatures kept arriving with feelings already attached. One was plainly nervous. One was plainly delighted about something off the page. Once that pattern was obvious, the rest of it followed.',
    ],
    status: 'past',
    art: '/chimikinz/art/full/desk-chair.webp',
    artAlt: 'A Chimi curled up asleep in an office chair',
  },
  {
    slug: 'clover-cove',
    era: 'The world arrives',
    title: 'Clover Cove',
    lead: 'The characters needed somewhere to be, so somewhere got built.',
    body: [
      'Clover Cove began as a road sign and worked outward. Then the streets, the shops, the strange weather, and the long grass at the edge that nobody has finished walking through.',
      'It was drawn as a place people would want to be rather than a backdrop — somewhere quiet, slightly odd, and forgiving. That decision shaped everything after it.',
    ],
    status: 'past',
    art: '/chimikinz/art/full/clover-cove-sign.webp',
    artAlt: 'A Chimi sitting on the Clover Cove road sign at night',
  },
  {
    slug: 'the-chimis',
    era: 'The first four',
    title: 'The Chimis',
    lead: 'Clov, Moss, Whim and Zipp turned up, and the world got a cast.',
    body: [
      'Four feelings arrived first: hope, patience, wonder and chaos. Between them they set the tone of the Cove — how fast it moves, how much it forgives, how much it wanders off.',
      'They stopped being drawings at the point they started disagreeing with each other. Everything since has been written with the four of them in mind.',
    ],
    status: 'past',
    art: '/chimikinz/art/full/line-up.webp',
    artAlt: 'A character sheet showing Zipp, Moss, Whim and Clov',
  },
  {
    slug: 'the-bloom',
    era: 'Where we are',
    title: 'The Bloom',
    lead: 'More arrive every week, and they stopped waiting to be introduced.',
    body: [
      'The Cove filled up. Onesies, bone masks, crowns, a pug riding on somebody’s head. Each new Chimi is still a feeling first, but the feelings got stranger and more specific, which is the point.',
      'The gallery is the honest record of this part — everything drawn so far, in the order it happened. It is the fastest-moving part of the project and the best place to watch it grow.',
    ],
    status: 'now',
    art: '/chimikinz/art/full/the-whole-cast.webp',
    artAlt: 'A wide group portrait of the entire Chimikinz cast',
  },
  {
    slug: 'what-comes-next',
    era: 'Not yet drawn',
    title: 'What Comes Next',
    lead: 'Animation, comics, and the parts of the Cove nobody has seen.',
    body: [
      'The Chimis have always moved in our heads and stood still on the page. Closing that gap — short animations, comics, the small moments between the big drawings — is the next real step.',
      'Past that, the honest answer is that it depends on who turns up. The Cove has never been planned very far ahead, and it has not hurt it yet.',
    ],
    status: 'ahead',
    art: '/chimikinz/art/full/the-long-grass.webp',
    artAlt: 'A Chimi walking a path through tall sunlit grass',
  },
]

export const statusLabel: Record<Chapter['status'], string> = {
  past: 'Happened',
  now: 'Here now',
  ahead: 'Ahead',
}
