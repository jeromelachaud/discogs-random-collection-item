import axios from 'axios'
import { default as React, useEffect, useState } from 'react'
import './App.css'
import logo from './logo.svg'
import { Release } from './Release'
const { baseUrl } = require('./config/app')

const Api = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/release`,
    })
    return response
  } catch (error) {
    console.error(error)
    return error
  }
}

function App() {
  const [release, setRelease] = useState([{}])
  const [color, setcolor] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchRelease = async () => {
    const response = await Api()
    console.log(response.data.color)
    setRelease(response.data.release)
    setcolor(response.data.color)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRelease()
  }, [])

  return (
    <div className="App">
      {isLoading ? (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      ) : (
        <header
          className="App-header"
          style={{
            backgroundColor: `rgba(${color.bgColor.join(',')})`,
            color: color.textColor,
          }}
        >
          <Release {...release} />
        </header>
      )}
    </div>
  )
}

export default App
