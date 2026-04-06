import cyberpunkCover from '../assets/covers/cyberpunk-2077.svg'
import eldenRingCover from '../assets/covers/elden-ring.svg'
import forzaCover from '../assets/covers/forza-horizon-5.svg'
import gtaCover from '../assets/covers/gta-v.svg'
import hadesCover from '../assets/covers/hades.svg'
import portalCover from '../assets/covers/portal-2.svg'
import strategyCover from '../assets/covers/strategy-map.svg'
import witcherCover from '../assets/covers/witcher-3.svg'

export type Genre = {
  id: number
  name: string
  image: string
}

export type Game = {
  id: number
  title: string
  genre: string
  releaseYear: number
  metacritic: number
  platforms: string[]
  image: string
}


export const games: Game[] = [
  { id: 1, title: 'Grand Theft Auto V', genre: 'Action', releaseYear: 2013, metacritic: 97, platforms: ['PC', 'PlayStation', 'Xbox'], image: gtaCover },
  { id: 2, title: 'The Witcher 3: Wild Hunt', genre: 'RPG', releaseYear: 2015, metacritic: 93, platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], image: witcherCover },
  { id: 3, title: 'Portal 2', genre: 'Puzzle', releaseYear: 2011, metacritic: 95, platforms: ['PC', 'PlayStation', 'Xbox'], image: portalCover },
  { id: 4, title: 'Red Dead Redemption 2', genre: 'Adventure', releaseYear: 2018, metacritic: 96, platforms: ['PC', 'PlayStation', 'Xbox'], image: gtaCover },
  { id: 5, title: 'Cyberpunk 2077', genre: 'Action', releaseYear: 2020, metacritic: 86, platforms: ['PC', 'PlayStation', 'Xbox'], image: cyberpunkCover },
  { id: 6, title: 'God of War', genre: 'Action', releaseYear: 2018, metacritic: 94, platforms: ['PC', 'PlayStation'], image: witcherCover },
  { id: 7, title: 'Hades', genre: 'Indie', releaseYear: 2020, metacritic: 93, platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], image: hadesCover },
  { id: 8, title: 'Forza Horizon 5', genre: 'Racing', releaseYear: 2021, metacritic: 92, platforms: ['PC', 'Xbox'], image: forzaCover },
  { id: 9, title: "Baldur's Gate 3", genre: 'RPG', releaseYear: 2023, metacritic: 96, platforms: ['PC', 'PlayStation'], image: eldenRingCover },
  { id: 10, title: 'Hollow Knight', genre: 'Indie', releaseYear: 2017, metacritic: 90, platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], image: hadesCover },
  { id: 11, title: 'Elden Ring', genre: 'RPG', releaseYear: 2022, metacritic: 96, platforms: ['PC', 'PlayStation', 'Xbox'], image: eldenRingCover },
  { id: 12, title: 'Celeste', genre: 'Indie', releaseYear: 2018, metacritic: 92, platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], image: hadesCover },
  { id: 13, title: 'Control', genre: 'Shooter', releaseYear: 2019, metacritic: 85, platforms: ['PC', 'PlayStation', 'Xbox'], image: cyberpunkCover },
  { id: 14, title: 'Disco Elysium', genre: 'Adventure', releaseYear: 2019, metacritic: 91, platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], image: witcherCover },
  { id: 15, title: 'Resident Evil 4', genre: 'Shooter', releaseYear: 2023, metacritic: 93, platforms: ['PC', 'PlayStation', 'Xbox'], image: portalCover },
  { id: 16, title: 'Starfield', genre: 'Adventure', releaseYear: 2023, metacritic: 83, platforms: ['PC', 'Xbox'], image: portalCover },
  { id: 17, title: 'Civilization VI', genre: 'Strategy', releaseYear: 2016, metacritic: 88, platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], image: strategyCover },
  { id: 18, title: 'XCOM 2', genre: 'Strategy', releaseYear: 2016, metacritic: 88, platforms: ['PC', 'PlayStation', 'Xbox'], image: strategyCover },
  { id: 19, title: 'Ori and the Will of the Wisps', genre: 'Adventure', releaseYear: 2020, metacritic: 90, platforms: ['PC', 'Switch', 'Xbox'], image: portalCover },
  { id: 20, title: 'It Takes Two', genre: 'Puzzle', releaseYear: 2021, metacritic: 88, platforms: ['PC', 'PlayStation', 'Xbox'], image: portalCover },
  { id: 21, title: 'Monster Hunter: World', genre: 'Action', releaseYear: 2018, metacritic: 90, platforms: ['PC', 'PlayStation', 'Xbox'], image: witcherCover },
  { id: 22, title: 'Sea of Stars', genre: 'Indie', releaseYear: 2023, metacritic: 87, platforms: ['PC', 'Switch', 'PlayStation', 'Xbox'], image: hadesCover },
  { id: 23, title: 'F1 24', genre: 'Racing', releaseYear: 2024, metacritic: 79, platforms: ['PC', 'PlayStation', 'Xbox'], image: forzaCover },
  { id: 24, title: 'Returnal', genre: 'Shooter', releaseYear: 2021, metacritic: 86, platforms: ['PC', 'PlayStation'], image: portalCover },
]

export const platformOptions = ['All Platforms', 'PC', 'PlayStation', 'Xbox', 'Switch'] as const
export const sortOptions = ['Relevance', 'Metacritic', 'Newest', 'Oldest', 'A-Z'] as const

export type PlatformFilter = (typeof platformOptions)[number]
export type SortOption = (typeof sortOptions)[number]
