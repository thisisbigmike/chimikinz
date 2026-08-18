import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Hero } from '@/components/sections/hero'
import { CloverCoveBanner } from '@/components/sections/clover-cove-banner'
import { Lore } from '@/components/sections/lore'
import { MeetTheChimis } from '@/components/sections/meet-the-chimis'
import { EntryTiles } from '@/components/sections/entry-tiles'
import { FeaturedOddlings } from '@/components/sections/featured-oddlings'
import { ArtWall } from '@/components/sections/art-wall'
import { Story } from '@/components/sections/story'
import { OnChain } from '@/components/sections/on-chain'
import { Roadmap } from '@/components/sections/roadmap'
import { Team } from '@/components/sections/team'
import { TheBeginning } from '@/components/sections/the-beginning'
import { Cta } from '@/components/sections/cta'

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <CloverCoveBanner />
        <Lore />
        <MeetTheChimis />
        <EntryTiles />
        <FeaturedOddlings />
        <ArtWall />
        <Story />
        <OnChain />
        <Roadmap />
        <Team />
        <TheBeginning />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}

