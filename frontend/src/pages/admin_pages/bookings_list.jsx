import ReservationList from "../../components/reservation_components/ReservationList";
import AdminDashboard from "./admin_dashboard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { get_all_booked_dates } from "../../features/reservation/reservationSlice";

export default function BookingsList() {

  const { bookings } = useSelector((state) => state.reservation);
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookings) {
      dispatch(get_all_booked_dates());
    }
  }, [bookings]);

  return (
    <AdminDashboard>
      <ReservationList />
    </AdminDashboard>
  );
}
