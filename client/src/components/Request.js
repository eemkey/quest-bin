import React from "react";
// accepts a request object as an argument
// display headers and body 

// will still change how we display the requests (add headers, etc), this is just to test it 

const Request = ({ req }) => {
  return (
    <div>
      <p>{req.body}</p>
    </div>
  )
}

export default Request