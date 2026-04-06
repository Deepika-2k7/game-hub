const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.rawg.io/api'

type RequestOptions = {
  params?: Record<string, string | number | undefined | null>
  signal?: AbortSignal
}

async function request<T>(path: string, options: RequestOptions = {}) {
  const url = new URL(`${API_BASE_URL}${path}`)

  Object.entries(options.params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    method: 'GET',
    signal: options.signal,
  })

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`)
  }

  return (await response.json()) as T
}

const apiClient = { request }

export default apiClient
