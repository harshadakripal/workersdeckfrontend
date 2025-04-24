import React from 'react';
import './App.css';
import './styles.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Services from './pages/Services';
import ServiceDetails from "./pages/ServiceDetails";

function App() {
  return (
    <BrowserRouter 
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<PrivateRoute><ServiceDetails /></PrivateRoute>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;