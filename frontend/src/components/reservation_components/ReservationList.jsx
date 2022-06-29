import { useEffect, useState } from "react";
import { Row, Card, Form, Button, Table, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  get_all_bookings,
  search_bookings,
} from "../../features/reservation/reservationSlice";
import ReservationItem from "./ReservationItem";
import ReactPaginate from "react-paginate";

function ReservationList() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.reservation);
  const [searchQuery, setSearchQuery] = useState({
    searchText: "",
  });
  const [pageNumber, setPageNumber] = useState(0);

  let searchPlaceHolder = `Search Reservation By Booking Reference...`;
  const { searchText } = searchQuery;

  useEffect(() => {
    if (searchText.length > 2) {
      dispatch(search_bookings(searchText));
    } else {
      dispatch(get_all_bookings());
    }
  }, [searchText.length, dispatch]);

  const clearSearch = () => {
    setSearchQuery(() => ({
      searchText: "",
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const bookingsPerPage = 10;
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

  return (
    <>
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
      {bookings?.length > 0 && (
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
