import { useCallback, useEffect, useState } from 'react'

function useDebounce<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  const [args, setArgs] = useState<Parameters<T> | null>(null)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const debouncedFunction = useCallback(
    (...callbackArgs: Parameters<T>) => {
      if (timer) {
        clearTimeout(timer)
      }
      setTimer(
        setTimeout(() => {
          setArgs(callbackArgs)
        }, delay),
      )
    },
    [delay],
  )

  useEffect(() => {
    if (args) {
      callback(...args)
      setArgs(null)
    }
  }, [args, callback])

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [timer])

  return debouncedFunction
}

export default useDebounce
