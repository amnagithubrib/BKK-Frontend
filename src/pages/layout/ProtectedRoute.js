import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext'; 

const ProtectedRoute = ({ children, role }) => {
    const { user, isAdmin ,isPartner} = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    if (role === 'admin' && !isAdmin()) {
        return <Navigate to="/" />;
    }
    if (role === 'partner' && !isPartner()) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
