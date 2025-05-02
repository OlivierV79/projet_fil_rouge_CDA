import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const MemberManagementPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Gestion des Membres {username} !</h1>
        </div>
    );
};

export default MemberManagementPage;