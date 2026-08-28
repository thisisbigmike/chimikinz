/**
 * The animated strip on the home page.
 *
 * There are no GIFs yet, so each entry animates its still with CSS. When a
 * real GIF (or looping webm/webp) exists, set `motionSrc` on that entry and
 * the component swaps to it — nothing else needs changing.
 */

export type MotionPiece = {
  slug: string
  title: string
  caption: string
  /** The still we have today. */
  still: string
  alt: string
  /**
   * A looping GIF/animated WebP. Leave undefined to keep animating the still.
   * Drop a file in /public/chimikinz/motion and point this at it.
   */
  motionSrc?: string
  /** Which CSS motion the still uses while there is no `motionSrc`. */
  motion: 'float' | 'bob' | 'sway' | 'wiggle'
}

export const motionPieces: MotionPiece[] = [
  {
    slug: 'signal-blanket',
    title: 'Bad Signal',
    caption: 'Some evenings the whole Cove drops to one bar.',
    still: '/chimikinz/art/full/signal-blanket.webp',
    alt: 'A Chimi wrapped in a blanket sitting on top of a giant signal icon',
    motion: 'float',
  },
  {
    slug: 'watering-day',
    title: 'Watering Day',
    caption: 'Moss has been on this one sprout since spring.',
    still: '/chimikinz/art/full/watering-day.webp',
    alt: 'A Chimi watering a small sprout in a pot',
    motion: 'sway',
  },
  {
    slug: 'come-on-then',
    title: 'Come On Then',
    caption: 'Zipp has decided, and you are coming with him.',
    still: '/chimikinz/art/full/come-on-then.webp',
    alt: 'One Chimi pulling another along by the hand',
    motion: 'bob',
  },
  {
    slug: 'the-ring',
    title: 'The Ring',
    caption: 'Nobody remembers starting this. It happens most weeks.',
    still: '/chimikinz/art/full/the-ring.webp',
    alt: 'Chimis arranged head to toe in a circle',
    motion: 'wiggle',
  },
]

export const motionClass: Record<MotionPiece['motion'], string> = {
  float: 'pixel-float',
  bob: 'chimi-bob',
  sway: 'pixel-sway',
  wiggle: 'pixel-float-slow',
}
