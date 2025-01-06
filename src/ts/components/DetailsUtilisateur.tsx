import React, { useState, useEffect } from 'react';

interface Utilisateur {
    id: number;
    nomUtilisateur: string;
    mail: string;
    nom: string;
    prenom: string;
    entreprise: string;
    disponibilites: string;
    contactPrefere: string;
    description: string;
    lieux: Lieu[];
    accompagnements: Accompagnement[];
    domaine_activites: Domaine_activite[];
    role: Role;
    actif: boolean;
}

interface Domaine_activite {
    id: number;
    nom: string;
}

interface Accompagnement {
    id: number;
    nom: string;
}

interface Lieu {
    id: number;
    departement: string;
    nom: string;
}

interface Role {
    id: number;
    nom: string;
}

interface UtilisateurDetailsProps {
    porteurId: number;
    roleId: number;
}

const DetailsUtilisateur: React.FC<UtilisateurDetailsProps> = ({ utilisateurId, roleId }) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUtilisateurDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/Utilisateur/${utilisateurId}/${roleId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUtilisateur(data);
                } else {
                    setError('Erreur lors de la récupération des détails utilisateur');
                }
            } catch (error) {
                setError('Erreur réseau lors de la récupération des détails utilisateur');
            } finally {
                setLoading(false);
            }
        };

        fetchUtilisateurDetails();
    }, [utilisateurId, roleId]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {utilisateur ? (
                <div>
                    <h2>Détails Utilisateur</h2>
                    <p><strong>Statut du compte:</strong> {utilisateur.actif ? 'Actif' : 'Non actif'}</p>
                    <p><strong>Type de compte:</strong> {utilisateur.role.nom}</p>
                    <p><strong>Nom d'utilisateur:</strong> {utilisateur.nomUtilisateur}</p>
                    <p><strong>Email:</strong> {utilisateur.mail}</p>
                    <p><strong>Nom:</strong> {utilisateur.nom}</p>
                    <p><strong>Prénom:</strong> {utilisateur.prenom}</p>
                    <p><strong>Entreprise:</strong> {utilisateur.entreprise}</p>
                    <p><strong>Disponibilités:</strong> {utilisateur.disponibilites}</p>
                    <p><strong>Contact Préféré:</strong> {utilisateur.contactPrefere}</p>
                    <p><strong>Description:</strong> {utilisateur.description}</p>
                    {utilisateur.role.id === 3 || utilisateur.role.id === 4 ? (
                        <>
                            <h3>Situation géographique</h3>
                            <ul>
                                {utilisateur.lieux.length > 0 ? (
                                    utilisateur.lieux.map((lieu) => (
                                        <li key={lieu.id}>
                                            {lieu.nom || "non renseigné"} ({lieu.departement || "non renseigné"})
                                        </li>
                                    ))
                                ) : (
                                    <li>Non renseigné</li>
                                )}
                            </ul>

                            {utilisateur.role == 3 ? <h3>Accompagnements demandés</h3> : <h3>Accompagnements proposés</h3>}
                            <ul>
                                {utilisateur.accompagnements.length > 0 ? (
                                    utilisateur.accompagnements.map((accompagnement) => (
                                        <li key={accompagnement.id}>
                                            {accompagnement.nom || "non renseigné"}
                                        </li>
                                    ))
                                ) : (
                                    <li>Non renseigné</li>
                                )}
                            </ul>
                            <h3>Domaines d'activité</h3>
                            <ul>
                                {utilisateur.domaine_activites.length > 0 ? (
                                    utilisateur.domaine_activites.map((domaine) => (
                                        <li key={domaine.id}>
                                            {domaine.nom || "non renseigné"}
                                        </li>
                                    ))
                                ) : (
                                    <li>Non renseigné</li>
                                )}
                            </ul>
                        </>
                    ) : null}
                </div>
            ) : (
                <div>Utilisateur non trouvé</div>
            )}
        </div>
    );
};

export default DetailsUtilisateur;