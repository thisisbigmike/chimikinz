export const site = {
  name: 'Chimikinz',
  supply: 4444,
  chain: 'Ethereum',
  tagline: 'Hand-drawn chimis. Every one carries a charm.',
  world: 'Clover Cove',
  launch: 'soon',
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
    { label: 'Workshop', href: '/workshop' },
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

/**
 * The launch switch for the Workshop page.
 *
 * While this is `false` the whole page renders as a blurred preview behind a
 * "Coming soon" plate — the sections are all built and sit underneath it.
 * Flip it to `true` and the same page comes through sharp and interactive.
 *
 * Typed as `boolean` for the same reason as `launched` above: a literal
 * `false` would make TypeScript treat the open branch as dead code.
 */
export const workshopOpen: boolean = false

export const stats = [
  { value: '4,444', label: 'Chimis' },
  { value: '100%', label: 'Hand-drawn' },
  { value: 'ETH', label: 'Chain' },
  { value: 'SOON', label: 'Mint' },
] as const

export const marqueeItems = [
  'MINT COMING SOON',
  '4,444 CHIMIS',
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
    body: 'Every chimi drawn by hand — no generator, no filler. 4,444 charms sketched, inked and named.',
  },
  {
    phase: 'Phase 02',
    title: 'Polish the Charm',
    status: 'active',
    body: 'Traits balanced, lore written, the terminal built. Allowlist opens so early chimis get rewarded first.',
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
    body: 'Merch, collabs and animated shorts. The chimis leave the page and start showing up everywhere.',
  },
] as const

export const team = [
  {
    name: 'Metakiddo',
    role: 'Founder / Art & Lore',
    image: '/chimikinz/metakiddo.jpeg',
    body: 'Draws every chimi and writes the charm behind it.',
  },
  {
    name: 'CHIMIJEE',
    role: 'Vibes & Events',
    image: '/chimikinz/chimijee.jpeg',
    body: 'Runs the community, events and the noise.',
  },
] as const
