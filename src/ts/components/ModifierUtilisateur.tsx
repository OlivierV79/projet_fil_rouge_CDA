import React, { useState, useEffect } from 'react';

interface Lieu {
    id: number;
    departement: string;
    nom: string;
    selected?: boolean;  // Ajout de 'selected' pour gérer la sélection
}

interface Accompagnement {
    id: number;
    nom: string;
    selected?: boolean; // Ajout de 'selected' pour gérer la sélection
}

interface DomaineActivite {
    id: number;
    nom: string;
    selected?: boolean; // Ajout de 'selected' pour gérer la sélection
}

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
    lieux: Lieu[];
    accompagnements: Accompagnement[];
    domaine_activites: DomaineActivite[];
}

interface ModifierUtilisateurProps {
    utilisateurId: number;
    roleId: number;
}

const ModifierUtilisateur: React.FC<ModifierUtilisateurProps> = ({ utilisateurId, roleId }) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
    const [lieux, setLieux] = useState<Lieu[]>([]);
    const [accompagnements, setAccompagnements] = useState<Accompagnement[]>([]);
    const [domaineActivites, setDomaineActivites] = useState<DomaineActivite[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

        const fetchOptions = async () => {
            try {
                const [lieuxRes, accompagnementsRes, domaineActivitesRes] = await Promise.all([
                    fetch('http://localhost:8080/api/Lieu/lieux'),
                    fetch('http://localhost:8080/api/Accompagnement/accompagnements'),
                    fetch('http://localhost:8080/api/DomaineActivite/domaineActivites'),
                ]);

                if (lieuxRes.ok) setLieux(await lieuxRes.json());
                if (accompagnementsRes.ok) setAccompagnements(await accompagnementsRes.json());
                if (domaineActivitesRes.ok) setDomaineActivites(await domaineActivitesRes.json());
            } catch (error) {
                console.error('Erreur lors du fetch des options');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUtilisateur();
        fetchOptions();
    }, [utilisateurId, roleId]);

    useEffect(() => {
        if (utilisateur) {
            // Initialiser les lieux, accompagnements et domaines avec selected: true si l'utilisateur les a déjà
            setLieux(prevLieux => prevLieux.map(lieu => ({
                ...lieu,
                selected: utilisateur.lieux.some(userLieu => userLieu.id === lieu.id)
            })));

            setAccompagnements(prevAccompagnements => prevAccompagnements.map(accompagnement => ({
                ...accompagnement,
                selected: utilisateur.accompagnements.some(userAccompagnement => userAccompagnement.id === accompagnement.id)
            })));

            setDomaineActivites(prevDomaineActivites => prevDomaineActivites.map(domaine => ({
                ...domaine,
                selected: utilisateur.domaine_activites.some(userDomaine => userDomaine.id === domaine.id)
            })));
        }
    }, [utilisateur]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //if (!utilisateur) return;



        // Construire un objet avec les données de l'utilisateur et les sélections
        const utilisateurToUpdate = {
            ...utilisateur,
            lieux: utilisateur.lieux
                .filter(lieu => lieu.selected)  // Filtrer les lieux sélectionnés
                .map(lieu => ({
                    id: lieu.id,  // Inclure l'id
                    departement: lieu.departement,  // Inclure le département pour chaque lieu sélectionné
                })),
            accompagnements: utilisateur.accompagnements
                .filter(accompagnement => accompagnement.selected)  // Filtrer les accompagnements sélectionnés
                .map(accompagnement => ({
                    id: accompagnement.id,  // Inclure l'id de l'accompagnement sélectionné
                })),
            domaine_activites: utilisateur.domaine_activites
                .filter(domaine => domaine.selected)  // Filtrer les domaines d'activités sélectionnés
                .map(domaine => ({
                    id: domaine.id,  // Inclure l'id du domaine d'activité sélectionné
                })),
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


    if (isLoading) return <div>Chargement...</div>;

    return (
        <form onSubmit={handleSubmit}>
            <h3>Modifier l'utilisateur</h3>
            <label>Nom d'utilisateur</label>
            <input
                type="text"
                value={utilisateur?.nomUtilisateur || ''}
                onChange={e => setUtilisateur((prevState) => ({ ...prevState, nomUtilisateur: e.target.value }))}
            />
            <label>Email</label>
            <input
                type="email"
                value={utilisateur?.mail || ''}
                onChange={e => setUtilisateur((prevState) => ({ ...prevState, mail: e.target.value }))}
            />
            <label>Mot de passe</label>
            <input
                type="password"
                value={utilisateur?.password || ''}
                onChange={e => setUtilisateur((prevState) => ({ ...prevState, password: e.target.value }))}
            />
            <label>Nom</label>
            <input
                type="text"
                value={utilisateur?.nom || ''}
                onChange={e => setUtilisateur((prevState) => ({ ...prevState, nom: e.target.value }))}
            />
            <label>Prénom</label>
            <input
                type="text"
                value={utilisateur?.prenom || ''}
                onChange={e => setUtilisateur((prevState) => ({ ...prevState, prenom: e.target.value }))}
            />
            <label>Entreprise</label>
            <input
                type="text"
                value={utilisateur?.entreprise || ''}
                onChange={e => setUtilisateur((prevState) => ({ ...prevState, entreprise: e.target.value }))}
            />
            <label>Description</label>
            <textarea
                value={utilisateur?.description || ''}
                onChange={e => setUtilisateur((prevState) => ({ ...prevState, description: e.target.value }))}
            />

            <h4>Lieux</h4>
            {lieux.map(lieu => (
                <label key={lieu.id}>
                    <input
                        type="checkbox"
                        checked={lieu.selected || false}
                        onChange={() => {
                            setLieux((prevLieux) => prevLieux.map(l =>
                                l.id === lieu.id ? { ...l, selected: !l.selected } : l
                            ));
                        }}
                    />
                    {lieu.departement} - {lieu.nom}
                </label>
            ))}

            <h4>Accompagnements</h4>
            {accompagnements.map(accompagnement => (
                <label key={accompagnement.id}>
                    <input
                        type="checkbox"
                        checked={accompagnement.selected || false}
                        onChange={() => {
                            setAccompagnements((prevAccompagnements) => prevAccompagnements.map(a =>
                                a.id === accompagnement.id ? { ...a, selected: !a.selected } : a
                            ));
                        }}
                    />
                    {accompagnement.nom}
                </label>
            ))}

            <h4>Domaines d'activités</h4>
            {domaineActivites.map(domaine => (
                <label key={domaine.id}>
                    <input
                        type="checkbox"
                        checked={domaine.selected || false}
                        onChange={() => {
                            setDomaineActivites((prevDomaineActivites) => prevDomaineActivites.map(d =>
                                d.id === domaine.id ? { ...d, selected: !d.selected } : d
                            ));
                        }}
                    />
                    {domaine.nom}
                </label>
            ))}

            <button type="submit">Mettre à jour</button>
        </form>
    );
};

export default ModifierUtilisateur;
