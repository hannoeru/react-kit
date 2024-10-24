import { useEffectOnce } from './use-effect-once'

export function useMount(fn: () => void) {
  useEffectOnce(() => {
    fn()
  })
}
