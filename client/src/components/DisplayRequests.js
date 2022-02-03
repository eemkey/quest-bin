import React from "react";
import Request from "./Request"

const DisplayRequests = ({ validBin, requests }) => {

  return (
    <div>
      {requests.length === 0 && validBin ?
        <p>No requests found!</p> :
        requests.map(req => {
          return <Request key={req.timestamp} req={req} />}).reverse()}
    </div>
  )
}

export default DisplayRequests