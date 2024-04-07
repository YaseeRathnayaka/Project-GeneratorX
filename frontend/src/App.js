// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/InputControl.js';
import Dashboard from './components/Dashboard/Dashboard';
import ServicePage from './components/ServicePage/ServicePage';
import LoadingPage from './components/LoadingPage/LoadingPage';
import AdminPage1 from './components/AdminPage01/AdminPage01.js';
import AdminPage2 from './components/AdminPage02/AdminPage02.js';
import UserTable from './components/UserTable/UserTable.js';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoadingPage />} />   
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service" element={<ServicePage />} /> 
          <Route path="/adminpage1" element={<AdminPage1 />} />
          <Route path="/adminpage2" element={<AdminPage2 />} />
          <Route path="/usertable" element={<UserTable />} />
      </Routes>
    </Router>
  );
};

export default App;
