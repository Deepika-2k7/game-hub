import type { Game } from '../services/game-service'
import GameCard from './GameCard'
import Skeleton from './Skeleton'
import styles from './GameGrid.module.css'

type GameGridProps = {
  games: Game[]
  loading: boolean
  error: string
}

function GameGrid({ games, loading, error }: GameGridProps) {
  if (error) {
    return <div className={styles.message}>{error}</div>
  }

  if (loading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: 12 }, (_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    )
  }

  if (games.length === 0) {
    return <div className={styles.message}>No games matched your filters.</div>
  }

  return (
    <div className={styles.grid}>
      {games.map((game) => (
        <GameCard game={game} key={game.id} />
      ))}
    </div>
  )
}

export default GameGrid
