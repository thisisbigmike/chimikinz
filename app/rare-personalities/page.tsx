import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Rare Personalities',
}

export default function RarePersonalitiesPage() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      {/* Intentionally empty — content to come. */}
      <main className="min-h-[50vh]" />

      <SiteFooter />
    </div>
  )
}
