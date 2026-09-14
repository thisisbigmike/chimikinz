import { PixelLink } from '@/components/pixel/pixel-button'
import { site } from '@/lib/site'

/**
 * The "Mint on Ethereum" call to action. The mint is live, so the slab goes
 * straight to `site.links.mint` on OpenSea in a new tab.
 */
export function MintButton({ className }: { className?: string }) {
  return (
    <PixelLink href={site.links.mint} external size="lg" className={className}>
      Mint on {site.chain}
    </PixelLink>
  )
}
