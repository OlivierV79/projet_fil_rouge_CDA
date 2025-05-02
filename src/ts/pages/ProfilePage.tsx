import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Profil {username} !</h1>
        </div>
    );
};

export default ProfilePage;