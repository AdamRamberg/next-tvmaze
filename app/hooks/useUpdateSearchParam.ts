import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const useUpdateSearchParam = (key: string) => {
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
