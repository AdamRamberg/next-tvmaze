import { SearchResultClient } from "./client"
import { serverAPI } from "../../api/server"

type Props = {
  initialSearchQuery: string | undefined
}

export const SearchResultServer = async ({
  initialSearchQuery = "",
}: Props) => {
  const initialShows = await serverAPI.fetchShows(initialSearchQuery)

  return <SearchResultClient initialShows={initialShows} />
}
