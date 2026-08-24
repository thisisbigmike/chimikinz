import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelMarquee } from '@/components/pixel/pixel-marquee'
import { Hero } from '@/components/sections/hero'
import { CloverCoveBanner } from '@/components/sections/clover-cove-banner'
import { Lore } from '@/components/sections/lore'
import { MeetTheChimis } from '@/components/sections/meet-the-chimis'
import { MotionShowcase } from '@/components/sections/motion-showcase'
import { FeaturedArt } from '@/components/sections/featured-art'
import { LatestDiscovery } from '@/components/sections/latest-discovery'
import { SocialLinks } from '@/components/sections/social-links'
import { Cta } from '@/components/sections/cta'
import { marqueeItems } from '@/lib/site'

/**
 * The way in to Clover Cove. Reads as a place rather than a pitch:
 * arrive → what this is → the world → who lives there → what it looks
 * like moving → the art → what turned up this week → come in.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <CloverCoveBanner />
        <Lore />
        <PixelMarquee items={marqueeItems} />
        <MeetTheChimis />
        <MotionShowcase />
        <FeaturedArt />
        <LatestDiscovery />
        <SocialLinks />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}
