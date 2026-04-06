import styles from './PlatformSelector.module.css'

type PlatformOption = {
  id: number
  name: string
}

type PlatformSelectorProps = {
  platforms: PlatformOption[]
  selectedPlatform: number | null
  onSelectPlatform: (platformId: number | null) => void
}

function PlatformSelector({
  platforms,
  selectedPlatform,
  onSelectPlatform,
}: PlatformSelectorProps) {
  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>Platforms</span>
      <select
        className={styles.select}
        onChange={(event) =>
          onSelectPlatform(
            event.target.value ? Number(event.target.value) : null,
          )
        }
        value={selectedPlatform ?? ''}
      >
        <option value="">All Platforms</option>
        {platforms.map((platform) => (
          <option key={platform.id} value={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default PlatformSelector
