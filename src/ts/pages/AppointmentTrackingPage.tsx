
import React from 'react';
import Appointment from "../components/appointments/Appointments";
import CreationAppointment from "../components/appointments/CreationAppointment.tsx";

const AppointmentTrackingPage: React.FC = () => {
    return (
        <div>
            <h1>Rendez-vous de suivi</h1>
            <Appointment />
            <CreationAppointment />
        </div>
    );
};

export default AppointmentTrackingPage;