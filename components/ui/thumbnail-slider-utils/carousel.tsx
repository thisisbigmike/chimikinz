'use client'

import * as React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { cn } from '@/lib/utils'

/**
 * A main carousel and a strip of thumbnails that drive each other.
 *
 * Two Embla instances: the big one snaps a slide at a time, the thumb strip
 * runs free so a long set can be scrubbed. Selecting either moves the other.
 *
 * The thumbnails are declared on the slides themselves — `<Slider
 * thumbnailSrc>` — so a slide and its thumbnail can never drift apart, and
 * `<ThumbsSlider />` renders whatever the container collected.
 */

type CarouselContextValue = {
  mainRef: ReturnType<typeof useEmblaCarousel>[0]
  thumbsRef: ReturnType<typeof useEmblaCarousel>[0]
  /** Index of the slide currently snapped in the main carousel. */
  selected: number
  scrollTo: (index: number) => void
  thumbnails: string[]
  setThumbnails: (srcs: string[]) => void
  labels: string[]
  setLabels: (labels: string[]) => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

function useCarousel(component: string) {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error(`<${component} /> must be used inside a <Carousel />`)
  }
  return context
}

export function Carousel({
  options,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { options?: EmblaOptionsType }) {
  const [mainRef, mainApi] = useEmblaCarousel(options)
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const [selected, setSelected] = React.useState(0)
  const [thumbnails, setThumbnails] = React.useState<string[]>([])
  const [labels, setLabels] = React.useState<string[]>([])

  const onSelect = React.useCallback(() => {
    if (!mainApi) return
    const index = mainApi.selectedScrollSnap()
    setSelected(index)
    // Keeps the active thumbnail in view when the main carousel is what
    // moved — dragging the big one should never leave the strip behind.
    thumbsApi?.scrollTo(index)
  }, [mainApi, thumbsApi])

  React.useEffect(() => {
    if (!mainApi) return
    onSelect()
    mainApi.on('select', onSelect)
    mainApi.on('reInit', onSelect)
    return () => {
      mainApi.off('select', onSelect)
      mainApi.off('reInit', onSelect)
    }
  }, [mainApi, onSelect])

  const scrollTo = React.useCallback(
    (index: number) => mainApi?.scrollTo(index),
    [mainApi],
  )

  const value = React.useMemo(
    () => ({
      mainRef,
      thumbsRef,
      selected,
      scrollTo,
      thumbnails,
      setThumbnails,
      labels,
      setLabels,
    }),
    [mainRef, thumbsRef, selected, scrollTo, thumbnails, labels],
  )

  return (
    <CarouselContext.Provider value={value}>
      <div
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

export function SliderContainer({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { mainRef, setThumbnails, setLabels } = useCarousel('SliderContainer')

  /* Read the thumbnails straight off the slides rather than having each one
     register itself: children are a static list here, so this keeps the
     strip in the same order as the slides with no mount-order guesswork. */
  const slides = React.Children.toArray(children).filter(React.isValidElement)
  const sources = slides.map(
    (child) => (child.props as { thumbnailSrc?: string }).thumbnailSrc ?? '',
  )
  const names = slides.map(
    (child) => (child.props as { label?: string }).label ?? '',
  )
  const signature = sources.join('|')
  const nameSignature = names.join('|')

  React.useEffect(() => {
    setThumbnails(signature.length ? signature.split('|') : [])
    // `signature` is the whole list flattened — the array identity changes
    // every render, the contents do not.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  React.useEffect(() => {
    setLabels(nameSignature.length ? nameSignature.split('|') : [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameSignature])

  return (
    <div ref={mainRef} className="overflow-hidden">
      <div className={cn('flex', className)} {...props}>
        {children}
      </div>
    </div>
  )
}

export function Slider({
  className,
  children,
  /* Both consumed by SliderContainer — for the thumb strip and the
     caption — rather than rendered here. */
  thumbnailSrc: _thumbnailSrc,
  label: _label,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  thumbnailSrc?: string
  /** Name for this slide: the caption, and the thumb's accessible name. */
  label?: string
}) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ThumbsSlider({
  className,
  thumbsClassName,
  thumbFit = 'cover',
}: {
  className?: string
  /** Sizing for one thumb — basis and height. */
  thumbsClassName?: string
  /**
   * How a thumbnail sits in its box. `cover` fills it, which suits photos;
   * `contain` fits the whole image in, which is what art with a subject in
   * it needs — a thumb box is wider than it is tall, so covering one crops
   * the top and bottom off a figure.
   */
  thumbFit?: 'cover' | 'contain'
}) {
  const { thumbsRef, thumbnails, labels, selected, scrollTo } =
    useCarousel('ThumbsSlider')

  if (thumbnails.length === 0) return null

  return (
    <div ref={thumbsRef} className={cn('mt-2 overflow-hidden', className)}>
      <div className="flex gap-2">
        {thumbnails.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => scrollTo(index)}
            /* The name if the slide carries one — "Show Roni" is a better
               button than "Show slide 2 of 7", and it is what a hover
               tooltip can show too. */
            aria-label={
              labels[index]
                ? `Show ${labels[index]}`
                : `Show slide ${index + 1} of ${thumbnails.length}`
            }
            title={labels[index] || undefined}
            aria-current={index === selected}
            className={cn(
              'min-w-0 shrink-0 grow-0 basis-[15%] overflow-hidden border-4 transition-opacity',
              index === selected
                ? 'border-border opacity-100'
                : 'border-transparent opacity-60 hover:opacity-100',
              thumbsClassName,
            )}
          >
            <img
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className={cn(
                'h-full w-full',
                thumbFit === 'contain' ? 'object-contain' : 'object-cover',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * The name of the slide currently on the stage.
 *
 * Named slides are the only ones worth a caption, so this renders nothing
 * until one has a `label`. `aria-live` because the text changes under the
 * reader as the carousel moves rather than because they moved focus.
 */
export function SliderCaption({
  className,
  plateClassName,
  showCount = false,
}: {
  className?: string
  plateClassName?: string
  /** Adds a quiet "3 / 7" beside the name. */
  showCount?: boolean
}) {
  const { labels, selected } = useCarousel('SliderCaption')
  const label = labels[selected]

  if (!label) return null

  return (
    <div
      aria-live="polite"
      className={cn(
        'mt-4 flex flex-wrap items-center justify-center gap-3',
        className,
      )}
    >
      <span
        className={cn(
          'pixel-box-sm bg-card px-4 py-2 font-display text-xs uppercase',
          plateClassName,
        )}
      >
        {label}
      </span>
      {showCount ? (
        <span className="font-display text-[10px] uppercase text-muted-foreground">
          {selected + 1} / {labels.length}
        </span>
      ) : null}
    </div>
  )
}
