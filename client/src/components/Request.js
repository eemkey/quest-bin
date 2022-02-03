import React from "react";
// accepts a request object as an argument
// display headers and body

// will still change how we display the requests (add headers, etc), this is just to test it

const Request = ({ req }) => {
  return (
    <div>
      <div>
        <p>Timestamp: {req.timestamp}</p>
        <p>
          {req.method} {req.url}
        </p>
        <p>Raw Body: {req.body}</p>

        <h3>Request Headers</h3>
        {/* <p>Host: {req.headers.host}</p>
        <p>Accept: {req.headers.accept}</p>
        <p>Cookie: {req.headers.cookie}</p>
        <p>User-Agent: {req.headers["user-agent"]}</p> */}
        {Object.keys(req.headers).map((key) => {
          return (
            <p>
              {key} : {req.headers[key]}
            </p>
          );
        })}
        <hr></hr>
      </div>
    </div>
  );
};

export default Request;
