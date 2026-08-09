'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Wallet, Globe, KeyRound, Zap, ShieldCheck, Mail, MessageSquare } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { PixelSparkles } from '@/components/pixel-sparkles'
import { ScrollReveal } from '@/components/scroll-reveal'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'

type UserSession = {
  address: string
  method: string
  connectedAt: string
  oddlingsCount: number
}

export default function SignInPage() {
  const [session, setSession] = useState<UserSession | null>(null)
  const [loadingMethod, setLoadingMethod] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'wallet' | 'social'>('wallet')
  const [emailInput, setEmailInput] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('chimikinz_user_session')
    if (saved) {
      try {
        setSession(JSON.parse(saved))
      } catch {
        // Fallback
      }
    }
  }, [])

  const handleConnectWallet = async (providerName: string) => {
    setLoadingMethod(providerName)

    try {
      let walletAddress = ''

      // Attempt browser Web3 wallet if available (e.g. MetaMask)
      if (typeof window !== 'undefined' && (window as any).ethereum && providerName === 'MetaMask') {
        const accounts = await (window as any).ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts && accounts[0]) {
          walletAddress = accounts[0]
        }
      }

      // Fallback generated realistic address if extension not present
      if (!walletAddress) {
        await new Promise((res) => setTimeout(res, 900))
        const randomHex = Array.from({ length: 8 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join('')
        walletAddress = `0x71C9${randomHex.toUpperCase()}4f9A`
      }

      const newSession: UserSession = {
        address: walletAddress,
        method: providerName,
        connectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        oddlingsCount: 1, // verified holder demo
      }

      localStorage.setItem('chimikinz_user_session', JSON.stringify(newSession))
      setSession(newSession)
    } catch (err) {
      console.error('Wallet connect error:', err)
    } finally {
      setLoadingMethod(null)
    }
  }

  const handleSocialLogin = async (socialName: string) => {
    setLoadingMethod(socialName)
    await new Promise((res) => setTimeout(res, 800))

    const handle = socialName === 'Discord' ? 'OddlingSeeker#2222' : '@oddling_collector'
    const newSession: UserSession = {
      address: handle,
      method: socialName,
      connectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      oddlingsCount: 0,
    }

    localStorage.setItem('chimikinz_user_session', JSON.stringify(newSession))
    setSession(newSession)
    setLoadingMethod(null)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput || !emailInput.includes('@')) return
    setEmailSent(true)
    setTimeout(() => {
      const newSession: UserSession = {
        address: emailInput,
        method: 'Email',
        connectedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        oddlingsCount: 0,
      }
      localStorage.setItem('chimikinz_user_session', JSON.stringify(newSession))
      setSession(newSession)
      setEmailSent(false)
    }, 1200)
  }

  const handleDisconnect = () => {
    localStorage.removeItem('chimikinz_user_session')
    setSession(null)
  }

  const copyAddress = () => {
    if (!session) return
    navigator.clipboard.writeText(session.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground flex flex-col justify-between relative overflow-hidden">
      <SiteHeader />
      <PixelSparkles count={20} speed={0.7} />

      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center gap-8 relative z-10">
        <ScrollReveal variant="fade-up">
          <SectionHeading
            align="center"
            eyebrow="Oddling Terminal Checkpoint"
            title={session ? 'Terminal Authorized' : 'Connect Your Terminal'}
            body={
              session
                ? 'Your session is active. Access your holder perks, daily luck, and community rewards.'
                : 'Sign in with your Web3 wallet or social profile to unlock the Chimikinz Nest.'
            }
          />
        </ScrollReveal>

        {session ? (
          /* CONNECTED STATE */
          <ScrollReveal variant="scale-up" delay={100}>
            <div className="pixel-box-lg bg-card p-6 sm:p-10 flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-4 border-foreground pb-6">
                <div className="flex items-center gap-4">
                  <div className="relative size-16 bg-secondary border-4 border-foreground grid place-items-center">
                    <Image
                      src="/chimikinz/oddling-1.png"
                      alt="Oddling Guard"
                      fill
                      className="pixel-float object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-display text-[10px] uppercase text-muted-foreground">
                      Authorized Identity ({session.method})
                    </span>
                    <span className="font-display text-lg sm:text-xl text-primary">
                      {session.address.length > 20
                        ? `${session.address.slice(0, 6)}...${session.address.slice(-4)}`
                        : session.address}
                    </span>
                  </div>
                </div>

                <PixelTag className="bg-accent text-accent-foreground">
                  Terminal Online ({session.connectedAt})
                </PixelTag>
              </div>

              {/* Status Grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="pixel-box-sm bg-background p-4 flex flex-col gap-1 text-center">
                  <span className="font-display text-[9px] uppercase text-muted-foreground">
                    Verified Network
                  </span>
                  <span className="font-display text-sm uppercase text-foreground">
                    {site.chain} Mainnet
                  </span>
                </div>

                <div className="pixel-box-sm bg-background p-4 flex flex-col gap-1 text-center">
                  <span className="font-display text-[9px] uppercase text-muted-foreground">
                    Oddlings In Wallet
                  </span>
                  <span className="font-display text-sm uppercase text-primary">
                    {session.oddlingsCount > 0
                      ? `${session.oddlingsCount} Oddling Held`
                      : '0 Oddlings'}
                  </span>
                </div>

                <div className="pixel-box-sm bg-background p-4 flex flex-col gap-1 text-center">
                  <span className="font-display text-[9px] uppercase text-muted-foreground">
                    Access Level
                  </span>
                  <span className="font-display text-sm uppercase text-accent">
                    {session.oddlingsCount > 0 ? 'Holder Priority' : 'Community Member'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-4 border-foreground">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/quests"
                    className="pixel-box-sm pixel-press bg-primary text-primary-foreground px-5 py-3 font-display text-xs uppercase"
                  >
                    Go to Quests &rarr;
                  </Link>
                  <Link
                    href="/gallery"
                    className="pixel-box-sm pixel-press bg-background text-foreground px-5 py-3 font-display text-xs uppercase hover:bg-muted"
                  >
                    Inspect Gallery
                  </Link>
                  <button
                    type="button"
                    onClick={copyAddress}
                    className="pixel-box-sm pixel-press bg-secondary text-secondary-foreground px-4 py-3 font-display text-xs uppercase"
                  >
                    {copied ? 'Copied' : 'Copy Address'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="pixel-box-sm pixel-press bg-destructive text-destructive-foreground px-4 py-3 font-display text-xs uppercase"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* UNCONNECTED SIGN-IN OPTIONS */
          <ScrollReveal variant="scale-up" delay={100}>
            <div className="pixel-box-lg bg-card p-6 sm:p-10 flex flex-col gap-8">
              {/* Tab Switcher */}
              <div className="flex border-4 border-foreground bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('wallet')}
                  className={cn(
                    'flex-1 py-3 font-display text-xs uppercase transition-all duration-200 flex items-center justify-center gap-2',
                    activeTab === 'wallet'
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Wallet className="size-4" /> Web3 Wallet
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('social')}
                  className={cn(
                    'flex-1 py-3 font-display text-xs uppercase transition-all duration-200 flex items-center justify-center gap-2',
                    activeTab === 'social'
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <Globe className="size-4" /> Social / Email
                </button>
              </div>

              {activeTab === 'wallet' ? (
                /* WALLET OPTIONS */
                <div className="flex flex-col gap-4">
                  <p className="text-xl text-muted-foreground text-center">
                    Connect your Ethereum wallet to verify your oddling balance and claim priority mint access.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2 mt-2">
                    {[
                      { name: 'MetaMask', icon: Wallet, desc: 'Browser Extension & Mobile' },
                      { name: 'WalletConnect', icon: Zap, desc: 'Scan with Any Mobile App' },
                      { name: 'Coinbase Wallet', icon: ShieldCheck, desc: 'Coinbase App & SDK' },
                      { name: 'Ethereum Passkey', icon: KeyRound, desc: 'Passkey & Hardware Keys' },
                    ].map((w) => {
                      const IconComponent = w.icon
                      return (
                        <button
                          key={w.name}
                          type="button"
                          onClick={() => handleConnectWallet(w.name)}
                          disabled={loadingMethod !== null}
                          className="pixel-box-sm pixel-press bg-background p-5 flex items-center gap-4 text-left transition-all hover:bg-secondary/40 disabled:opacity-50"
                        >
                          <div className="size-10 border-2 border-foreground bg-secondary/30 grid place-items-center shrink-0">
                            <IconComponent className="size-5 text-foreground" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-display text-sm uppercase text-foreground">
                              {w.name}
                            </span>
                            <span className="text-lg text-muted-foreground leading-tight">
                              {w.desc}
                            </span>
                          </div>
                          {loadingMethod === w.name && (
                            <span className="ml-auto font-display text-xs uppercase text-primary animate-pulse">
                              Connecting...
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* SOCIAL & EMAIL OPTIONS */
                <div className="flex flex-col gap-6">
                  <p className="text-xl text-muted-foreground text-center">
                    No wallet yet? Sign in with your social account or email to start earning Charm Points.
                  </p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('Discord')}
                      disabled={loadingMethod !== null}
                      className="pixel-box-sm pixel-press bg-[#5865F2] text-white p-4 flex items-center justify-center gap-3 font-display text-xs uppercase hover:opacity-90 disabled:opacity-50"
                    >
                      <MessageSquare className="size-4" /> Continue with Discord
                      {loadingMethod === 'Discord' && '...'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialLogin('X (Twitter)')}
                      disabled={loadingMethod !== null}
                      className="pixel-box-sm pixel-press bg-foreground text-background p-4 flex items-center justify-center gap-3 font-display text-xs uppercase hover:opacity-90 disabled:opacity-50"
                    >
                      <svg className="size-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      Continue with X
                      {loadingMethod === 'X (Twitter)' && '...'}
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center border-t-4 border-foreground my-2">
                    <span className="bg-card px-4 font-display text-xs uppercase text-muted-foreground relative -top-3">
                      Or Email Magic Link
                    </span>
                  </div>

                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email address..."
                        required
                        className="w-full border-4 border-foreground bg-background pl-10 pr-4 py-3 font-display text-xs focus:outline-none focus:ring-4 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={emailSent}
                      className="pixel-box-sm pixel-press bg-primary text-primary-foreground px-6 py-3 font-display text-xs uppercase disabled:opacity-50"
                    >
                      {emailSent ? 'Sending Link...' : 'Send Magic Link'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
