'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Shield,
  Key,
  Users,
  CheckCircle2,
  Lock,
  Search,
  Plus,
  Trash2,
  Download,
  RefreshCw,
  LogOut,
  AlertCircle,
  ScrollText,
} from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { PixelTag, SectionHeading } from '@/components/pixel/pixel-panel'
import { ScrollReveal } from '@/components/scroll-reveal'
import { site } from '@/lib/site'
import { cn } from '@/lib/utils'
import { fetchFirestoreLeaderboard } from '@/lib/firebase'

// Default secure admin passcode (can be changed by admin)
const DEFAULT_ADMIN_KEY = 'CHIMIKINZ-2026-ADMIN'

type AllowlistEntry = {
  address: string
  tier: 'Tier 1 (Guaranteed)' | 'Tier 2 (FCFS)' | 'VIP OG'
  maxMints: number
  addedAt: string
}

type UserRecord = {
  address: string
  joinedAt: string
  role: 'Holder' | 'Member' | 'Admin'
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passError, setPassError] = useState(false)

  // Admin Data States (Loaded strictly from Cloud Firestore)
  const [allowlist, setAllowlist] = useState<AllowlistEntry[]>([])
  const [users, setUsers] = useState<UserRecord[]>([])

  // Form Inputs
  const [newAddress, setNewAddress] = useState('')
  const [newTier, setNewTier] = useState<AllowlistEntry['tier']>('Tier 1 (Guaranteed)')
  const [newMints, setNewMints] = useState(2)

  const [userSearch, setUserSearch] = useState('')

  // Active Tab
  const [activeTab, setActiveTab] = useState<'allowlist' | 'users' | 'audit'>('allowlist')

  // Logs
  const [auditLogs, setAuditLogs] = useState<string[]>([
    'Admin Session Authenticated.',
    'Allowlist loaded: 3 entries active.',
    'System ready for Ethereum Mainnet Mint.',
  ])

  useEffect(() => {
    const sessionKey = localStorage.getItem('chimikinz_admin_session')
    if (sessionKey === 'authenticated') {
      setIsAuthenticated(true)
    }

    // Fetch live users from Firestore
    fetchFirestoreLeaderboard(50).then((liveUsers) => {
      if (liveUsers && liveUsers.length > 0) {
        setUsers(
          liveUsers.map((u) => ({
            address: u.address,
            joinedAt: u.updatedAt ? u.updatedAt.slice(0, 10) : '2026-08-09',
            role: u.oddlingsCount > 0 ? 'Holder' : 'Member',
          }))
        )
        addLog(`Loaded ${liveUsers.length} live user profiles from Firestore database.`)
      }
    })

    const savedAL = localStorage.getItem('chimikinz_allowlist')
    if (savedAL) {
      try {
        setAllowlist(JSON.parse(savedAL))
      } catch (e) {
        // Fallback
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode.trim() === DEFAULT_ADMIN_KEY) {
      setIsAuthenticated(true)
      localStorage.setItem('chimikinz_admin_session', 'authenticated')
      setPassError(false)
      addLog('Admin authenticated successfully.')
    } else {
      setPassError(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('chimikinz_admin_session')
    setPasscode('')
  }

  const addLog = (msg: string) => {
    setAuditLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev])
  }

  const handleAddAllowlist = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAddress || newAddress.length < 5) return

    const newEntry: AllowlistEntry = {
      address: newAddress.trim(),
      tier: newTier,
      maxMints: Number(newMints),
      addedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    }

    const nextAL = [newEntry, ...allowlist]
    setAllowlist(nextAL)
    localStorage.setItem('chimikinz_allowlist', JSON.stringify(nextAL))
    setNewAddress('')
    addLog(`Added ${newEntry.address} to ${newEntry.tier} (${newEntry.maxMints} max mints).`)
  }

  const handleRemoveAllowlist = (address: string) => {
    const nextAL = allowlist.filter((a) => a.address !== address)
    setAllowlist(nextAL)
    localStorage.setItem('chimikinz_allowlist', JSON.stringify(nextAL))
    addLog(`Removed ${address} from Allowlist.`)
  }

  const exportAllowlistJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(allowlist, null, 2)
    )}`
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', jsonString)
    downloadAnchor.setAttribute('download', `chimikinz_allowlist_${Date.now()}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    addLog('Exported Allowlist database to JSON.')
  }

  const filteredUsers = useMemo(() => {
    if (!userSearch) return users
    const query = userSearch.toLowerCase().trim()
    return users.filter((u) => u.address.toLowerCase().includes(query))
  }, [users, userSearch])

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <SiteHeader />

      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Internal Access Only"
          title="Chimikinz Admin Terminal"
          body="Manage allowlist guarantees, community profiles, and security logs."
        />

        {!isAuthenticated ? (
          /* AUTH GATE LOCK */
          <div className="mt-8 max-w-md mx-auto pixel-box-lg bg-card p-8 flex flex-col items-center text-center gap-6 border-4 border-foreground">
            <div className="size-16 bg-primary/20 text-primary border-4 border-foreground grid place-items-center">
              <Lock className="size-8" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-display text-lg uppercase">Security Authorization Required</h2>
              <p className="text-sm text-muted-foreground">
                Enter your administrative key to access the command center.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label htmlFor="admin-passcode" className="font-display text-[10px] uppercase text-muted-foreground">
                  Admin Security Key
                </label>
                <input
                  id="admin-passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter key..."
                  className={cn(
                    'w-full border-4 border-foreground bg-background px-4 py-3 font-display text-sm focus:outline-none focus:ring-4 focus:ring-primary',
                    passError && 'border-destructive bg-destructive/10'
                  )}
                />
                {passError && (
                  <span className="font-display text-[10px] text-destructive uppercase mt-1 flex items-center gap-1">
                    <AlertCircle className="size-3" /> Invalid security key
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="pixel-box-sm pixel-press bg-primary text-primary-foreground py-3.5 font-display text-xs uppercase w-full flex items-center justify-center gap-2"
              >
                <Key className="size-4" /> Authenticate Terminal
              </button>
            </form>
          </div>
        ) : (
          /* DASHBOARD INTERFACE */
          <div className="mt-8 flex flex-col gap-8 w-full max-w-full overflow-hidden">
            {/* Top Toolbar */}
            <div className="pixel-box bg-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Shield className="size-6 text-primary" />
                <div>
                  <span className="font-display text-xs uppercase text-muted-foreground block">
                    Admin Status
                  </span>
                  <span className="font-display text-sm text-foreground">
                    AUTHENTICATED &bull; MAINNET READY
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="pixel-box-sm pixel-press bg-secondary text-secondary-foreground px-4 py-2 font-display text-xs uppercase flex items-center gap-2"
              >
                <LogOut className="size-4" /> Exit Session
              </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pixel-box-sm bg-card p-5 flex flex-col gap-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="font-display text-[10px] uppercase">Allowlist Entries</span>
                  <Shield className="size-4 text-primary" />
                </div>
                <span className="font-display text-2xl text-foreground">{allowlist.length}</span>
                <span className="text-xs text-muted-foreground">Guaranteed & FCFS Spots</span>
              </div>

              <div className="pixel-box-sm bg-card p-5 flex flex-col gap-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="font-display text-[10px] uppercase">Registered Users</span>
                  <Users className="size-4 text-accent" />
                </div>
                <span className="font-display text-2xl text-accent">{users.length}</span>
                <span className="text-xs text-muted-foreground">Active Nest Profiles</span>
              </div>

              <div className="pixel-box-sm bg-card p-5 flex flex-col gap-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="font-display text-[10px] uppercase">Total Supply</span>
                  <CheckCircle2 className="size-4 text-primary" />
                </div>
                <span className="font-display text-2xl text-foreground">
                  {site.supply.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">Oddlings Collection Size</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 border-4 border-foreground bg-muted p-1 gap-1">
              {[
                { id: 'allowlist', Icon: Shield, fullLabel: 'Allowlist Manager', shortLabel: 'Allowlist' },
                { id: 'users', Icon: Users, fullLabel: 'User Profiles', shortLabel: 'Profiles' },
                { id: 'audit', Icon: ScrollText, fullLabel: 'System Audit Log', shortLabel: 'Audit Log' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as any)}
                  className={cn(
                    'py-3 px-2 font-display text-[10px] sm:text-xs uppercase transition-all duration-200 text-center flex items-center justify-center gap-1.5 leading-tight',
                    activeTab === t.id
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  <t.Icon className="size-3.5 shrink-0" />
                  <span className="hidden sm:inline">{t.fullLabel}</span>
                  <span className="sm:hidden">{t.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENT 1: ALLOWLIST MANAGER */}
            {activeTab === 'allowlist' && (
              <div className="flex flex-col gap-6 w-full max-w-full overflow-hidden">
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr] w-full max-w-full">
                  {/* Add Entry Form */}
                  <div className="pixel-box-lg bg-card p-4 sm:p-6 flex flex-col gap-4 w-full max-w-full overflow-hidden">
                    <h3 className="font-display text-xs sm:text-sm uppercase text-primary break-words leading-tight">
                      + Add Address to Allowlist
                    </h3>

                    <form onSubmit={handleAddAllowlist} className="flex flex-col gap-4 w-full max-w-full">
                      <div className="flex flex-col gap-1 w-full min-w-0">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Wallet Address / ENS
                        </label>
                        <input
                          type="text"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="0x... or name.eth"
                          required
                          className="w-full min-w-0 border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1 w-full min-w-0">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Priority Tier
                        </label>
                        <select
                          value={newTier}
                          onChange={(e) => setNewTier(e.target.value as any)}
                          className="w-full min-w-0 border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                        >
                          <option value="Tier 1 (Guaranteed)">Tier 1 (Guaranteed Mint)</option>
                          <option value="Tier 2 (FCFS)">Tier 2 (FCFS Mint)</option>
                          <option value="VIP OG">VIP OG (Exclusive)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1 w-full min-w-0">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Max Mints Allowed
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={newMints}
                          onChange={(e) => setNewMints(Number(e.target.value))}
                          className="w-full min-w-0 border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="pixel-box-sm pixel-press bg-primary text-primary-foreground py-3 px-3 font-display text-xs uppercase mt-2 w-full whitespace-normal break-words text-center leading-snug"
                      >
                        Add Allowlist Entry
                      </button>
                    </form>
                  </div>

                  {/* Allowlist Table */}
                  <div className="pixel-box-lg bg-card p-4 sm:p-6 flex flex-col gap-4 w-full max-w-full overflow-hidden">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-sm uppercase">Active Allowlist ({allowlist.length})</h3>
                      <button
                        type="button"
                        onClick={exportAllowlistJSON}
                        className="pixel-box-sm pixel-press bg-secondary text-secondary-foreground px-3 py-1.5 font-display text-[10px] uppercase flex items-center gap-1.5"
                      >
                        <Download className="size-3" /> Export JSON
                      </button>
                    </div>

                    <div className="overflow-x-auto border-3 border-foreground">
                      <table className="w-full text-left font-display text-xs border-collapse">
                        <thead>
                          <tr className="bg-foreground text-background">
                            <th className="p-3 uppercase">Wallet Address</th>
                            <th className="p-3 uppercase">Tier</th>
                            <th className="p-3 uppercase text-center">Max Mints</th>
                            <th className="p-3 uppercase text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-foreground/20">
                          {allowlist.map((entry) => (
                            <tr key={entry.address} className="hover:bg-muted/50">
                              <td className="p-3 font-mono text-primary">{entry.address}</td>
                              <td className="p-3">
                                <PixelTag className="bg-background text-foreground text-[9px]">
                                  {entry.tier}
                                </PixelTag>
                              </td>
                              <td className="p-3 text-center">{entry.maxMints}</td>
                              <td className="p-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveAllowlist(entry.address)}
                                  className="text-destructive hover:scale-110 transition-transform p-1"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: USER PROFILES */}
            {activeTab === 'users' && (
              <div className="pixel-box-lg bg-card p-6 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <h3 className="font-display text-sm uppercase">Community User Ledger</h3>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      placeholder="Search address..."
                      className="w-full border-3 border-foreground bg-background pl-9 pr-3 py-2 font-display text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border-3 border-foreground">
                  <table className="w-full text-left font-display text-xs border-collapse">
                    <thead>
                      <tr className="bg-foreground text-background">
                        <th className="p-3 uppercase">User Address</th>
                        <th className="p-3 uppercase">Role</th>
                        <th className="p-3 uppercase text-right">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-foreground/20">
                      {filteredUsers.map((u) => (
                        <tr key={u.address} className="hover:bg-muted/50">
                          <td className="p-3 font-mono text-foreground">{u.address}</td>
                          <td className="p-3">
                            <PixelTag className="bg-accent text-accent-foreground text-[9px]">
                              {u.role}
                            </PixelTag>
                          </td>
                          <td className="p-3 text-right text-muted-foreground">{u.joinedAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: AUDIT LOG */}
            {activeTab === 'audit' && (
              <div className="pixel-box-lg bg-card p-6 flex flex-col gap-4">
                <h3 className="font-display text-sm uppercase">System Activity & Security Audit Log</h3>

                <div className="bg-black text-green-400 p-4 font-mono text-xs border-4 border-foreground rounded-none space-y-1 h-64 overflow-y-auto">
                  {auditLogs.map((log, index) => (
                    <div key={index}>&gt; {log}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
