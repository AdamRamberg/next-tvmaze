import { useState, useCallback } from "react"

const SLOW_THRESHOLD = 1000

export const useStatefulAsyncCallback = <
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
