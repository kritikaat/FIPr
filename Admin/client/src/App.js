// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboardpage';
import FormDetailsPage from './components/formdetailspage';
import LoginPage from './components/login';


const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/form/:formId" element={<FormDetailsPage />} />
        <Route path="/" element={<LoginPage />} />
     
      </Routes>
    </Router>
  );
};

export default App;
