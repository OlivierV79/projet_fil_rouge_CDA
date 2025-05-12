import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AllMembers from "../components/member/AllMembers.tsx";

const StatisticsPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Statistiques {username} !</h1>
            <AllMembers />
        </div>
    );
};

export default StatisticsPage;