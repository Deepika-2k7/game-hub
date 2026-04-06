import apiClient from './api-client'

export type GameQuery = {
  searchText: string
  selectedGenre: number | null
  selectedPlatform: number | null
  sortOrder: string
}

export type Platform = {
  id: number
  name: string
  slug: string
}

export type Genre = {
  id: number
  name: string
  slug: string
  imageBackground?: string
  image?: string
}

export type Game = {
  id: number
  name: string
  slug: string
  backgroundImage: string
  rating: number
  metacritic: number | null
  parentPlatforms: Platform[]
}

type RawgGame = {
  id: number
  name: string
  slug: string
  background_image: string | null
  rating: number
  metacritic: number | null
  parent_platforms: Array<{
    platform: Platform
  }>
}

type FetchGamesResponse = {
  count: number
  results: RawgGame[]
}

type RawgGenre = {
  id: number
  name: string
  slug: string
  image_background: string | null
}

type FetchGenresResponse = {
  results: RawgGenre[]
}

const fallbackImage =
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'

export async function fetchGames(query: GameQuery, signal?: AbortSignal) {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY

  if (!apiKey) {
    throw new Error(
      'Missing VITE_RAWG_API_KEY. Add it to a .env file to load live game data.',
    )
  }

  const params = {
    key: apiKey,
    page_size: 24,
    search: query.searchText || undefined,
    genres: query.selectedGenre || undefined,
    platforms: query.selectedPlatform || undefined,
    ordering: query.sortOrder,
  }

  const data = await apiClient.request<FetchGamesResponse>('/games', {
    params,
    signal,
  })

  return data.results.map<Game>((game) => ({
    id: game.id,
    name: game.name,
    slug: game.slug,
    backgroundImage: game.background_image || fallbackImage,
    rating: game.rating,
    metacritic: game.metacritic,
    parentPlatforms: game.parent_platforms.map((item) => item.platform),
  }))
}

const allowedGenreIds = new Set([
  4, 51, 3, 5, 10, 2, 40, 14, 7, 11, 83, 1, 59, 15, 6,
])

export async function fetchGenres(signal?: AbortSignal) {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY

  if (!apiKey) {
    throw new Error(
      'Missing VITE_RAWG_API_KEY. Add it to a .env file to load live genre data.',
    )
  }

  const data = await apiClient.request<FetchGenresResponse>('/genres', {
    params: {
      key: apiKey,
      page_size: 20,
    },
    signal,
  })

  return data.results
    .filter((genre) => allowedGenreIds.has(genre.id))
    .map<Genre>((genre) => ({
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
      imageBackground: genre.image_background ?? undefined,
      image: genre.image_background ?? undefined,
    }))
}
