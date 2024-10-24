import { useEffect } from 'react'
import { useMountState } from './useMountState'

export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useMountState()

  useEffect(() => {
    if (!isMounted) {
      return effect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
