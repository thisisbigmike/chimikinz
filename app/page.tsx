import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelMarquee } from '@/components/pixel/pixel-marquee'
import { Hero } from '@/components/sections/hero'
import { EntryTiles } from '@/components/sections/entry-tiles'
import { FeaturedOddlings } from '@/components/sections/featured-oddlings'
import { Story } from '@/components/sections/story'
import { OnChain } from '@/components/sections/on-chain'
import { Roadmap } from '@/components/sections/roadmap'
import { Team } from '@/components/sections/team'
import { Cta } from '@/components/sections/cta'
import { marqueeItems } from '@/lib/site'

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />
      <PixelMarquee items={marqueeItems} tone="gold" />
      <main>
        <Hero />
        <EntryTiles />
        <FeaturedOddlings />
        <Story />
        <PixelMarquee
          items={[
            'HAND-DRAWN ART',
            '2,222 CHARMS',
            'APECHAIN NATIVE',
            'NO TWO ALIKE',
            'CHARM LEDGER',
            'JOIN THE NEST',
          ]}
          tone="ink"
        />
        <OnChain />
        <Roadmap />
        <Team />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}

