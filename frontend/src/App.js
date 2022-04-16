import React from 'react';
import './App.css';
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/auth_pages/Login';
import About from './pages/about';
import CreateUser from './pages/admin_pages/create_user_page';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create_user' element={< CreateUser />} />
            <Route path='/about' element={<About/>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
