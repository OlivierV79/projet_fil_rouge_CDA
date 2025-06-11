import React, { useState } from "react";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";



const CreationMember: React.FC = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "FOUNDER",
        nbrOfFounders: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            nbrOfFounders: formData.role === "MENTOR" ? parseInt(formData.nbrOfFounders) || 0 : null
        };

        try {
            const res = await fetch("http://localhost:8080/api/admin/create-member", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error("Erreur HTTP");
            }

            //setMessage("Membre créé avec succès !");
            navigate("/memberManagement")

        } catch (error) {
            console.error(error);
            setMessage("Erreur lors de la création du membre.");
        }
    };


    return (
        <>
            <div className="card">
                <h2>Création membre</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Nom d'utilisateur"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="FOUNDER">Porteur de projet</option>
                        <option value="MENTOR">Parrain</option>
                    </select>
                    {formData.role === "MENTOR" && (
                        <input
                            type="number"
                            name="nbrOfFounders"
                            placeholder="Nombre de fondateurs"
                            value={formData.nbrOfFounders}
                            onChange={handleChange}
                        />
                    )}
                    <button type="submit">Créer</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </>
    );
};

export default CreationMember;
