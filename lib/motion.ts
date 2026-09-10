/**
 * The animated strip on the home page.
 *
 * These are H.264 MP4s rather than GIFs, which is the whole reason the strip
 * can afford to be this long: the thirteen of them together are about 4.5MB,
 * where the same seconds as GIFs would have run to tens of megabytes. The
 * trade is that they are `<video>` elements, not images, so the component
 * has to start and stop them itself — see `MotionShowcase`.
 *
 * Each file is square (848x848) except `loop-2`, which is 848x636 and gets
 * cropped to fit by `object-cover` like the rest.
 *
 * The last two are the only ones anyone has described, so they carry real
 * alt text — see the note on `alt` below.
 *
 * `loop-N` matches the numbering of the files as they were handed over, so
 * re-pointing one at a different clip is a one-line change here.
 */

export type MotionLoop = {
  /** File under /public/chimikinz/motion. */
  src: string
  /**
   * First frame of the clip, as a still.
   *
   * Twenty-two video elements cannot all buffer at once — the browser runs
   * six requests to an origin at a time — so without this the boxes further
   * along the strip sit empty until their turn comes round, which on a strip
   * that drifts means most of a lap. The poster costs no decoder and paints
   * the moment it lands, so a box shows its clip from the start and the
   * video takes over underneath it.
   *
   * Regenerate after swapping a clip:
   *   ffmpeg -y -ss 0 -i loop-N.mp4 -frames:v 1 -vf scale=500:-2    *     -c:v libwebp -quality 76 poster/loop-N.webp
   */
  poster: string
  /**
   * What the clip shows, for screen readers.
   *
   * These are deliberately generic. Nobody has described the clips yet, and a
   * confident wrong description is worse than an honest vague one — a screen
   * reader user told "a Chimi watering a sprout" when the clip is something
   * else has been actively misled. Replace each one as the clips get named.
   */
  alt: string
}

export const motionLoops: MotionLoop[] = [
  {
    src: '/chimikinz/motion/loop-1.mp4',
    poster: '/chimikinz/motion/poster/loop-1.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-2.mp4',
    poster: '/chimikinz/motion/poster/loop-2.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-3.mp4',
    poster: '/chimikinz/motion/poster/loop-3.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-4.mp4',
    poster: '/chimikinz/motion/poster/loop-4.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-5.mp4',
    poster: '/chimikinz/motion/poster/loop-5.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-6.mp4',
    poster: '/chimikinz/motion/poster/loop-6.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-7.mp4',
    poster: '/chimikinz/motion/poster/loop-7.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-8.mp4',
    poster: '/chimikinz/motion/poster/loop-8.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-9.mp4',
    poster: '/chimikinz/motion/poster/loop-9.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-10.mp4',
    poster: '/chimikinz/motion/poster/loop-10.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-11.mp4',
    poster: '/chimikinz/motion/poster/loop-11.webp',
    alt: 'An animated scene from Clover Cove',
  },
  {
    src: '/chimikinz/motion/loop-12.mp4',
    poster: '/chimikinz/motion/poster/loop-12.webp',
    alt: 'A Chimi in a red hoodie leaning on a tub of popcorn, eating it a handful at a time',
  },
  {
    src: '/chimikinz/motion/loop-13.mp4',
    poster: '/chimikinz/motion/poster/loop-13.webp',
    alt: 'A Chimi in a red hoodie rolling past a hedge on a skateboard, holding up a GM sign',
  },
]
