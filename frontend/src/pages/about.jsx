import { Card, Table } from "react-bootstrap";
import moment from "moment";

function About() {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text>
            This is a Booking System Management Application. The Application can
            be operated based on Role based Authorization. Reservation Can be
            booked after successfully login into the application either as an
            Admin or Client user. There is also a member registration option.
            After successfully registering, a member will be autometically
            logged into the system and redirected to his own dashboard. Default
            login credentials and other operations are described as follow.
          </Card.Text>
          <Card.Text>
            Code on Github repo: <a href="https://github.com/ahsan90/booking_system_mern" target="_blank" rel="noreferrer">Booking System MERN</a>
          </Card.Text>
        </Card.Body>
      </Card>
      <h4
        className="mt-5"
        style={{
          textAlign: "center",
          borderBottom: "1px solid red",
          padding: "3px",
        }}
      >
        Following Table shows the default login credentials for both admin and
        client user
      </h4>
      <Table className="mt-5">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ahsan90</td>
            <td>ahrony90@gmail.com</td>
            <td>Admin</td>
            <td>adminpass</td>
          </tr>
          <tr>
            <td>steve123</td>
            <td>steve123@mail.com</td>
            <td>Client</td>
            <td>clientpass</td>
          </tr>
        </tbody>
      </Table>
      <div style={{ marginTop: "90px" }}>
        <Card>
          <Card.Header>
            <Card.Title>Application in a nutshell</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <h5
                style={{
                  borderBottom: "2px dashed black",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                This application is based on Full Stack MERN Development. Tools and technology used to build this project are as follow:
              </h5>
              <ul>
                <li>ExpressJS for Backend Node API Development</li>
                <li>
                  MongoDB Cloud Database (Mongoose as ORM package)
                </li>
                <li>React Frontend library along with react-router-dom for Frontend Development</li>
                <li>Redux/Toolkit for application state management</li>
                <li>Bunnch of other npm packages as required</li>
              </ul>
            </Card.Text>
            <Card.Text>
              <h5
                style={{
                  borderBottom: "2px dashed black",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                Client user can only perform tasks based on his rules of operation.
                Following Rules Applied to Client user-
              </h5>
              <ul>
                <li>
                  Client is able to see his own Dashboard to see his
                  user/profile information including Booking History and able to
                  book his Reservation
                </li>
                <li>CRUD operation for his own profile</li>
                <li>CRUD for Booking his own reservation</li>
                <li>Not able to alter someone else profile/user/booking information neither have access to them</li>
              </ul>
            </Card.Text>
            <Card.Text>
              <h5
                style={{
                  borderBottom: "2px dashed black",
                  marginBottom: "10px",
                  padding: "10px",
                }}
              >
                Admin user can perform following operation
              </h5>
              <ul>
                <li>Has Access to Admin Pannel to perform admin operation</li>
                <li>
                  Allowed to perform all of Client operations as stated in
                  Client user rules
                </li>
                <li>Able to Manage Users/Clients/Bookings from admin pannel</li>
                <li>CRUD operation for Users/Clients/Bookings</li>
                <li>Search Operation for Users/Client/Bookings with suggestive search</li>
                <li>
                  Admin is able to Generate Seed data and Reseting App data
                  <span className="text-danger">**</span>
                </li>
              </ul>
              <p>
                <span className="text-danger">**</span>To Login with one of the generated user, use password: <span className="text-danger">fakepass</span>
              </p>
            </Card.Text>
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
    </div>
  );
}

export default About;
