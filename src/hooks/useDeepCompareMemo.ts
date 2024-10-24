import deepEqual from 'deep-equal'
import { useMemo, useRef } from 'react'

export function useDeepCompareMemo<T>(value: T) {
  const ref = useRef<T>(value)
  const signalRef = useRef<number>(0)

  if (!deepEqual(ref.current, value)) {
    ref.current = value
    signalRef.current += 1
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ref.current, [signalRef.current])
}
