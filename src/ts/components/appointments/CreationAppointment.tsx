import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface Founder {
    id: number;
    fullName: string;
}

const CreationAppointment: React.FC = () => {
    const { token, role } = useAuth();
    const [founders, setFounders] = useState<Founder[]>([]);
    const [selectedFounderId, setSelectedFounderId] = useState<number | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [subject, setSubject] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (role !== 'MENTOR') return;
        const fetchFounders = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/mentors/founders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Impossible de charger les founders.');
                const data = await res.json();
                setFounders(data);
            } catch (err) {
                console.error(err);
                setError('Erreur lors du chargement des founders.');
            }
        };

        fetchFounders();
    }, [token, role]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(false);
        setError(null);

        if (!selectedFounderId || !date || !time || !subject) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        const body = {
            founderId: selectedFounderId,
            date,
            time,
            subject
        };

        try {
            const res = await fetch('http://localhost:8080/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) throw new Error('Erreur lors de la création du rendez-vous.');
            setSuccess(true);
            setDate('');
            setTime('');
            setSubject('');
            setSelectedFounderId(null);
        } catch (err) {
            console.error(err);
            setError('Erreur lors de l’envoi.');
        }
    };

    if (role !== 'MENTOR') {
        return <p>Accès réservé aux mentors.</p>;
    }

    return (
        <div className="card">
            <h2>Créer un rendez-vous</h2>
            {success && <p style={{ color: 'green' }}>Rendez-vous créé avec succès !</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Porteur de projet :</label>
                    <select
                        value={selectedFounderId ?? ''}
                        onChange={(e) => setSelectedFounderId(parseInt(e.target.value))}
                        required
                    >
                        <option value="" disabled>-- Sélectionner un porteur --</option>
                        {founders.map((f) => (
                            <option key={f.id} value={f.id}>{f.fullName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Date :</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Heure :</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div>
                    <label>Sujet :</label>
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <button type="submit">Créer</button>
            </form>
        </div>
    );
};

export default CreationAppointment;
