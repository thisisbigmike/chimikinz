/**
 * The gallery catalogue — every piece of hand-drawn Chimikinz artwork that
 * ships with the site, grouped by the shelf it belongs on.
 *
 * `scene`  — story panels and world moments from Clover Cove.
 * `chimi`  — one-off portraits, each Chimi in a fit of its own.
 * `cast`   — the four leads and the reference sheets they were drawn from.
 */
export type ArtCategory = 'scene' | 'chimi' | 'cast'

export type ArtPiece = {
  /** Stable slug — also the deep-link hash for a single piece. */
  id: string
  title: string
  category: ArtCategory
  src: string
  /** Written for screen readers, so describe the picture, not the file. */
  alt: string
  /** One line of flavour shown under the title in the lightbox. */
  caption: string
  /** Portrait art sits on a plain colour field and crops well; scenes do not. */
  fit: 'cover' | 'contain'
}

export const artCategories = [
  { id: 'scene', label: 'Scenes', blurb: 'Moments from around Clover Cove.' },
  { id: 'chimi', label: 'Chimis', blurb: 'One portrait, one fit, no repeats.' },
  { id: 'cast', label: 'The Cast', blurb: 'The four leads and their sheets.' },
] as const satisfies readonly { id: ArtCategory; label: string; blurb: string }[]

export const artwork: ArtPiece[] = [
  // ── The Cast ─────────────────────────────────────────────────────────────
  {
    id: 'clov',
    title: 'Clov',
    category: 'cast',
    src: '/chimikinz/cast/clov.png',
    alt: 'Clov, a peach-skinned Chimi in a white cap, orange scarf and white sweater, hands clasped',
    caption: 'Curious about every corner of the Cove.',
    fit: 'cover',
  },
  {
    id: 'moss',
    title: 'Moss',
    category: 'cast',
    src: '/chimikinz/cast/moss.png',
    alt: 'Moss, a green Chimi in a backwards cap and black hoodie, throwing a peace sign',
    caption: 'Small steps still count as steps.',
    fit: 'cover',
  },
  {
    id: 'whim',
    title: 'Whim',
    category: 'cast',
    src: '/chimikinz/cast/whim.png',
    alt: 'Whim, a lilac Chimi with orange hair in a pink hoodie, arms crossed',
    caption: 'Never does the same thing twice.',
    fit: 'cover',
  },
  {
    id: 'zipp',
    title: 'Zipp',
    category: 'cast',
    src: '/chimikinz/cast/zipp.png',
    alt: 'Zipp, a Chimi in a propeller beanie and blue hoodie, holding a handheld console',
    caption: 'Already halfway to the next thing.',
    fit: 'cover',
  },
  {
    id: 'cast-lineup',
    title: 'Height Chart',
    category: 'cast',
    src: '/chimikinz/cast/lineup.jpg',
    alt: 'Reference sheet showing Zipp, Moss, Whim and Clov side by side in two art styles',
    caption: 'The four leads, measured against each other.',
    fit: 'contain',
  },
  {
    id: 'cast-cards',
    title: 'Charm Cards',
    category: 'cast',
    src: '/chimikinz/cast/cards.jpg',
    alt: 'Four collectible cards for Moss, Whim, Clov and Zipp laid out on a wooden table',
    caption: 'One card each, laid out on the workbench.',
    fit: 'contain',
  },
  {
    id: 'cast-faces',
    title: 'Four Faces',
    category: 'cast',
    src: '/chimikinz/cast/faces.jpg',
    alt: 'Close-up head studies of four Chimis around the Chimikins wordmark',
    caption: 'Every horn and ear, drawn twice to be sure.',
    fit: 'contain',
  },

  // ── Scenes ───────────────────────────────────────────────────────────────
  {
    id: 'clover-cove-sign',
    title: 'Clover Cove',
    category: 'scene',
    src: '/chimikinz/art/clover-cove-sign.png',
    alt: 'A Chimi perched on a street sign under a starry sky beside a glowing Clover Cove sign',
    caption: 'Up past the wires, where the town gets its name.',
    fit: 'contain',
  },
  {
    id: 'crosswalk',
    title: 'Crosswalk',
    category: 'scene',
    src: '/chimikinz/art/crosswalk.png',
    alt: 'Four Chimis crossing a zebra crossing from above, each headed somewhere different',
    caption: 'Four lives crossing at the same light.',
    fit: 'contain',
  },
  {
    id: 'four-windows',
    title: 'Four Windows',
    category: 'scene',
    src: '/chimikinz/art/four-windows.png',
    alt: 'Four windows showing the same wall in spring, autumn, winter and blossom season',
    caption: 'One wall, four seasons, four friends.',
    fit: 'contain',
  },
  {
    id: 'what-if',
    title: 'What If It Does',
    category: 'scene',
    src: '/chimikinz/art/what-if.png',
    alt: 'Two Chimis in tall grass at sunset asking what if it doesn’t work out, and what if it does',
    caption: 'The whole project in two speech bubbles.',
    fit: 'contain',
  },
  {
    id: 'beach-day',
    title: 'Shoreline',
    category: 'scene',
    src: '/chimikinz/art/beach-day.png',
    alt: 'A small Chimi standing alone on a wide empty beach watching the sea',
    caption: 'Nowhere to be, for once.',
    fit: 'contain',
  },
  {
    id: 'hilltop-night',
    title: 'Hilltop',
    category: 'scene',
    src: '/chimikinz/art/hilltop-night.png',
    alt: 'A green Chimi alone on a dark hill under a wide cloudy night sky',
    caption: 'Some nights the view is the whole point.',
    fit: 'contain',
  },
  {
    id: 'run-together',
    title: 'Keep Up',
    category: 'scene',
    src: '/chimikinz/art/run-together.png',
    alt: 'One Chimi pulling another along by the hand at a run',
    caption: 'Nobody gets left at the back.',
    fit: 'contain',
  },
  {
    id: 'chimi-circle',
    title: 'The Ring',
    category: 'scene',
    src: '/chimikinz/art/chimi-circle.png',
    alt: 'Chimis of every size arranged in a circle, largest to smallest',
    caption: 'The whole nest, biggest to smallest.',
    fit: 'contain',
  },
  {
    id: 'worry-book',
    title: 'The Worry Book',
    category: 'scene',
    src: '/chimikinz/art/worry-book.png',
    alt: 'Chimis beside a giant book titled things you worried so hard about that turned out great in the end',
    caption: 'Turns out it was a short book.',
    fit: 'contain',
  },
  {
    id: 'watering-can',
    title: 'Slow Growth',
    category: 'scene',
    src: '/chimikinz/art/watering-can.png',
    alt: 'A Chimi in an orange hoodie watering a single small potted seedling',
    caption: 'Nothing worth having came up overnight.',
    fit: 'contain',
  },
  {
    id: 'the-gathering',
    title: 'The Gathering',
    category: 'scene',
    src: '/chimikinz/art/the-gathering.jpg',
    alt: 'A crowd of hooded Chimis reaching upward toward a column of green light',
    caption: 'Everyone turned up for this one.',
    fit: 'contain',
  },
  {
    id: 'apple-nook',
    title: 'The Apple',
    category: 'scene',
    src: '/chimikinz/art/apple-nook.jpg',
    alt: 'Two Chimis using a halved apple as a place to nap and read',
    caption: 'Found a good spot. Staying a while.',
    fit: 'contain',
  },
  {
    id: 'in-the-grass',
    title: 'Tall Grass',
    category: 'scene',
    src: '/chimikinz/art/in-the-grass.jpg',
    alt: 'A tiny drawn Chimi standing in real photographed grass under a blue sky',
    caption: 'Smaller than you had pictured.',
    fit: 'contain',
  },
  {
    id: 'office-chair',
    title: 'Clocked Out',
    category: 'scene',
    src: '/chimikinz/art/office-chair.png',
    alt: 'A Chimi slumped sideways across a large office chair',
    caption: 'Meeting could have been a message.',
    fit: 'contain',
  },
  {
    id: 'calendar',
    title: 'Two Days Down',
    category: 'scene',
    src: '/chimikinz/art/calendar.png',
    alt: 'A Chimi with a briefcase walking past a desk calendar with the first days crossed off',
    caption: 'Counting down to something.',
    fit: 'contain',
  },
  {
    id: 'signal-blanket',
    title: 'Bad Signal',
    category: 'scene',
    src: '/chimikinz/art/signal-blanket.png',
    alt: 'A Chimi wrapped in a blanket sitting on top of a giant wifi symbol',
    caption: 'Perched where the bars are best.',
    fit: 'contain',
  },
  {
    id: 'esc-key',
    title: 'Escape',
    category: 'scene',
    src: '/chimikinz/art/esc-key.png',
    alt: 'Chimis climbing out from under the escape key of a giant keyboard into grass',
    caption: 'Found the exit. Took it.',
    fit: 'contain',
  },
  {
    id: 'traffic-cone',
    title: 'Cone Head',
    category: 'scene',
    src: '/chimikinz/art/traffic-cone.jpg',
    alt: 'A Chimi in a blue hoodie wearing an oversized traffic cone as a hat',
    caption: 'Found it. Wearing it. No notes.',
    fit: 'contain',
  },

  // ── Chimis ───────────────────────────────────────────────────────────────
  {
    id: 'blue-braids',
    title: 'Blue Braids',
    category: 'chimi',
    src: '/chimikinz/chimis/blue-braids.png',
    alt: 'A Chimi with long blue braids, tattoos and a black vest',
    caption: 'Trouble, dressed for it.',
    fit: 'cover',
  },
  {
    id: 'straw-hat',
    title: 'Straw Hat',
    category: 'chimi',
    src: '/chimikinz/chimis/straw-hat.png',
    alt: 'A Chimi in a red open jacket with a straw hat slung behind its shoulders',
    caption: 'Says yes before hearing the plan.',
    fit: 'cover',
  },
  {
    id: 'white-flame',
    title: 'White Flame',
    category: 'chimi',
    src: '/chimikinz/chimis/white-flame.png',
    alt: 'A Chimi with white flame-shaped hair and red eyes in a white coat',
    caption: 'Second wind, permanently.',
    fit: 'cover',
  },
  {
    id: 'spiked-crown',
    title: 'Spiked',
    category: 'chimi',
    src: '/chimikinz/chimis/spiked-crown.png',
    alt: 'A Chimi with spiked dark hair, gold ear hoops and a patched blue hoodie',
    caption: 'Patched sleeves, unbothered face.',
    fit: 'cover',
  },
  {
    id: 'hero-hood',
    title: 'The Hood',
    category: 'chimi',
    src: '/chimikinz/chimis/hero-hood.png',
    alt: 'A Chimi in a white eared hood with a sword and green backpack',
    caption: 'Packed for an adventure nobody scheduled.',
    fit: 'cover',
  },
  {
    id: 'pup-suit',
    title: 'Pup Suit',
    category: 'chimi',
    src: '/chimikinz/chimis/pup-suit.png',
    alt: 'A Chimi zipped into a full yellow dog costume with big blue eyes',
    caption: 'Committed to the bit.',
    fit: 'cover',
  },
  {
    id: 'alien-hood',
    title: 'Little Green',
    category: 'chimi',
    src: '/chimikinz/chimis/alien-hood.png',
    alt: 'A Chimi in a green alien hood and a shirt reading I do what I want, do the same',
    caption: 'Wears the manifesto on the shirt.',
    fit: 'cover',
  },
  {
    id: 'trainer-cap',
    title: 'Trainer',
    category: 'chimi',
    src: '/chimikinz/chimis/trainer-cap.png',
    alt: 'A Chimi in a red and white cap and blue jacket with a green backpack',
    caption: 'Out the door before sunrise.',
    fit: 'cover',
  },
  {
    id: 'tiger-onesie',
    title: 'Tiger Onesie',
    category: 'chimi',
    src: '/chimikinz/chimis/tiger-onesie.png',
    alt: 'A Chimi in a tiger onesie wearing a stop sign pendant and holding a lit firework',
    caption: 'Wearing a stop sign. Holding a firework.',
    fit: 'cover',
  },
  {
    id: 'bandage-king',
    title: 'The Wrapped King',
    category: 'chimi',
    src: '/chimikinz/chimis/bandage-king.jpg',
    alt: 'A glowing purple Chimi in bandages with a gold crown and an eyepatch',
    caption: 'Crowned, patched, still glowing.',
    fit: 'cover',
  },
  {
    id: 'cat-nap',
    title: 'Passenger',
    category: 'chimi',
    src: '/chimikinz/chimis/cat-nap.png',
    alt: 'A Chimi in an orange gilet and green ushanka with a black cat riding on its head',
    caption: 'The cat picked the hat.',
    fit: 'cover',
  },
  {
    id: 'bone-bucket',
    title: 'Bone Bucket',
    category: 'chimi',
    src: '/chimikinz/chimis/bone-bucket.jpg',
    alt: 'A pale skull-faced Chimi in a black bucket hat with a small floating robot companion',
    caption: 'Brought a friend. It hovers.',
    fit: 'cover',
  },
  {
    id: 'pocket-pup',
    title: 'Pocket Pup',
    category: 'chimi',
    src: '/chimikinz/chimis/pocket-pup.png',
    alt: 'A green-eyed Chimi in a blue duffel coat and striped scarf with a grey puppy on its head',
    caption: 'Two of them, one coat.',
    fit: 'cover',
  },
  {
    id: 'hollow-mask',
    title: 'Hollow Mask',
    category: 'chimi',
    src: '/chimikinz/chimis/hollow-mask.png',
    alt: 'A Chimi in a horned white skull mask with orange hair and a red scarf on a red field',
    caption: 'Mask stays on.',
    fit: 'cover',
  },
]

/** Brand art reused outside the gallery. */
export const brandImages = {
  logoHead: '/chimikinz/brand/logo-head.png',
  bannerWide: '/chimikinz/brand/banner-wide.jpg',
} as const

export function artByCategory(category: ArtCategory) {
  return artwork.filter((piece) => piece.category === category)
}
