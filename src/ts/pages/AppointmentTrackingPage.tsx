
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Appointment from "../components/Appointments/Appointments";
import CreationAppointment from "../components/Appointments/CreationAppointment.tsx";

const AppointmentTrackingPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Suivi porteurs {username} !</h1>
            <Appointment />
            <CreationAppointment />
        </div>
    );
};

export default AppointmentTrackingPage;