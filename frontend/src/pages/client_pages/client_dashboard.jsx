import { useEffect, useState } from "react";
import { Tabs, Tab} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
//import { GrView } from "react-icons";
import { get_allUsers, get_user, resetUser } from "../../features/user/userSlice";
//import CustomSpinner from "../../components/CustomSpinner";
import UserProfileInformation from "../../components/user_components/UserProfileInformation";
import BookingHistory from "../../components/reservation_components/BookingHistory";
import NewBookingForm from "../../components/reservation_components/NewBookingForm";
import {
  get_all_booked_dates,
  get_bookings_by_user,
  resetReservation,
} from "../../features/reservation/reservationSlice";
import BookingSearchComponent from "../../components/reservation_components/BookingSearchComponent";
import ROLES from "../../helper/allowedRoles";

export default function ClientDashboard() {
  //const { bookings } = useSelector((state) => state.reservation);
  const { loggedInUser } = useSelector((state) => state.auth);
  const { singleUserDetails } = useSelector((state) => state.user);
  //const { profile } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();
  const [key, setKey] = useState("user_profile");
  const [keys, setKeys] = useState({
    user_profile: false,
    bookings: false,
    new_booking: false,
  });

  const isAuthorized =
    loggedInUser?._id === id || loggedInUser?.role === ROLES.Admin;

  useEffect(() => {
    //dispatch(get_profile())
    if (!isAuthorized) {
      return navigate("/unauthorized");
    }
    
    if (id) {
      //dispatch(get_user(id));
      //dispatch(get_bookings_by_user(id));
      //dispatch(get_all_booked_dates());
    }
    return () => {
      dispatch(resetUser());
      dispatch(resetReservation());
    }; 
  }, [id, isAuthorized]);

  //console.log(key)
  //const onSelectTab = () => {
    //console.log("YOu clicked!");
  //}; 

  return (
    <>
      <div>
        {loggedInUser && loggedInUser.role === ROLES.Admin && (
          <Link to={"/admin/users"} className="btn btn-primary mb-2 mt-2">
            {"<< Back to Admin Pannel"}
          </Link>
        )}
        {loggedInUser?._id === id && (
          <h2
            style={{
              textAlign: "center",
              borderBottom: "1px dotted green",
              marginTop: "10px",
            }}
          >
            Welcome {singleUserDetails?.profile?.name}
          </h2>
        )}
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
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
