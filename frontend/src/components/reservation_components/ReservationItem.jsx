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
import ShowTooltip from "../utils/Tooltip";

function ReservationItem(props) {
  const bookingPayload = props.booking
  const dispatch = useDispatch();
  let { isLoading } = useSelector((state) => state.user);
  const { loggedInUser } = useSelector((state) => state.auth);
  const {booking} = useSelector(state => state.reservation)
  const { id } = useParams();

  const [showDetails, setShowDetails] = useState(false);
  const [showEditBooking, setShowEditBooking] = useState(false);
  //const [bookingToBeUpdated, setBookingToBeUpdated] = useState({bookingObj: null});
  const [bookingDetails, setBookingDetails] = useState({
    singleUserDetails: null,
    booking: null,
  });

  useEffect(() => {
    if (booking !== null) {
      setShowEditBooking(false);
    }
  }, [booking]);

  const handleClose = () => {
    /* if (loggedInUser?.role === ROLES.Admin) {
      dispatch(get_allUsers())
    } */
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
    console.log('From reservation item')
    setShowEditBooking(true);
  };

  const onDetails = (b) => {
    dispatch(get_user(b?.user.toString()));
    handShowDetails();
  };

  return (
    <>
      <Modal show={showDetails} size="lg" onHide={handleClose} style={{}}>
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
            <BookingDetails booking={bookingPayload} />
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
        size="lg"
        onHide={handleClose}
        style={{ width: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewBookingForm bookingObj={bookingPayload} />
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
      <td>{bookingPayload.booking_reference}</td>
      <td>{moment(bookingPayload.reservation_date).toLocaleString('ll')}</td>
      <td>{moment(bookingPayload.createdAt).format("LLL")}</td>
      <td>{moment(bookingPayload.updatedAt).format("LLL")}</td>
      <td>
        <ShowTooltip text={"Booking details"}>
          <button
            onClick={() => {
              onDetails(bookingPayload);
            }}
            className="btn btn-primary"
            style={{ marginRight: "3px" }}
          >
            <AiOutlineEye />
          </button>
        </ShowTooltip>
        <ShowTooltip text={"Reschedule booking"}>
          <button
            onClick={() => updateBooking()}
            className="btn btn-warning"
            style={{ marginRight: "3px" }}
          >
            <FaEdit />
          </button>
        </ShowTooltip>
        <ShowTooltip text={"Delete booking"}>
          <button
            onClick={() => onDelete(bookingPayload._id)}
            className="btn btn-danger"
          >
            <BiTrash />
          </button>
        </ShowTooltip>
      </td>
    </>
  );
}

export default ReservationItem;
