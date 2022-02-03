import React from "react";
import Request from "./Request"

const DisplayRequests = ({ validBin, requests }) => {

  return (
    <div>
      {requests.length === 0 && validBin ?
        <p>No requests found!</p> :
        requests.forEach(req => {
          <Request key={req.timestamp} req={req} />})}
    </div>
  )
}

export default DisplayRequests