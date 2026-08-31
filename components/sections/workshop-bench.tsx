'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { PixelButton } from '@/components/pixel/pixel-button'
import { PixelTag } from '@/components/pixel/pixel-panel'
import { chimiBySlug } from '@/lib/chimis'
import {
  buildName,
  chosen,
  defaultPicks,
  nearestKin,
  slots,
  type BenchPicks,
} from '@/lib/workshop'
import { cn } from '@/lib/utils'

/**
 * The charm bench: pick a skin, a fit, a head and a charm, and the work
 * order beside it fills itself in.
 *
 * It deliberately does not composite artwork. Every Chimi on this site is
 * drawn by hand, so the bench offers kinship instead — whichever of the four
 * the mix leans toward — rather than a machine-made face that would be the
 * one thing the collection is not.
 *
 * Picks start at `defaultPicks` rather than something random: the server and
 * the first client paint have to agree, and rolling on mount would make them
 * differ. The roll button is how randomness gets in, after hydration.
 */
export function WorkshopBench() {
  const [picks, setPicks] = useState<BenchPicks>(defaultPicks)
  /** Bumped on every roll so the work order can replay its pop animation. */
  const [rolls, setRolls] = useState(0)

  const rows = useMemo(() => chosen(picks), [picks])
  const name = useMemo(() => buildName(picks), [picks])
  const kin = useMemo(() => chimiBySlug(nearestKin(picks)), [picks])

  const pick = (key: keyof BenchPicks, index: number) =>
    setPicks((prev) => ({ ...prev, [key]: index }))

  const roll = () => {
    setPicks(
      Object.fromEntries(
        slots.map((slot) => [
          slot.key,
          Math.floor(Math.random() * slot.options.length),
        ]),
      ) as BenchPicks,
    )
    setRolls((n) => n + 1)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
      {/* ── The slots ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        {slots.map((slot) => (
          <fieldset key={slot.key} className="pixel-box bg-card p-5">
            <legend className="sr-only">{slot.label}</legend>

            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-[10px] uppercase tracking-tight">
                {slot.label}
              </span>
              <span className="text-xl leading-none text-muted-foreground">
                {slot.hint}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {slot.options.map((option, index) => {
                const active = picks[slot.key] === index
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => pick(slot.key, index)}
                    aria-pressed={active}
                    className={cn(
                      'pixel-box-sm pixel-press px-3 py-2 text-left font-display text-[9px] uppercase leading-tight tracking-tight transition-colors',
                      active
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-background hover:bg-muted',
                    )}
                  >
                    {option.value}
                  </button>
                )
              })}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-wrap gap-3">
          <PixelButton onClick={roll} variant="accent" size="md">
            Roll the bench
          </PixelButton>
          <PixelButton
            onClick={() => setPicks(defaultPicks)}
            variant="bone"
            size="md"
          >
            Clear it down
          </PixelButton>
        </div>
      </div>

      {/* ── The work order ─────────────────────────────────────────── */}
      <div className="lg:sticky lg:top-28">
        {/* Keyed on the roll count so a roll replays the pop; picking a single
            trait leaves the card in place and just swaps the line. */}
        <div key={rolls} className="pixel-box-lg pixel-slide-up bg-card">
          <div className="pixel-invert flex items-center gap-2 border-b-4 border-border px-4 py-2">
            <span className="flex gap-1" aria-hidden="true">
              <span className="size-2 bg-primary" />
              <span className="size-2 bg-secondary" />
              <span className="size-2 bg-accent" />
            </span>
            <h3 className="font-display text-[10px] uppercase tracking-tight">
              Work order
            </h3>
          </div>

          <div className="flex flex-col gap-5 p-5 sm:p-6">
            <div className="flex flex-col gap-2">
              <span className="font-display text-[9px] uppercase tracking-tight text-muted-foreground">
                Working name
              </span>
              <p className="font-display text-xl uppercase leading-none">
                <span className="pixel-text-shadow-primary">{name}</span>
              </p>
            </div>

            <dl className="flex flex-col border-t-4 border-border">
              {rows.map(({ slot, option }) => (
                <div
                  key={slot.key}
                  className="flex items-baseline justify-between gap-4 border-b-4 border-border py-2"
                >
                  <dt className="font-display text-[9px] uppercase tracking-tight text-muted-foreground">
                    {slot.label}
                  </dt>
                  <dd className="text-right text-xl leading-tight">
                    {option.value}
                  </dd>
                </div>
              ))}
            </dl>

            {kin ? (
              <div className="flex items-center gap-4">
                <Link
                  href={`/chimis/${kin.slug}`}
                  className="pixel-box-sm pixel-press art-ground shrink-0 bg-background"
                >
                  <Image
                    src={kin.thumb}
                    alt={`${kin.name}, the Chimi this mix comes out closest to`}
                    width={72}
                    height={72}
                    className="art-smooth size-[72px] object-contain"
                  />
                </Link>
                <div className="flex flex-col items-start gap-2">
                  <PixelTag
                    style={{ backgroundColor: kin.accent }}
                    className="text-night"
                  >
                    Closest kin
                  </PixelTag>
                  <p className="text-xl leading-tight text-muted-foreground">
                    This mix comes out nearest to{' '}
                    <Link
                      href={`/chimis/${kin.slug}`}
                      className="text-foreground underline decoration-4 underline-offset-4"
                    >
                      {kin.name}
                    </Link>
                    . {kin.personality}
                  </p>
                </div>
              </div>
            ) : null}

            <p className="border-t-4 border-border pt-4 text-xl leading-snug text-muted-foreground">
              The bench does not draw. Every Chimi that makes it out of here
              gets inked by hand first — this is the order form, not the
              artist.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
