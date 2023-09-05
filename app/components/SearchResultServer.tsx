import { SearchResultClient } from "./SearchResultClient"
import { serverAPI } from "../api/server"

type Props = {
  initialSearchQuery: string | undefined
}

export const SearchResultServer = async ({
  initialSearchQuery = "",
}: Props) => {
  const initialShows = await serverAPI.fetchShows(initialSearchQuery, 5000)

  return <SearchResultClient initialShows={initialShows} />
}
