import { useEffect } from 'react'
import type { EffectCallback } from 'react'

export const useEffectOnce = (effect: EffectCallback): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
