import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import CreationMember from "../components/member/CreationMember.tsx";

const MemberManagementPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <>
            <div>
                <h1>Gestion des Membres {username} !</h1>
            </div>
            <CreationMember />
        </>

    );
};

export default MemberManagementPage;