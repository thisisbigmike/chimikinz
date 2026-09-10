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
              className="pixel-box art-ground relative h-[300px] w-full overflow-hidden sm:h-[350px] xl:h-[400px]"
              thumbnailSrc={slide.thumbnailSrc}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes={sizes}
                priority={priority && index === 0}
                /* `object-contain`, like the gallery lightbox: the art files
                   carry their own coloured ground, so cropping them cuts
                   into the drawing rather than into a margin. */
                className="art-smooth object-contain"
              />
            </Slider>
          ))}
        </SliderContainer>
        <ThumbsSlider className="px-1 pb-1" thumbsClassName="h-24 basis-[15%]" />
      </Carousel>
    </div>
  )
}
