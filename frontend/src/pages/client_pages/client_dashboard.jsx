import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Tabs, Tab, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { GrView } from "react-icons";
import { get_user, resetUser } from "../../features/user/userSlice";
import { get_profile, resetProfile } from "../../features/profile/profileSlice";
import CustomSpinner from "../../components/CustomSpinner";
import UserProfileInformation from "../../components/user_components/UserProfileInformation";
import BookingHistory from "../../components/reservation_components/BookingHistory";
import NewBookingForm from "../../components/reservation_components/NewBookingForm";
import {
  get_all_booked_dates,
  get_bookings_by_user,
  resetReservation,
} from "../../features/reservation/reservationSlice";
import BookingSearchComponent from "../../components/reservation_components/BookingSearchComponent";
import ROLES from "../../helper/util";

export default function ClientDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showBookingSearch, setShowBookingSearch] = useState(false);
  const { bookings } = useSelector((state) => state.reservation);
  const { loggedInUser } = useSelector((state) => state.auth);

  const { id } = useParams();
  const [key, setKey] = useState("user_profile");

  useEffect(() => {
    if(!loggedInUser){
      navigate('/unauthorized')
    }
  }, [loggedInUser, navigate])

  useEffect(() => {
    //dispatch(get_profile())
    if (id) {
      dispatch(get_user(id));
      dispatch(get_bookings_by_user(id));
      dispatch(get_all_booked_dates());
    }
    return () => {
      dispatch(resetUser());
      dispatch(resetReservation());
    };
  }, [id, dispatch]);
  
  

  return (
    <>
      <div>
        {loggedInUser && loggedInUser.role === ROLES.Admin && (
          <Link to={"/admin"} className="btn btn-primary mb-2 mt-2">
            {"<< Back to Admin Pannel"}
          </Link>
        )}
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="user_profile" title="User Profile Information">
            <div className="container-fluid justify-center mt-5">
              <UserProfileInformation />
            </div>
          </Tab>
          <Tab eventKey="bookings" title="Booking History">
            <BookingSearchComponent />
            <BookingHistory />
          </Tab>
          <Tab eventKey="reservations" title="New Booking">
            <NewBookingForm />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
