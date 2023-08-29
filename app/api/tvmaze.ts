import { Show, ShowResult } from "../types"

const BASE_URL = "https://api.tvmaze.com"

const sleep = async (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const fetchShows = async (
  searchQuery: string | null | undefined,
  sleepTime: number = 0,
): Promise<Show[]> => {
  if (searchQuery == null) {
    return []
  }
  const result = await fetch(`${BASE_URL}/search/shows?q=${searchQuery}`)
  await sleep(sleepTime)
  const json = (await result.json()) as ShowResult[]
  return json.reduce<Show[]>((acc, cur) => {
    if (cur.show) {
      acc.push(cur.show)
    }
    return acc
  }, [])
}
