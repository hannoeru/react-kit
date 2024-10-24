import type { EffectCallback } from 'react'
import { useEffect } from 'react'

export function useEffectOnce(effect: EffectCallback): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
