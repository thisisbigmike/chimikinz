'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelMarquee } from '@/components/pixel/pixel-marquee'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

type Quest = {
  id: string
  title: string
  points: number
  category: 'Social' | 'Daily' | 'Lore' | 'Creative'
  description: string
  actionLabel: string
  actionUrl?: string
}

const QUESTS: Quest[] = [
  {
    id: 'x-follow',
    title: 'Follow @chimikinzonape on X',
    points: 150,
    category: 'Social',
    description: 'Keep up with daily hand-drawn previews and mint announcements.',
    actionLabel: 'Follow on X',
    actionUrl: site.links.x,
  },
  {
    id: 'discord-join',
    title: 'Join the Chimikinz Nest on Discord',
    points: 200,
    category: 'Social',
    description: 'Hang out with the creators, talk lore, and get early community drops.',
    actionLabel: 'Join Discord',
    actionUrl: site.links.discord,
  },
  {
    id: 'daily-checkin',
    title: 'Daily Charm Check-in',
    points: 50,
    category: 'Daily',
    description: 'Claim your daily dose of luck from the sketchbook.',
    actionLabel: 'Claim Luck',
  },
  {
    id: 'gallery-share',
    title: 'Inspect an Oddling in the Nest',
    points: 100,
    category: 'Creative',
    description: 'Browse the gallery and find an oddling whose charm speaks to you.',
    actionLabel: 'Open Gallery',
    actionUrl: '/gallery',
  },
  {
    id: 'lore-trivia',
    title: 'Answer the Charm Master Trivia',
    points: 250,
    category: 'Lore',
    description: 'Prove you know where the oddlings came from and how many total charms exist.',
    actionLabel: 'Take Quiz',
  },
]

const TIERS = [
  { points: 200, role: 'Charm Seeker', reward: 'Discord Role & WL Access' },
  { points: 400, role: 'Oddling Vanguard', reward: 'Priority Mint Guarantee' },
  { points: 600, role: 'Golden Halo', reward: 'Exclusive Wallpaper & Lore Art' },
  { points: 750, role: 'Charm Master', reward: 'Free Merch Drop Priority' },
]

function AnimatedPoints({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(value)
  const [animating, setAnimating] = useState(false)
  const prevValue = useRef(value)

  useEffect(() => {
    if (value !== prevValue.current) {
      setAnimating(true)
      const start = prevValue.current
      const diff = value - start
      const steps = 8
      let step = 0

      const interval = setInterval(() => {
        step++
        setDisplayed(Math.round(start + (diff * step) / steps))
        if (step >= steps) {
          clearInterval(interval)
          setDisplayed(value)
          setAnimating(false)
        }
      }, 40)

      prevValue.current = value
      return () => clearInterval(interval)
    }
  }, [value])

  return (
    <span className={cn(
      'font-display text-3xl text-primary transition-transform duration-200',
      animating && 'pixel-count-up',
    )}>
      {displayed} PTS
    </span>
  )
}

export default function QuestsPage() {
  const [completedQuests, setCompletedQuests] = useState<string[]>([])
  const [activeQuiz, setActiveQuiz] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null)
  const [justCompleted, setJustCompleted] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('chimikinz_completed_quests')
    if (saved) {
      try {
        setCompletedQuests(JSON.parse(saved))
      } catch {
        // Fallback
      }
    }
  }, [])

  const totalPoints = QUESTS.reduce(
    (sum, q) => (completedQuests.includes(q.id) ? sum + q.points : sum),
    0,
  )

  const completeQuest = (id: string, url?: string) => {
    if (url && url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
    if (!completedQuests.includes(id)) {
      const next = [...completedQuests, id]
      setCompletedQuests(next)
      setJustCompleted(id)
      localStorage.setItem('chimikinz_completed_quests', JSON.stringify(next))
      setTimeout(() => setJustCompleted(null), 700)
    }
  }

  const handleQuizSubmit = () => {
    if (quizAnswer === '2222') {
      completeQuest('lore-trivia')
      setActiveQuiz(false)
    } else {
      alert('Not quite! Hint: Total supply is 2,222 oddlings.')
    }
  }

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />
      <PixelMarquee
        items={[
          'EARN CHARM POINTS',
          'COMMUNITY QUESTS',
          'PRIORITY MINT SPOT',
          '2,222 ODDLINGS',
          'APECHAIN',
        ]}
        tone="gold"
      />

      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-10">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            eyebrow="Quests & Rewards"
            title="Stack Charm Points"
            body="Early oddlings get rewarded. Complete quests to accumulate charm points and unlock priority mint roles."
          />
        </ScrollReveal>

        {/* Dashboard Stat Banner */}
        <ScrollReveal variant="scale-up" delay={100}>
          <div className="pixel-box-lg bg-card p-6 sm:p-8 grid gap-6 md:grid-cols-3 items-center">
            <div className="flex items-center gap-4">
              <div className="relative size-20 bg-secondary border-4 border-foreground grid place-items-center">
                <Image
                  src="/chimikinz/oddling-4.png"
                  alt="Bookworm Oddling"
                  fill
                  className="pixel-float object-contain p-2"
                />
              </div>
              <div>
                <span className="font-display text-[10px] uppercase text-muted-foreground block">
                  Total Charm Points
                </span>
                <AnimatedPoints value={totalPoints} />
              </div>
            </div>

            <div className="flex flex-col gap-1 border-t-4 md:border-t-0 md:border-l-4 border-foreground pt-4 md:pt-0 md:pl-6">
              <span className="font-display text-[10px] uppercase text-muted-foreground">
                Completed Quests
              </span>
              <span className="font-display text-2xl">
                {completedQuests.length} / {QUESTS.length} Done
              </span>
            </div>

            <div className="flex flex-col gap-1 border-t-4 md:border-t-0 md:border-l-4 border-foreground pt-4 md:pt-0 md:pl-6">
              <span className="font-display text-[10px] uppercase text-muted-foreground">
                Current Status
              </span>
              <span className="font-display text-xl uppercase text-accent">
                {totalPoints >= 750
                  ? '★ Charm Master'
                  : totalPoints >= 400
                    ? '✦ Oddling Vanguard'
                    : totalPoints >= 200
                      ? '◆ Charm Seeker'
                      : '• Charm Novice'}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Quest List */}
        <div className="flex flex-col gap-6">
          <ScrollReveal variant="fade-up">
            <h2 className="font-display text-xl uppercase">Available Quests</h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {QUESTS.map((quest, i) => {
              const isDone = completedQuests.includes(quest.id)
              const wasBurst = justCompleted === quest.id
              return (
                <ScrollReveal key={quest.id} variant="fade-up" delay={i * 100}>
                  <div
                    className={cn(
                      'pixel-box flex flex-col justify-between p-6 transition-all duration-300',
                      isDone ? 'bg-muted/60 opacity-90' : 'bg-card',
                      wasBurst && 'pixel-burst',
                    )}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <PixelTag
                          className={
                            quest.category === 'Daily'
                              ? 'bg-secondary'
                              : quest.category === 'Lore'
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-primary text-primary-foreground'
                          }
                        >
                          {quest.category}
                        </PixelTag>
                        <span className="font-display text-sm text-primary">
                          +{quest.points} PTS
                        </span>
                      </div>

                      <h3 className="font-display text-sm uppercase">{quest.title}</h3>
                      <p className="text-xl text-muted-foreground leading-snug">
                        {quest.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t-4 border-foreground flex items-center justify-between">
                      {isDone ? (
                        <span className="font-display text-xs uppercase text-accent flex items-center gap-2">
                          ✓ Completed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (quest.id === 'lore-trivia') {
                              setActiveQuiz(true)
                            } else if (quest.actionUrl) {
                              completeQuest(quest.id, quest.actionUrl)
                            } else {
                              completeQuest(quest.id)
                            }
                          }}
                          className="pixel-box-sm pixel-press bg-primary text-primary-foreground px-4 py-2 font-display text-xs uppercase"
                        >
                          {quest.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="flex flex-col gap-6 pt-6">
          <ScrollReveal variant="fade-up">
            <h2 className="font-display text-xl uppercase">Reward Milestones</h2>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIERS.map((tier, i) => {
              const unlocked = totalPoints >= tier.points
              return (
                <ScrollReveal key={tier.points} variant="pixel-pop" delay={i * 120}>
                  <div
                    className={cn(
                      'pixel-box p-5 flex flex-col gap-3 transition-all duration-300',
                      unlocked
                        ? 'bg-secondary text-secondary-foreground pixel-unlock-glow'
                        : 'bg-card text-muted-foreground',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xs uppercase">
                        {tier.points} PTS
                      </span>
                      <PixelTag className={unlocked ? 'bg-foreground text-background' : 'bg-background'}>
                        {unlocked ? 'Unlocked' : 'Locked'}
                      </PixelTag>
                    </div>
                    <h3 className="font-display text-sm uppercase">{tier.role}</h3>
                    <p className="text-lg leading-snug">{tier.reward}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>

        {/* Trivia Quiz Modal */}
        {activeQuiz && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4"
            onClick={() => setActiveQuiz(false)}
          >
            <div
              className="pixel-box-lg pixel-slide-up bg-card w-full max-w-md p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b-4 border-foreground pb-3">
                <h3 className="font-display text-sm uppercase">Lore Trivia Quiz</h3>
                <button
                  type="button"
                  onClick={() => setActiveQuiz(false)}
                  className="font-display text-xs transition-transform duration-200 hover:scale-125"
                >
                  X
                </button>
              </div>

              <p className="text-xl">
                How many total hand-drawn oddlings make up the full Chimikinz collection on ApeChain?
              </p>

              <div className="flex flex-col gap-3">
                {['1111', '2222', '5555', '10000'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setQuizAnswer(option)}
                    className={cn(
                      'pixel-box-sm p-3 font-display text-xs uppercase text-left transition-all duration-200',
                      quizAnswer === option
                        ? 'bg-primary text-primary-foreground translate-x-1'
                        : 'bg-background hover:bg-muted hover:translate-x-1',
                    )}
                  >
                    {option} Oddlings
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleQuizSubmit}
                disabled={!quizAnswer}
                className="pixel-box bg-accent text-accent-foreground py-3 font-display text-xs uppercase disabled:opacity-50 transition-transform duration-200 hover:scale-[1.02]"
              >
                Submit Answer (+250 PTS)
              </button>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
