import type { Draft } from 'immer'
import { produce } from 'immer'
import { useSyncExternalStoreWithSelector as useSyncExternalStore } from 'use-sync-external-store/shim/with-selector'

// eslint-disable-next-line ts/no-unsafe-function-type
type Listener = Function
type UpdaterFn<State> = (prevState: State) => State
type Selector<State, Selection> = (state: State) => Selection

export interface Store<State> {
  get: () => State
  set: (updater: State | UpdaterFn<State>) => void
  on: (listener: Listener) => void
  off: (listener: Listener) => void
  reset: () => void
  mutate: (updater: (draft: Draft<State>) => void) => void
}

export function createStore<State>(initialState: State) {
  let listeners: Listener[] = []
  let currentState = initialState
  const store: Store<State> = {
    get() {
      return currentState
    },
    set(nextState) {
      currentState
        = typeof nextState === 'function'
          ? (nextState as UpdaterFn<State>)(currentState)
          : nextState
      listeners.forEach(listener => listener())
    },
    on(listener) {
      listeners.push(listener)
    },
    off(listener) {
      listeners = listeners.filter(fn => fn !== listener)
    },
    reset() {
      this.set(initialState)
    },
    mutate(updater) {
      const currState = this.get()
      const nextState = produce(currState, updater)
      if (nextState !== currState)
        this.set(nextState as State)
    },
  }

  function useStore<DerivedValue>(
    selector: Selector<State, DerivedValue>,
  ) {
    const snap = selector ?? (state => state)
    const selection = useSyncExternalStore((change) => {
      store.on(change)
      return () => store.off(change)
    }, store.get, store.get, snap)
    return selection
  }

  return [store, useStore] as const
}
