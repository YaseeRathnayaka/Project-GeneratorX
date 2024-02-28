// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/InputControl.js';
import Dashboard from './components/Dashboard/Dashboard';
import ServicePage from './components/ServicePage/ServicePage';
import LoadingPage from './components/LoadingPage/LoadingPage';
import AdminPage2 from './components/AdminPage02/AdminPage02.js';
import AdminPage3 from './components/AdminPage03/AdminPage03.js';
import OperatorPage1 from './components/OperatorPage01/OperatorPage01.js';
import OperatorPage2 from './components/OperatorPage02/OperatorPage02.js';
import OperatorPage3 from './components/OperatorPage03/OperatorPage03.js';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoadingPage />} />   
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service" element={<ServicePage />} /> 
          <Route path="/adminpage2" element={<AdminPage2 />} />
          <Route path="/adminpage3" element={<AdminPage3 />} />
          <Route path="/operatorpage1" element={<OperatorPage1 />} />
          <Route path="/operatorpage2" element={<OperatorPage2 />} />
          <Route path="/operatorpage3" element={<OperatorPage3 />} />
          
      </Routes>
    </Router>
  );
};

export default App;
