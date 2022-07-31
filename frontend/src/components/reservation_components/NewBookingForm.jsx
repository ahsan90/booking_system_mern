import { useEffect, useState } from "react";
//import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import { Button, Form, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  create_booking,
  get_all_booked_dates,
  get_booking_by_id,
  update_booking,
} from "../../features/reservation/reservationSlice";
import BookingDetails from "./BookingDetails";

function NewBookingForm(props) {
  let { bookingObj } = props;
  const [selectedDate, setSelectedDate] = useState({
    bookingDate: bookingObj ? new Date(bookingObj.reservation_date) : null,
  });

  const [showBookingDetails, setShowBookingDetails] = useState(false);

  const dispatch = useDispatch();
  const { singleUserDetails } = useSelector((state) => state.user);
  let { isLoading, booking, bookedDates, bookings, isSuccess } = useSelector(
    (state) => state.reservation
  );

  const currentDate = new Date();
  const numberOfDaysToAdd = 60;
  const max_date = currentDate.setDate(
    currentDate.getDate() + numberOfDaysToAdd
  );

  useEffect(() => {
    dispatch(get_all_booked_dates());
  }, [bookings]);

  const onSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      reservation_date: selectedDate?.bookingDate
        ? moment(new Date(selectedDate.bookingDate)).format("YYYY/MM/DD")
        : "",
      email: singleUserDetails?.email,
    };
    setSelectedDate(null);

    if (bookingObj) {
      dispatch(
        update_booking({
          _id: bookingObj._id,
          reservation_date: bookingData.reservation_date,
        })
      );
    } else {
      dispatch(create_booking(bookingData));
    }
    bookingObj = null;
  };
  useEffect(() => {
    if (booking) {
      setShowBookingDetails(true);
    } else {
      setShowBookingDetails(false);
    }
  }, [booking]);

  let booked_days = [];
  bookedDates.map((x) => booked_days.push(moment(new Date(x)).format("ll")));
  //console.log(booked_days?.map((x) => x));
  const isBooked = (date) => {
    let formatedDate = moment(date).format("ll");
    /* for (let index = 0; index < booked_days.length; index++) {
      if (formatedDate === booked_days[index]) return true;
    } */
    return booked_days.includes(formatedDate)
    //return false;
  };
  
  return (
    <div className="">
      <div className="booking">
        <h3>{bookingObj ? "Reschedule Booking" : "New Booking"}</h3>
        <Form type="submit" className="booking_form">
          <Form.Group style={{}}>
            <DatePicker
              className="form-control"
              selected={selectedDate?.bookingDate}
              onChange={(date) => setSelectedDate({ bookingDate: date })}
              minDate={new Date()}
              maxDate={new Date(max_date)}
              dateFormat="dd/MM/yyyy"
              filterDate={(date) => !isBooked(date)}
            />
          </Form.Group>
          <Form.Group
            className="gap-2"
            style={{ marginLeft: "5px"}}
          >
            <Button onClick={onSubmit} style={{}}>
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </Form.Group>
        </Form>
      </div>
      {!bookingObj && booking ? (
        <div className="mt-4">
          <h4>Booking Confirmation</h4>
          <BookingDetails booking={booking} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NewBookingForm;
