import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { createNewBin, getBin, inspectBin } from './services/bins'
import BinHome from './components/BinHome'
import DisplayRequests from './components/DisplayRequests'
import './App.css'

function App() {
  let [binInput, setBinInput] = useState('')
  let [validBin, setValidBin] = useState(false)
  let [currentBin, setCurrentBin] = useState(null)
  let [binRequests, setBinRequests] = useState([])

  const handleCreateClick = async (event) => {
    event.preventDefault()
    let bin = await createNewBin()
    setCurrentBin(bin.url)
    setValidBin(true)
    setBinInput(bin.url)
    setBinRequests([])
  }

  const handleRequestClick = async (event) => {
    event.preventDefault()
    let requests = await inspectBin(currentBin)
    setBinRequests(requests)
  }

  const handleInputClick = async (event) => {
    event.preventDefault()
    const bin = await getBin(binInput)
    if (bin) {
      setCurrentBin(binInput)
      setValidBin(true)
      let requests = await inspectBin(binInput)
      setBinRequests(requests)
    } else {
      setCurrentBin(null)
      setValidBin(false)
    }
  }

  return (
    <Container>
      <header>
        <h2>Quest Bin</h2>
        <BinHome
          binInput={binInput}
          currentBin={currentBin}
          setBinInput={setBinInput}
          validBin={validBin}
          handleCreateClick={handleCreateClick}
          handleRequestClick={handleRequestClick}
          handleInputClick={handleInputClick}
        />
        <DisplayRequests
          validBin={validBin}
          requests={binRequests}
          currentBin={currentBin}
        />
      </header>
    </Container>
  )
}

export default App
