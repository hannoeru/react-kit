import { useRef } from 'react'
import { useEffectOnce } from './use-effect-once'

export function useUnmount(fn: () => any): void {
  const fnRef = useRef(fn)

  // update the ref each render so if it change the newest callback will be invoked
  fnRef.current = fn

  useEffectOnce(() => () => fnRef.current())
}
