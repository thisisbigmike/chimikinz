'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type FavoritesContextType = {
  favorites: number[]
  toggleFavorite: (chimiId: number) => void
  isFavorite: (chimiId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('chimikinz_favorites')
    if (saved) {
      try {
        setFavorites(JSON.parse(saved))
      } catch (e) {}
    }
  }, [])

  const toggleFavorite = (chimiId: number) => {
    const next = favorites.includes(chimiId)
      ? favorites.filter((id) => id !== chimiId)
      : [...favorites, chimiId]
    setFavorites(next)
    localStorage.setItem('chimikinz_favorites', JSON.stringify(next))
  }

  const isFavorite = (chimiId: number) => favorites.includes(chimiId)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
