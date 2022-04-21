import { useEffectOnce } from './use-effect-once'

export const useMount = (fn: () => void) => {
  useEffectOnce(() => {
    fn()
  })
}
