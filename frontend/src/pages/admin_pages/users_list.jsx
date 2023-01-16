import UsersListing from "../../components/user_components/UserList";
import AdminDashboard from "./admin_dashboard"

export default function UsersList() {
  
    return (
      <AdminDashboard>
        <UsersListing/>
      </AdminDashboard>
    );
}
