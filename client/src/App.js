import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import BuildProfile from "./pages/BuildProfile";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import SignUp from "./pages/SignUp";
import AdminSignUp from "./pages/AdminSignUp";
import CreateJob from "./pages/CreateJob";
import { useAuth } from "./context/AuthContext";

function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            { user ? (
                <>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={user ? <Dashboard /> : <Navigate to="/login" replace />}
                        />
                        <Route
                            path="/profile"
                            element={user ? <BuildProfile /> : <Navigate to="/login" replace />}
                        />
                        <Route
                            path="/createjob"
                            element={user ? <CreateJob /> : <Navigate to="/login" replace />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </>
            ) : (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/adminsignup" element={<AdminSignUp />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            )}
        </BrowserRouter>
    );
}

export default App;
