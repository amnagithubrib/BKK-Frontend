import React, { createContext, useState, useEffect, useContext } from 'react';
import {jwtDecode} from 'jwt-decode'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (authToken) {
            try {
                const decodedToken = jwtDecode(authToken);
                setUser(decodedToken);
            } catch (error) {
                console.error('Invalid token:', error);
                setAuthToken(null);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [authToken]);

    const isAdmin = () => {
        return user && user.role === 'admin';
    };
    const isPartner = () => {
        return user && user.role === 'partner';
    };

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, user, isAdmin,isPartner}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
