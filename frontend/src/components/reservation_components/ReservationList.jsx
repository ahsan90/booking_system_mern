import React, { useEffect, useState } from "react";
import { Row, Card, Form, Button, Table, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { get_all_bookings, search_bookings } from "../../features/reservation/reservationSlice";
import BookingHistory from "./BookingHistory";

function ReservationList() {
  const dispatch = useDispatch()
  const { bookings } = useSelector((state) => state.reservation);
  const [searchQuery, setSearchQuery] = useState({
    searchText: ''
  })
  let searchPlaceHolder = `Search Reservation By Booking Reference...`;
  const clearSearch = () => {
    setSearchQuery(() => ({
      searchText: ''
    }))
  }
  const {searchText} = searchQuery
  const handleSearch = (e) => {
    setSearchQuery((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    if (searchText.length > 2) {
      dispatch(search_bookings(searchText))
    } else {
      dispatch(get_all_bookings())
    }
  },[searchText, dispatch])

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
                <BookingHistory />
              </>
            ) : (
              <>
                <Card.Text>No Reservation Found!</Card.Text>
              </>
            )}
          </Card.Body>
        </Card>
      </Row>
    </>
  );
}

export default ReservationList;
