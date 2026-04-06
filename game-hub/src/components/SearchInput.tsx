import { useEffect, useRef, useState } from 'react'
import styles from './SearchInput.module.css'

type SearchInputProps = {
  value: string
  onSearch: (value: string) => void
}

function SearchInput({ value, onSearch }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState(value)
  const [error, setError] = useState('')

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const trimmed = inputValue.trim()

    if (trimmed.length > 0 && trimmed.length < 2) {
      setError('Search must be at least 2 characters.')
      return
    }

    setError('')
    onSearch(trimmed)
  }, [inputValue, onSearch])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        placeholder="Search games..."
        type="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        ref={inputRef}
      />
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  )
}

export default SearchInput
