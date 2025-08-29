// components/appointments/ModifyAppointment.tsx
import React, { useState } from "react";

interface Props {
    appointment: {
        id: number;
        date: string;
        heure: string;
        sujet: string;
    };
    onClose: () => void;
    onSaved: () => void;
}

const ModifyAppointment: React.FC<Props> = ({ appointment, onClose, onSaved }) => {
    const [form, setForm] = useState({
        date: appointment.date,
        heure: appointment.heure,
        sujet: appointment.sujet,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        await fetch(`/api/appointments/${appointment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                date: form.date,
                time: form.heure,
                subject: form.sujet,
            }),
        });

        onSaved();
    };

    return (
        <div className="modal">
            <h3>Modifier le rendez-vous</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} />
                </div>
                <div>
                    <label>Heure</label>
                    <input type="time" name="heure" value={form.heure} onChange={handleChange} />
                </div>
                <div>
                    <label>Sujet</label>
                    <textarea name="sujet" value={form.sujet} onChange={handleChange} />
                </div>
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={onClose}>Annuler</button>
            </form>
        </div>
    );
};

export default ModifyAppointment;
