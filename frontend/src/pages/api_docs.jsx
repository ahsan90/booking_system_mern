import React from 'react'
import { Card, Table } from "react-bootstrap";
import moment from "moment";
import AuthDocs from '../components/api_docs/auth/AuthDocs';
import CreateUserDoc from '../components/api_docs/user/CreateUserDoc';
import ClientRegisterDoc from '../components/api_docs/profile/ClientRegisterDoc';
import GetAllUsersDoc from '../components/api_docs/user/GetAllUsersDoc';
import GetUserDoc from '../components/api_docs/user/GetUserDoc';


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
        <AuthDocs/>
        <CreateUserDoc/>
        <GetAllUsersDoc/>
        <GetUserDoc/>
        <ClientRegisterDoc/>
        <h2>To be continued.....</h2>
        <strong>&copy;{moment(Date()).format("y")} MD AHSANUL HOQUE</strong>
      </div>
      
    </div>
  );
}
