import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MemberProfileDTO } from "../../types/MemberProfileDTO";
import defaultAvatar from '../../assets/photos/photo_profil_base.jpg';

interface ShowMemberProps {
    username: string;
}

const ShowMember: React.FC<ShowMemberProps> = ({ username }) => {
    const { role, token, username: currentUsername  } = useAuth();
    const [member, setMember] = useState<MemberProfileDTO | null>(null);
    const [refresh, setRefresh] = useState(0);
    const [photoUrl, setPhotoUrl] = useState<string>(defaultAvatar);

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem("token");

        fetch(`/api/documents/download/profilePicture/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            signal: controller.signal
        })
            .then(res => {
                if (!res.ok) throw new Error();
                return res.blob();
            })
            .then(blob => {
                setPhotoUrl(URL.createObjectURL(blob));
            })
            .catch(() => {
                setPhotoUrl(defaultAvatar);
            });

        return () => controller.abort();
    }, [username, refresh]);

    useEffect(() => {
        fetch(`/api/members/profile/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setMember(data))
            .catch(err => console.error(err));
    }, [token, refresh]);

    if (!member) return <p>Chargement...</p>;

    return (
        <div className="card">
            <h2>{member.firstName} {member.lastName}</h2>
            <img src={photoUrl} alt="photo de profil" height="200" style={{marginBottom: "10px"}} />
            <p><strong>Nom :</strong> {member.lastName}</p>
            <p><strong>Prénom :</strong> {member.firstName}</p>

            {(role === "ADMIN" || role === "MENTOR") && (
                <>
                    <p><strong>Email :</strong> {member.email}</p>
                    <p><strong>Rôle :</strong> {member.role === "MENTOR" ? "Parrain" : "Porteur de projet"}</p>
                    {member.role === "MENTOR" && (
                        <>
                            <p><strong>
                                Porteurs assignés :</strong> {member.assignedFoundersCount} / {member.nbrOfFounders}
                            </p>
                            <p><strong>Nombre de porteurs suivis maximum :</strong> {member.nbrOfFounders}</p>
                            <p><strong>Disponible :</strong> {member.available ? "Oui" : "Non"}</p>

                        </>
                    )}


                </>
            )}
            { currentUsername == member.username && ( <button onClick={() => setRefresh(prev => prev+1)}>Actualiser</button>)}
        </div>
    );
};

export default ShowMember;
