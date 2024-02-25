// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/InputControl.js';
import Dashboard from './components/Dashboard/Dashboard';
import ServicePage from './components/ServicePage/ServicePage';
import LoadingPage from './components/LoadingPage/LoadingPage';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoadingPage />} />   
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service" element={<ServicePage />} /> 
          
      </Routes>
    </Router>
  );
};

export default App;
