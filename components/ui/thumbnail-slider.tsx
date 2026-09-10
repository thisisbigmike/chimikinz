'use client'

import Image from 'next/image'
import type { EmblaOptionsType } from 'embla-carousel'
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
} from '@/components/ui/thumbnail-slider-utils/carousel'
import { cn } from '@/lib/utils'

export type ThumbnailSlide = {
  /** Full-size image for the main stage. */
  src: string
  /** Small image for the strip underneath. */
  thumbnailSrc: string
  alt: string
}

const DEFAULT_OPTIONS: EmblaOptionsType = { loop: false }

/**
 * One big image with a scrubbable strip of thumbnails under it.
 *
 * Takes its slides as a prop rather than carrying a hard-coded list, so the
 * same component can front any set of art on the site.
 */
export default function ThumbnailSlider({
  slides,
  options = DEFAULT_OPTIONS,
  className,
  sizes = '(min-width: 1280px) 1100px, 90vw',
  priority = false,
}: {
  slides: ThumbnailSlide[]
  options?: EmblaOptionsType
  className?: string
  sizes?: string
  /** Eager-load the first slide — only worth it above the fold. */
  priority?: boolean
}) {
  if (slides.length === 0) return null

  return (
    <div className={cn('mx-auto w-[90%]', className)}>
      <Carousel options={options} className="relative">
        <SliderContainer className="gap-2">
          {slides.map((slide, index) => (
            <Slider
              key={slide.src}
              /* No frame and no ground: the art is drawn on transparency,
                 so it sits straight on the section and reads as a figure
                 rather than a picture hung in a box. */
              className="relative h-[300px] w-full sm:h-[350px] xl:h-[400px]"
              thumbnailSrc={slide.thumbnailSrc}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={sizes}
                priority={priority && index === 0}
                /* `object-contain`, like the gallery lightbox: these are
                   whole figures on transparency, so covering the box would
                   crop the drawing rather than a margin. */
                className="art-smooth object-contain"
              />
            </Slider>
          ))}
        </SliderContainer>
        <ThumbsSlider
          className="px-1 pb-1"
          thumbsClassName="h-24 basis-[28%] sm:basis-[15%]"
          thumbFit="contain"
        />
      </Carousel>
    </div>
  )
}
