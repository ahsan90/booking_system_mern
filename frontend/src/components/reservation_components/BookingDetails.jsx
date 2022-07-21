import { Link } from "react-router-dom";
import { Table, Card } from "react-bootstrap";
import moment from "moment";
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import {RiReservedFill} from "react-icons/ri"

export default function BookingDetails({ booking_details }) {
  const { booking, singleUserDetails } = booking_details;
  const { id } = useParams()
  
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title><RiReservedFill/> Reservation information</Card.Title>
          <Table striped bordered hover>
            <thead>
              <th>Booking Reference</th>
              <th>Reservation Date</th>
              <th>Reservation Booked Date</th>
              <th>Last Updated</th>
            </thead>
            <tbody>
              <tr>
                <td>{booking?.booking_reference}</td>
                <td>{moment(booking?.reservation_date).format("ll")}</td>
                <td>{moment(booking?.createdAt).format("lll")}</td>
                <td>{moment(booking?.updatedAt).format("lll")}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Card className="mt-4">
        {(booking_details[1] !== null && singleUserDetails !== null) ? (
          <>
            <Card.Body>
              <Card.Title><FaUser/> Customer Information</Card.Title>
              <hr />
              <img className="avatar" src={singleUserDetails?.avatar} alt="" />
              <Card.Text>
                <b>Username:</b>{" "}
                {id !== null && id !== undefined ? (
                  <span>{singleUserDetails?.username}</span>
                ) : (
                  <Link to={`/users/profile/${singleUserDetails?._id}`}>
                    {" "}
                    {singleUserDetails?.username}
                  </Link>
                )}
              </Card.Text>
              <Card.Text>
                <b>Email:</b> {singleUserDetails?.email}
              </Card.Text>
              {singleUserDetails?.profile ? (
                <>
                  <Card.Text>
                    <b>Customer Name:</b> {singleUserDetails?.profile?.name}
                  </Card.Text>
                  <Card.Text>
                    <b>Phone:</b> {singleUserDetails?.profile?.phone}
                  </Card.Text>
                </>
              ) : (
                <Card.Text>No other information found</Card.Text>
              )}
            </Card.Body>
          </>
        ) : (
          <>
            <p>No Custormer Information found. Information Erased!</p>
          </>
        )}
      </Card>
    </div>
  );
}
