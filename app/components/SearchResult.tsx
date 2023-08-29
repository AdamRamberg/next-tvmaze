"use client"

import { useEffect } from "react"
import { SearchItem } from "./SearchItem"
import { ShowResult } from "../types"
import { fetchShows } from "../api/tvmaze"
import { useUpdateSearchParam, useStatefulAsyncCallback } from "../hooks"

type Props = {
  initialShows: ShowResult[]
  query: string | undefined
}

export const SearchResult = ({ initialShows = [], query = "" }: Props) => {
  const [shows, updateShows, { isLoading, isSlow, error }] =
    useStatefulAsyncCallback(fetchShows, initialShows)
  const updateSearchQuery = useUpdateSearchParam("q")

  useEffect(() => {
    const wasUpdated = updateSearchQuery(query)
    if (!wasUpdated) {
      return
    }
    updateShows(query)
  }, [query, updateShows, updateSearchQuery])

  return (
    <div className="flex w-full max-w-md flex-col">
      {shows.map(({ show }) => {
        return <SearchItem key={show.id} show={show} />
      })}
    </div>
  )
}
