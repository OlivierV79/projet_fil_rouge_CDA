import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DocumentsPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Documents {username} !</h1>
        </div>
    );
};

export default DocumentsPage;