import React, { useEffect } from 'react'
import './App.css';
import Header from './components/Header';
import PrivateRoutes from './components/utils/PrivateRoutes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';
import Login from './pages/auth_pages/Login';
import About from './pages/about';
import API_DOCS from './pages/api_docs';
import Unauthorized from './pages/unauthorized';
import Notfound from './pages/notfound';
import AdminDashboard from './pages/admin_pages/admin_dashboard';
import ClientRegister from './pages/client_pages/client_register';
import ClientProfile from './pages/client_pages/client_profile';
import ClientBookingHistory from './pages/client_pages/client_booking_history';
import ClientNewBooking from './pages/client_pages/client_newbooking';
import ROLES from './helper/allowedRoles';
import { useSelector } from 'react-redux'
import Spinner from "react-bootstrap/Spinner";
import { get_allRoles } from './features/user/userSlice';
import UsersList from './pages/admin_pages/users_list';
import ClientsList from './pages/admin_pages/clients_list';
import BookingsList from './pages/admin_pages/bookings_list';



function App() {
  const { isSeeding, isReseting } = useSelector((state) => state.user);
  return (
    <>
      <Router>
        {(isSeeding === true || isReseting === true) && (
          <div className="seed_data_loading" style={{ opacity: 1 }}>
            {isSeeding && <p className="">Loading Seed Data...</p>}
            {isReseting && <p className="">App Data Reseting...</p>}
            <Spinner
              animation="border"
              role="status"
              variant="dark"
              style={{ opacity: 1 }}
            >
              <span className="visually-hidden">Loading....</span>
            </Spinner>
          </div>
        )}
        <div style={{ opacity: (isSeeding === true || isReseting === true) ? 0.5 : 1, pointerEvents: isSeeding && 'none', cursor: isSeeding && 'default' }}>
          <Header></Header>
        </div>

        <div className="container" style={{ opacity: (isSeeding === true || isReseting === true) ? 0.5 : 1, pointerEvents: isSeeding && 'none', cursor: isSeeding && 'default' }}>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />

            <Route path='/unauthorized' element={< Unauthorized />} />
            <Route path='/notfound' element={<Notfound />} />
            <Route path='*' element={<Notfound />} />
            <Route path='/register' element={<ClientRegister />} />
            <Route path='/about' element={<About />} />
            {/* Private Routes */}
            <Route element={<PrivateRoutes allowedRoles={[ROLES.Admin]} />}>
              <Route path='/admin/users' element={<UsersList />} />
              <Route path='/admin/clients' element={<ClientsList/>} />
              <Route path='/admin/bookings' element={<BookingsList/>} />
              <Route path='/api_docs' element={<API_DOCS />} />
            </Route>
            <Route element={<PrivateRoutes allowedRoles={[ROLES.Client, ROLES.Admin]} />}>
              <Route path='/users/profile/:id' element={< ClientProfile />} />
              <Route path='/users/profile/bookings/:id' element={< ClientBookingHistory />} />
              <Route path='/users/profile/newbooking/:id' element={< ClientNewBooking />} />
            </Route>
          </Routes>
        </div>

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
