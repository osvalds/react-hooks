// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useEffect} from 'react'

const getDefaultValue = (key, initial) => {
  return JSON.parse(window.localStorage.getItem(key)) || initial
}

const useLocalStorage = (key, defaultValue = "") => {
  const [state, setState] = React.useState(() => getDefaultValue(key, defaultValue))

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
