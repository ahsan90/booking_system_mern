import Card from "react-bootstrap/Card";
import home_page_card_image from "../assets/home_page_card_image.png";
import booking_image from "../assets/booking_image.png";
import ROLES from '../helper/allowedRoles'
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import moment from "moment/moment";

function Home() {
  const {loggedInUser} = useSelector(state => state.auth)
  return (
    <div className="home_page">
      <Card
        style={{
          backgroundColor: "#f1f1f1",
          backgroundImage: `url(${home_page_card_image})`,
          color: "red",
          minHeight: "900px",
        }}
      >
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Title>
          <h1>Welocme to the Booking System Application</h1>
        </Card.Title>
        <Card.Body style={{ color: "black", fontSize: "1.5rem" }}>
          <div className="p-3">
            {loggedInUser === null ? (
              <>
                <Card.Text>
                  <Link to={"/register"} style={{ textDecoration: "none" }}>
                    Sign Up
                  </Link>
                  {"/"}
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    Login
                  </Link>{" "}
                  to book your reservation!
                </Card.Text>
              </>
            ) : (
              <>
                <Card.Text>
                  {loggedInUser.role === ROLES.Admin ? (
                    <>
                      <Link to={"/admin/users"} style={{ textDecoration: "none" }}>
                        Admin Pannel
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/users/profile/${loggedInUser?._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        Dashboard Link
                      </Link>
                    </>
                  )}
                </Card.Text>
              </>
            )}
            <Card.Text>
              <Link to={"/about"}>Click here</Link> to learn more about the
              application and default login credential for admin/client user!
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
      <p style={{
        textAlign: "center",
        marginTop: "10px",
        color: "black",
        fontStyle: "italic",
        fontFamily: "arial",
        fontSize: "11px"
      }}><strong>&copy;{moment(Date()).format("y")} Md Ahsanul Hoque</strong></p>
    </div>
  );
}

export default Home;
