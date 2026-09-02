import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelMarquee } from '@/components/pixel/pixel-marquee'
import { Hero } from '@/components/sections/hero'
import { Lore } from '@/components/sections/lore'
import { MeetTheChimis } from '@/components/sections/meet-the-chimis'
import { MotionShowcase } from '@/components/sections/motion-showcase'
import { FeaturedArt } from '@/components/sections/featured-art'
import { SocialLinks } from '@/components/sections/social-links'
import { NightOutro } from '@/components/night-outro'
import { marqueeItems } from '@/lib/site'

/**
 * The way in to Clover Cove. Reads as a place rather than a pitch:
 * arrive → the world → who lives there → what it looks like moving →
 * the art → where to find us.
 *
 * `Hero` does the arriving and the what-this-is in one breath now: it
 * carries the welcome that used to sit in its own banner below it.
 *
 * The last of those and the footer are wrapped together: past `FeaturedArt`
 * the sun is down, and `NightOutro` paints the one sky they share.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Lore />
        <PixelMarquee items={marqueeItems} />
        <MeetTheChimis />
        <MotionShowcase />
        <FeaturedArt />
      </main>

      <NightOutro>
        <SocialLinks />
        <SiteFooter backdrop={false} />
      </NightOutro>
    </div>
  )
}
