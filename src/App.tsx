import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spacer,
  Stack,
  Switch,
  Text,
  VStack,
  useColorMode,
} from '@chakra-ui/react'
import { useDeferredValue, useMemo, useState } from 'react'
import './App.css'
import {
  games,
  genres,
  platformOptions,
  sortOptions,
  type PlatformFilter,
  type SortOption,
} from './data/catalog'

function SearchGlyph() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={5} color="whiteAlpha.700">
      <path
        fill="currentColor"
        d="M10 4a6 6 0 1 0 3.874 10.582l4.772 4.772 1.414-1.414-4.772-4.772A6 6 0 0 0 10 4Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
      />
    </Icon>
  )
}

function ChevronGlyph() {
  return (
    <Icon viewBox="0 0 24 24" boxSize={4} color="whiteAlpha.800">
      <path
        fill="currentColor"
        d="M6.7 9.3a1 1 0 0 1 1.4 0l3.9 3.9 3.9-3.9a1 1 0 0 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4Z"
      />
    </Icon>
  )
}

function BrandMark() {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="0 10px 30px rgba(0,0,0,0.35)"
      display="grid"
      placeItems="center"
      h={{ base: '52px', md: '60px' }}
      w={{ base: '52px', md: '60px' }}
    >
      <Icon viewBox="0 0 64 64" boxSize={8}>
        <defs>
          <linearGradient id="brand-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4ecd" />
            <stop offset="100%" stopColor="#6c63ff" />
          </linearGradient>
        </defs>
        <path
          fill="url(#brand-gradient)"
          d="M27 8a5 5 0 1 1 10 0 5 5 0 0 1-10 0ZM9 27a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm46 0a5 5 0 1 1 0 10 5 5 0 0 1 0-10ZM27 56a5 5 0 1 1 10 0 5 5 0 0 1-10 0ZM18 18a5 5 0 1 1 7 7 5 5 0 0 1-7-7Zm21 21a10 10 0 1 1-14-14 10 10 0 0 1 14 14ZM39 18a5 5 0 1 1 7 7 5 5 0 0 1-7-7ZM18 39a5 5 0 1 1 7 7 5 5 0 0 1-7-7Z"
        />
      </Icon>
    </Box>
  )
}

function SelectMenu<T extends string>({
  label,
  options,
  onSelect,
}: {
  label: string
  options: readonly T[]
  onSelect: (value: T) => void
}) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        bg="whiteAlpha.100"
        borderRadius="xl"
        color="white"
        cursor="pointer"
        display="flex"
        justifyContent="space-between"
        rightIcon={<ChevronGlyph />}
        minH="64px"
        minW={{ base: '100%', md: '220px' }}
        px={6}
        transition="background 0.2s ease"
        variant="unstyled"
        _hover={{ bg: 'whiteAlpha.200' }}
      >
        <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="700">
          {label}
        </Text>
      </MenuButton>
      <MenuList bg="#202020" borderColor="whiteAlpha.200">
        {options.map((option) => (
          <MenuItem
            key={option}
            bg="transparent"
            onClick={() => onSelect(option)}
            _hover={{ bg: 'whiteAlpha.100' }}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const darkEnabled = colorMode === 'dark'
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('All Genres')
  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformFilter>('All Platforms')
  const [selectedSort, setSelectedSort] = useState<SortOption>('Relevance')
  const deferredSearch = useDeferredValue(search)

  const shellBg = useMemo(
    () =>
      darkEnabled
        ? 'linear-gradient(180deg, #111 0%, #121212 100%)'
        : 'linear-gradient(180deg, #f6f6f7 0%, #ececef 100%)',
    [darkEnabled],
  )

  const surface = darkEnabled ? '#181818' : 'white'
  const railText = darkEnabled ? 'whiteAlpha.900' : 'gray.800'
  const muted = darkEnabled ? 'whiteAlpha.600' : 'gray.500'
  const cardBg = darkEnabled ? '#1b1b1b' : 'white'
  const genreButtonBg = darkEnabled ? 'whiteAlpha.100' : 'blackAlpha.100'

  const sortOptionLabels: Record<SortOption, string> = {
    Relevance: 'Order by: Relevance',
    Metacritic: 'Order by: Metacritic',
    Newest: 'Order by: Newest',
    Oldest: 'Order by: Oldest',
    'A-Z': 'Order by: A-Z',
  }
  const filteredGames = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase()

    const result = games.filter((game) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        game.title.toLowerCase().includes(normalizedSearch) ||
        game.genre.toLowerCase().includes(normalizedSearch) ||
        game.platforms.some((platform) =>
          platform.toLowerCase().includes(normalizedSearch),
        )

      const matchesGenre =
        selectedGenre === 'All Genres' || game.genre === selectedGenre

      const matchesPlatform =
        selectedPlatform === 'All Platforms' ||
        game.platforms.includes(selectedPlatform)

      return matchesSearch && matchesGenre && matchesPlatform
    })

    return [...result].sort((a, b) => {
      switch (selectedSort) {
        case 'Metacritic':
          return b.metacritic - a.metacritic
        case 'Newest':
          return b.releaseYear - a.releaseYear
        case 'Oldest':
          return a.releaseYear - b.releaseYear
        case 'A-Z':
          return a.title.localeCompare(b.title)
        default:
          return b.metacritic - a.metacritic || b.releaseYear - a.releaseYear
      }
    })
  }, [deferredSearch, selectedGenre, selectedPlatform, selectedSort])

  return (
    <Box bgImage={shellBg} minH="100vh" px={{ base: 4, md: 6 }} py={5}>
      <Stack spacing={8}>
        <Flex align="center" gap={4}>
          <BrandMark />
          <InputGroup size="lg" flex="1">
            <InputLeftElement h="full" pl={4} pointerEvents="none">
              <SearchGlyph />
            </InputLeftElement>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              bg={surface}
              border="none"
              borderRadius="full"
              color={railText}
              fontSize={{ base: 'md', md: '2xl' }}
              h={{ base: '56px', md: '72px' }}
              pl={14}
              placeholder="Search games..."
              _placeholder={{ color: muted }}
              _focusVisible={{ boxShadow: '0 0 0 1px #68d391' }}
            />
          </InputGroup>
          <HStack minW="fit-content" spacing={3}>
            <Switch
              colorScheme="green"
              isChecked={darkEnabled}
              onChange={toggleColorMode}
              size="lg"
            />
            <Text color={railText} fontSize={{ base: 'md', md: '2xl' }}>
              Dark Mode
            </Text>
          </HStack>
        </Flex>

        <Grid
          gap={{ base: 8, lg: 12 }}
          templateColumns={{ base: '1fr', lg: '240px minmax(0, 1fr)' }}
        >
          <Box>
            <Heading color={railText} fontSize={{ base: '3xl', md: '5xl' }} mb={8}>
              Genres
            </Heading>

            <VStack align="stretch" spacing={5}>
              <HStack
                borderRadius="xl"
                color={railText}
                cursor="pointer"
                onClick={() => setSelectedGenre('All Genres')}
                px={1}
                py={1}
                spacing={4}
                transition="transform 0.15s ease, opacity 0.15s ease"
                bg={selectedGenre === 'All Genres' ? genreButtonBg : 'transparent'}
                _hover={{ opacity: 0.95, transform: 'translateX(4px)' }}
              >
                <Flex
                  align="center"
                  bg={darkEnabled ? 'whiteAlpha.100' : 'blackAlpha.100'}
                  borderRadius="lg"
                  boxSize="48px"
                  fontWeight="800"
                  justify="center"
                >
                  All
                </Flex>
                <Text
                  color={selectedGenre === 'All Genres' ? 'green.300' : railText}
                  fontSize={{ base: 'xl', md: '2xl' }}
                >
                  All Genres
                </Text>
              </HStack>

              {genres.map((genre) => (
                <HStack
                  key={genre.id}
                  borderRadius="xl"
                  color={railText}
                  cursor="pointer"
                  onClick={() => setSelectedGenre(genre.name)}
                  px={1}
                  py={1}
                  spacing={4}
                  transition="transform 0.15s ease, opacity 0.15s ease"
                  bg={selectedGenre === genre.name ? genreButtonBg : 'transparent'}
                  _hover={{ opacity: 0.95, transform: 'translateX(4px)' }}
                >
                  <Image
                    alt={genre.name}
                    borderRadius="lg"
                    boxSize="48px"
                    className="genre-thumb"
                    objectFit="cover"
                    src={genre.image}
                  />
                  <Text
                    color={selectedGenre === genre.name ? 'green.300' : railText}
                    fontSize={{ base: 'xl', md: '2xl' }}
                  >
                    {genre.name}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          <Stack spacing={8}>
            <Heading color={railText} fontSize={{ base: '5xl', md: '7xl' }}>
              Games
            </Heading>

            <Flex gap={4} wrap="wrap">
              <SelectMenu
                label={selectedPlatform}
                onSelect={setSelectedPlatform}
                options={platformOptions}
              />
              <SelectMenu
                label={sortOptionLabels[selectedSort]}
                onSelect={(value) => setSelectedSort(value as SortOption)}
                options={sortOptions}
              />
            </Flex>

            <HStack color={muted} justify="space-between" wrap="wrap">
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                {filteredGames.length} games found
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }}>
                Live filters: {selectedGenre}, {selectedPlatform}, {selectedSort}
              </Text>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={7}>
              {filteredGames.map((game) => (
                <Box
                  key={game.id}
                  bg={cardBg}
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow="xl"
                  transition="transform 0.2s ease, box-shadow 0.2s ease"
                  _hover={{
                    transform: 'translateY(-6px)',
                    boxShadow: '0 22px 45px rgba(0,0,0,0.35)',
                  }}
                >
                  <Box position="relative">
                    <Image
                      alt={game.title}
                      h="240px"
                      className="game-cover"
                      objectFit="cover"
                      src={game.image}
                      w="full"
                    />
                    <Badge
                      bg="blackAlpha.600"
                      borderRadius="full"
                      color="white"
                      fontSize="xs"
                      left={4}
                      px={3}
                      position="absolute"
                      py={1}
                      top={4}
                    >
                      {game.genre}
                    </Badge>
                  </Box>
                  <Stack p={5} spacing={4}>
                    <Flex align="center">
                      <Heading color={railText} fontSize="2xl">
                        {game.title}
                      </Heading>
                      <Spacer />
                      <Badge
                        bg={game.metacritic > 90 ? 'green.500' : 'yellow.500'}
                        borderRadius="md"
                        color="black"
                        fontSize="sm"
                        px={2}
                        py={1}
                      >
                        {game.metacritic}
                      </Badge>
                    </Flex>

                    <Text color={muted} fontSize="sm">
                      Released in {game.releaseYear}
                    </Text>

                    <HStack spacing={2} wrap="wrap">
                      {game.platforms.map((platform) => (
                        <Badge
                          key={platform}
                          bg={darkEnabled ? 'whiteAlpha.200' : 'gray.200'}
                          borderRadius="md"
                          color={railText}
                          fontSize="xs"
                          px={2}
                          py={1}
                        >
                          {platform}
                        </Badge>
                      ))}
                    </HStack>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>

            {filteredGames.length === 0 ? (
              <Box
                bg={cardBg}
                borderRadius="2xl"
                color={railText}
                p={8}
                textAlign="center"
              >
                <Heading fontSize="2xl" mb={3}>
                  No games matched your filters
                </Heading>
                <Text color={muted}>
                  Try clearing the search, changing the genre, or switching the platform.
                </Text>
              </Box>
            ) : null}
          </Stack>
        </Grid>
      </Stack>
    </Box>
  )
}

export default App
