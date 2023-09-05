import { Show } from "../types"

type FetchOptions = {
  url?: string
  searchParams?: URLSearchParams
}

const createFetchFromServer =
  <Result>(basePath: string) =>
  async (options: FetchOptions = {}) => {
    const origin = window.location.origin
    const path = !!options.url ? `${basePath}${options.url}` : basePath
    const pathWithSearch = !!options.searchParams
      ? `${path}?${options.searchParams.toString()}`
      : path
    const url = new URL(pathWithSearch, origin)

    const result = await fetch(url.href)
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
