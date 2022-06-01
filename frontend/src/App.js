import React from 'react';
import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';
import Login from './pages/auth_pages/Login';
import About from './pages/about';
import Unauthorized from './pages/unauthorized';
import Notfound from './pages/notfound';
import AdminDashboard from './pages/admin_pages/admin_dashboard';
import ClientRegister from './pages/client_pages/client_register';
import ClientDashboard from './pages/client_pages/client_dashboard';



function App() {
  return (
    <>
      <Router>
        <Header/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/unauthorized' element={< Unauthorized />} />
            <Route path='/notfound' element={<Notfound />} />
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/users/profile/:id' element={< ClientDashboard />} />
            <Route path='/register' element={<ClientRegister/>}/>
            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
