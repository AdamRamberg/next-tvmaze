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
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  if (sleepTime > 0) {
    await sleep(sleepTime)
  }
  const json = (await result.json()) as ShowResult[]
  return json.reduce<Show[]>((acc, cur) => {
    if (cur.show) {
      acc.push(cur.show)
    }
    return acc
  }, [])
}

export const fetchShow = async (
  id: string | null | undefined,
  sleepTime: number = 0,
): Promise<Show | null> => {
  if (id == null) {
    return null
  }
  const result = await fetch(`${BASE_URL}/shows/${id}`)
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  if (sleepTime > 0) {
    await sleep(sleepTime)
  }
  const json = await result.json()
  return json
}
