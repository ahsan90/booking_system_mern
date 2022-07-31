import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  delete_booking,
  get_all_bookings,
  get_bookings_by_user,
  get_booking_by_id,
} from "../../features/reservation/reservationSlice";
import { get_allUsers, get_user } from "../../features/user/userSlice";
import { FaEdit } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { Modal, Button, Card, Table, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import BookingDetails from "./BookingDetails";
import NewBookingForm from "./NewBookingForm";
import CustomSpinner from "../CustomSpinner";
import ROLES from "../../helper/allowedRoles";

function ReservationItem({ booking }) {
  const dispatch = useDispatch();
  let { isLoading } = useSelector(
    (state) => state.user
  );
  const { loggedInUser } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [showDetails, setShowDetails] = useState(false);
  const [showEditBooking, setShowEditBooking] = useState(false);
  //const [bookingToBeUpdated, setBookingToBeUpdated] = useState({bookingObj: null});
  const [bookingDetails, setBookingDetails] = useState({
    singleUserDetails: null,
    booking: null
  }) 

  useEffect(() => {
    setShowEditBooking(false);
  }, [booking]);

  const handleClose = () => {
    
     if (loggedInUser?.role === ROLES.Admin) {
      dispatch(get_allUsers())
    }
    setShowDetails(false);
    setShowEditBooking(false);
    
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

  const onDetails = (b) => {
    dispatch(get_user(b?.user.toString()));
    handShowDetails();
  };

  return (
    <>
      <Modal
        show={showDetails}
        size='lg'
        onHide={handleClose}
        style={{}}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reservation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div style={{}}>
              {/* <Spinner animation="border" variant="success" /> */}
              <CustomSpinner />
            </div>
          ) : (
            <BookingDetails booking={booking} />
          )}
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
        size='lg'
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
      <td>{moment(booking.updatedAt).format("LLL")}</td>
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
