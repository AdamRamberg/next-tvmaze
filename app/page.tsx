import { Suspense } from "react"
import Search from "./components/Search"
import { fetchShows } from "./api/tvmaze"

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage(props: Props) {
  const initialSearchQuery = props.searchParams.q
  const initialShows = await fetchShows(initialSearchQuery)

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>TVMaze Next</h1>
      <Suspense>
        <Search
          initialShows={initialShows}
          initialSearchQuery={initialSearchQuery}
        />
      </Suspense>
    </main>
  )
}
