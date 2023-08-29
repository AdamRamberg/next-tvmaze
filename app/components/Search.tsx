"use client"

import { Suspense, useState } from "react"
import SearchResult from "./SearchResult"
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
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSearchQuery(input)
          setInput("")
        }}
      >
        <input
          className="text-black caret-black"
          onChange={(e) => {
            setInput(e.target.value)
          }}
          value={input}
        />
      </form>
      <Suspense>
        <SearchResult initialShows={initialShows} query={searchQuery} />
      </Suspense>
    </>
  )
}
