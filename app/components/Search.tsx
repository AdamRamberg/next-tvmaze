"use client"

import { Suspense, useState } from "react"
import { SearchInput } from "./SearchInput"
import { SeachQueryProvider } from "../contexts/SearchQueryContext"
import { SearchResultSkeleton } from "./SearchResult/common"

type Props = {
  initialSearchQuery: string | undefined
  children: React.ReactNode
}

export default function Search({ initialSearchQuery = "", children }: Props) {
  const [input, setInput] = useState(initialSearchQuery)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  return (
    <SeachQueryProvider value={searchQuery}>
      <SearchInput
        value={input}
        onChange={setInput}
        onSubmit={() => {
          setSearchQuery(input)
        }}
      />
      <Suspense fallback={<SearchResultSkeleton />}>{children}</Suspense>
    </SeachQueryProvider>
  )
}
