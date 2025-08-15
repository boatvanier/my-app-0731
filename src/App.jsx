import React , { Fragment, useEffect } from "react"
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")

  useEffect(()=>{
      document.title =`Hi, ${name}`
  },[name])


  return (
    <>
    <button onClick={()=>setCount(count+1)}>click me</button>
    <p>this button has been clicked {count} times</p>

    <input type="text" value={name} onChange={e=>setName(e.target.value)}></input>
    <p>your name is {name}</p>
    </>
  );
}

export default App
