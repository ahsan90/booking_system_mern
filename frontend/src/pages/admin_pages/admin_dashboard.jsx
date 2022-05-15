import { Link } from "react-router-dom";
import {useState} from 'react'
import { Table, Row, Col, Button, Tabs, Tab } from 'react-bootstrap'
import UsersListing from "../../components/user_components/UserList";
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
