import React, { useEffect, useState } from "react";

interface Props {
    appointmentId: number;
    onClose: () => void;
    token: string;
}

const ViewSummaryModal: React.FC<Props> = ({ appointmentId, onClose, token }) => {
    const [summary, setSummary] = useState<string>("");

    useEffect(() => {
        fetch(`/api/appointments/${appointmentId}/summary`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.text();
            })
            .then(text => {
                if (!text || text.trim() === "") {
                    setSummary("Pas de compte rendu disponible.");
                } else {
                    setSummary(text);
                }
            })
            .catch(() => setSummary("Pas de compte rendu disponible."));
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
