import React, { useEffect, useState } from "react";

interface Props {
    appointmentId: number;
    onClose: () => void;
    token: string;
}

const ViewSummaryModal: React.FC<Props> = ({ appointmentId, onClose, token }) => {
    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
        fetch(`http://localhost:8080/api/appointments/${appointmentId}/summary`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.ok ? res.text() : "Pas de compte rendu disponible.")
            .then(text => setSummary(text))
            .catch(() => setSummary("Erreur de chargement."));
    }, [appointmentId, token]);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Compte rendu</h3>
                <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
                <button onClick={onClose}>Fermer</button>
            </div>

        </div>
    );
};

export default ViewSummaryModal;
