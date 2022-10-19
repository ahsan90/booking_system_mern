import ClientDashBoard from "./client_dashboard";
import NewBookingForm from "../../components/reservation_components/NewBookingForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_all_booked_dates } from "../../features/reservation/reservationSlice";

export default function Client_NewBooking() {
  const { bookings } = useSelector(state => state.reservation)
  const dispatch = useDispatch()

  useEffect(() => {
    if (bookings) {
      dispatch(get_all_booked_dates())
    }
  }, [bookings])
  return (
    <ClientDashBoard>
      <NewBookingForm />
    </ClientDashBoard>
  );
}
