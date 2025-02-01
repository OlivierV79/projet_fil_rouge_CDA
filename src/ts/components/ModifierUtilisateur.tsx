import React, {useState, useEffect} from 'react';

interface Utilisateur {
    id: number;
    nomUtilisateur: string;
    mail: string;
    password: string;
    nom: string;
    prenom: string;
    entreprise: string;
    plateformeInitiativeId: number;
    role: number;
    description: string;
}

interface ModifierUtilisateurProps {
    utilisateurId: number;
    roleId: number;
}

const ModifierUtilisateur: React.FC<ModifierUtilisateurProps> = ({utilisateurId, roleId}) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);


    useEffect(() => {
        const fetchUtilisateur = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/Utilisateur/${utilisateurId}/${roleId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUtilisateur(data);
                } else {
                    console.error('Erreur lors du fetch de l\'utilisateur');
                }
            } catch (error) {
                console.error('Erreur de réseau');
            }
        };

        fetchUtilisateur();


    }, [utilisateurId, roleId]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const utilisateurToUpdate = {
            id: utilisateur?.id,
            nomUtilisateur: utilisateur?.nomUtilisateur,
            mail: utilisateur?.mail,
            password: utilisateur?.password,
            nom: utilisateur?.nom,
            prenom: utilisateur?.prenom,
            entreprise: utilisateur?.entreprise,
            plateformeInitiativeId: utilisateur?.plateformeInitiativeId,
            role: utilisateur?.role,
            description: utilisateur?.description,
        };


        console.log('Utilisateur à mettre à jour:', utilisateurToUpdate);

        const response = await fetch('http://localhost:8080/api/Utilisateur/modifierUtilisateur', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(utilisateurToUpdate),

        });

        if (response.ok) {
            const updatedUser = await response.json();
            console.log('Utilisateur mis à jour', updatedUser);
        } else {
            console.error('Erreur lors de la mise à jour');
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <h3>Modifier l'utilisateur</h3>
            <label>Nom d'utilisateur</label>
            <input
                type="text"
                value={utilisateur?.nomUtilisateur || ''}
                onChange={e => setUtilisateur((prevState) => ({...prevState, nomUtilisateur: e.target.value}))}
            />
            <label>Email</label>
            <input
                type="email"
                value={utilisateur?.mail || ''}
                onChange={e => setUtilisateur((prevState) => ({...prevState, mail: e.target.value}))}
            />
            <label>Mot de passe</label>
            <input
                type="password"
                value={utilisateur?.password || ''}
                onChange={e => setUtilisateur((prevState) => ({...prevState, password: e.target.value}))}
            />
            <label>Nom</label>
            <input
                type="text"
                value={utilisateur?.nom || ''}
                onChange={e => setUtilisateur((prevState) => ({...prevState, nom: e.target.value}))}
            />
            <label>Prénom</label>
            <input
                type="text"
                value={utilisateur?.prenom || ''}
                onChange={e => setUtilisateur((prevState) => ({...prevState, prenom: e.target.value}))}
            />
            <label>Entreprise</label>
            <input
                type="text"
                value={utilisateur?.entreprise || ''}
                onChange={e => setUtilisateur((prevState) => ({...prevState, entreprise: e.target.value}))}
            />
            <label>Description</label>
            <textarea
                value={utilisateur?.description || ''}
                onChange={e => setUtilisateur((prevState) => ({...prevState, description: e.target.value}))}
            />

            <button type="submit">Mettre à jour</button>
        </form>
    );
};

export default ModifierUtilisateur;
