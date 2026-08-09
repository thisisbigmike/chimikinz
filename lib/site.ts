export const site = {
  name: 'Chimikinz',
  supply: 2222,
  chain: 'ApeChain',
  tagline: 'Hand-drawn oddlings. Every one carries a charm.',
  links: {
    x: 'https://x.com/chimikinzonape',
    discord: 'https://discord.gg/xTZ2zPwnX7',
    mint: 'https://chimikinz.nfts2.me',
  },
  nav: [
    { label: 'Oddlings', href: '/gallery' },
    { label: 'Quests', href: '/quests' },
    { label: 'Story', href: '/#story' },
    { label: 'Roadmap', href: '/#roadmap' },
  ],
} as const

export const stats = [
  { value: '2,222', label: 'Oddlings' },
  { value: '100%', label: 'Hand-drawn' },
  { value: 'APE', label: 'Chain' },
  { value: 'SOON', label: 'Mint' },
] as const

export const marqueeItems = [
  'MINT COMING SOON',
  '2,222 ODDLINGS',
  'BUILT ON APECHAIN',
  'ONE CHARM EACH',
  'NO TWO ALIKE',
  'CATCH THE LUCK',
] as const

export const roadmap = [
  {
    phase: 'Phase 01',
    title: 'The Scribble',
    status: 'done',
    body: 'Every oddling drawn by hand — no generator, no filler. 2,222 charms sketched, inked and named.',
  },
  {
    phase: 'Phase 02',
    title: 'Polish the Charm',
    status: 'active',
    body: 'Traits balanced, lore written, the terminal built. Quests go live so early oddlings get rewarded first.',
  },
  {
    phase: 'Phase 03',
    title: 'Share the Luck',
    status: 'next',
    body: 'Mint opens on ApeChain. Holders get the charm ledger, community drops and a say in what comes next.',
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
    body: 'Runs the community, the quests and the noise.',
  },
] as const
