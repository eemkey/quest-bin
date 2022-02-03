import React, { useEffect, useState } from "react";
// api
import { createNewBin, getBin } from "./services/bins"

const BinHome = ({binInput, setBinInput, validBin, setValidBin}) => {
  return (
    <>
    <div>
      Inspect Your Bin
    </div>
    <div>
      <input
       type="text"
       placeholder="Inspect bin requests..."
       // retrieve list of bin requests or request templates if valid bin input
        // onChange={(e) => setBinInput(e.target.value)}
        // value={binInput}
        />
    </div>
    <div>
      <button>Create a RequestBin</button>
    </div>
          {validBin ? (
        <div>
          <h3>{`http://localhost:3000/bin/${binInput}`}</h3>
        </div>
      ) : null}

    </>
  )
}

// add BinRequests component to view request headers

function App() {
  let [binInput, setBinInput] = useState("");
  let [validBin, setValidBin] = useState(false);
  let [currentBin, setCurrentBin] = useState(null);

  useEffect(() => {
    // if no bin input set by user
    if (!currentBin) {
      // setBinRequest([]);
      return;
    }
  //  add websocket functionality to monitor for new requests
  }, [currentBin]);

  useEffect(() => {
    if (binInput) {
     // validate length of bin before displaying any requests or HTTP request commands
    // add validation to make sure bin exists in db?
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



  return (
    <div>
      <header>
        <h2>Request Bin</h2>
        <BinHome />
      </header>
    </div>
 
  );
}

export default App;
