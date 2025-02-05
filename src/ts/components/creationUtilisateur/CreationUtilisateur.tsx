import React, { useState, useEffect } from 'react';

interface UtilisateurFormData {
    nomUtilisateur: string;
    mail: string;
    password: string;
    nom: string;
    prenom: string;
    entreprise: string;
    plateformeInitiative: PlateformeInitiative;
    role: Role;
}

interface Role {
    id: number;
    nom: string;
}

interface PlateformeInitiative {
    id: number;
    nom: string;
}

const CreationUtilisateur: React.FC = () => {
    const [formData, setFormData] = useState<UtilisateurFormData>({
        nomUtilisateur: '',
        mail: '',
        password: '',
        nom: '',
        prenom: '',
        entreprise: '',
        plateformeInitiative: { id: 0, nom: '' },
        role: { id: 0, nom: '' }
    });

    const [plateformes, setPlateformes] = useState<PlateformeInitiative[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchPlateformes = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/PlateformeInitiative/plateformes');
                if (response.ok) {
                    const data = await response.json();
                    setPlateformes(data);
                } else {
                    console.error('Erreur lors du chargement des plateformes');
                }
            } catch (error) {
                console.error('Erreur réseau lors du chargement des plateformes', error);
            }
        };

        fetchPlateformes();
    }, []);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/role/roles');
                if (response.ok) {
                    const data = await response.json();
                    setRoles(data);
                } else {
                    console.error('Erreur lors du chargement des rôles');
                }
            } catch (error) {
                console.error('Erreur réseau lors du chargement des rôles', error);
            }
        };

        fetchRoles();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'role') {
            const selectedRole = roles.find(role => role.id === parseInt(value, 10));
            setFormData({ ...formData, role: selectedRole! });
        } else if (name === 'plateformeInitiative') {
            const selectedPlateforme = plateformes.find(plateforme => plateforme.id === parseInt(value, 10));
            setFormData({ ...formData, plateformeInitiative: selectedPlateforme! });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await fetch('http://localhost:8080/api/Utilisateur/creationUtilisateur', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Utilisateur créé avec succès');
                setFormData({
                    nomUtilisateur: '',
                    mail: '',
                    password: '',
                    nom: '',
                    prenom: '',
                    entreprise: '',
                    plateformeInitiative: { id: 0, nom: '' },
                    role: { id: 0, nom: '' }
                });
            } else {
                const errorData = await response.json();
                alert(`Problème lors de la création de l'utilisateur: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert('Problème de communication avec le serveur.');
        }
    };

    return (
        <div className="card card-creation-compte">
            <h2>Création compte</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rôle de l'utilisateur:</label>
                    <select
                        name="role"
                        value={formData.role.id}
                        onChange={handleChange}
                        required
                    >
                        <option value="0" disabled>-- Sélectionnez un rôle --</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.nom}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Plateforme Initiative de référence:</label>
                    <select
                        name="plateformeInitiative"
                        value={formData.plateformeInitiative.id}
                        onChange={handleChange}
                        required
                    >
                        <option value="0" disabled>-- Sélectionnez une plateforme --</option>
                        {plateformes.map((plateforme) => (
                            <option key={plateforme.id} value={plateforme.id}>
                                {plateforme.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Nom d'utilisateur:</label>
                    <input
                        type="text"
                        name="nomUtilisateur"
                        value={formData.nomUtilisateur}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="mail"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Entreprise:</label>
                    <input
                        type="text"
                        name="entreprise"
                        value={formData.entreprise}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Création</button>
            </form>
        </div>
    );
};

export default CreationUtilisateur;