import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './BinHome.css'

const BinHome = ({
  binInput,
  currentBin,
  setBinInput,
  validBin,
  handleCreateClick,
  handleRequestClick,
  handleInputClick,
}) => {
  return (
    <div className="BinHome">
      <p>Quest Bin is a Request Bin clone that provides you a URL that will collect requests made to it and lets you inspect those requests.</p>
      <br />
      <p>Inspect Your Bin:</p>
      <Form onSubmit={handleInputClick}>
        <Row className="justify-content-center">
          <Col sm="auto" style={{ paddingRight: 0 }}>
            <Form.Control
              className="form-input"
              type="text"
              placeholder="Enter bin ID..."
              value={binInput}
              onChange={(e) => setBinInput(e.target.value)}
            />
          </Col>
          <Col sm="auto" style={{ paddingLeft: '5px' }}>
            <Button variant="outline-primary" type="submit">
              Go
            </Button>
          </Col>
        </Row>
      </Form>
      <div>
        <Button
          className="createBtn"
          variant="primary"
          onClick={handleCreateClick}
        >
          Create a Bin
        </Button>
      </div>
      <br />
      {validBin ? (
        <div>
          <p>
            You can send requests to:{' '}
            <code>{`${window.location.href}${currentBin}`}</code>
          </p>
          <br />
          <Button variant="dark" onClick={handleRequestClick}>
            Inspect requests sent to {currentBin}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default BinHome
