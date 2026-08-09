'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Check } from 'lucide-react'
import { PixelLink } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { PixelSparkles } from '@/components/pixel-sparkles'
import { brandArt } from '@/lib/oddlings'
import { site, stats } from '@/lib/site'
import { useUser } from '@/lib/context/user-context'
import { cn } from '@/lib/utils'

export function Hero() {
  const { dailyClaimed, claimDailyLuck, points } = useUser()
  const [justClaimed, setJustClaimed] = useState(false)

  const handleClaim = () => {
    if (dailyClaimed) return
    claimDailyLuck()
    setJustClaimed(true)
    setTimeout(() => setJustClaimed(false), 1500)
  }

  return (
    <section className="border-b-4 border-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-20">
        <div className="flex flex-col items-start gap-6">
          <ScrollReveal variant="pixel-pop" delay={0}>
            <div className="flex flex-wrap items-center gap-2">
              <PixelTag className="bg-accent text-accent-foreground">
                {site.supply.toLocaleString()} lucky oddlings
              </PixelTag>
              {points > 0 && (
                <PixelTag className="bg-secondary text-secondary-foreground">
                  ✦ {points} Charm PTS
                </PixelTag>
              )}
            </div>
          </ScrollReveal>

          {/* The signature element: the wordmark itself. */}
          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="font-display text-4xl uppercase leading-[1.1] sm:text-5xl lg:text-6xl">
              <span className="pixel-text-shadow-primary text-foreground">
                Chimikinz
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="max-w-xl text-pretty text-2xl leading-snug text-muted-foreground">
              Every oddling is drawn by hand and born with one charm of its own —
              a horn, a halo, a hood, a habit. Collect one and the luck is yours
              to keep.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={300}>
            <div className="flex flex-wrap items-center gap-4">
              <PixelLink href={site.links.mint} external size="lg">
                Mint on {site.chain}
              </PixelLink>

              <button
                type="button"
                onClick={handleClaim}
                disabled={dailyClaimed}
                className={cn(
                  'pixel-box-sm pixel-press px-5 py-3 font-display text-xs uppercase flex items-center gap-2 transition-all duration-200',
                  dailyClaimed
                    ? 'bg-muted text-muted-foreground cursor-default'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
                  justClaimed && 'pixel-burst scale-105 bg-accent text-accent-foreground',
                )}
              >
                {dailyClaimed ? (
                  <>
                    <Check className="size-4" /> Luck Claimed Today
                  </>
                ) : (
                  <>Claim Daily Luck (+50 PTS)</>
                )}
              </button>
            </div>
          </ScrollReveal>

          <dl className="mt-2 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} variant="pixel-pop" delay={400 + i * 100}>
                <div className="pixel-box-sm bg-card px-3 py-3 text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-base uppercase">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-lg uppercase text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>

        <ScrollReveal variant="scale-up" delay={150}>
          <div className="pixel-box-lg pixel-checker pixel-tilt relative aspect-square w-full bg-card overflow-hidden">
            <PixelSparkles count={16} speed={0.6} />
            <Image
              src={brandArt.group}
              alt="Four Chimikinz oddlings huddled together, the one in front wearing an orange clover hoodie"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="oddling-bob relative z-10 object-contain p-6"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
