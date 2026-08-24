export const site = {
  name: 'Chimikinz',
  supply: 4444,
  chain: 'Ethereum',
  tagline: 'Hand-drawn oddlings. Every one carries a charm.',
  world: 'Clover Cove',
  launch: 'August 2026',
  links: {
    x: 'https://x.com/chimikinzzz',
    xFollowIntent: 'https://x.com/intent/follow?screen_name=chimikinzzz',
    discord: 'https://discord.gg/xTZ2zPwnX7',
    mint: 'https://chimikinz.nfts2.me',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Chimis', href: '/chimis' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Journey', href: '/journey' },
  ],
} as const

/**
 * The launch switch for the Collections page.
 *
 * While this is `false` every collection card opens the "Coming soon" modal.
 * Flip it to `true` on launch day and the same cards send people straight to
 * the `opensea` URL on each collection in `lib/collections.ts`.
 *
 * Typed as `boolean` on purpose — a literal `false` would make TypeScript
 * treat the live branch as dead code.
 */
export const launched: boolean = false

export const stats = [
  { value: '4,444', label: 'Oddlings' },
  { value: '100%', label: 'Hand-drawn' },
  { value: 'ETH', label: 'Chain' },
  { value: 'SOON', label: 'Mint' },
] as const

export const marqueeItems = [
  'MINT COMING SOON',
  '4,444 ODDLINGS',
  'BUILT ON ETHEREUM',
  'ONE CHARM EACH',
  'NO TWO ALIKE',
  'CATCH THE LUCK',
] as const

export const roadmap = [
  {
    phase: 'Phase 01',
    title: 'The Scribble',
    status: 'done',
    body: 'Every oddling drawn by hand — no generator, no filler. 4,444 charms sketched, inked and named.',
  },
  {
    phase: 'Phase 02',
    title: 'Polish the Charm',
    status: 'active',
    body: 'Traits balanced, lore written, the terminal built. Allowlist opens so early oddlings get rewarded first.',
  },
  {
    phase: 'Phase 03',
    title: 'Share the Luck',
    status: 'next',
    body: 'Mint opens on Ethereum. Holders get the charm ledger, community drops and a say in what comes next.',
  },
  {
    phase: 'Phase 04',
    title: 'Grow the Nest',
    status: 'next',
    body: 'Merch, collabs and animated shorts. The oddlings leave the page and start showing up everywhere.',
  },
] as const

export const team = [
  {
    name: 'Metakiddo',
    role: 'Founder / Art & Lore',
    image: '/chimikinz/metakiddo.jpeg',
    body: 'Draws every oddling and writes the charm behind it.',
  },
  {
    name: 'CHIMIJEE',
    role: 'Vibes & Events',
    image: '/chimikinz/chimijee.jpeg',
    body: 'Runs the community, events and the noise.',
  },
] as const
