type PlatformOption = {
  id: number
  name: string
}

const platforms: PlatformOption[] = [
  { id: 4, name: 'PC' },
  { id: 187, name: 'PlayStation' },
  { id: 1, name: 'Xbox' },
  { id: 3, name: 'iOS' },
  { id: 21, name: 'Android' },
  { id: 5, name: 'Macintosh' },
  { id: 6, name: 'Linux' },
]

export function usePlatforms() {
  return { data: platforms }
}
