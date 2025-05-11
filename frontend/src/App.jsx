import React from "react";
import { Routes, Route } from "react-router"; // Remove Router import
import Signup from "./components/pages/Signup.jsx";
import Login from "./components/pages/Login.jsx";
import Home from "./components/pages/Home.jsx"
import Dashboard from "./components/pages/Dashboard.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} /> 


    </Routes>
  );
};

export default App;
