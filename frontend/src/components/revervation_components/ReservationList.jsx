import React from 'react'
import {Row, Card, Button} from 'react-bootstrap'

function ReservationList() {
  return (
    <>
      <Row className="mt-3">
        <h2>Booking History</h2>
        <Card style={{ width: "100%" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}

export default ReservationList