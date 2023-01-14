import ReservationList from "../../components/reservation_components/ReservationList";
import AdminDashboard from "./admin_dashboard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
	get_all_booked_dates,
	get_all_bookings,
	resetReservation,
} from "../../features/reservation/reservationSlice";

export default function BookingsList() {
	const { bookings } = useSelector((state) => state.reservation);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(get_all_bookings());
		return () => {
			dispatch(resetReservation());
		};
	}, []);

	useEffect(() => {
		if (bookings) {
			dispatch(get_all_booked_dates());
		}
	}, [bookings, dispatch]);

	return (
		<AdminDashboard>
			<ReservationList />
		</AdminDashboard>
	);
}
