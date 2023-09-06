import { Show } from "../types"
import { sleep } from "./common"

type FetchOptions = {
  url?: string
  searchParams?: URLSearchParams
}

const createFetchFromServer =
  <Result>(basePath: string) =>
  async (options: FetchOptions = {}, sleepTime: number = 0) => {
    const origin = window.location.origin
    const path = !!options.url ? `${basePath}${options.url}` : basePath
    const pathWithSearch = !!options.searchParams
      ? `${path}?${options.searchParams.toString()}`
      : path
    const url = new URL(pathWithSearch, origin)

    const result = await fetch(url.href)
    if (sleepTime > 0) {
      await sleep(sleepTime)
    }
    if (!result.ok) {
      throw new Error(result.statusText)
    }
    const json = (await result.json()) as Result
    return json
  }

const fetchShows = createFetchFromServer<Show[]>("/api/shows")

export const clientAPI = {
  fetchShows,
}
