import { useEffect, useRef, useState } from "react";
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
import { Modal, Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import BookingDetails from "./BookingDetails";
import NewBookingForm from "./NewBookingForm";

function ReservationItem({ booking }) {
  const dispatch = useDispatch();
  let { user, singleUserDetails } = useSelector((state) => state.user);

  const [showDetails, setShowDetails] = useState(false);
  const [showEditBooking, setShowEditBooking] = useState(false);
  //const [bookingToBeUpdated, setBookingToBeUpdated] = useState({bookingObj: null});

  useEffect(() => {
    setShowEditBooking(false)
  }, [booking])

  const handleClose = () => {
    setShowDetails(false);
    setShowEditBooking(false);
    /* setBookingToBeUpdated(() => ({
      bookingObj: null,
    })); */
  };
  const handShowDetails = () => setShowDetails(true);

  const onDelete = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(delete_booking(bookingId));
    }
  };
  const updateBooking = () => {
    setShowEditBooking(true);
  };
  //console.log(bookingToBeUpdated?.bookingObj)

  const onDetails = (booking) => {
    dispatch(get_user(booking?.user.toString()));
    handShowDetails();
  };

  return (
    <>
      <Modal show={showDetails} onHide={handleClose} style={{ width: "100%" }}>
        <Modal.Header closeButton>
          <Modal.Title>Reservation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingDetails
            booking_details={[{ booking }, { singleUserDetails }]}
          />
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
      <Modal
        show={showEditBooking}
        onHide={handleClose}
        style={{ width: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewBookingForm bookingObj={booking} />
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
          className="btn btn-primary"
          style={{ marginRight: "3px" }}
        >
          <AiOutlineEye />
        </button>
        <button
          onClick={() => updateBooking()}
          className="btn btn-warning"
          style={{ marginRight: "3px" }}
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(booking._id)}
          className="btn btn-danger"
        >
          <BiTrash />
        </button>
      </td>
    </>
  );
}

export default ReservationItem;
