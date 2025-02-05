import React, { useState, useEffect } from 'react';
import DetailsUtilisateurProfil from "./DetailsUtilisateurProfil.tsx";

interface Membre {
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
    plateformeInitiative: PlateformeInitiative;
}

interface PlateformeInitiative{
    id: number;
    nom: string;
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



const DetailsMembreRecherche = () => {
    const [membres, setMembres] = useState<List<Membre> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUtilisateurDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/Utilisateur/`);
                if (response.ok) {
                    const data = await response.json();
                    setMembres(data);
                } else {
                    setError('Erreur lors de la récupération de la liste des membres');
                }
            } catch (error) {
                setError('Erreur réseau lors de la récupération de la liste des membres');
            } finally {
                setLoading(false);
            }
        };

        fetchUtilisateurDetails();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="card card-visu-compte-profil">
            {membres ? (
                <div>
                    <h2>Liste des Profils</h2>
                    {/*--------------------------------------------------------------------------*/}

                    {membres.map((membre) => (
                        <DetailsUtilisateurProfil
                            key={membre.id}
                            utilisateurId={membre.id}
                            roleId={membre.role.id}
                        />
                    ))}










                    {/*--------------------------------------------------------------------------*/}
                </div>
            ) : (
                <div>Membres non trouvés</div>
            )}
        </div>
    );
};

export default DetailsMembreRecherche;