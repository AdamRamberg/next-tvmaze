import { useState, useCallback } from "react"

const SLOW_THRESHOLD = 2000
const LOADING_THRESHOLD = 200

export const useStatefulAsyncCallback = <
  R,
  T extends (...params: any[]) => Promise<R>,
>(
  asyncCallback: T,
  initialResult: R,
  onSuccess: (() => void) | undefined = undefined,
  onError: (() => void) | undefined = undefined,
  slowThreshold = SLOW_THRESHOLD,
  loadingThreshold = LOADING_THRESHOLD,
): [
  R,
  (...params: Parameters<T>) => Promise<void>,
  { isLoading: boolean; isSlow: boolean; error: undefined | Error },
] => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | undefined>()
  const [isSlow, setIsSlow] = useState(false)
  const [result, setResult] = useState<R>(initialResult)

  const runAsyncCallback = useCallback(
    async (...params: Parameters<T>) => {
      setError(undefined)
      setIsSlow(false)

      const slowTimeout = setTimeout(() => {
        setIsSlow(true)
      }, slowThreshold)

      const loadingTimeout = setTimeout(() => {
        setIsLoading(true)
      }, loadingThreshold)

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
        clearTimeout(slowTimeout)
        clearTimeout(loadingTimeout)
        setIsLoading(false)
      }
    },
    [asyncCallback, slowThreshold, loadingThreshold, onSuccess, onError],
  )

  return [result, runAsyncCallback, { isLoading, isSlow, error }]
}
