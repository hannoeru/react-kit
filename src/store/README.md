# Store

> This is a fork from [mutik](https://github.com/jaredpalmer/mutik)

**Table of Contents**

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [](#)
  - [Example](#example)
  - [API](#api)
    - [`createStore<State>(intialState: State): [Store<State>, useStore<Value>(selector: (state: State) => Value): Value]`](#createstorestateintialstate-state-storestate-usestorevalueselector-state-state--value-value)
      - [`store`](#store)
      - [`useStore<Value>(selector: (state: State) => Value): Value`](#usestorevalueselector-state-state--value-value)
  - [Author](#author)
  - [Inspiration](#inspiration)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Example

```jsx
import React from 'react'
import { render } from 'react-dom'
import { createStore, useSelector } from '@hannoeru/react-kit'

// Create a lil' store with some state
const [store, useStore] = createStore({
  count: 0,
})

// The app doesn't need a provider
const App = () => {
  return (
    <div>
      <Label />
      <Buttons />
    </div>
  )
}

// You can mutate the store from anywhere you want to,
// even outside of React code. Mutate is based on immer.
function increment() {
  store.mutate((state) => {
    state.count++
  })
}

// Or you can update it like React.useState's update
function decrement() {
  store.set(prevState => ({
    ...prevState,
    count: prevState.count - 1,
  }))
}

// You don't need to pass the store down as a prop either
const Buttons = () => {
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </>
  )
}

// Lastly, you can subscribe to "slices" of state by passing a selector to use
// state. The component will only be re-rendered when that portion of state
// re-renders.
const Label = () => {
  const count = useStore(state => state.count)
  return <p>The count is {count}</p>
}

render(<App />, document.getElementById('root'))
```

## API

### `createStore<State>(intialState: State): [Store<State>, useStore<Value>(selector: (state: State) => Value): Value]`

Create a Mutik `store` given some initial state. The `store` has the following API you can use in or out of React.

#### `store`

| **Method**                                            | **Description**                                                                                                                                 |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `get()`                                               | Get the current state. Do not use this inside of React, you should instead use `useStore`                |
| `set(nextState: S \| (prevState: S) => V): void;`     | Set state. This can either take a new value or and updater function (just like React.useState's updater)                                        |
| `on(listener: Function): void;`                 | Subscribe to store. Pass in a callback function that will be executed on updates. |
| `off(listener: Function): void;`                      | Unsubscribe a given listener function                                                                                                           |
| `reset(): void`                                       | Set state back to the `initialState` used when creating the store                                                                               |
| `mutate(updater: (draft: Draft) => void): void;` | Immer-style updater function.                                                                                                                   |

#### `useStore<Value>(selector: (state: State) => Value): Value`

React hook to subscribe to Mutik state.

```jsx
const Label = () => {
  const count = useStore(state => state.count)
  return <p>The count is {count}</p>
}
```

You can use props with Mutik selector.

```jsx
const User = ({ id }) => {
  const user = useStore(state => state.users[id])
  return <p>The username is {user.name}</p>
}
```

## Author

- Jared Palmer [@jaredpalmer](https://twitter.com/jaredpalmer)

## Inspiration

- [bey](https://github.com/jamiebuilds/bey)
- [react-copy-write](https://github.com/aweary/react-copy-write)
- [Brian Vaughn's fake redux](https://codesandbox.io/s/react-redux-usemutablesource-eyxoe)
