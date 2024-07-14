import React, { useEffect } from 'react';
import { Routes, Route, useNavigate,Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import DashboardContent from '../dashboard/DashboardContent';
import UserPage from '../users/UserPage';
import Partners from '../partners/Partners';
import ZoneDisplay from '../zonedisplay/ZoneDisplay';
import CreateZoneForm from '../createzone/CreateZoneForm';
import { useAuth } from '../../AuthContext';
import Locations from '../locations/location';
import Form from '../formelements/FormElements';
import Agents from '../agents/Agents';
import AgentsForm from '../agents/AgentsForm';
import ProtectedRoute from './ProtectedRoute';
import CreatePartnersPage from '../CreatePartners/CreatePartnersPage';
import Map from '../createzone/Map';
import FormManager from '../formelements/FormManager';
const Layout = () => {
  const { authToken, isAdmin, isPartner } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  if (!authToken) {
    return null;
  }

  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <Sidebar />
        <div className="hello">
          <Routes>
            {isPartner() && (
              <>
                <Route path="/dashboard" element={<ProtectedRoute role="partner"><DashboardContent /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute role="partner"><UserPage /></ProtectedRoute>} />
                <Route path="/zones" element={<ProtectedRoute role="partner"><ZoneDisplay /></ProtectedRoute>} />
                <Route path="/location" element={<ProtectedRoute role="partner"><Locations /></ProtectedRoute>} />
                <Route path="/agents" element={<ProtectedRoute role="partner"><Agents /></ProtectedRoute>} />
                <Route path="/create-zone" element={<ProtectedRoute role="partner"><CreateZoneForm /></ProtectedRoute>} />
                <Route path="/form" element={<ProtectedRoute role="partner"><Form /></ProtectedRoute>} />
                <Route path="/formmanager" element={<ProtectedRoute role="partner"><Map /></ProtectedRoute>} />
                <Route path="/map" element={<ProtectedRoute role="partner"><FormManager /></ProtectedRoute>} />
                <Route path="/agentsform" element={<ProtectedRoute role="partner"><AgentsForm /></ProtectedRoute>} />
              </>
            )}

            {isAdmin() && (
              <>
              <Route path="/create-partners" element={<ProtectedRoute role="admin"><CreatePartnersPage /></ProtectedRoute>} /> 
                <Route path="/partners" element={<ProtectedRoute role="admin"><Partners /></ProtectedRoute>} />
              </>
            )}
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
