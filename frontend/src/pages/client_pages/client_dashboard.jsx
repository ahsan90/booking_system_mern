import React from 'react'
import {Row, Col} from 'react-bootstrap'

function ClientDashBoard() {
  return (
    <>
      <div>
        <Row>
          <Col xs={12} md={2}>
            xs=12 md=8
          </Col>
          <Col xs={6} md={10}>
            xs=6 md=4
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ClientDashBoard