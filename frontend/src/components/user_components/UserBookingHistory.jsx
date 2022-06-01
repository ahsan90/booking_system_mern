import React from "react";
import Table from "react-bootstrap/Table";
import { useEffect, useSelector } from "react-redux";
import ReservationItem from "../revervation_components/ReservationItem";

function UserBookingHistory() {
  const { bookings } = useSelector(
    (state) => state.reservation
  );
  
  return (
    <div>
      {bookings.length>0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking Reference</th>
              <th>Reservation Date</th>
              <th>Booking Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            {bookings?.map((booking) => (
              <tr key={booking._id}>
                <ReservationItem booking={booking} />
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <h3>No Booking History Found</h3>
      )}
    </div>
  );
}

export default UserBookingHistory;
