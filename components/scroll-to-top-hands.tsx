'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Sparkles, ArrowUp } from 'lucide-react'
import { brandArt } from '@/lib/oddlings'
import { cn } from '@/lib/utils'

/** Past this many pixels down the page, the button appears. */
const SHOW_AFTER = 250
/** Give up waiting on the smooth scroll after this and drop the overlay. */
const CLIMB_TIMEOUT = 2000

export function ScrollToTopHands() {
  const [visible, setVisible] = useState(false)
  const [isClimbing, setIsClimbing] = useState(false)

  /** Frame ids, held so a second click cannot leave the first loop running. */
  const tickRef = useRef(0)
  const climbRef = useRef(0)

  useEffect(() => {
    /**
     * Scroll fires far more often than once a frame. This coalesces the
     * events into a single read per frame, and `setVisible` with an
     * unchanged boolean is a no-op in React — so a long scroll through the
     * page costs one comparison per frame instead of a render pass.
     */
    const read = () => {
      tickRef.current = 0
      setVisible(window.scrollY > SHOW_AFTER)
    }

    const onScroll = () => {
      if (tickRef.current) return
      tickRef.current = requestAnimationFrame(read)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    read()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (tickRef.current) cancelAnimationFrame(tickRef.current)
    }
  }, [])

  /** Never let a climb loop outlive the component. */
  useEffect(
    () => () => {
      if (climbRef.current) cancelAnimationFrame(climbRef.current)
    },
    [],
  )

  const scrollToTop = useCallback(() => {
    // A rapid second click would otherwise start a second watcher.
    if (climbRef.current) cancelAnimationFrame(climbRef.current)

    setIsClimbing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    /**
     * Wait for the smooth scroll to land. This rode a 100ms setInterval
     * before, and started a fresh one on every click without cancelling the
     * last, so repeated clicks stacked up timers. One frame loop, one owner.
     */
    const startedAt = performance.now()
    const watch = () => {
      if (
        window.scrollY <= 10 ||
        performance.now() - startedAt > CLIMB_TIMEOUT
      ) {
        climbRef.current = 0
        setIsClimbing(false)
        return
      }
      climbRef.current = requestAnimationFrame(watch)
    }
    climbRef.current = requestAnimationFrame(watch)
  }, [])

  if (!visible && !isClimbing) return null

  return (
    <>
      {/* FLOATING BUTTON WITH ODDLING HANDS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Speech bubble on hover or climbing */}
        <div
          className={cn(
            'pixel-box-sm bg-secondary text-secondary-foreground px-3 py-1.5 font-display text-[10px] uppercase transition-[opacity,transform] duration-200 shadow-md',
            isClimbing
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 hover:opacity-100 hover:scale-100',
          )}
        >
          {isClimbing ? '🖐️ Oddling Hands Climbing!' : 'Need a hand to top? 👆'}
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top with oddling hands"
          className={cn(
            'pixel-box pixel-press group relative flex items-center gap-2.5 bg-primary text-primary-foreground px-4 py-3 font-display text-xs uppercase transition-transform duration-200',
            isClimbing &&
              'bg-accent text-accent-foreground scale-105 pixel-burst',
          )}
        >
          {/* Animated Oddling Avatar */}
          <div className="relative size-7 shrink-0 overflow-hidden border-2 border-border bg-card">
            <Image
              src={brandArt.builder}
              alt=""
              fill
              sizes="28px"
              className={cn(
                'object-contain p-0.5 transition-transform duration-200',
                isClimbing ? 'animate-bounce' : 'group-hover:scale-110',
              )}
            />
          </div>

          <span className="tracking-tight">Scroll To Top</span>

          <ArrowUp
            className={cn(
              'size-4 transition-transform duration-200',
              isClimbing && 'animate-bounce',
            )}
          />

          {/* Animated Pixel Hands on button sides */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute -top-3 left-2 font-display text-base transition-transform duration-150',
              isClimbing
                ? 'translate-y-[-6px] rotate-[-15deg]'
                : 'group-hover:-translate-y-2',
            )}
          >
            ✋
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'absolute -top-3 right-2 font-display text-base transition-transform duration-150',
              isClimbing
                ? 'translate-y-[-6px] rotate-[15deg]'
                : 'group-hover:-translate-y-2',
            )}
          >
            🤚
          </span>
        </button>
      </div>

      {/* FULL SCREEN ANIMATED ODDLING HANDS OVERLAY WHEN SCROLLING */}
      {isClimbing && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Left Oddling Hand — poses come from the .hand-climb-* keyframes */}
          <div className="hand-climb-left absolute left-4 bottom-12 flex flex-col items-center gap-1">
            <div className="pixel-box bg-secondary text-foreground p-3 border-4 border-border shadow-lg flex items-center gap-2">
              <span className="text-3xl">✋</span>
              <span className="font-display text-xs uppercase bg-foreground text-background px-2 py-0.5">
                PUSH UP!
              </span>
            </div>
            <div className="w-4 h-32 bg-primary border-x-4 border-border" />
          </div>

          {/* Right Oddling Hand */}
          <div className="hand-climb-right absolute right-4 bottom-12 flex flex-col items-center gap-1">
            <div className="pixel-box bg-accent text-accent-foreground p-3 border-4 border-border shadow-lg flex items-center gap-2">
              <span className="font-display text-xs uppercase bg-foreground text-background px-2 py-0.5">
                PULL TOP!
              </span>
              <span className="text-3xl">🤚</span>
            </div>
            <div className="w-4 h-32 bg-secondary border-x-4 border-border" />
          </div>

          {/* Center Mascot Helper & Sparkles */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pixel-box bg-card p-3 border-4 border-border shadow-2xl flex items-center gap-3 animate-bounce">
            <div className="relative size-10 shrink-0 border-2 border-border bg-accent">
              <Image
                src={brandArt.builder}
                alt=""
                fill
                sizes="40px"
                className="object-contain p-1"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xs uppercase text-primary flex items-center gap-1">
                <Sparkles className="size-3 text-secondary fill-current" />{' '}
                Oddling Hands At Work!
              </span>
              <span className="font-display text-[10px] text-muted-foreground">
                Scrolling back to top...
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
