import React, {useEffect, useState} from 'react';
import photo from '../../assets/photo/El_padre.png';

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
    plateformeInitiative: PlateformeInitiative;
}

interface PlateformeInitiative {
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

interface UtilisateurDetailsProps {
    utilisateurId: number;
    roleId: number;
}

const DetailsUtilisateurProfilRecherhce: React.FC<UtilisateurDetailsProps> = ({utilisateurId, roleId}) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [profilComplet, setProfileComplet] = useState(false);

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

    const handleClick = () => {
        profilComplet ? setProfileComplet(false) : setProfileComplet(true);

    };

    return (
        <div className="card card-visu-compte-profil-recherche">
            {utilisateur ? (
                <div>
                    <div>
                        {utilisateur.role.id === 3 || utilisateur.role.id === 4 ? (
                            <>
                                <div className="presentation-bouton">
                                    <button type="button">Montrer son intérêt</button>
                                    {!profilComplet ?
                                        <button type="button" onClick={handleClick}>Voir le profil complet</button> :
                                        <button type="button" onClick={handleClick}>Revenir au profil simple</button>}

                                </div>
                                {!profilComplet ?
                                    <div className="petit">
                                        <img src={photo} alt="Photo de profil"/>
                                        <div className="visu-compte-profil-section  ">
                                            <p className="nom">{utilisateur.nomUtilisateur}</p>
                                            <p><strong>Entreprise : </strong>{utilisateur.entreprise}</p>
                                            <p className="profil-description-recherche"><strong>Description
                                                : </strong>{utilisateur.description || "non renseigné"}</p>
                                        </div>
                                    </div>
                                    :
                                    <>
                                        <div className="petit">
                                            <img src={photo} alt="Photo de profil"/>
                                            <div className="visu-compte-profil-section ">
                                                <p className="nom">{utilisateur.nomUtilisateur}</p>
                                                <p><strong>Entreprise : </strong>{utilisateur.entreprise}</p>
                                                <p><strong>Description
                                                    : </strong>{utilisateur.description || "non renseigné"}</p>
                                            </div>
                                        </div>
                                        <div className="visu-compte-profil-section ">
                                            <p>Disponibilités : {utilisateur.disponibilites || "non renseigné"}</p>
                                            <p>Contact Préféré : {utilisateur.contactPrefere || "non renseigné"}</p>
                                        </div>
                                        <div className="visu-compte-profil-section visu-compte-profil-section-liste">
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
                                        </div>
                                        <div className="visu-compte-profil-section visu-compte-profil-section-liste">
                                            {utilisateur.role.id == 3 ? <p>Accompagnements demandés : </p> :
                                                <p>Accompagnements proposés : </p>}
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
                                        </div>
                                        <div className="visu-compte-profil-section visu-compte-profil-section-liste">
                                            <p>Domaines d'activité : </p>
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
                                        </div>
                                    </>
                                }




                            </>
                        ) : null}
                    </div>
                </div>
            ) : (
                <div>Utilisateur non trouvé</div>
            )}

        </div>
    );
};

export default DetailsUtilisateurProfilRecherhce;

