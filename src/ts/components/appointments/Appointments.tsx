import React, {useEffect, useState} from 'react';

import { AppointmentInterface } from '../../types/AppointmentInterface.ts';
import { useAuth } from '../../contexts/AuthContext';

const Appointment: React.FC = () => {

    /*
    const rendezVous = [
        { date: '2025-05-02', heure: '10:00', parrain: 'Aldo MACCIONNE', porteur: 'Kevin LOUCHE', sujet: 'Première prise de contact' },
        { date: '2025-05-03', heure: '14:00', parrain: 'AL PACCINO', porteur: 'Jean SERIEUX', sujet: 'Finalisation de la demande de subvention à la CE dans le cadre du financement écologique solidaire de mes genoux'},
    ];

     */

    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const { token, role } = useAuth();

    useEffect(() => {
        const fetchAppointments = async () => {

            try {
                const url =
                    role === 'ADMIN'
                        ? 'http://localhost:8080/api/appointments'
                        : 'http://localhost:8080/api/appointments/mine';

                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Erreur lors du chargement des rendez-vous');

                const data = await res.json();
                setAppointments(data);


            } catch (err) {
                console.error(err);
            }
        };

        fetchAppointments();
    }, [token]);

    return (
        <>
            <div className="card">
                <div>
                    <h2>Rendez-vous de suivi</h2>
                </div>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Parrain</th>
                            <th>Porteur</th>
                            <th>Sujet</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                                    Aucun rendez-vous à afficher.
                                </td>
                            </tr>
                        ) : (
                            appointments.map((rdv, index) => (
                                <tr key={index}>
                                    <td>{rdv.date}</td>
                                    <td>{rdv.heure}</td>
                                    <td>{rdv.parrain}</td>
                                    <td>{rdv.porteur}</td>
                                    <td className="appointment-subject">{rdv.sujet}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default Appointment;