import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const StatisticsPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Statistiques {username} !</h1>
        </div>
    );
};

export default StatisticsPage;