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
    <main className="flex min-h-screen flex-col items-center bg-slate-900 px-6 py-12 lg:px-12">
      <h1 className="mb-4 lg:mb-6 font-sans text-5xl font-extrabold lg:text-7xl">
        TVMaze Next
      </h1>
      <Suspense>
        <Search
          initialShows={initialShows}
          initialSearchQuery={initialSearchQuery}
        />
      </Suspense>
    </main>
  )
}
