import React from 'react'
import moment from 'moment'
import {useDispatch} from 'react-redux'
import { delete_booking } from '../../features/reservation/reservationSlice'

function ReservationItem(props) {
  const dispatch = useDispatch()
  const onDelete = bookingId => {
    dispatch(delete_booking(bookingId))
  }
  return (
    <>
      <td>{props.booking.booking_reference}</td>
      <td>{moment(props.booking.reservation_date).format('ll')}</td>
      <td>{moment(props.booking.createdAt).format('LLL')}</td>
      <td>
        <button>Edit</button>
        <button onClick={() => onDelete(props.booking._id)}>Delete</button>
      </td>
    </>
  );
}

export default ReservationItem