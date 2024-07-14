import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginSignupPage from './pages/loginsignup/LoginSignupPage';
import Layout from './pages/layout/layout';
import Partners from './pages/partners/Partners'; 
import CreatePartnersPage from './pages/CreatePartners/CreatePartnersPage'; 
import ProtectedRoute from './pages/layout/ProtectedRoute';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginSignupPage />} />
          <Route path="/*" element={<Layout />} />
          {/* <Route path="/create-partners" element={<CreatePartnersPage />} />  */}
          {/* <Route path="/partners" element={<ProtectedRoute ><Partners /></ProtectedRoute>} />  */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
