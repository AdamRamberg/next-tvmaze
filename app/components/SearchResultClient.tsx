"use client"

import { useEffect } from "react"
import { SearchItem } from "./SearchItem"
import { Show } from "../types"
import { clientAPI } from "../api/client"
import { useSearchQuery } from "../contexts/SearchQueryContext"
import { useUpdateSearchParam, useStatefulAsyncCallback } from "../hooks"

type Props = {
  initialShows: Show[]
}

export const SearchResultClient = ({ initialShows = [] }: Props) => {
  const [shows, updateShows, { isLoading, isSlow, error }] =
    useStatefulAsyncCallback(clientAPI.fetchShows, initialShows)
  const updateSearchQuery = useUpdateSearchParam("q")
  const searchQuery = useSearchQuery()

  useEffect(() => {
    const wasUpdated = updateSearchQuery(searchQuery)
    if (!wasUpdated) {
      return
    }
    updateShows({ searchParams: new URLSearchParams({ q: searchQuery }) })
  }, [searchQuery, updateShows, updateSearchQuery])

  return (
    <div className="relative flex w-full max-w-md flex-col overflow-y-hidden">
      <div className="relative my-1 h-6 w-full flex-row">
        <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-row items-center justify-between">
          {error && (
            <p className="mr-4 text-sm text-red-400">Something went wrong...</p>
          )}
          {!error && isLoading && (
            <p className="mr-4 text-sm text-slate-400">Loading...</p>
          )}
          {!error && isLoading && isSlow && (
            <p className="text-sm text-slate-400 text-yellow-300">
              Search seems slower than usual
            </p>
          )}
        </div>
      </div>
      <div className="overflow-y-scroll p-1 pb-8">
        {shows.map((show) => {
          return <SearchItem key={show.id} show={show} />
        })}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-slate-900 from-slate-900" />
    </div>
  )
}
