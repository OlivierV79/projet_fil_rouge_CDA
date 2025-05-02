import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Appointment from "../components/Appointments/Appointments.tsx";

const HomePage: React.FC = () => {
    const { username } = useAuth();
    return (
        <>
            <div>
                <h1>Bienvenue {username} !</h1>
            </div>
            <Appointment />
        </>



    );
};

export default HomePage;
