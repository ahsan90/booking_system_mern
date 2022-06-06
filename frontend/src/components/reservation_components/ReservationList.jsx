import React from 'react'
import {Row, Card, Button, Table} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import BookingHistory from './BookingHistory';

function ReservationList() {
  const { bookings } = useSelector((state) => state.reservation);
  return (
    <>
      <Row className="mt-3">
        <h3>Booking Search Funtionality goes here</h3>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>All Booking Listing</Card.Text>
            <BookingHistory />
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}

export default ReservationList