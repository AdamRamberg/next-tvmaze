"use client"
// import Image from 'next/image'
import { useEffect, useState, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Show } from "../types"
import { fetchShows } from "../api/tvmaze"

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

const SLOW_THRESHOLD = 1000

const useStatefulAsyncCallback = <
  R,
  T extends (...params: any[]) => Promise<R>,
>(
  asyncCallback: T,
  initialResult: R,
  onSuccess: (() => void) | undefined = undefined,
  onError: (() => void) | undefined = undefined,
  slowThreshold = SLOW_THRESHOLD,
): [
  R,
  (...params: Parameters<T>) => Promise<void>,
  { isLoading: boolean; isSlow: boolean; error: undefined | Error },
] => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)
  const [isSlow, setIsSlow] = useState(false)
  const [result, setResult] = useState<R>(initialResult)

  const runAsyncCallback = useCallback(
    async (...params: Parameters<T>) => {
      setError(undefined)
      setIsSlow(false)
      setIsLoading(true)

      const timeout = setTimeout(() => {
        setIsSlow(true)
      }, slowThreshold)

      try {
        const res = await asyncCallback(...params)
        setResult(res)
        onSuccess?.()
      } catch (err) {
        if (err instanceof Error) {
          setError(err)
        }
        onError?.()
      } finally {
        clearTimeout(timeout)
        setIsLoading(false)
      }
    },
    [asyncCallback, slowThreshold, onSuccess, onError],
  )

  return [result, runAsyncCallback, { isLoading, isSlow, error }]
}

type Props = {
  initialShows: Show[]
  query: string | undefined
}

export default function SearchResult({ initialShows = [], query = "" }: Props) {
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
  )
}
