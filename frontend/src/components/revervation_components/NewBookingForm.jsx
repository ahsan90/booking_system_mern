import { useEffect, useState } from "react";
//import Calendar from "react-calendar";
import DatePicker from "react-datepicker";
import { Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { create_booking, get_all_booked_dates } from "../../features/reservation/reservationSlice";

function NewBookingForm() {
  const [selectedDate, setSelectedDate] = useState(null);

  const dispatch = useDispatch();
  const { singleUserDetails } = useSelector((state) => state.user);
  const { bookedDates, bookings } = useSelector((state) => state.reservation);

  const currentDate = new Date();
  const numberOfDaysToAdd = 60;
  const max_date = currentDate.setDate(
    currentDate.getDate() + numberOfDaysToAdd
  );
  const today = new Date();
  const reserved = {
    booked: new Date(today.setDate(today.getDate() + 5)),
  };
  useEffect(() => {
    dispatch(get_all_booked_dates())
  },[bookings, dispatch])
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
        <h2>New Booking Form</h2>
        <Form type="submit" className="booking_form">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            maxDate={new Date(max_date)}
            dateFormat="dd/MM/yyyy"
            filterDate={(date) => !isBooked(date)}
          />
          <Button onClick={onSubmit}>Book</Button>
        </Form>
      </div>
    </div>
  );
}

export default NewBookingForm;
