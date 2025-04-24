import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();
  const token = localStorage.getItem("token");
  
  if(!token){
  return token ? children : <Navigate to="/login" replace />;}
  return auth.token ? children : <Navigate to="/login" />;
  };

export default PrivateRoute;
