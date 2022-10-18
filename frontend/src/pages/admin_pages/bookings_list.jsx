import ReservationList from "../../components/reservation_components/ReservationList";
import AdminDashboard from "./admin_dashboard";

export default function BookingsList() {
  return (
    <AdminDashboard>
      <ReservationList />
    </AdminDashboard>
  );
}
