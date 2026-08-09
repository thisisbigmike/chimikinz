'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { syncUserToFirestore, subscribeToUserFirestore, getUserFromFirestore } from '@/lib/firebase'

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

  // Load saved session on startup
  useEffect(() => {
    const savedSession = localStorage.getItem('chimikinz_user_session')
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession)
        setSessionState(parsed)
      } catch (e) {
        // Fallback
      }
    }
  }, [])

  // Whenever session changes (user logs in or out), load account-specific data from Firestore & LocalStorage
  useEffect(() => {
    if (!session?.address) {
      setCompletedQuests([])
      setFavorites([])
      setDailyClaimed(false)
      return
    }

    const userKey = session.address.toLowerCase()

    // 1. Load account-specific LocalStorage
    const savedQuests = localStorage.getItem(`chimikinz_completed_quests_${userKey}`)
    if (savedQuests) {
      try {
        setCompletedQuests(JSON.parse(savedQuests))
      } catch (e) {}
    }

    const savedFavs = localStorage.getItem(`chimikinz_favorites_${userKey}`)
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs))
      } catch (e) {}
    }

    const today = new Date().toDateString()
    const lastClaim = localStorage.getItem(`chimikinz_last_daily_claim_${userKey}`)
    if (lastClaim === today) {
      setDailyClaimed(true)
    }

    // 2. Restore profile & points directly from Firestore database
    getUserFromFirestore(userKey).then((firestoreUser) => {
      if (firestoreUser) {
        if (firestoreUser.completedQuests && firestoreUser.completedQuests.length > 0) {
          setCompletedQuests(firestoreUser.completedQuests)
          localStorage.setItem(`chimikinz_completed_quests_${userKey}`, JSON.stringify(firestoreUser.completedQuests))
        }
        if (firestoreUser.favorites && firestoreUser.favorites.length > 0) {
          setFavorites(firestoreUser.favorites)
          localStorage.setItem(`chimikinz_favorites_${userKey}`, JSON.stringify(firestoreUser.favorites))
        }
      }
    })

    // 3. Real-time Firestore listener
    const unsubscribe = subscribeToUserFirestore(userKey, (data) => {
      if (data) {
        if (data.completedQuests) setCompletedQuests(data.completedQuests)
        if (data.favorites) setFavorites(data.favorites)
      }
    })

    return () => unsubscribe()
  }, [session?.address])

  const points = completedQuests.reduce(
    (sum, qId) => sum + (QUEST_POINTS_MAP[qId] || 100),
    0,
  )

  // Sync to Firestore whenever key user states update
  useEffect(() => {
    if (session?.address) {
      const userKey = session.address.toLowerCase()
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
    } else {
      localStorage.removeItem('chimikinz_user_session')
      setCompletedQuests([])
      setFavorites([])
    }
  }

  const completeQuest = (id: string, pts: number) => {
    if (!session?.address) return
    const userKey = session.address.toLowerCase()

    if (!completedQuests.includes(id)) {
      const next = [...completedQuests, id]
      setCompletedQuests(next)
      localStorage.setItem(`chimikinz_completed_quests_${userKey}`, JSON.stringify(next))
    }
  }

  const toggleFavorite = (oddlingId: number) => {
    if (!session?.address) return
    const userKey = session.address.toLowerCase()

    const next = favorites.includes(oddlingId)
      ? favorites.filter((id) => id !== oddlingId)
      : [...favorites, oddlingId]
    setFavorites(next)
    localStorage.setItem(`chimikinz_favorites_${userKey}`, JSON.stringify(next))
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
