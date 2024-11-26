import React, { useState, useEffect } from 'react';

interface AdminFormData {
    nomUtilisateur: string;
    mail: string;
    password: string;
    nom: string;
    prenom: string;
    entreprise: string;
    plateformeInitiativeId: string;
}

interface Plateforme {
    id: number;
    nom: string;
}

const CreationAdminD: React.FC = () => {
    const [formData, setFormData] = useState<AdminFormData>({
        nomUtilisateur: '',
        mail: '',
        password: '',
        nom: '',
        prenom: '',
        entreprise: '',
        plateformeInitiativeId: ''
    });

    const [plateformes, setPlateformes] = useState<Plateforme[]>([]);

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



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await fetch('http://localhost:8080/api/AdminG/creationAdminD', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('OKKKKKKKK');
                setFormData({
                    nomUtilisateur: '',
                    mail: '',
                    password: '',
                    nom: '',
                    prenom: '',
                    entreprise: '',
                    plateformeInitiativeId: ''
                });
            } else {
                alert('Pb creation AdminD.');
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
            alert('Pb Front > Back');
        }
    };

    return (
        <>
            <h2>H2 du composant Création AdministrateurD</h2>
            <form onSubmit={handleSubmit}>
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
                <div>
                    <label>Plateforme Initiative de référence:</label>
                    <select
                        name="plateformeInitiativeId"
                        value={formData.plateformeInitiativeId}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>-- Sélectionnez une plateforme --</option>
                        {plateformes.map((plateforme, index) => (
                            <option key={plateforme.id} value={plateforme.id}>
                                {plateforme.nom}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Création Administrateur départemental</button>
            </form>
        </>
    );
};

export default CreationAdminD;