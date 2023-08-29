import SearchPageContent from "./components/SearchPageContent"
import { fetchShows } from "./api/tvmaze"

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage(props: Props) {
  const searchQuery = props.searchParams.q
  const initialShows = await fetchShows(searchQuery)
  return (
    <SearchPageContent
      initialShows={initialShows}
      initialSearchQuery={searchQuery}
    />
  )
}
