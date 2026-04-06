import { useEffect, useState } from 'react'
import GameGrid from '../components/GameGrid'
import GenreList from '../components/GenreList'
import Navbar from '../components/Navbar'
import PlatformSelector from '../components/PlatformSelector'
import SortSelector from '../components/SortSelector'
import { useGames } from '../hooks/useGames'
import { useGenres } from '../hooks/useGenres'
import { usePlatforms } from '../hooks/usePlatforms'
import styles from './HomePage.module.css'

type QueryState = {
  searchText: string
  selectedGenre: number | null
  selectedPlatform: number | null
  sortOrder: string
}

const defaultQuery: QueryState = {
  searchText: '',
  selectedGenre: null,
  selectedPlatform: null,
  sortOrder: '',
}

const sortOptions = [
  { label: 'Relevance', value: '' },
  { label: 'Date added', value: '-added' },
  { label: 'Name', value: 'name' },
  { label: 'Release date', value: '-released' },
  { label: 'Popularity', value: '-suggestions' },
  { label: 'Average rating', value: '-rating' },
]

const themeStorageKey = 'game-hub-theme'

function HomePage() {
  const [query, setQuery] = useState<QueryState>(defaultQuery)
  const [darkMode, setDarkMode] = useState(true)
  const { data: genres } = useGenres()
  const { data: platforms } = usePlatforms()
  const { data: games, loading, error } = useGames(query)

  useEffect(() => {
    const savedTheme = localStorage.getItem(themeStorageKey)
    const isDark = savedTheme ? savedTheme === 'dark' : true
    setDarkMode(isDark)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem(themeStorageKey, darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <Navbar
          darkMode={darkMode}
          onSearchChange={(searchText) =>
            setQuery((current) => ({ ...current, searchText }))
          }
          onToggleDarkMode={() => setDarkMode((current) => !current)}
          searchText={query.searchText}
        />

        <div className={styles.layout}>
          <GenreList
            genres={genres}
            onSelectGenre={(selectedGenre) =>
              setQuery((current) => ({ ...current, selectedGenre }))
            }
            selectedGenre={query.selectedGenre}
          />

          <section className={styles.content}>
            <div className={styles.toolbar}>
              <SortSelector
                onSelectSort={(sortOrder) =>
                  setQuery((current) => ({ ...current, sortOrder }))
                }
                options={sortOptions}
                selectedSort={query.sortOrder}
              />

              <PlatformSelector
                onSelectPlatform={(selectedPlatform) =>
                  setQuery((current) => ({ ...current, selectedPlatform }))
                }
                platforms={platforms}
                selectedPlatform={query.selectedPlatform}
              />
            </div>

            <GameGrid error={error} games={games} loading={loading} />
          </section>
        </div>
      </div>
    </main>
  )
}

export default HomePage
