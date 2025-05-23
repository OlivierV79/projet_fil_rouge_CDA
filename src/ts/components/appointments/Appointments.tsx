import React, { useEffect, useState } from 'react';
import { AppointmentInterface } from '../../types/AppointmentInterface';
import { useAuth } from '../../contexts/AuthContext';
import ModifyAppointment from './ModifyAppointment';
import EditSummaryModal from './EditSummaryModal';
import ViewSummaryModal from './ViewSummaryModal';

const Appointment: React.FC = () => {
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const { token, role } = useAuth();

    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInterface | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditSummaryModal, setShowEditSummaryModal] = useState(false);
    const [showViewSummaryModal, setShowViewSummaryModal] = useState(false);

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

    useEffect(() => {
        fetchAppointments();
    }, [token]);

    const openEditModal = (appointment: AppointmentInterface) => {
        setSelectedAppointment(appointment);
        setShowEditModal(true);
    };


    const openEditSummaryModal = (appointment: AppointmentInterface) => {
        setSelectedAppointment(appointment);
        setShowEditSummaryModal(true);
    };

    const openViewSummaryModal = (appointment: AppointmentInterface) => {
        setSelectedAppointment(appointment);
        setShowViewSummaryModal(true);
    };

    const handleCancel = async (id: number) => {
        if (window.confirm("Voulez-vous vraiment annuler ce rendez-vous ?")) {
            await fetch(`http://localhost:8080/api/appointments/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAppointments();
        }
    };

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
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '1rem' }}>
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
                                    <td>
                                        {role === "MENTOR" && (
                                            <>
                                                <button onClick={() => openEditModal(rdv)}>Modifier</button>
                                                <button onClick={() => handleCancel(rdv.id)}>Annuler</button>
                                                <button onClick={() => openEditSummaryModal(rdv)}>Editer compte rendu</button>
                                            </>
                                        )}
                                        {(role === "ADMIN" || role === "MENTOR") && (
                                            <button onClick={() => openViewSummaryModal(rdv)}>Voir compte rendu</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {showEditModal && selectedAppointment && (
                    <ModifyAppointment
                        appointment={selectedAppointment}
                        onClose={() => setShowEditModal(false)}
                        onSaved={() => {
                            setShowEditModal(false);
                            fetchAppointments();
                        }}
                    />
                )}


                {showEditSummaryModal && selectedAppointment && (
                    <EditSummaryModal
                        appointmentId={selectedAppointment.id}
                        token={token!}
                        onClose={() => {
                            setShowEditSummaryModal(false);
                            fetchAppointments();
                        }}
                        onSaved={() => {
                            setShowEditSummaryModal(false);
                            fetchAppointments();
                        }}
                    />
                )}

                {showViewSummaryModal && selectedAppointment && (
                    <ViewSummaryModal
                        appointmentId={selectedAppointment.id}
                        token={token!}
                        onClose={() => {
                            setShowViewSummaryModal(false);
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default Appointment;
