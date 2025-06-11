import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Appointment from "../components/appointments/Appointments.tsx";
import SearchMentor from "../components/member/SearchMentor.tsx";
import ShowMyFounder from "../components/member/ShowMyFounder.tsx";

const HomePage: React.FC = () => {
    const { role } = useAuth();
    return (
        <>
            <div>
                <h1>Gestion parrainage porteurs de projet</h1>
            </div>
            {role === "FOUNDER" && <SearchMentor />}
            {role === "MENTOR" && <ShowMyFounder />}
            <Appointment />

        </>



    );
};

export default HomePage;
