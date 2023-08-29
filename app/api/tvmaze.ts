import { ShowResult } from "../types"

const BASE_URL = "https://api.tvmaze.com"

export const fetchShows = async (
  searchQuery: string | null | undefined,
): Promise<ShowResult[]> => {
  if (searchQuery == null) {
    return []
  }
  const result = await fetch(`${BASE_URL}/search/shows?q=${searchQuery}`)
  const json = await result.json()
  return json
}
