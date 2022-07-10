import { useEffect, useState } from "react";
import {
  Row,
  Card,
  Form,
  Button,
  Table,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_bookings,
  search_bookings,
} from "../../features/reservation/reservationSlice";
import ReservationItem from "./ReservationItem";
import ReactPaginate from "react-paginate";
import NewBookingForm from "./NewBookingForm";
import { resetUser, search_users, search_user_by_username_email } from "../../features/user/userSlice";

function ReservationList() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.reservation);
  let { user, message, isLoading, isError } = useSelector(state => state.user)
  const [searchQuery, setSearchQuery] = useState({
    searchText: "",
    userSearchText: ""
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [errorText, setErrorText] = useState(null)

  let searchPlaceHolder = `Search Reservation By Booking Reference...`;
  const { searchText, userSearchText } = searchQuery;

  useEffect(() => {
    if (searchText?.length > 2) {
      dispatch(search_bookings(searchText));
    } else {
      dispatch(get_all_bookings());
    }
  }, [searchText?.length, dispatch]);

  useEffect(() => {
    if (userSearchText?.length > 2) {
      dispatch(search_user_by_username_email(userSearchText))
    }
    if (userSearchText?.length <= 2) {
      setShowBookingForm(false)
      setErrorText(null);
    }
    if (isError && userSearchText?.length > 2) {
      setErrorText(message?.error);
    } else {
      setErrorText(null)
    }
  }, [userSearchText?.length, isError, dispatch])

  useEffect(() => {
    if (user) {
      setShowBookingForm(true)
    } else {
      setShowBookingForm(false)
    }
  }, [user])

  const clearSearch = () => {
    setSearchQuery(() => ({
      searchText: "",
      userSearchText: ""
    }));
    setErrorText(null)
  };

  const handleSearch = (e) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const bookingsPerPage = 9;
  const pageCount = Math.ceil(bookings.length / bookingsPerPage);
  const pagesVisited = pageNumber * bookingsPerPage;
  const displayBookings = bookings
    .slice(pagesVisited, pagesVisited + bookingsPerPage)
    .map((booking) => {
      return (
        <tr key={booking._id}>
          <ReservationItem booking={booking} />
        </tr>
      );
    });

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  const addBooking = () => {
    setShowNewBooking(true);
  };

  const handleClose = () => {
    setShowNewBooking(false);
    setShowBookingForm(false)
    setSearchQuery(() => ({ userSearchText: "", searchText: "" }))
    setErrorText(null)
  };

  const handleSearchProfileByEmailUsername = (e) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <>
      <Button onClick={addBooking}>+Add Booking</Button>
      <Modal
        show={showNewBooking}
        onHide={handleClose}
        style={{ width: "100%" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Booking Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="">
            <Form.Control
              type="text"
              name="userSearchText"
              value={userSearchText}
              onChange={handleSearchProfileByEmailUsername}
              placeholder="Enter Registered Email/Username"
              aria-describedby="basic-addon1"
              style={{ display: "inline-block", width: "90%" }}
            />
            {userSearchText.length > 0 && (
              <InputGroup.Text
                className="clear_booking_search"
                onClick={clearSearch}
              >
                X
              </InputGroup.Text>
            )}
          </InputGroup>
          {showBookingForm && <NewBookingForm />}
          {errorText && <p style={{ color: "red" }}>{message?.error}</p>}
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
      <Row className="mt-3">
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <div className="clientListHead mb-3">
              <h4>All Reservation Listings</h4>
              <InputGroup className="client_search">
                <Form.Control
                  type="text"
                  name="searchText"
                  value={searchText}
                  onChange={handleSearch}
                  placeholder={searchPlaceHolder}
                  aria-describedby="basic-addon1"
                />
                {searchText.length > 0 && (
                  <InputGroup.Text
                    className="clear_booking_search"
                    onClick={clearSearch}
                  >
                    X
                  </InputGroup.Text>
                )}
              </InputGroup>
            </div>
            {bookings?.length > 0 ? (
              <>
                <Card.Title></Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Booking Reference</th>
                      <th>Reservation Date</th>
                      <th>Booking Creation Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{displayBookings}</tbody>
                </Table>
              </>
            ) : (
              <>
                <Card.Text>No Reservation Found!</Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Row>
      {bookings?.length > 0 && bookings?.length > 9 && (
        <div className="mt-3">
          <ReactPaginate
            previousLabel={"<<Previous"}
            nextLabel={"Next>>"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
}

export default ReservationList;
