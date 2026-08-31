import Image from 'next/image'
import type { Chimi } from '@/lib/chimis'
import { cn } from '@/lib/utils'

/**
 * The collector card — one Chimi, laid out like the printed reference:
 * a colour-washed panel carrying the feeling, the name and the artwork,
 * over a cream strip of the hard details.
 *
 * The card is deliberately mode-independent. It reads as a printed thing,
 * so its backdrop stays the Chimi's own colour and its type stays ink in
 * both light and dark — the same reasoning the Sunbeam CTA already uses.
 */

/** The brand mark: four petals, four circles. */
function Clover({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <circle cx="8.6" cy="8.6" r="5.1" />
      <circle cx="15.4" cy="8.6" r="5.1" />
      <circle cx="8.6" cy="15.4" r="5.1" />
      <circle cx="15.4" cy="15.4" r="5.1" />
    </svg>
  )
}

/** One labelled block in the cream strip along the bottom. */
function Field({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-3 p-5 sm:p-6', className)}>
      <h2 className="font-display text-[9px] uppercase tracking-tight text-night/75">
        {label}
      </h2>
      {children}
    </div>
  )
}

export function ChimiCard({ chimi }: { chimi: Chimi }) {
  const kindLabel =
    chimi.kind === 'rare' ? 'Rare personality' : 'Founding personality'

  return (
    <article className="soft-card pixel-box-lg overflow-hidden rounded-[28px]">
      {/* ── The wash: feeling, name, artwork ─────────────────────────── */}
      <div
        className="relative px-5 pt-5 text-night sm:px-8 sm:pt-7"
        style={{ backgroundColor: chimi.accent }}
      >
        <div className="flex items-center gap-2">
          <Clover className="size-5 shrink-0" />
          <span className="font-display text-[10px] uppercase tracking-tight">
            Chimikinz
          </span>
        </div>

        <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* Words */}
          <div className="flex flex-col gap-5 pb-6 pt-8 lg:pb-16 lg:pt-12">
            <div className="flex flex-col gap-2">
              <h1 className="flex flex-wrap items-center gap-2 font-display text-xl uppercase leading-tight sm:text-2xl">
                {chimi.emotion}
                {chimi.kind === 'rare' ? (
                  <span aria-label="Rare" title="Rare">
                    ⭐
                  </span>
                ) : null}
              </h1>
              <p className="font-display text-[10px] uppercase tracking-tight text-night/75">
                {kindLabel}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              {chimi.blurb.map((line) => (
                <p
                  key={line}
                  className="text-pretty text-2xl leading-snug text-night/85"
                >
                  {line}
                </p>
              ))}
            </div>

            <Clover className="size-5 shrink-0 text-night/45" />
          </div>

          {/* Artwork */}
          <div>
            <div className="relative aspect-square w-full">
              <Image
                src={chimi.art}
                alt={`${chimi.name}, the Chimi of ${chimi.emotion.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 46vw, 90vw"
                priority
                className="art-smooth object-contain"
              />
            </div>

            {/* The ground they stand on */}
            <div
              className="mx-auto -mt-2 mb-6 h-2.5 w-1/2 bg-night/15"
              style={{ borderRadius: '50%' }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* ── The cream strip: the hard details ────────────────────────── */}
      <div className="grid divide-y-4 divide-border border-t-4 border-border bg-cream text-night lg:grid-cols-[1fr_0.65fr_1.25fr_1.35fr_0.8fr] lg:divide-x-4 lg:divide-y-0">
        <Field label={chimi.name}>
          <div className="flex items-center gap-2">
            <Clover className="size-5 shrink-0" />
            <span className="font-display text-[10px] uppercase leading-tight tracking-tight">
              Chimikinz
              <br />
              {kindLabel}
            </span>
          </div>
          <div className="mt-1 flex flex-col gap-2">
            <h2 className="font-display text-[9px] uppercase tracking-tight text-night/75">
              Emotion
            </h2>
            <span
              className="inline-flex w-fit items-center border-[3px] border-border px-2 py-1 font-display text-[9px] uppercase leading-none tracking-tight"
              style={{ backgroundColor: chimi.accent }}
            >
              {chimi.emotion}
            </span>
          </div>
        </Field>

        <Field label="Gender">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="font-display text-lg leading-none"
            >
              {chimi.gender === 'Female' ? '♀' : '♂'}
            </span>
            <span className="font-display text-[10px] uppercase tracking-tight">
              {chimi.gender}
            </span>
          </div>
        </Field>

        <Field label="Traits">
          <ul className="flex flex-col gap-1.5">
            {chimi.traits.map((trait) => (
              <li
                key={trait.label}
                className="font-display text-[9px] uppercase leading-relaxed tracking-tight"
              >
                <span aria-hidden="true" className="text-night/40">
                  •{' '}
                </span>
                {trait.value}{' '}
                <span className="text-night/75">({trait.label})</span>
              </li>
            ))}
          </ul>
        </Field>

        <Field label="Lore">
          <p className="text-pretty text-xl leading-snug">{chimi.lore}</p>
          <Clover className="size-4 shrink-0 text-night/40" />
        </Field>

        <Field label="How to find">
          <span
            className="inline-flex w-fit items-center border-[3px] border-border px-2 py-1 font-display text-[9px] uppercase leading-none tracking-tight"
            style={{ backgroundColor: chimi.accent }}
          >
            {chimi.howToFind}
          </span>
          <Clover className="size-4 shrink-0 text-night/40" />
        </Field>
      </div>
    </article>
  )
}
