export type Rarity = 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythic'

export type Oddling = {
  id: number
  name: string
  image: string
  rarity: Rarity
  /** Broad skin family — the primary filter axis. */
  family: 'Fleshling' | 'Sunling' | 'Stoneling' | 'Oozeling' | 'Emberling'
  charm: string
  traits: { label: string; value: string }[]
}

export const oddlings: Oddling[] = [
  {
    id: 1,
    name: 'Kickback',
    image: '/chimikinz/oddling-1.png',
    rarity: 'Common',
    family: 'Fleshling',
    charm: 'Never once been in a hurry, never once been late.',
    traits: [
      { label: 'Skin', value: 'Peach' },
      { label: 'Fit', value: 'Orange Hoodie' },
      { label: 'Eyes', value: 'Black Shades' },
      { label: 'Pose', value: 'Lounging' },
    ],
  },
  {
    id: 4,
    name: 'Bookworm',
    image: '/chimikinz/oddling-4.png',
    rarity: 'Rare',
    family: 'Fleshling',
    charm: 'Read every page of the charm ledger. Twice.',
    traits: [
      { label: 'Skin', value: 'Peach' },
      { label: 'Head', value: 'Gold Halo' },
      { label: 'Fit', value: 'Orange Hoodie' },
      { label: 'Held', value: 'Blue Tome' },
    ],
  },
  {
    id: 6,
    name: 'Snoozer',
    image: '/chimikinz/oddling-6.png',
    rarity: 'Uncommon',
    family: 'Sunling',
    charm: 'Dreams so loudly the luck leaks out.',
    traits: [
      { label: 'Skin', value: 'Golden' },
      { label: 'Head', value: 'Top Hat' },
      { label: 'Fit', value: 'Green Button-Up' },
      { label: 'Eyes', value: 'Fast Asleep' },
    ],
  },
  {
    id: 7,
    name: 'Sludge',
    image: '/chimikinz/oddling-7.png',
    rarity: 'Legendary',
    family: 'Oozeling',
    charm: 'Melts through bad luck like it was never there.',
    traits: [
      { label: 'Skin', value: 'Slime Green' },
      { label: 'Head', value: 'Lilac Bunny Hood' },
      { label: 'Eyes', value: 'Rainbow Visor' },
      { label: 'Fit', value: 'Black Hoodie' },
    ],
  },
  {
    id: 8,
    name: 'Skipper',
    image: '/chimikinz/oddling-8.png',
    rarity: 'Rare',
    family: 'Fleshling',
    charm: 'Lost an eye to a storm and still loves the sea.',
    traits: [
      { label: 'Skin', value: 'Ice Blue' },
      { label: 'Head', value: "Captain's Cap" },
      { label: 'Eyes', value: 'Patch & Heart' },
      { label: 'Fit', value: 'Mustard Hoodie' },
    ],
  },
  {
    id: 9,
    name: 'Blacktie',
    image: '/chimikinz/oddling-9.png',
    rarity: 'Legendary',
    family: 'Stoneling',
    charm: 'Shows up to every occasion overdressed. On purpose.',
    traits: [
      { label: 'Skin', value: 'Ash Grey' },
      { label: 'Head', value: 'Shadow Halo' },
      { label: 'Eyes', value: 'Wrap Shades' },
      { label: 'Fit', value: 'Pinstripe Tux' },
    ],
  },
  {
    id: 10,
    name: 'Combo',
    image: '/chimikinz/oddling-10.png',
    rarity: 'Uncommon',
    family: 'Stoneling',
    charm: 'Wears lunch as a hat so it is never far away.',
    traits: [
      { label: 'Skin', value: 'Lilac' },
      { label: 'Head', value: 'Burger Bun' },
      { label: 'Eyes', value: 'White Frames' },
      { label: 'Fit', value: 'Pink Hoodie' },
    ],
  },
  {
    id: 11,
    name: 'Nightshift',
    image: '/chimikinz/oddling-11.png',
    rarity: 'Rare',
    family: 'Fleshling',
    charm: 'Sees the next block before anyone else does.',
    traits: [
      { label: 'Skin', value: 'Peach' },
      { label: 'Ears', value: 'Bat' },
      { label: 'Eyes', value: 'Red Visor' },
      { label: 'Fit', value: 'Black Hoodie' },
    ],
  },
  {
    id: 12,
    name: 'Bonehead',
    image: '/chimikinz/oddling-12.png',
    rarity: 'Legendary',
    family: 'Stoneling',
    charm: 'All skull, all heart — the two are not related.',
    traits: [
      { label: 'Skin', value: 'Ash Grey' },
      { label: 'Face', value: 'Cracked Skull' },
      { label: 'Eyes', value: 'Heart Galaxy' },
      { label: 'Fit', value: 'Red Hoodie' },
    ],
  },
  {
    id: 13,
    name: 'Sparkler',
    image: '/chimikinz/oddling-13.png',
    rarity: 'Rare',
    family: 'Fleshling',
    charm: 'Throws hands at anything that dulls the shine.',
    traits: [
      { label: 'Skin', value: 'Peach' },
      { label: 'Head', value: 'Blue Bunny Hood' },
      { label: 'Eyes', value: 'Sparkle' },
      { label: 'Fit', value: 'Boxing Gloves' },
    ],
  },
  {
    id: 14,
    name: 'Twilight',
    image: '/chimikinz/oddling-14.png',
    rarity: 'Legendary',
    family: 'Fleshling',
    charm: 'Dusk-coloured and permanently unbothered.',
    traits: [
      { label: 'Skin', value: 'Violet Fade' },
      { label: 'Head', value: 'Bucket Hat' },
      { label: 'Eyes', value: 'Night Goggles' },
      { label: 'Fit', value: 'Chimi Puffer' },
    ],
  },
  {
    id: 15,
    name: 'Molten',
    image: '/chimikinz/oddling-15.png',
    rarity: 'Mythic',
    family: 'Emberling',
    charm: 'Cracked open and still glowing underneath.',
    traits: [
      { label: 'Skin', value: 'Molten Lava' },
      { label: 'Head', value: 'Red Cap' },
      { label: 'Eyes', value: 'White Frames' },
      { label: 'Fit', value: 'Tactical Vest' },
    ],
  },
]

export const rarities: Rarity[] = [
  'Common',
  'Uncommon',
  'Rare',
  'Legendary',
  'Mythic',
]

export const families = [
  'Fleshling',
  'Sunling',
  'Stoneling',
  'Oozeling',
  'Emberling',
] as const

/** Swatch per rarity — drawn from the art, not invented. */
export const rarityStyle: Record<Rarity, string> = {
  Common: 'bg-muted text-foreground',
  Uncommon: 'bg-secondary text-secondary-foreground',
  Rare: 'bg-accent text-accent-foreground',
  Legendary: 'bg-primary text-primary-foreground',
  Mythic: 'bg-foreground text-background',
}

/** The four the landing page leads with. */
export const featuredOddlings = oddlings.filter((o) =>
  [15, 7, 12, 4].includes(o.id),
)

export const brandArt = {
  group: '/chimikinz/oddling-2.png',
  builder: '/chimikinz/oddling-3.png',
  bull: '/chimikinz/oddling-5.png',
}
