import DisplayRequests from './DisplayRequests'

const BinHome = ({binInput, setBinInput, validBin, setValidBin, handleClick, handleRequestClick}) => {
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
      <button onClick={handleClick}>Create a RequestBin</button>
    </div>
          {validBin ? (
        <div>
          <h3>You can send requests to {`http://localhost:3001/${binInput}`}</h3>
          <button onClick={handleRequestClick}>Inspect requests sent to {binInput}</button>
        </div>
      ) : null}

    </>
  )
}

export default BinHome