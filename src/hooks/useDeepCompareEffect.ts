import { useEffect } from 'react'
import { useDeepCompareMemo } from './use-deep-compare-memo'

type UseEffectParams = Parameters<typeof useEffect>
type EffectCallback = UseEffectParams[0]
type DependencyList = UseEffectParams[1]
type UseEffectReturn = ReturnType<typeof useEffect>

export function useDeepCompareEffect(callback: EffectCallback, dependencies: DependencyList): UseEffectReturn {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemo(dependencies))
}
