import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Registration from './components/Registration';
import RegistrationSuccess from './components/RegistrationSuccess';
import Chatbot from './components/Chatbot';
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import LandingPage from "./components/landing/LandingPage.jsx";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path={"/register"} element={<Registration />} />
                <Route path="/registrationSuccess" element={<RegistrationSuccess />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}
