export type ChimiTrait = { label: string; value: string }

export type Chimi = {
  slug: string
  name: string
  /** The feeling this Chimi grew out of. */
  emotion: string
  /** One line — who they are at a glance. */
  personality: string
  /** The longer telling. Rendered as separate paragraphs. */
  story: string[]
  /** Something they'd actually say. */
  quote: string
  companion: { name: string; body: string }
  traits: ChimiTrait[]
  /** Full-size artwork for the profile. */
  art: string
  /** Small artwork for cards and rails. */
  thumb: string
  /**
   * Pulled from the artwork itself — used for the accent bar and tag on
   * that Chimi's card so each profile carries its own colour.
   */
  accent: string
  /**
   * `main` are the four the world started with. Adding a `rare` entry to the
   * array below is all it takes to put a new personality on the page — the
   * Chimis page groups by this field and renders whatever it finds.
   */
  kind: 'main' | 'rare'
}

export const chimis: Chimi[] = [
  {
    slug: 'clov',
    name: 'Clov',
    emotion: 'Curiosity',
    personality:
      'Always first through the gap in the hedge, and always fine about what he finds on the other side.',
    story: [
      'Clov was the first feeling Clover Cove ever had, and it was a question. Not a worried one — the good kind, the kind that gets you out of bed early because you left something half-explored the day before.',
      'He knows the Cove better than anyone and still walks it like a stranger, because he reckons a place you think you know is just a place you have stopped looking at properly.',
      'When a new Chimi wakes up somewhere they do not recognise, it is usually Clov who finds them first. He never explains the whole world at once. He just points at one interesting thing and lets them do the rest.',
    ],
    quote: 'Everything is somewhere. You just have to go and see.',
    companion: {
      name: 'Pocket',
      body: 'A clover sprite the size of a thumbnail that rides in his hood and leans out at corners.',
    },
    traits: [
      { label: 'Skin', value: 'Warm Peach' },
      { label: 'Fit', value: 'White & Orange Hoodie' },
      { label: 'Carries', value: 'A Dented Helmet' },
      { label: 'Charm', value: 'Never Lost, Only Early' },
    ],
    art: '/chimikinz/art/full/clov.webp',
    thumb: '/chimikinz/art/thumb/clov.webp',
    accent: '#ff8a4c',
    kind: 'main',
  },
  {
    slug: 'moss',
    name: 'Moss',
    emotion: 'Patience',
    personality:
      'Moves slowly on purpose, and is somehow never the one running late.',
    story: [
      'Moss grew out of the quiet stretch after something hard — the part where nothing appears to be happening and everything is. He is the reason Clover Cove has trees instead of saplings.',
      'He is not lazy and he is not sad. He simply worked out early that most things worth having arrive on their own schedule, and that standing over them shouting does not speed it up.',
      'Chimis come to Moss when they have decided they are failing. He rarely gives advice. He mostly sits with them until they notice, on their own, how far they have already come.',
    ],
    quote: 'It is still growing. So are you.',
    companion: {
      name: 'Drift',
      body: 'A stone snail that has been crossing the same meadow for two years and is genuinely enjoying it.',
    },
    traits: [
      { label: 'Skin', value: 'Meadow Green' },
      { label: 'Fit', value: 'Black Hoodie' },
      { label: 'Head', value: 'Backwards Cap' },
      { label: 'Charm', value: 'Small Steps Count' },
    ],
    art: '/chimikinz/art/full/moss.webp',
    thumb: '/chimikinz/art/thumb/moss.webp',
    accent: '#7ec88b',
    kind: 'main',
  },
  {
    slug: 'whim',
    name: 'Whim',
    emotion: 'Wonder',
    personality:
      'Turns an ordinary Tuesday into something you will still be telling people about in a year.',
    story: [
      'Nobody is entirely sure which feeling Whim came from, including Whim. The best guess is the one you get just before you do something slightly ridiculous and it works.',
      'She rearranges things. Signposts, weather, the order of the shops on the high street. The Cove has mostly stopped correcting her, because the new arrangement is usually better and always more interesting.',
      'Whim is the reason there are parts of Clover Cove that no map agrees on. She says a world you can finish mapping is a world you have stopped being surprised by, and she has no intention of letting that happen.',
    ],
    quote: "Or — and hear me out — we could do the other thing.",
    companion: {
      name: 'Blink',
      body: 'A firefly that only lights up when nobody is watching it directly.',
    },
    traits: [
      { label: 'Skin', value: 'Dusk Lilac' },
      { label: 'Hair', value: 'Sunset Orange' },
      { label: 'Fit', value: 'Pink Hoodie' },
      { label: 'Charm', value: 'Never The Obvious One' },
    ],
    art: '/chimikinz/art/full/whim.webp',
    thumb: '/chimikinz/art/thumb/whim.webp',
    accent: '#ffc5d6',
    kind: 'main',
  },
  {
    slug: 'zipp',
    name: 'Zipp',
    emotion: 'Determination',
    personality:
      'Has never once finished something on the first try, and has never once stopped at the first try.',
    story: [
      'Zipp is the feeling of going again. Not the triumphant version with the music swelling — the smaller, more useful one, where you sigh, pick the thing back up, and have another go.',
      'He is the fastest Chimi in the Cove and also the one who falls over most, and he will tell you those two facts are the same fact.',
      'His real talent is not speed. It is that he is impossible to be discouraged around. Chimis who set out with Zipp tend to get further than they meant to, and are never quite sure how.',
    ],
    quote: 'That was attempt four. Attempt five is going to be great.',
    companion: {
      name: 'Dash',
      body: 'A wind-up bird that runs out of spring at the worst moments and gets wound straight back up.',
    },
    traits: [
      { label: 'Skin', value: 'Warm Peach' },
      { label: 'Fit', value: 'Blue Hoodie' },
      { label: 'Head', value: 'Propeller Cap' },
      { label: 'Charm', value: 'One More Go' },
    ],
    art: '/chimikinz/art/full/zipp.webp',
    thumb: '/chimikinz/art/thumb/zipp.webp',
    accent: '#8ecdf5',
    kind: 'main',
  },

  // Rare personalities go here. Add one and it appears on /chimis under its
  // own heading — no page changes needed.
]

export const mainChimis = chimis.filter((c) => c.kind === 'main')
export const rareChimis = chimis.filter((c) => c.kind === 'rare')

export const chimiBySlug = (slug: string) =>
  chimis.find((c) => c.slug === slug)
