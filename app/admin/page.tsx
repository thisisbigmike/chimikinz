'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Shield,
  Key,
  Users,
  Award,
  CheckCircle2,
  Lock,
  Search,
  Plus,
  Trash2,
  Download,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  LogOut,
  AlertCircle,
  FileSpreadsheet,
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
  points: number
  questsCompleted: number
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

  // Quests Management State
  const [quests, setQuests] = useState<
    {
      id: string
      title: string
      points: number
      category: 'Social' | 'Daily' | 'Lore' | 'Creative'
      description: string
      actionLabel: string
      actionUrl?: string
    }[]
  >([
    {
      id: 'x-follow',
      title: 'Follow @chimikinzzz on X',
      points: 150,
      category: 'Social',
      description: 'Keep up with daily hand-drawn previews and mint announcements.',
      actionLabel: 'Follow on X',
      actionUrl: site.links.x,
    },
    {
      id: 'discord-join',
      title: 'Join the Chimikinz Nest on Discord',
      points: 200,
      category: 'Social',
      description: 'Hang out with the creators, talk lore, and get early community drops.',
      actionLabel: 'Join Discord',
      actionUrl: site.links.discord,
    },
    {
      id: 'daily-checkin',
      title: 'Daily Charm Check-in',
      points: 50,
      category: 'Daily',
      description: 'Claim your daily dose of luck from the sketchbook.',
      actionLabel: 'Claim Luck',
    },
    {
      id: 'gallery-share',
      title: 'Inspect an Oddling in the Nest',
      points: 100,
      category: 'Creative',
      description: 'Browse the gallery and find an oddling whose charm speaks to you.',
      actionLabel: 'Open Gallery',
      actionUrl: '/gallery',
    },
    {
      id: 'lore-trivia',
      title: 'Answer the Charm Master Trivia',
      points: 250,
      category: 'Lore',
      description: 'Prove you know where the oddlings came from and how many total charms exist.',
      actionLabel: 'Take Quiz',
    },
  ])

  // New Quest Form Inputs
  const [qTitle, setQTitle] = useState('')
  const [qPoints, setQPoints] = useState(150)
  const [qCategory, setQCategory] = useState<'Social' | 'Daily' | 'Lore' | 'Creative'>('Social')
  const [qDesc, setQDesc] = useState('')
  const [qActionLabel, setQActionLabel] = useState('')
  const [qActionUrl, setQActionUrl] = useState('')

  // Form Inputs
  const [newAddress, setNewAddress] = useState('')
  const [newTier, setNewTier] = useState<AllowlistEntry['tier']>('Tier 1 (Guaranteed)')
  const [newMints, setNewMints] = useState(2)

  const [userSearch, setUserSearch] = useState('')
  const [pointsDelta, setPointsDelta] = useState<Record<string, number>>({})

  // Active Tab
  const [activeTab, setActiveTab] = useState<'allowlist' | 'users' | 'quests' | 'audit'>('allowlist')

  // Quest Toggle States
  const [questStatus, setQuestStatus] = useState<Record<string, boolean>>({
    'x-follow': true,
    'discord-join': true,
    'daily-checkin': true,
    'gallery-share': true,
    'lore-trivia': true,
  })

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
            points: u.points || 0,
            questsCompleted: u.completedQuests?.length || 0,
            joinedAt: u.updatedAt ? u.updatedAt.slice(0, 10) : '2026-08-09',
            role: u.oddlingsCount > 0 ? 'Holder' : 'Member',
          }))
        )
        addLog(`Loaded ${liveUsers.length} live user profiles from Firestore database.`)
      }
    })

    const savedQuests = localStorage.getItem('chimikinz_admin_quests')
    if (savedQuests) {
      try {
        setQuests(JSON.parse(savedQuests))
      } catch (e) {
        // Fallback
      }
    }

    const savedAL = localStorage.getItem('chimikinz_allowlist')
    if (savedAL) {
      try {
        setAllowlist(JSON.parse(savedAL))
      } catch (e) {
        // Fallback
      }
    }
  }, [])

  const handleAddQuest = (e: React.FormEvent) => {
    e.preventDefault()
    if (!qTitle || !qDesc || !qActionLabel) return

    const newQuest = {
      id: `quest-${Date.now()}`,
      title: qTitle.trim(),
      points: Number(qPoints),
      category: qCategory,
      description: qDesc.trim(),
      actionLabel: qActionLabel.trim(),
      actionUrl: qActionUrl.trim() || undefined,
    }

    const nextQuests = [...quests, newQuest]
    setQuests(nextQuests)
    localStorage.setItem('chimikinz_admin_quests', JSON.stringify(nextQuests))

    // Reset Form
    setQTitle('')
    setQPoints(150)
    setQDesc('')
    setQActionLabel('')
    setQActionUrl('')

    addLog(`Published new Quest "${newQuest.title}" (+${newQuest.points} PTS).`)
  }

  const handleDeleteQuest = (id: string) => {
    const target = quests.find((q) => q.id === id)
    const nextQuests = quests.filter((q) => q.id !== id)
    setQuests(nextQuests)
    localStorage.setItem('chimikinz_admin_quests', JSON.stringify(nextQuests))
    addLog(`Deleted Quest "${target?.title || id}".`)
  }

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

  const handleAwardPoints = (address: string, amount: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.address === address ? { ...u, points: Math.max(0, u.points + amount) } : u))
    )
    addLog(`Adjusted points for ${address} by ${amount > 0 ? '+' : ''}${amount} PTS.`)
  }

  const toggleQuest = (questId: string) => {
    setQuestStatus((prev) => {
      const next = { ...prev, [questId]: !prev[questId] }
      addLog(`Toggled quest ${questId} -> ${next[questId] ? 'ACTIVE' : 'PAUSED'}.`)
      return next
    })
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
    addLog('Exported Allowlist JSON file.')
  }

  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase().trim()
    if (!q) return users
    return users.filter((u) => u.address.toLowerCase().includes(q))
  }, [users, userSearch])

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground flex flex-col justify-between">
      <SiteHeader />

      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1 flex flex-col gap-8">
        {!isAuthenticated ? (
          /* SECURE PASSCODE CHALLENGE MODAL */
          <div className="max-w-md mx-auto w-full py-12">
            <ScrollReveal variant="scale-up">
              <div className="pixel-box-lg bg-card p-8 flex flex-col items-center text-center gap-6">
                <div className="size-16 border-4 border-foreground bg-primary grid place-items-center">
                  <Shield className="size-8 text-primary-foreground" />
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-xl uppercase tracking-tight text-foreground">
                    Admin Terminal Protection
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Enter the master access passphrase to unlock the Chimikinz Admin Terminal.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                      type="password"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter Master Admin Passcode..."
                      required
                      className="w-full border-4 border-foreground bg-background pl-10 pr-4 py-3 font-display text-xs focus:outline-none focus:ring-4 focus:ring-primary"
                    />
                  </div>

                  {passError && (
                    <div className="flex items-center justify-center gap-2 text-destructive font-display text-xs uppercase">
                      <AlertCircle className="size-4" /> Invalid Admin Passcode
                    </div>
                  )}

                  <button
                    type="submit"
                    className="pixel-box-sm pixel-press bg-primary text-primary-foreground py-3.5 font-display text-xs uppercase"
                  >
                    Authenticate Terminal &rarr;
                  </button>
                </form>

                <p className="text-xs text-muted-foreground border-t-2 border-foreground/20 pt-4">
                  Default Passcode: <code className="text-primary font-mono">{DEFAULT_ADMIN_KEY}</code>
                </p>
              </div>
            </ScrollReveal>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-foreground pb-6">
              <div>
                <PixelTag className="bg-primary text-primary-foreground mb-2">
                  ✦ Master Security Access Active
                </PixelTag>
                <h1 className="font-display text-2xl sm:text-3xl uppercase">
                  Chimikinz Admin Control Center
                </h1>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="pixel-box-sm pixel-press bg-destructive text-destructive-foreground px-4 py-2 font-display text-xs uppercase flex items-center gap-2"
              >
                <LogOut className="size-4" /> Lock Terminal
              </button>
            </div>

            {/* Overview Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="pixel-box-sm bg-card p-5 flex flex-col gap-1">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="font-display text-[10px] uppercase">Allowlist Entries</span>
                  <Shield className="size-4 text-primary" />
                </div>
                <span className="font-display text-2xl text-foreground">{allowlist.length}</span>
                <span className="text-xs text-muted-foreground">Ethereum Mainnet</span>
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
                  <span className="font-display text-[10px] uppercase">Total Points Distributed</span>
                  <Award className="size-4 text-secondary-foreground" />
                </div>
                <span className="font-display text-2xl text-primary">
                  {users.reduce((sum, u) => sum + u.points, 0).toLocaleString()} PTS
                </span>
                <span className="text-xs text-muted-foreground">Across All Quests</span>
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
            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-4 border-foreground bg-muted p-1 gap-1">
              {[
                { id: 'allowlist', icon: '🛡️', fullLabel: 'Allowlist Manager', shortLabel: 'Allowlist' },
                { id: 'users', icon: '👥', fullLabel: 'User Profiles & Points', shortLabel: 'Profiles' },
                { id: 'quests', icon: '⚡', fullLabel: 'Quest Controllers', shortLabel: 'Quests' },
                { id: 'audit', icon: '📜', fullLabel: 'System Audit Log', shortLabel: 'Audit Log' },
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
                  <span className="shrink-0">{t.icon}</span>
                  <span className="hidden sm:inline">{t.fullLabel}</span>
                  <span className="sm:hidden">{t.shortLabel}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENT 1: ALLOWLIST MANAGER */}
            {activeTab === 'allowlist' && (
              <div className="flex flex-col gap-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                  {/* Add Entry Form */}
                  <div className="pixel-box-lg bg-card p-6 flex flex-col gap-4">
                    <h3 className="font-display text-sm uppercase text-primary">
                      + Add Address to Allowlist
                    </h3>

                    <form onSubmit={handleAddAllowlist} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Wallet Address / ENS
                        </label>
                        <input
                          type="text"
                          value={newAddress}
                          onChange={(e) => setNewAddress(e.target.value)}
                          placeholder="0x... or name.eth"
                          required
                          className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Priority Tier
                        </label>
                        <select
                          value={newTier}
                          onChange={(e) => setNewTier(e.target.value as any)}
                          className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                        >
                          <option value="Tier 1 (Guaranteed)">Tier 1 (Guaranteed Mint)</option>
                          <option value="Tier 2 (FCFS)">Tier 2 (FCFS Mint)</option>
                          <option value="VIP OG">VIP OG (Exclusive)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Max Mints Allowed
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={10}
                          value={newMints}
                          onChange={(e) => setNewMints(Number(e.target.value))}
                          className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="pixel-box-sm pixel-press bg-primary text-primary-foreground py-3 font-display text-xs uppercase mt-2"
                      >
                        Add Allowlist Entry
                      </button>
                    </form>
                  </div>

                  {/* Allowlist Table */}
                  <div className="pixel-box-lg bg-card p-6 flex flex-col gap-4">
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

            {/* TAB CONTENT 2: USER PROFILES & POINTS */}
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
                      placeholder="Search address or handle..."
                      className="w-full border-3 border-foreground bg-background pl-9 pr-3 py-2 font-display text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto border-3 border-foreground">
                  <table className="w-full text-left font-display text-xs border-collapse">
                    <thead>
                      <tr className="bg-foreground text-background">
                        <th className="p-3 uppercase">User Identity</th>
                        <th className="p-3 uppercase">Role</th>
                        <th className="p-3 uppercase text-center">Quests</th>
                        <th className="p-3 uppercase text-center">Charm Points</th>
                        <th className="p-3 uppercase text-right">Adjust Points</th>
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
                          <td className="p-3 text-center">{u.questsCompleted} Completed</td>
                          <td className="p-3 text-center text-primary font-bold">✦ {u.points} PTS</td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleAwardPoints(u.address, 100)}
                                className="pixel-box-sm bg-accent text-accent-foreground px-2 py-1 font-display text-[9px] uppercase hover:scale-105"
                              >
                                +100 PTS
                              </button>
                              <button
                                type="button"
                                onClick={() => handleAwardPoints(u.address, -50)}
                                className="pixel-box-sm bg-destructive text-destructive-foreground px-2 py-1 font-display text-[9px] uppercase hover:scale-105"
                              >
                                -50 PTS
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: QUEST CONTROLLERS */}
            {activeTab === 'quests' && (
              <div className="flex flex-col gap-6">
                <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
                  {/* Add Quest Form */}
                  <div className="pixel-box-lg bg-card p-6 flex flex-col gap-4">
                    <h3 className="font-display text-sm uppercase text-primary">
                      + Add New Quest
                    </h3>

                    <form onSubmit={handleAddQuest} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Quest Title
                        </label>
                        <input
                          type="text"
                          value={qTitle}
                          onChange={(e) => setQTitle(e.target.value)}
                          placeholder="e.g. Retweet Teaser Post"
                          required
                          className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-display text-[10px] uppercase text-muted-foreground">
                            Reward Points
                          </label>
                          <input
                            type="number"
                            min={10}
                            max={1000}
                            value={qPoints}
                            onChange={(e) => setQPoints(Number(e.target.value))}
                            required
                            className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-display text-[10px] uppercase text-muted-foreground">
                            Category
                          </label>
                          <select
                            value={qCategory}
                            onChange={(e) => setQCategory(e.target.value as any)}
                            className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                          >
                            <option value="Social">Social</option>
                            <option value="Daily">Daily</option>
                            <option value="Lore">Lore</option>
                            <option value="Creative">Creative</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="font-display text-[10px] uppercase text-muted-foreground">
                          Description
                        </label>
                        <input
                          type="text"
                          value={qDesc}
                          onChange={(e) => setQDesc(e.target.value)}
                          placeholder="Short task instructions..."
                          required
                          className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-display text-[10px] uppercase text-muted-foreground">
                            Button Label
                          </label>
                          <input
                            type="text"
                            value={qActionLabel}
                            onChange={(e) => setQActionLabel(e.target.value)}
                            placeholder="e.g. Retweet on X"
                            required
                            className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="font-display text-[10px] uppercase text-muted-foreground">
                            Target Link (Optional)
                          </label>
                          <input
                            type="text"
                            value={qActionUrl}
                            onChange={(e) => setQActionUrl(e.target.value)}
                            placeholder="https://..."
                            className="border-3 border-foreground bg-background px-3 py-2 font-display text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="pixel-box-sm pixel-press bg-primary text-primary-foreground py-3 font-display text-xs uppercase mt-2"
                      >
                        Publish New Quest
                      </button>
                    </form>
                  </div>

                  {/* Active Quests List */}
                  <div className="pixel-box-lg bg-card p-6 flex flex-col gap-4">
                    <h3 className="font-display text-sm uppercase">Active Quests ({quests.length})</h3>

                    <div className="grid gap-4">
                      {quests.map((q) => {
                        const isActive = questStatus[q.id] !== false
                        return (
                          <div
                            key={q.id}
                            className="pixel-box-sm bg-background p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-2 border-foreground"
                          >
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-display text-xs uppercase text-foreground">
                                  {q.title}
                                </span>
                                <PixelTag className="bg-secondary text-secondary-foreground text-[9px]">
                                  {q.category}
                                </PixelTag>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {q.description} &bull; Reward: <strong className="text-primary">✦ {q.points} PTS</strong>
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleQuest(q.id)}
                                className={cn(
                                  'pixel-box-sm px-3 py-1.5 font-display text-[10px] uppercase flex items-center gap-1.5 transition-all',
                                  isActive
                                    ? 'bg-accent text-accent-foreground'
                                    : 'bg-muted text-muted-foreground',
                                )}
                              >
                                {isActive ? (
                                  <>
                                    <ToggleRight className="size-4" /> ACTIVE
                                  </>
                                ) : (
                                  <>
                                    <ToggleLeft className="size-4" /> PAUSED
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteQuest(q.id)}
                                className="pixel-box-sm bg-destructive text-destructive-foreground p-2 hover:scale-105 transition-transform"
                                aria-label="Delete quest"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: AUDIT LOG */}
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
