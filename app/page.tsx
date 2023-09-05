import Search from "./components/Search"
import { SearchResultServer } from "./components/SearchResultServer"

type Props = {
  searchParams: Record<string, string | undefined>
}

export default async function SearchPage(props: Props) {
  const initialSearchQuery = props.searchParams.q

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center overflow-hidden bg-slate-900 px-6 py-12 pb-0 lg:px-12">
      <h1 className="mb-4 font-sans text-5xl font-extrabold lg:mb-6 lg:text-7xl">
        TVMaze Next
      </h1>
      <Search initialSearchQuery={initialSearchQuery}>
        <SearchResultServer initialSearchQuery={initialSearchQuery} />
      </Search>
    </main>
  )
}
