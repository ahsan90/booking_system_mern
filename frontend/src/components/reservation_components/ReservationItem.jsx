import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { delete_booking } from "../../features/reservation/reservationSlice";
import {
  get_allUsers,
  get_user,
  resetUser,
} from "../../features/user/userSlice";
import { FaEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { Modal, Button, Card, Table } from 'react-bootstrap'
import { Link } from "react-router-dom";
import BookingDetails from "./BookingDetails";

function ReservationItem({booking}) {
  const dispatch = useDispatch();
  let { user, singleUserDetails } = useSelector((state) => state.user);

    const [showDetails, setShowDetails] = useState(false);

    const handleClose = () => setShowDetails(false);
    const handShowDetails = () => setShowDetails(true);

  const onDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(delete_booking(bookingId));
    }
  };
  const updateBooking = (bookingId) => { };

  const onDetails = (booking) => {
    singleUserDetails = null
    dispatch(get_user(booking?.user))
    handShowDetails();
  };

  return (
    <>
      <Modal show={showDetails} onHide={handleClose} style={{ width: "100%" }}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingDetails booking_details={[{ booking }, { singleUserDetails } ]}/>
          {/* <Card>
            <Card.Text>Booking information</Card.Text>
            <Table striped bordered hover>
              <thead>
                <th>Booking Reference</th>
                <th>Reservation Date</th>
                <th>Reservation Booked Date</th>
                <th>Last Updated</th>
              </thead>
              <tbody>
                <tr>
                  <td>{booking?.booking_reference}</td>
                  <td>
                    {moment(booking?.reservation_date).format("ll")}
                  </td>
                  <td>{moment(booking?.createdAt).format("lll")}</td>
                  <td>{moment(booking?.updatedAt).format("lll")}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
          <Card className="mt-4">
            <Card.Text>Customer Information</Card.Text>
            <hr />
            <Card.Body>
              <img className="avatar" src={singleUserDetails?.avatar} alt="" />
              <Card.Text>
                Username:{" "}
                <Link to={`/users/profile/${singleUserDetails?._id}`}>
                  {" "}
                  {singleUserDetails?.username}
                </Link>
              </Card.Text>
              <Card.Text>Email: {singleUserDetails?.email}</Card.Text>
              {singleUserDetails?.profile ? (
                <Card.Text>
                  Customer Name: {singleUserDetails?.profile?.name}
                </Card.Text>
              ) : (
                <Card.Text>No other information found</Card.Text>
              )}
              {singleUserDetails?.profile ? (
                <Card.Text>
                  Phone: {singleUserDetails?.profile?.phone}
                </Card.Text>
              ) : (
                ""
              )}
            </Card.Body>
          </Card> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ display: "block" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <td>{booking.booking_reference}</td>
      <td>{moment(booking.reservation_date).format("ll")}</td>
      <td>{moment(booking.createdAt).format("LLL")}</td>
      <td>
        <button
          onClick={() => {
            onDetails(booking);
          }}
        >
          <AiOutlineEye />
        </button>
        <button onClick={() => updateBooking(booking._id)}>
          <FaEdit />
        </button>
        <button onClick={() => onDelete(booking._id)}>
          <BiTrash />
        </button>
      </td>
    </>
  );
}

export default ReservationItem;
