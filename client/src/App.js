import React, { useEffect, useState } from "react";
// api
import { createNewBin, getBin, inspectBin } from "./services/bins"
import BinHome from './components/BinHome'
import DisplayRequests from "./components/DisplayRequests";

function App() {
  let [binInput, setBinInput] = useState(""); 
  let [validBin, setValidBin] = useState(false);
  let [currentBin, setCurrentBin] = useState(null);
  let [binRequests, setBinRequests] = useState([])

  useEffect(() => {
    // if no bin input set by user
    if (!currentBin) {
      setBinRequests([]);
      return;
    }
  //  add websocket functionality to monitor for new requests
  }, [currentBin]);

  useEffect(() => {
    if (binInput) {
     // validate length of bin before displaying any requests or HTTP request commands
    // add validation to make sure bin exists in db? YES
    const checkBinValidation = (value) => {
      if (value.length === 6) {
        setCurrentBin(binInput);
        setValidBin(true);
      } else {
        setValidBin(false);
        setCurrentBin(null);
      }
    };
      checkBinValidation(binInput);
    }
  }, [binInput]);

  const handleClick = async (event) => {
    event.preventDefault();
    let bin = await createNewBin();
    setCurrentBin(bin.url);
    setValidBin(true);
    setBinInput(bin.url);
  }

  // making the call to the current url to get all of its requests
  // update the binRequests array
  const handleRequestClick = async (event) => {
    event.preventDefault();
    let requests = await inspectBin(currentBin)
    setBinRequests(requests);
  }

  return (
    <div>
      <header>
        <h2>Request Bin</h2>
        <BinHome binInput={binInput} setBinInput={setBinInput} validBin={validBin} setValidBin={setValidBin} handleClick={handleClick} handleRequestClick={handleRequestClick}/>
        <DisplayRequests validBin={validBin} requests={binRequests} />
      </header>
    </div>
 
  );
}

export default App;
