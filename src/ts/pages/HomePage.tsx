import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Appointment from "../components/appointments/Appointments.tsx";
import SearchMentor from "../components/member/SearchMentor.tsx";

const HomePage: React.FC = () => {
    const { username, role } = useAuth();
    return (
        <>
            <div>
                <h1>Bienvenue {username} !</h1>
            </div>
            <Appointment />
            {role === "FOUNDER" && <SearchMentor />}
        </>



    );
};

export default HomePage;
