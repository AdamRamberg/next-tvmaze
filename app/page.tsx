import { Suspense } from "react"
import Search from "./components/Search"
import { serverAPI } from "./api/server"

type Props = {
  searchParams: { [key: string]: string | undefined }
}

export default async function SearchPage(props: Props) {
  const initialSearchQuery = props.searchParams.q
  const initialShows = await serverAPI.fetchShows(initialSearchQuery)

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center overflow-hidden bg-slate-900 px-6 py-12 pb-0 lg:px-12">
      <h1 className="mb-4 font-sans text-5xl font-extrabold lg:mb-6 lg:text-7xl">
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
