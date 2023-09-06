"use client"

import { useEffect } from "react"
import { SearchResultContainer, SearchResultItem } from "./common"
import { Show } from "../../types"
import { clientAPI } from "../../api/client"
import { useSearchQuery } from "../../contexts/SearchQueryContext"
import { useUpdateSearchParam, useStatefulAsyncCallback } from "../../hooks"

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
    <SearchResultContainer error={error} isLoading={isLoading} isSlow={isSlow}>
      {shows.map((show) => {
        return <SearchResultItem key={show.id} show={show} />
      })}
    </SearchResultContainer>
  )
}
