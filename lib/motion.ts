/**
 * The animated strip on the home page.
 *
 * These are H.264 MP4s rather than GIFs, which is the whole reason the strip
 * can afford to be this long: the seven of them together are about 2.5MB,
 * where the same seconds as GIFs would have run to tens of megabytes. The
 * trade is that they are `<video>` elements, not images, so the component
 * has to start and stop them itself — see `MotionShowcase`.
 *
 * Each file is square (848x848) except `loop-2`, which is 848x636 and gets
 * cropped to fit by `object-cover` like the rest.
 *
 * `loop-N` matches the numbering of the files as they were handed over, so
 * re-pointing one at a different clip is a one-line change here.
 */

export type MotionLoop = {
  /** File under /public/chimikinz/motion. */
  src: string
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
  { src: '/chimikinz/motion/loop-1.mp4', alt: 'An animated scene from Clover Cove' },
  { src: '/chimikinz/motion/loop-2.mp4', alt: 'An animated scene from Clover Cove' },
  { src: '/chimikinz/motion/loop-3.mp4', alt: 'An animated scene from Clover Cove' },
  { src: '/chimikinz/motion/loop-4.mp4', alt: 'An animated scene from Clover Cove' },
  { src: '/chimikinz/motion/loop-5.mp4', alt: 'An animated scene from Clover Cove' },
  { src: '/chimikinz/motion/loop-6.mp4', alt: 'An animated scene from Clover Cove' },
  { src: '/chimikinz/motion/loop-7.mp4', alt: 'An animated scene from Clover Cove' },
  { src: '/chimikinz/motion/loop-8.mp4', alt: 'An animated scene from Clover Cove' },
]
