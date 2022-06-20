import { useEffect, useState } from "react";
//import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { create_booking, get_all_booked_dates } from "../../features/reservation/reservationSlice";
import BookingDetails from "./BookingDetails";

function NewBookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);

  const [showBookingDetails, setShowBookingDetails] = useState(false)

  const dispatch = useDispatch();
  const { singleUserDetails } = useSelector((state) => state.user);
  let { booking, bookedDates, bookings, isSuccess } = useSelector((state) => state.reservation);

  const currentDate = new Date();
  const numberOfDaysToAdd = 60;
  const max_date = currentDate.setDate(
    currentDate.getDate() + numberOfDaysToAdd
  );
  
  useEffect(() => {
    dispatch(get_all_booked_dates())
  }, [bookings, dispatch])
  
  const onSubmit = (e) => {
    e.preventDefault();
    setSelectedDate(null)
    const bookingData = {
      reservation_date: selectedDate
        ? moment(new Date(selectedDate)).format("YYYY/MM/DD")
        : "",
      email: singleUserDetails?.email,
    };
    dispatch(create_booking(bookingData));
  };
  useEffect(() => {
    if (booking) {
      setShowBookingDetails(true);
    } else {
      setShowBookingDetails(false);
    }
  }, [booking])
  
  let booked_days = []
  bookedDates.map(x => booked_days.push(moment(new Date(x)).format('ll')))
  //console.log(booked_days?.map((x) => x));
  const isBooked = date => {
    let formatedDate = moment(date).format('ll')
    for (let index = 0; index < booked_days.length; index++) {
      if(formatedDate === booked_days[index]) return true
    }
    return false
  }
  return (
    <div className="">
      <div className="booking">
        <h2>New Booking</h2>
        <Form type="submit" className="booking_form">
          <DatePicker
            className={{ width: "50%" }}
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            maxDate={new Date(max_date)}
            dateFormat="dd/MM/yyyy"
            filterDate={(date) => !isBooked(date)}
          />
          <Button onClick={onSubmit}>Confirm Booking</Button>
        </Form>
      </div>
      {showBookingDetails ? (
        <div className="mt-4">
          <h4>Booking Confirmation</h4>
          <BookingDetails
            booking_details={[{ booking }, { singleUserDetails }]}
          />{" "}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default NewBookingForm;
