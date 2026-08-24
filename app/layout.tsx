import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

/**
 * Press Start 2P and VT323, self-hosted from app/fonts.
 *
 * These were previously fetched from Google Fonts at build time, but that
 * loader has a short timeout and would silently fall back to Courier New
 * whenever the network was slow — which quietly broke the whole look.
 * Serving the woff2 files ourselves makes the typefaces deterministic.
 */
const pixelDisplay = localFont({
  src: './fonts/press-start-2p-latin.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-display',
  display: 'swap',
})

const pixelBody = localFont({
  src: './fonts/vt323-latin.woff2',
  weight: '400',
  style: 'normal',
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Chimikinz',
    template: '%s · Chimikinz',
  },
  description:
    'Chimikinz is a collection of 4,444 hand-drawn oddlings, each carrying a charm of its own. Collect one, catch the luck.',
  generator: 'v0.app',
  keywords: ['Chimikinz', 'oddlings', 'Ethereum', 'ETH', 'NFT', 'pixel', 'collection'],
  openGraph: {
    title: 'Chimikinz',
    description:
      'Hand-drawn oddlings, each carrying a charm of its own. Collect one, catch the luck.',
    type: 'website',
    siteName: 'Chimikinz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chimikinz — 4,444 Lucky Oddlings',
    description: 'Hand-drawn oddlings, each carrying a charm of its own.',
    creator: '@chimikinzzz',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

import { FavoritesProvider } from '@/lib/context/favorites-context'
import { ScrollToTopHands } from '@/components/scroll-to-top-hands'

export const viewport: Viewport = {
  // The tokens in globals.css theme themselves with light-dark(), so the
  // document has to advertise both schemes or the browser pins it light.
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff6e5' },
    { media: '(prefers-color-scheme: dark)', color: '#141416' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`bg-background ${pixelDisplay.variable} ${pixelBody.variable}`}
    >
      <body className="antialiased">
        <FavoritesProvider>
          {children}
          <ScrollToTopHands />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </FavoritesProvider>
      </body>
    </html>
  )
}
