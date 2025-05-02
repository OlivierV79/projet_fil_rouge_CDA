import React, { createContext, useState, useContext, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    token: string | null;
    username: string | null;
    role: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

interface JwtPayload {
    sub: string; // username
    role: string;
    exp: number;
    iat: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode<JwtPayload>(token);

                setUsername(decoded.sub);
                setRole(decoded.role.replace('ROLE_', '')); // remove ROLE_ prefix
            } catch (error) {
                console.error('Invalid token:', error);
                logout(); // optional: log out if token is invalid
            }
        }
    }, [token]);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUsername(null);
        setRole(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated, username, role }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
