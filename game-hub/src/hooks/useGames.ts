import { useEffect, useState } from 'react'
import {
  fetchGames,
  type Game,
  type GameQuery,
} from '../services/game-service'

type UseGamesResult = {
  data: Game[]
  loading: boolean
  error: string
}

export function useGames(query: GameQuery): UseGamesResult {
  const [data, setData] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadGames() {
      try {
        setLoading(true)
        setError('')

        const games = await fetchGames(query, controller.signal)
        setData(games)
      } catch (err) {
        if (controller.signal.aborted) {
          return
        }

        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Something went wrong while loading games.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadGames()

    return () => controller.abort()
  }, [query])

  return { data, loading, error }
}
