import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Tabs, Tab, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { GrView } from "react-icons";
import { get_user, resetUser } from "../../features/user/userSlice";
import { get_profile, resetProfile } from "../../features/profile/profileSlice";
import CustomSpinner from "../../components/CustomSpinner";
import UserProfileInformation from "../../components/user_components/UserProfileInformation";
import UserBookingHistory from "../../components/user_components/UserBookingHistory";
import NewBookingForm from "../../components/revervation_components/NewBookingForm";
import {
  get_all_booked_dates,
  get_bookings_by_user,
  resetReservation,
} from "../../features/reservation/reservationSlice";

export default function ClientDashboard() {
  const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.auth);
  const {
    users,
    singleUserDetails,
    roles,
    isLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.user);
  const { profile } = useSelector((state) => state.profile);
  const { booking, bookings } = useSelector(
    (state) => state.reservation
  );

  const { id } = useParams();
  const [key, setKey] = useState("user_profile");
  //console.log(id)
  /* useEffect(() => {
    dispatch(get_user(id));
    dispatch(get_bookings_by_user(id));
    if (singleUserDetails?.profile) dispatch(get_profile(singleUserDetails?.profile?._id));
    //dispatch(get_bookings_by_user(id))
    return () => {
      dispatch(resetUser());
      dispatch(resetProfile());
      dispatch(resetReservation());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (singleUserDetails?.profile) {
      dispatch(get_user(id));
    }
    return () => {
      dispatch(resetUser());
    };
  }, [profile, dispatch]);
    
  if (isLoading) {
    return <CustomSpinner />;
  }
 */
  useEffect(() => {
    //dispatch(get_profile())
    dispatch(get_user(id));
    dispatch(get_bookings_by_user(id));
    dispatch(get_all_booked_dates())
    return () => {
      dispatch(resetUser());
      dispatch(resetReservation());
    };
  }, [id, dispatch]);
  return (
    <>
      <div>
        <Link to={"/admin"} className="btn btn-primary mb-2 mt-2">
          {"<< Back to Admin Pannel"}
        </Link>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="user_profile" title="User Profile Information">
            <div className="container-fluid justify-center mt-5">
              <UserProfileInformation />
            </div>
          </Tab>
          <Tab eventKey="bookings" title="Booking History">
            <UserBookingHistory />
          </Tab>
          <Tab eventKey="reservations" title="New Booking">
            <NewBookingForm />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

