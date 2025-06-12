import React, { useEffect, useState } from "react";
import {useAuth} from "../../contexts/AuthContext.tsx";

const Statistics: React.FC = () => {
    const [stats, setStats] = useState<any>(null);
    const { token } = useAuth();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/statistics/member`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async res => {
                const data = await res.json();
                setStats(data);
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);

    if (!stats) return <p>Chargement...</p>;

    return (
        <>
            <div className="card">
                <h2>Parrains</h2>
                <p>Nombre total de parrains : {stats.nbMentor}</p>
                <p>Nombre de parrains disponibles : {stats.nbMentorAvailable}</p>
            </div>

            <div className="card">
                <h2>Porteurs de projet</h2>
                <p>Nombre total de porteurs de projet : {stats.nbFounder}</p>
                <p>Avec convention de parrainage : {stats.nbFounderAssigned}</p>
                <p>Sans convention de parrainage : {stats.nbFounderNotAssigned}</p>
            </div>
        </>
    );
};
export default Statistics;
