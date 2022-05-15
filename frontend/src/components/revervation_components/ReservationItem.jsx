import React from 'react'
import moment from 'moment'

function ReservationItem({booking}) {
  return (
    <>
      <td>{booking.booking_reference}</td>
      <td>{moment(booking.reservation_date).format('ll')}</td>
      <td>{moment(booking.createdAt).format('LLL')}</td>
      <td>
        <button>Edit</button>
        <button>Delete</button>
      </td>
    </>
  );
}

export default ReservationItem