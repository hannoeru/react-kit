import { useRef } from 'react'
import { useEffectOnce } from './useEffectOnce'

export function useMountState(): boolean {
  const isMounted = useRef(true)

  useEffectOnce(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  })

  return isMounted.current
}
