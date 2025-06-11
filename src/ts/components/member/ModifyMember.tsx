import React, {useEffect, useState} from "react";


const ModifyMember: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        currentPassword: "",
        nbrOfFounders: 0,
        available: true
    });

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8080/api/members/me", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    password: "",
                    confirmPassword: "",
                    currentPassword: "",
                    nbrOfFounders: data.nbrOfFounders || 0,
                    available: data.available ?? true
                });
            })
            .catch(err => console.error(err));
    }, []);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        const token = localStorage.getItem("token");

        const updatedData: any = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        if (formData.password) {
            updatedData.password = formData.password;
            updatedData.currentPassword = formData.currentPassword;
        }

        if (profile.role === "MENTOR") {
            updatedData.nbrOfFounders = formData.nbrOfFounders;
            updatedData.available = formData.available;
        }

        try {
            const res = await fetch("http://localhost:8080/api/members/me", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            if (!res.ok) throw new Error("Erreur lors de la mise à jour du profil");

            // Upload photo
            if (selectedFile) {
                const formDataFile = new FormData();
                formDataFile.append("file", selectedFile);

                const uploadRes = await fetch("http://localhost:8080/api/documents/upload/profilePicture", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formDataFile
                });

                if (!uploadRes.ok) throw new Error("Erreur lors de l'upload de la photo");
            }

            alert("Profil mis à jour avec succès");
        } catch (err) {
            console.error(err);
            alert("Une erreur est survenue lors de la mise à jour.");
        }
    };

    if (!profile) return <div>Chargement...</div>;

    return (
        <div className="card">
            <h2>Modifier profil</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <label>Photo de profil</label><br/>

                    {//photoUrl && (
                     //   <img src={photoUrl} alt="Profil" width="120" style={{marginBottom: "10px"}}/>
                    //)
                    }

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setSelectedFile(e.target.files[0]);
                            }
                        }}
                    />
                </div>


                <div>
                    <label>Prénom</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange}/>
                </div>
                <div>
                    <label>Nom</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange}/>
                </div>
                <div>
                    <label>Email</label>
                    <input name="email" value={formData.email} onChange={handleChange}/>
                </div>


                {profile.role === "MENTOR" && (
                    <>
                        <div>
                            <label>Nombre de porteurs suivis maximum</label>
                            <input
                                name="nbrOfFounders"
                                type="number"
                                value={formData.nbrOfFounders}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    name="available"
                                    checked={formData.available}
                                    onChange={handleChange}
                                />
                                Disponible
                            </label>
                        </div>
                    </>
                )}

                <div>
                    <label>Mot de passe actuel</label>
                    <input name="currentPassword" type="password" value={formData.currentPassword}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>Nouveau mot de passe</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange}/>
                </div>
                <div>
                    <label>Confirmer mot de passe</label>
                    <input name="confirmPassword" type="password" value={formData.confirmPassword}
                           onChange={handleChange}/>
                </div>





                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default ModifyMember;
