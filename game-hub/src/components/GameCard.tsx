import type { Game } from '../services/game-service'
import styles from './GameCard.module.css'

type GameCardProps = {
  game: Game
}

function GameCard({ game }: GameCardProps) {
  return (
    <article className={styles.card}>
      <img
        alt={game.name}
        className={styles.image}
        src={game.backgroundImage}
      />

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.title}>{game.name}</h3>
          <span className={styles.score}>{game.metacritic ?? 'N/A'}</span>
        </div>

        <div className={styles.ratingRow}>
          <span className={styles.rating}>Rating: {game.rating.toFixed(1)}</span>
        </div>

        <div className={styles.platforms}>
          {game.parentPlatforms.slice(0, 4).map((platform) => (
            <span className={styles.platform} key={platform.id}>
              {platform.name}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default GameCard
