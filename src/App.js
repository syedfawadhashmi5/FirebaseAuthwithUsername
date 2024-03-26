import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Navber/Header';
import Home from './component/Home';
import Login from './component/Login';
import Signup from './component/Signup';
import UserAuthContext from './context/UserAuthContext';

function App() {
  return (
    <UserAuthContext>
    <Router>
      <Header />
      <div className='main-container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
      </div>
    </Router>
    </UserAuthContext>
  );
}

export default App;
