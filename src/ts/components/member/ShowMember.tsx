import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MemberProfileDTO } from "../../types/MemberProfileDTO";
import defaultAvatar from '../../assets/photos/photo_profil_base.jpg';

interface ShowMemberProps {
    username: string;
}

const ShowMember: React.FC<ShowMemberProps> = ({ username }) => {
    const { role, token } = useAuth();
    const [member, setMember] = useState<MemberProfileDTO | null>(null);

    const [photoUrl, setPhotoUrl] = useState<string>(defaultAvatar);

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/api/documents/download/profilePicture/${username}`, {
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
    }, [username]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/members/profile/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setMember(data))
            .catch(err => console.error(err));
    }, [username, token]);

    if (!member) return <p>Chargement...</p>;

    return (
        <div className="card">
            <h2>{member.firstName} {member.lastName} - Profil</h2>
            <img src={photoUrl} alt="photo de profil" height="200" style={{marginBottom: "10px"}} />
            <p><strong>Nom :</strong> {member.lastName}</p>
            <p><strong>Prénom :</strong> {member.firstName}</p>

            {(role === "ADMIN" || role === "MENTOR") && (
                <>
                    <p><strong>Email :</strong> {member.email}</p>
                    <p><strong>Rôle :</strong> {member.role}</p>
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
        </div>
    );
};

export default ShowMember;
