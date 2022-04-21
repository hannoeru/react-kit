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

const Buttons = () => {
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <button onClick={() => store.reset()}>reset</button>
    </>
  )
}

const Label = () => {
  const count = useStore(state => state.count)
  return <p>The count is {count}</p>
}

const App = () => {
  return (
    <div>
      <Label />
      <Buttons />
    </div>
  )
}

export default App
