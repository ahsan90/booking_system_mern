import { useEffect, useState } from "react";
import { Row, Col, Card, Table, Tabs, Tab, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { GrView } from "react-icons";
import { get_user, reset } from "../../features/user/userSlice";
import CustomSpinner from "../../components/CustomSpinner";
import AdminTab from "../../components/AdminTab";
import UserProfileInformation from "../../components/user_components/UserProfileInformation";
import UserBookingHistory from "../../components/user_components/UserBookingHistory";

function UserProfile() {
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

  const { id } = useParams();
  const [key, setKey] = useState("user_profile");

  useEffect(() => {
    dispatch(get_user(id));
    
    return () => {
      dispatch(reset())
    }
  }, [id, dispatch]);
/*   if (isLoading) {
    return <CustomSpinner />;
  } */

  //console.log(singleUserDetails)
  return (
    <>
      <div>
        <Link to={"/admin"} className="btn btn-primary mb-2 mt-2">
          {"<< Back to Admin Pannel"}
        </Link>
        <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
          <Tab eventKey="user_profile" title="User Profile Information">
            <div className="container-fluid justify-center mt-5">
              <UserProfileInformation singleUserDetails={singleUserDetails} />
            </div>
          </Tab>
          <Tab eventKey="bookings" title="Booking History">
            <UserBookingHistory singleUserDetails={singleUserDetails} />
          </Tab>
          <Tab eventKey="reservations" title="New Booking">
            New Booking
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default UserProfile;
