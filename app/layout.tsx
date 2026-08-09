import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'

const pixelDisplay = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const pixelBody = VT323({
  weight: '400',
  subsets: ['latin'],
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
    title: 'Chimikinz — 2,222 Lucky Oddlings',
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

import { UserProvider } from '@/lib/context/user-context'

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f0601c',
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
        <UserProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </UserProvider>
      </body>
    </html>
  )
}
