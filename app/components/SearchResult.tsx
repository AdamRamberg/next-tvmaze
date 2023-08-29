"use client"
// import Image from 'next/image'
import { useEffect, useState, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Show } from "../types"
import { fetchShows } from "../api/tvmaze"

type Props = {
  initialShows: Show[]
  query: string | undefined
}

const useUpdateSearchParam = (key: string) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const update = useCallback(
    (value: string | undefined) => {
      const writeableSearchParams = new URLSearchParams(
        Array.from(searchParams.entries()),
      )
      const trimmedValue = value?.trim()

      let wasUpdated = false
      if (!trimmedValue && writeableSearchParams.has(key)) {
        writeableSearchParams.delete(key)
        wasUpdated = true
      } else if (
        trimmedValue &&
        writeableSearchParams.get(key) !== trimmedValue
      ) {
        writeableSearchParams.set(key, trimmedValue)
        wasUpdated = true
      }

      if (!wasUpdated) {
        return wasUpdated
      }

      // Update router with new search params
      const updatedSearchParams = writeableSearchParams.toString()
      const query = updatedSearchParams ? `?${updatedSearchParams}` : ""
      router.push(`${pathname}${query}`)

      return wasUpdated
    },
    [key, pathname, router, searchParams],
  )

  return update
}

export default function SearchResult({ initialShows = [], query = "" }: Props) {
  const [shows, setShows] = useState<Show[]>(initialShows)
  const updateSearchQuery = useUpdateSearchParam("q")

  useEffect(() => {
    const refetchShows = async () => {
      const wasUpdated = updateSearchQuery(query)
      if (!wasUpdated) {
        return
      }
      const result = await fetchShows(query)
      setShows(result)
    }
    refetchShows()
  }, [query, updateSearchQuery])

  return (
    <>
      <div className="flex flex-col">
        {shows.map(({ show }) => {
          return (
            <div key={show.id} className="flex flex-col items-center">
              {/* {Boolean(show.image) && <Image src={show.image.medium} width="200" height="300" />} */}
              <h1>{show.name}</h1>
            </div>
          )
        })}
      </div>
    </>
  )
}
