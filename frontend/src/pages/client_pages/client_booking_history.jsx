import ClientDashBoard from "./client_dashboard";
import BookingHistory from "../../components/reservation_components/BookingHistory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_all_booked_dates } from "../../features/reservation/reservationSlice";

export default function Client_Booking_History() {

  const { bookings } = useSelector((state) => state.reservation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookings) {
      dispatch(get_all_booked_dates());
    }
  }, [bookings]);
  
  return (
    <ClientDashBoard>
      <BookingHistory />
    </ClientDashBoard>
  );
}
