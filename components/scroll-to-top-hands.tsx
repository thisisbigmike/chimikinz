'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Sparkles, ArrowUp } from 'lucide-react'
import { brandArt } from '@/lib/oddlings'
import { cn } from '@/lib/utils'

export function ScrollToTopHands() {
  const [visible, setVisible] = useState(false)
  const [isClimbing, setIsClimbing] = useState(false)
  const [handPose, setHandPose] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled past 250px
      if (window.scrollY > 250) {
        setVisible(true)
      } else {
        setVisible(false)
        if (window.scrollY === 0) {
          setIsClimbing(false)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animate hands motion while scrolling up
  useEffect(() => {
    if (!isClimbing) return

    const interval = setInterval(() => {
      setHandPose((prev) => ((prev + 1) % 3) as 0 | 1 | 2)
    }, 150)

    return () => clearInterval(interval)
  }, [isClimbing])

  const scrollToTop = () => {
    setIsClimbing(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    // Safety fallback to turn off climbing after scroll completes
    const checkTop = setInterval(() => {
      if (window.scrollY <= 10) {
        setIsClimbing(false)
        clearInterval(checkTop)
      }
    }, 100)

    setTimeout(() => {
      clearInterval(checkTop)
      setIsClimbing(false)
    }, 2000)
  }

  if (!visible && !isClimbing) return null

  return (
    <>
      {/* FLOATING BUTTON WITH ODDLING HANDS */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Speech bubble on hover or climbing */}
        <div
          className={cn(
            'pixel-box-sm bg-secondary text-secondary-foreground px-3 py-1.5 font-display text-[10px] uppercase transition-all duration-200 shadow-md',
            isClimbing ? 'opacity-100 scale-100' : 'opacity-0 scale-90 hover:opacity-100 hover:scale-100',
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
            isClimbing && 'bg-accent text-accent-foreground scale-105 pixel-burst',
          )}
        >
          {/* Animated Oddling Avatar */}
          <div className="relative size-7 shrink-0 overflow-hidden border-2 border-foreground bg-card">
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

          <ArrowUp className={cn('size-4 transition-transform duration-200', isClimbing && 'animate-bounce')} />

          {/* Animated Pixel Hands on button sides */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute -top-3 left-2 font-display text-base transition-transform duration-150',
              isClimbing ? 'translate-y-[-6px] rotate-[-15deg]' : 'group-hover:-translate-y-2',
            )}
          >
            ✋
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'absolute -top-3 right-2 font-display text-base transition-transform duration-150',
              isClimbing ? 'translate-y-[-6px] rotate-[15deg]' : 'group-hover:-translate-y-2',
            )}
          >
            🤚
          </span>
        </button>
      </div>

      {/* FULL SCREEN ANIMATED ODDLING HANDS OVERLAY WHEN SCROLLING */}
      {isClimbing && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Left Oddling Hand */}
          <div
            className={cn(
              'absolute left-4 bottom-12 transition-all duration-150 flex flex-col items-center gap-1',
              handPose === 0 && 'translate-y-0 rotate-[-5deg]',
              handPose === 1 && '-translate-y-8 rotate-[-15deg] scale-110',
              handPose === 2 && '-translate-y-16 rotate-[-10deg] scale-105',
            )}
          >
            <div className="pixel-box bg-secondary text-foreground p-3 border-4 border-foreground shadow-lg flex items-center gap-2">
              <span className="text-3xl">✋</span>
              <span className="font-display text-xs uppercase bg-foreground text-background px-2 py-0.5">
                PUSH UP!
              </span>
            </div>
            <div className="w-4 h-32 bg-primary border-x-4 border-foreground" />
          </div>

          {/* Right Oddling Hand */}
          <div
            className={cn(
              'absolute right-4 bottom-12 transition-all duration-150 flex flex-col items-center gap-1',
              handPose === 0 && '-translate-y-8 rotate-[15deg] scale-110',
              handPose === 1 && '-translate-y-16 rotate-[10deg] scale-105',
              handPose === 2 && 'translate-y-0 rotate-[5deg]',
            )}
          >
            <div className="pixel-box bg-accent text-accent-foreground p-3 border-4 border-foreground shadow-lg flex items-center gap-2">
              <span className="font-display text-xs uppercase bg-foreground text-background px-2 py-0.5">
                PULL TOP!
              </span>
              <span className="text-3xl">🤚</span>
            </div>
            <div className="w-4 h-32 bg-secondary border-x-4 border-foreground" />
          </div>

          {/* Center Mascot Helper & Sparkles */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pixel-box bg-card p-3 border-4 border-foreground shadow-2xl flex items-center gap-3 animate-bounce">
            <div className="relative size-10 shrink-0 border-2 border-foreground bg-accent">
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
                <Sparkles className="size-3 text-secondary fill-current" /> Oddling Hands At Work!
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
