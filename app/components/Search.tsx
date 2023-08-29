"use client"

import { Suspense, useState } from "react"
import { SearchResult } from "./SearchResult"
import { SearchInput } from "./SearchInput"
import { Show } from "../types"

type Props = {
  initialShows: Show[]
  initialSearchQuery: string | undefined
}

export default function Search({
  initialShows = [],
  initialSearchQuery = "",
}: Props) {
  const [input, setInput] = useState(initialSearchQuery)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  return (
    <>
      <SearchInput
        value={input}
        onChange={setInput}
        onSubmit={() => {
          setSearchQuery(input)
        }}
      />
      <Suspense>
        <SearchResult initialShows={initialShows} query={searchQuery} />
      </Suspense>
    </>
  )
}
