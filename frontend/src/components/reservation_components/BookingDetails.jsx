import { Link } from "react-router-dom";
import { Table, Card } from "react-bootstrap";
import moment from "moment";

export default function BookingDetails({ booking_details }) {
  const { booking } = booking_details[0];
  const { singleUserDetails } = booking_details[1];
  
  return (
    <div>
      <Card>
        <Card.Text>Reservation information</Card.Text>
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
      </Card>
      <Card className="mt-4">
        {singleUserDetails !== null ? (
          <>
            <Card.Body>
              <Card.Text>Customer Information</Card.Text>
              <hr />
              <img className="avatar" src={singleUserDetails?.avatar} alt="" />
              <Card.Text>
                Username:{" "}
                <Link to={`/users/profile/${singleUserDetails?._id}`}>
                  {" "}
                  {singleUserDetails?.username}
                </Link>
              </Card.Text>
              <Card.Text>Email: {singleUserDetails?.email}</Card.Text>
              {singleUserDetails?.profile ? (
                <Card.Text>
                  Customer Name: {singleUserDetails?.profile?.name}
                </Card.Text>
              ) : (
                <Card.Text>No other information found</Card.Text>
              )}
              {singleUserDetails?.profile ? (
                <Card.Text>
                  Phone: {singleUserDetails?.profile?.phone}
                </Card.Text>
              ) : (
                ""
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
