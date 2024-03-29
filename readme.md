Application in a nutshell

---

This is a Booking System Management Application using FullStack MERN with Redux/toolkit state management. The Application can be operated based on Role based Authorization. Reservation Can be booked after successfully login into the application either as an Admin or Client user. There is also a member registration option. After successfully registering a member will be autometically logged into the system and redirected to his own dashboard. The other operations are described as below.

---

[Live](https://booking-mern-md.netlify.app) | [API Resources](https://booking-mern-md.netlify.app/api_docs)

## Following Table shows the default login credentials for both admin and client user

| Username | Email              | Role   | Password   |
| -------- | ------------------ | ------ | ---------- |
| ahsan90  | ahrony90@gmail.com | Admin  | adminpass  |
| steve123 | steve123@mail.com  | Client | clientpass |

---


## This application is based on Full Stack MERN Development. Tools and technology used to build this project are as follow:

->ExpressJS for Backend Node API Development

->MongoDB Cloud Database (Mongoose as ORM package)

->React Frontend library along with react-router-dom for Frontend Development

->Redux Toolkit for application state management

->Bunnch of other npm packages as required

## Client user can only perform tasks based on his rules of operation. Following Rules are Applied to Client user:

->Client is able to see his own Dashboard to see his user/profile information including Booking History and able to book his Reservation

->CRUD operation for his own profile

->CRUD for Booking his own reservation

->Not able to alter someone else profile/user/booking information neither have access to them

## Admin user can perform following operation:

->Has Access to Admin Pannel to perform admin operation

->Allowed to perform all of Client operations as stated in Client user rules

->Able to Manage Users/Clients/Bookings from admin pannel

->CRUD operation for Users/Clients/Bookings

->Search Operation for Users/Client/Bookings with suggestive search

->Admin is able to Generate Seed data and Reseting App data\*\*

\*\*To Login with one of the generated user, use password: fakepass

Developed by: Md Ahsanul Hoque, contact: ahrony90@gmail.com
