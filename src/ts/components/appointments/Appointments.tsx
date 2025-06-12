import React, {useEffect, useState} from 'react';
import {AppointmentInterface} from '../../types/AppointmentInterface';
import {useAuth} from '../../contexts/AuthContext';
import ModifyAppointment from './ModifyAppointment';
import EditSummaryModal from './EditSummaryModal';
import ViewSummaryModal from './ViewSummaryModal';

const Appointment: React.FC = () => {
    const [appointments, setAppointments] = useState<AppointmentInterface[]>([]);
    const {token, role} = useAuth();

    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentInterface | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditSummaryModal, setShowEditSummaryModal] = useState(false);
    const [showViewSummaryModal, setShowViewSummaryModal] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const fetchAppointments = async () => {
        try {
            const url =
                role === 'ADMIN'
                    ? `${import.meta.env.VITE_API_URL}/appointments`
                    : `${import.meta.env.VITE_API_URL}/appointments/mine`;

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
    }, [token, refresh]);

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
            await fetch(`${import.meta.env.VITE_API_URL}/appointments/${id}`, {
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
                <h2>Liste des rendez-vous</h2>
            </div>
            <div>
                <table className="hideInMobile">
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
                            <td colSpan={6} style={{textAlign: 'center', padding: '1rem'}}>
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
                                            <button onClick={() => openEditSummaryModal(rdv)}>Editer compte rendu
                                            </button>
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

                <div className={"showInMobile"}>
                    {appointments.length === 0 ? (

                            <p >
                                Aucun rendez-vous à afficher.
                            </p>

                    ) : (
                        appointments.map((rdv) => (
                            < div key={rdv.id} >
                                <p>{rdv.date} - {rdv.heure}</p>
                                <p>{rdv.parrain} - {rdv.porteur}</p>
                                <p>Sujet : {rdv.sujet}</p>
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
                                <hr />
                            </div>
                                )))}
                </div>
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
        <button onClick={() => setRefresh(prev => prev + 1)}>Actualiser</button>
        </div>

</>
)
    ;
};

export default Appointment;
