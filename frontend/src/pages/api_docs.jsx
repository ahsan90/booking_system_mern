import React from 'react'
import { Card, Accordion } from "react-bootstrap";
import moment from "moment";
import AuthDocs from '../components/api_docs/auth/AuthDocs';
import CreateUserDoc from '../components/api_docs/user/CreateUserDoc';
import ClientRegisterDoc from '../components/api_docs/profile/ClientRegisterDoc';
import GetAllUsersDoc from '../components/api_docs/user/GetAllUsersDoc';
import GetUserDoc from '../components/api_docs/user/GetUserDoc';
import UpdateUserDoc from '../components/api_docs/user/updateUserDoc';
import DeleteUserDoc from '../components/api_docs/user/DeleteUserDoc';


export default function api_docs() {
  const baseAPI_URL = process.env.NODE_ENV === 'production' ? 'https://booking-system-mern-api.vercel.app' : 'http://localhost:5000'
  return (
    <div style={{ position: "", marginTop: "20px" }}>
      <div>
        <Card>
          <Card.Body>
            <Card.Text>
              This is an API resource of the backend part of Booking System fullstack MERN applicaiton. API can be tested using Postman/Insomnia.
            </Card.Text>
            <Card.Text>
              Base API URL: <span className='text-danger'>{baseAPI_URL}</span>
            </Card.Text>
          </Card.Body>
        </Card>
        
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>API to login an user</Accordion.Header>
            <Accordion.Body>
              <AuthDocs />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>API for Getting an User By ID</Accordion.Header>
            <Accordion.Body>
              <GetUserDoc />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="2">
            <Accordion.Header>API for Getting all users</Accordion.Header>
            <Accordion.Body>
              <GetAllUsersDoc />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="3">
            <Accordion.Header>API for Creating an User</Accordion.Header>
            <Accordion.Body>
              <CreateUserDoc />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="4">
            <Accordion.Header>API for updating an User</Accordion.Header>
            <Accordion.Body>
              <UpdateUserDoc />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="5">
            <Accordion.Header>API for Deleting an User</Accordion.Header>
            <Accordion.Body>
              <DeleteUserDoc />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Accordion>
          <Accordion.Item eventKey="6">
            <Accordion.Header>API for Client Registration</Accordion.Header>
            <Accordion.Body>
              <ClientRegisterDoc />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <h2>To be continued.....</h2>
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
