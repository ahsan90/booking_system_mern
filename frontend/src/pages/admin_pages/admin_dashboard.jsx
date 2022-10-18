import { useEffect,} from "react";
import "./admin.css";
import { Row, Col, } from "react-bootstrap";
import { get_allRoles } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function AdminDashboard({ children }) {

  const dispatch = useDispatch();

/* 
  useEffect(() => {
    dispatch(get_allRoles());
  }, []); */


  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Pannel</h1>
      <Row>
        <Col xs={12} md={12} className="">
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
              <NavLink
                to={"/admin/users"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                Manage Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/admin/clients"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Manage Users Profiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/admin/bookings"}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Manage Bookings
              </NavLink>
            </li>
          </ul>
          {children}
        </Col>
      </Row>
    </div>
  );
}

export default AdminDashboard;
