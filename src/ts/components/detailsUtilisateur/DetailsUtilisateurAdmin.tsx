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
    utilisateurId: number;
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
        <div className="card">
            {utilisateur ? (
                <div>
                    <h2>Détails Utilisateur Complet</h2>
                    <p>Statut du compte : {utilisateur.actif ? 'Actif' : 'Non actif'}</p>
                    <p>Type de compte : {utilisateur.role.nom}</p>
                    <p>Nom d'utilisateur : {utilisateur.nomUtilisateur}</p>
                    <p>Email : {utilisateur.mail}</p>
                    <p>Nom : {utilisateur.nom}</p>
                    <p>Prénom : {utilisateur.prenom}</p>
                    <p>Entreprise : {utilisateur.entreprise}</p>
                    <p>Disponibilités : {utilisateur.disponibilites}</p>
                    <p>Contact Préféré : {utilisateur.contactPrefere}</p>
                    <p>Description : {utilisateur.description}</p>
                    {utilisateur.role.id === 3 || utilisateur.role.id === 4 ? (
                        <>
                            <p>Situation géographique :</p>
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

                            {utilisateur.role.id == 3 ? <p>Accompagnements demandés :</p> : <p>Accompagnements proposés :</p>}
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
                            <p>Domaines d'activité :</p>
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