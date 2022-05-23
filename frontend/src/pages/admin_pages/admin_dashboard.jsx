import {useState} from 'react'
import './admin.css'
import AdminTab from "../../components/AdminTab";

function AdminDashboard() {
  const [key, setKey] = useState("users");
  return (
    <>
      <div className="mt-5">
        <AdminTab/>
      </div>
    </>
  );
}

export default AdminDashboard;
