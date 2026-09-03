'use client'

import Image from 'next/image'
import { fullSrc } from '@/lib/artwork'

/**
 * The last two blocks of the home page, under one sky.
 *
 * `Come in` and the footer used to be two slabs with a colour change
 * between them: the section rode the nightfall ramp to whatever the sunset
 * was doing at that scroll, and the footer cut to a hard `bg-night` with
 * Night Hill inside it. This hosts the art for both instead, so the scene
 * the page has been walking toward starts above the Discord and X cards
 * rather than at the footer's top edge.
 *
 * Its children carry no background of their own — that is the whole point
 * — so the ink has to be pinned here. Nightfall does not flip `--foreground`
 * to cream until 90% of the page's scroll, and the top of this block sits
 * above that line, which would print near-black type on the night art for
 * the couple of percent in between. The values are the ones the ramp itself
 * lands on at 100% (see the `dusk-*` keyframes in globals.css), so pinning
 * them is bringing that arrival forward, not inventing a second palette.
 */
export function NightOutro({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate text-cream [--card:#1e1e22] [--line:#3a3a42] [--muted-foreground:#a9a296] [--shade:#000000]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* The ground. A length rather than a percentage for the fade: the
            block's height depends on how the footer columns wrap, and this
            has to stay the same short dissolve at every breakpoint — long
            enough that the sunset above has somewhere to go, short enough
            that the heading below is already on night. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0,var(--night)_7rem,var(--night)_100%)]" />

        {/* The sky, full bleed over the whole block, and now the only Night
            Hill layer here. Cropped high onto the drifting cloud layer so it
            is atmosphere rather than subject — this is what the corners are
            wearing. The centred band that used to sit on top of it, scaled
            down onto the chimi and the hill, is gone: one continuous wash
            behind the whole outro reads better than a subject parked in the
            middle of it. */}
        <Image
          src={fullSrc('night-hill')}
          alt=""
          fill
          sizes="100vw"
          className="art-smooth night-art-fade object-cover object-[center_26%] opacity-[0.3]"
        />

        {/* Evens out the sky, which is the lightest part of the art and sits
            directly behind the copy. Held off the top 6rem so it does not
            re-darken the stretch the mask has already cleared — that band
            is the sunset's, and nothing else should be printed on it. */}
        <div className="absolute inset-x-0 bottom-0 top-24 bg-night/25" />
        {/* The bottom dissolves into `--night` so the copyright bar keeps the
            near-black it was already printed on. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_bottom,transparent,var(--night))]" />
      </div>

      {children}
    </div>
  )
}
