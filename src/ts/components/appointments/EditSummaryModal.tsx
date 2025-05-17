import React, { useEffect, useState } from "react";

interface Props {
    appointmentId: number;
    onClose: () => void;
    onSaved: () => void;
    token: string;
}

const EditSummaryModal: React.FC<Props> = ({ appointmentId, onClose, onSaved, token }) => {
    const [summary, setSummary] = useState("");

    useEffect(() => {
        fetch(`http://localhost:8080/api/appointments/${appointmentId}/summary`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.ok ? res.text() : "")
            .then(text => setSummary(text))
            .catch(() => setSummary(""));
    }, [appointmentId, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(`http://localhost:8080/api/appointments/${appointmentId}/summary`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "text/plain"
            },
            body: summary
        });

        onSaved();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Écrire / Modifier le compte rendu</h3>
                <form onSubmit={handleSubmit}>
                <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    rows={6}
                    style={{ width: "100%" }}
                />
                    <button type="submit">Enregistrer</button>
                    <button type="button" onClick={onClose}>Fermer</button>
                </form>
            </div>

        </div>
    );
};

export default EditSummaryModal;
