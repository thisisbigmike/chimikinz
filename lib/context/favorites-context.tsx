'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type FavoritesContextType = {
  favorites: number[]
  toggleFavorite: (oddlingId: number) => void
  isFavorite: (oddlingId: number) => boolean
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

  const toggleFavorite = (oddlingId: number) => {
    const next = favorites.includes(oddlingId)
      ? favorites.filter((id) => id !== oddlingId)
      : [...favorites, oddlingId]
    setFavorites(next)
    localStorage.setItem('chimikinz_favorites', JSON.stringify(next))
  }

  const isFavorite = (oddlingId: number) => favorites.includes(oddlingId)

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
