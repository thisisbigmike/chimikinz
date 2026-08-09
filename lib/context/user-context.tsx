'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { syncUserToFirestore, subscribeToUserFirestore } from '@/lib/firebase'

export type UserSession = {
  address: string
  method: string
  connectedAt: string
  oddlingsCount: number
}

type UserContextType = {
  session: UserSession | null
  setSession: (session: UserSession | null) => void
  completedQuests: string[]
  completeQuest: (id: string, points: number) => void
  points: number
  favorites: number[]
  toggleFavorite: (oddlingId: number) => void
  isFavorite: (oddlingId: number) => boolean
  dailyClaimed: boolean
  claimDailyLuck: () => number
  disconnect: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const QUEST_POINTS_MAP: Record<string, number> = {
  'x-follow': 150,
  'discord-join': 200,
  'daily-checkin': 50,
  'gallery-share': 100,
  'lore-trivia': 250,
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = useState<UserSession | null>(null)
  const [completedQuests, setCompletedQuests] = useState<string[]>([])
  const [favorites, setFavorites] = useState<number[]>([])
  const [dailyClaimed, setDailyClaimed] = useState<boolean>(false)

  useEffect(() => {
    // Load session
    const savedSession = localStorage.getItem('chimikinz_user_session')
    if (savedSession) {
      try {
        setSessionState(JSON.parse(savedSession))
      } catch (e) {
        // Fallback
      }
    }

    // Load quests
    const savedQuests = localStorage.getItem('chimikinz_completed_quests')
    if (savedQuests) {
      try {
        setCompletedQuests(JSON.parse(savedQuests))
      } catch (e) {
        // Fallback
      }
    }

    // Load favorites
    const savedFavs = localStorage.getItem('chimikinz_favorites')
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs))
      } catch (e) {
        // Fallback
      }
    }

    // Load daily claim date
    const today = new Date().toDateString()
    const lastClaim = localStorage.getItem('chimikinz_last_daily_claim')
    if (lastClaim === today) {
      setDailyClaimed(true)
    }
  }, [])

  const points = completedQuests.reduce(
    (sum, qId) => sum + (QUEST_POINTS_MAP[qId] || 100),
    0,
  )

  // Sync to Firestore whenever key user states update
  useEffect(() => {
    if (session?.address) {
      syncUserToFirestore({
        address: session.address,
        method: session.method,
        connectedAt: session.connectedAt,
        oddlingsCount: session.oddlingsCount,
        points,
        completedQuests,
        favorites,
      })
    }
  }, [session, completedQuests, favorites, points])

  const setSession = (newSession: UserSession | null) => {
    setSessionState(newSession)
    if (newSession) {
      localStorage.setItem('chimikinz_user_session', JSON.stringify(newSession))
      syncUserToFirestore({
        address: newSession.address,
        method: newSession.method,
        connectedAt: newSession.connectedAt,
        oddlingsCount: newSession.oddlingsCount,
        points,
        completedQuests,
        favorites,
      })
    } else {
      localStorage.removeItem('chimikinz_user_session')
    }
  }

  const completeQuest = (id: string, pts: number) => {
    if (!completedQuests.includes(id)) {
      const next = [...completedQuests, id]
      setCompletedQuests(next)
      localStorage.setItem('chimikinz_completed_quests', JSON.stringify(next))
    }
  }

  const toggleFavorite = (oddlingId: number) => {
    const next = favorites.includes(oddlingId)
      ? favorites.filter((id) => id !== oddlingId)
      : [...favorites, oddlingId]
    setFavorites(next)
    localStorage.setItem('chimikinz_favorites', JSON.stringify(next))
  }

  const isFavorite = (oddlingId: number) => favorites.includes(oddlingId)

  const claimDailyLuck = (): number => {
    const today = new Date().toDateString()
    localStorage.setItem('chimikinz_last_daily_claim', today)
    setDailyClaimed(true)
    completeQuest('daily-checkin', 50)
    return 50
  }

  const disconnect = () => {
    setSession(null)
  }

  return (
    <UserContext.Provider
      value={{
        session,
        setSession,
        completedQuests,
        completeQuest,
        points,
        favorites,
        toggleFavorite,
        isFavorite,
        dailyClaimed,
        claimDailyLuck,
        disconnect,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
