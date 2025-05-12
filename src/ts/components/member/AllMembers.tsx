import React, { useEffect, useState } from 'react';
import { MemberProfileDTO } from '../../types/MemberProfileDTO';
import { useAuth } from '../../contexts/AuthContext';
import ShowMember from "./ShowMember.tsx";

const AllMembers: React.FC = () => {
    const { token } = useAuth();
    const [mentors, setMentors] = useState<MemberProfileDTO[]>([]);
    const [founders, setFounders] = useState<MemberProfileDTO[]>([]);

    const [selectedUsername, setSelectedUsername] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/api/members/all", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                const mentors = data.filter((m: MemberProfileDTO) => m.role === "MENTOR");
                const founders = data.filter((m: MemberProfileDTO) => m.role === "FOUNDER");
                setMentors(mentors);
                setFounders(founders);
            })
            .catch(err => console.error(err));
    }, [token]);

    const renderTable = (title: string, data: MemberProfileDTO[]) => (
        <>
            <h2>{title}</h2>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Prénom</th>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Role</th>
                    {title === "Parrain" && <th>Nombre de porteurs actuel</th>}
                    {title === "Parrain" && <th>Nombre de porteurs max</th>}
                    {title === "Parrain" && <th>Disponible</th>}
                    {title === "Porteur" && <th>Assigné à un mentor</th>}

                </tr>
                </thead>
                <tbody>
                {data.map(member => (
                    <tr key={member.username}>
                        <td>{member.username}</td>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.email}</td>
                        <td>{member.role}</td>
                        {title === "Parrain" && <td>{member.assignedFoundersCount}</td>}
                        {title === "Parrain" && <td>{member.nbrOfFounders}</td>}
                        {title === "Parrain" && <td>{member.available ? "Oui" : "Non"}</td>}
                        {title === "Porteur" && <td>{member.hasMentor ? "Oui" : "Non"}</td>}
                        <td>
                            <button onClick={() => {
                                setSelectedUsername(member.username);
                                setShowModal(true);
                            }}>
                                Plus de détails
                            </button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );

    return (
        <>
            <div className="card">
                {renderTable("Parrain", mentors)}
                <hr />
                {renderTable("Porteur", founders)}
            </div>
            {showModal && selectedUsername && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button onClick={() => setShowModal(false)}>Fermer</button>
                        <ShowMember username={selectedUsername} />
                    </div>
                </div>
            )}
        </>


    );
};

export default AllMembers;
