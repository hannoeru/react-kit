import { createStore } from '@hannoeru/react-kit'

const [store, useStore] = createStore({
  count: 0,
})

function increment() {
  store.mutate((state) => {
    state.count++
  })
}

function decrement() {
  store.set(prevState => ({
    ...prevState,
    count: prevState.count - 1,
  }))
}

function Buttons() {
  return (
    <>
      <button type="button" onClick={decrement}>-</button>
      <button type="button" onClick={increment}>+</button>
      <button type="button" onClick={() => store.reset()}>reset</button>
    </>
  )
}

function Label() {
  const count = useStore(state => state.count)
  return (
    <p>
      The count is
      {count}
    </p>
  )
}

function App() {
  return (
    <div>
      <Label />
      <Buttons />
    </div>
  )
}

export default App
