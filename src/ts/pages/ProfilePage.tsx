import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ModifyMember from "../components/member/ModifyMember.tsx";
import ShowMember from "../components/member/ShowMember.tsx";

const ProfilePage: React.FC = () => {
    const { username } = useAuth();

    if (!username) return <p>Chargement du profil...</p>;

    return (
        <div>
            <h1>Mon profil</h1>
            <ShowMember username={username}/>
            <ModifyMember />
        </div>
    );
};

export default ProfilePage;