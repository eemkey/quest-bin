import React from 'react'
import Request from './Request'
import ListGroup from 'react-bootstrap/ListGroup'

const DisplayRequests = ({ validBin, requests, currentBin }) => {
  if (currentBin) {
    return (
      <ListGroup style={{ backgroundColor: '#fcfcfc' }}>
        {requests.length === 0 && validBin ? (
          <ListGroup.Item>No requests found!</ListGroup.Item>
        ) : (
          requests
            .map((req) => {
              return (
                <ListGroup.Item key={req.timestamp}>
                  <Request req={req} />
                </ListGroup.Item>
              )
            })
            .reverse()
        )}
      </ListGroup>
    )
  } else {
    return null
  }
}

export default DisplayRequests
