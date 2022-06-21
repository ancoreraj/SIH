import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import BuildProfile from './components/BuildProfile';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          {/* <Route path='/profile' element={<BuildProfile />} /> */}
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
