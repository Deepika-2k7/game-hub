import SearchInput from './SearchInput'
import styles from './Navbar.module.css'

type NavbarProps = {
  searchText: string
  onSearchChange: (value: string) => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

function Navbar({
  searchText,
  onSearchChange,
  darkMode,
  onToggleDarkMode,
}: NavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.logo}>GH</div>
        <div>
          <p className={styles.eyebrow}>RAWG Inspired</p>
          <h1 className={styles.title}>Game Discovery</h1>
        </div>
      </div>

      <div className={styles.controls}>
        <SearchInput value={searchText} onSearch={onSearchChange} />
        <button
          className={styles.themeToggle}
          onClick={onToggleDarkMode}
          type="button"
        >
          <span>{darkMode ? 'Dark' : 'Light'} Mode</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
