import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import BuildProfile from './pages/BuildProfile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import SignUp from './pages/SignUp';
import { useAuth } from './context/AuthContext';
import { getUserData } from './utils/API_Calls';

function App() {

    const { user } = useAuth();

    return (
        <BrowserRouter >
            {user ? <Navbar /> : null}
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/' element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
                <Route path='/profile' element={user ? <BuildProfile /> : <Navigate to="/login" replace />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter >
    );
}

export default App;
