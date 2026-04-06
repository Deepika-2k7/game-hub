import styles from './SortSelector.module.css'

type SortOption = {
  label: string
  value: string
}

type SortSelectorProps = {
  selectedSort: string
  options: SortOption[]
  onSelectSort: (value: string) => void
}

function SortSelector({
  selectedSort,
  options,
  onSelectSort,
}: SortSelectorProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>Sort By</span>
      <select
        className={styles.select}
        onChange={(event) => onSelectSort(event.target.value)}
        value={selectedSort}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SortSelector
