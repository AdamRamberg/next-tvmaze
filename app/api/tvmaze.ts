import { ShowResult } from "../types"

const BASE_URL = "https://api.tvmaze.com"

const sleep = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const fetchShows = async (
  searchQuery: string | null | undefined,
  sleepTime: number = 0,
): Promise<ShowResult[]> => {
  if (searchQuery == null) {
    return []
  }
  const result = await fetch(`${BASE_URL}/search/shows?q=${searchQuery}`)
  await sleep(sleepTime)
  const json = await result.json()
  return json
}
