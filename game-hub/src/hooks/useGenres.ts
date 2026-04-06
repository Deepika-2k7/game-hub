import { useEffect, useState } from 'react'
import { fetchGenres, type Genre } from '../services/game-service'

const fallbackGenres: Genre[] = [
  { id: 4, name: 'Action', slug: 'action' },
  { id: 51, name: 'Indie', slug: 'indie' },
  { id: 3, name: 'Adventure', slug: 'adventure' },
  { id: 5, name: 'RPG', slug: 'role-playing-games-rpg' },
  { id: 10, name: 'Strategy', slug: 'strategy' },
  { id: 2, name: 'Shooter', slug: 'shooter' },
  { id: 40, name: 'Casual', slug: 'casual' },
  { id: 14, name: 'Simulation', slug: 'simulation' },
  { id: 7, name: 'Puzzle', slug: 'puzzle' },
  { id: 11, name: 'Arcade', slug: 'arcade' },
  { id: 83, name: 'Platformer', slug: 'platformer' },
  { id: 1, name: 'Racing', slug: 'racing' },
  { id: 59, name: 'Massively Multiplayer', slug: 'massively-multiplayer' },
  { id: 15, name: 'Sports', slug: 'sports' },
  { id: 6, name: 'Fighting', slug: 'fighting' },
]

export function useGenres() {
  const [data, setData] = useState<Genre[]>(fallbackGenres)

  useEffect(() => {
    const controller = new AbortController()

    async function loadGenres() {
      try {
        const genres = await fetchGenres(controller.signal)
        if (genres.length > 0) {
          setData(genres)
        }
      } catch {
        // Keep fallback genres so the UI still works without live genre art.
      }
    }

    loadGenres()

    return () => controller.abort()
  }, [])

  return { data }
}
