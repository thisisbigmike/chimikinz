/**
 * The Workshop — how a Chimi actually gets made, and a bench the reader can
 * work at themselves.
 *
 * Everything here is copy and option data. The bench in
 * `components/sections/workshop-bench.tsx` renders whatever it finds, so a
 * new option below shows up on the page without touching the component.
 */

/** ── The bench steps ──────────────────────────────────────────────────── */

export type WorkshopStep = {
  /** Two digits — the page prints them as the step's number plate. */
  step: string
  title: string
  /** One line under the title. */
  summary: string
  body: string
  /** A Chimi whose art shows this stage off best. */
  chimi: string
}

export const steps: WorkshopStep[] = [
  {
    step: '01',
    title: 'The Feeling',
    summary: 'Before the face, the mood.',
    body: 'No Chimi starts as a drawing. It starts as a feeling someone had and could not put down — curiosity, patience, mischief, nerve. If the feeling is not clear enough to name in one word, nothing gets drawn that day.',
    chimi: 'clov',
  },
  {
    step: '02',
    title: 'The Scribble',
    summary: 'Pencil, badly, on purpose.',
    body: 'The first pass is deliberately rough. A shape, a stance, an idea of where the weight sits. Most of them die here, and they are meant to — the bin beside the desk is part of the process, not a failure of it.',
    chimi: 'moss',
  },
  {
    step: '03',
    title: 'The Line',
    summary: 'Ink it and commit.',
    body: 'The scribble gets inked by hand, one line at a time, no generator anywhere near it. This is where a Chimi stops being a pose and starts being a person you could pick out of a crowd.',
    chimi: 'whim',
  },
  {
    step: '04',
    title: 'The Colour',
    summary: 'Skin, fit, and the one bright thing.',
    body: 'Colour goes on last and it goes on with a rule: a warm ground, a fit that argues with it slightly, and exactly one bright thing you notice before anything else. Break the rule and the Chimi reads as noise.',
    chimi: 'zipp',
  },
  {
    step: '05',
    title: 'The Charm',
    summary: 'The part that is not drawn at all.',
    body: 'Every Chimi leaves the bench carrying one charm — a short line about how they move through the world. It is written, not rolled, and it is the only trait that cannot be redrawn later.',
    chimi: 'clov',
  },
]

/** ── The charm bench ──────────────────────────────────────────────────── */

export type BenchOption = {
  value: string
  /** Feeds the generated name, so keep it pronounceable. */
  syllable: string
  /** Which of the four this pick leans toward. */
  kin: string
}

export type BenchSlot = {
  key: 'skin' | 'fit' | 'head' | 'charm'
  label: string
  /** The line above the option row — what this choice is actually deciding. */
  hint: string
  options: BenchOption[]
}

/**
 * The four slots the bench mixes. The first option of each is the default
 * the page renders on the server — the bench never randomises on mount, so
 * the first paint always matches.
 */
export const slots: BenchSlot[] = [
  {
    key: 'skin',
    label: 'Skin',
    hint: 'The ground everything else sits on.',
    options: [
      { value: 'Warm Peach', syllable: 'Pep', kin: 'clov' },
      { value: 'Meadow Green', syllable: 'Mo', kin: 'moss' },
      { value: 'Dusk Lilac', syllable: 'Lil', kin: 'whim' },
      { value: 'Cove Blue', syllable: 'Bry', kin: 'zipp' },
      { value: 'Sunbleached Straw', syllable: 'Hay', kin: 'clov' },
    ],
  },
  {
    key: 'fit',
    label: 'Fit',
    hint: 'What they reach for without thinking.',
    options: [
      { value: 'White & Orange Hoodie', syllable: 'kin', kin: 'clov' },
      { value: 'Black Hoodie', syllable: 'ro', kin: 'moss' },
      { value: 'Pink Hoodie', syllable: 'sy', kin: 'whim' },
      { value: 'Blue Hoodie', syllable: 'zo', kin: 'zipp' },
      { value: 'Patched Overalls', syllable: 'bit', kin: 'moss' },
    ],
  },
  {
    key: 'head',
    label: 'Head',
    hint: 'The one bright thing you notice first.',
    options: [
      { value: 'Backwards Cap', syllable: 'ka', kin: 'moss' },
      { value: 'Propeller Cap', syllable: 'wi', kin: 'zipp' },
      { value: 'Sunset Orange Hair', syllable: 'ru', kin: 'whim' },
      { value: 'A Dented Helmet', syllable: 'do', kin: 'clov' },
      { value: 'Clover Pin', syllable: 'lu', kin: 'moss' },
    ],
  },
  {
    key: 'charm',
    label: 'Charm',
    hint: 'Written, never rolled. This one sticks.',
    options: [
      { value: 'Never Lost, Only Early', syllable: '', kin: 'clov' },
      { value: 'Small Steps Count', syllable: '', kin: 'moss' },
      { value: 'Never The Obvious One', syllable: '', kin: 'whim' },
      { value: 'One More Go', syllable: '', kin: 'zipp' },
      { value: 'Loud About Quiet Things', syllable: '', kin: 'whim' },
    ],
  },
]

export type BenchPicks = Record<BenchSlot['key'], number>

/** The picks the page renders before anyone touches it. */
export const defaultPicks: BenchPicks = { skin: 0, fit: 0, head: 0, charm: 0 }

const optionAt = (slot: BenchSlot, picks: BenchPicks) =>
  slot.options[picks[slot.key]] ?? slot.options[0]

/** The chosen option for every slot, in slot order. */
export const chosen = (picks: BenchPicks) =>
  slots.map((slot) => ({ slot, option: optionAt(slot, picks) }))

/**
 * A name built out of the picks rather than a list — skin gives the opening
 * syllable, fit the tail, and a distinctive head pushes its own syllable in
 * between. Same picks always give the same name.
 */
export const buildName = (picks: BenchPicks): string => {
  const [skin, fit, head] = slots.map((slot) => optionAt(slot, picks))
  const middle = head.syllable && picks.head % 2 === 1 ? head.syllable : ''
  const raw = `${skin.syllable}${middle}${fit.syllable}`
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

/**
 * Which of the four the mix comes out closest to. The bench cannot draw, so
 * the honest thing it can offer is kinship: whichever Chimi the picks lean
 * toward most, with the first slot breaking a tie.
 */
export const nearestKin = (picks: BenchPicks): string => {
  const tally = new Map<string, number>()
  for (const { option } of chosen(picks)) {
    tally.set(option.kin, (tally.get(option.kin) ?? 0) + 1)
  }

  let best = optionAt(slots[0], picks).kin
  let bestCount = 0
  for (const [kin, count] of tally) {
    if (count > bestCount) {
      best = kin
      bestCount = count
    }
  }
  return best
}
