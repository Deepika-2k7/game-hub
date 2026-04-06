import type { Genre } from '../services/game-service'
import styles from './GenreList.module.css'

type GenreListProps = {
  genres: Genre[]
  selectedGenre: number | null
  onSelectGenre: (genreId: number | null) => void
}

function GenreList({
  genres,
  selectedGenre,
  onSelectGenre,
}: GenreListProps) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Genres</h2>

      <button
        className={`${styles.genreButton} ${
          selectedGenre === null ? styles.active : ''
        }`}
        onClick={() => onSelectGenre(null)}
        type="button"
      >
        <span className={styles.fallback}>All</span>
        <span>All Genres</span>
      </button>

      {genres.map((genre) => (
        <button
          className={`${styles.genreButton} ${
            selectedGenre === genre.id ? styles.active : ''
          }`}
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          type="button"
        >
          {genre.image ? (
            <img alt={genre.name} className={styles.image} src={genre.image} />
          ) : (
            <span className={styles.fallback}>{genre.name.slice(0, 1)}</span>
          )}
          <span>{genre.name}</span>
        </button>
      ))}
    </aside>
  )
}

export default GenreList
