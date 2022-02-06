import React from 'react'
import Form from 'react-bootstrap/Form'

const Request = ({ req }) => {
  return (
    <div style={{ wordWrap: 'break-word' }}>
      <div>
        <strong>Timestamp :</strong> {req.timestamp}
        <p>
          <strong>
            {req.method} {req.url}
          </strong>
        </p>
        <br />
        <h4>Body: </h4>
        <Form.Control as="textarea" rows={3} value={req.body} readOnly />
        <br />
        <h4>Request Headers:</h4>
        {Object.keys(req.headers).map((key) => {
          return (
            <p key={key}>
              <span>
                <strong>{key} :</strong>
              </span>{' '}
              {req.headers[key]}
            </p>
          )
        })}
        <br />
      </div>
    </div>
  )
}

export default Request
