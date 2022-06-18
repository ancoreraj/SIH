import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
