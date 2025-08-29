import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MemberProfileDTO } from "../../types/MemberProfileDTO";
import ShowMember from "./ShowMember";

const SearchMentor: React.FC = () => {
    const { token } = useAuth();
    const [assignedMentor, setAssignedMentor] = useState<MemberProfileDTO | null>(null);
    const [allMentors, setAllMentors] = useState<MemberProfileDTO[]>([]);

    useEffect(() => {
        fetch("/api/mentors/assigned", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.status === 200 ? res.json() : null)
            .then(data => setAssignedMentor(data))
            .catch(() => setAssignedMentor(null));
    }, [token]);

    useEffect(() => {
        fetch("/api/mentors/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setAllMentors(data))
            .catch(err => console.error(err));
    }, [token]);

    const handleAssign = async (mentorUsername: string) => {
        if (!window.confirm("Souhaitez-vous vraiment choisir ce mentor ?")) return;

        try {
            const res = await fetch(`/api/mentors/assign/${mentorUsername}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            alert("Mentor assigné avec succès !");
            window.location.reload();
        } catch (err: any) {
            alert(err.message || "Erreur lors de l'assignation.");
        }
    };

    return (
        <div className="card">


            {assignedMentor ? (
                <>
                    <h2>Mon parrain</h2>
                    <ShowMember username={assignedMentor.username} />
                </>
            ) : (
                <>
                    <h2>Les parrains disponibles</h2>
                    {allMentors.map(m => (
                        <div key={m.username}>
                            <ShowMember username={m.username} />
                            <button className={"bouton-choix-mentor"} onClick={() => handleAssign(m.username)}>Choisir ce mentor</button>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default SearchMentor;
