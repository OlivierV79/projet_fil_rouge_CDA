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
    accompagnements: Accompagnement[];
    lieux: Lieu[];
    domaine_activites: DomaineActivite[];
}

interface ModifierUtilisateurProps {
    utilisateurId: number;
    roleId: number;
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

interface DomaineActivite {
    id: number;
    nom: string;
}

const ModifierUtilisateur: React.FC<ModifierUtilisateurProps> = ({utilisateurId, roleId}) => {
    const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
    const [lieux, setLieux] = useState<Lieu[]>([]);
    const [accompagnements, setAccompagnements] = useState<Accompagnement[]>([]);
    const [domaineActivites, setDomaineActivites] = useState<DomaineActivite[]>([]);

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
            }
        };
        fetchOptions();
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

        //testttttttttttttttttttttttttt
        console.log(utilisateurToUpdate);

        if (response.ok) {
            const updatedUser = await response.json();
            console.log('Utilisateur mis à jour', updatedUser);
        } else {
            console.error('Erreur lors de la mise à jour');
        }
    };

    return (
        <>


            <div className="card card-modifier-utilisateur">
                <h2>Modifier l'utilisateur</h2>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Nom d'utilisateur :</label>
                        <input
                            type="text"
                            value={utilisateur?.nomUtilisateur || ''}
                            onChange={e => setUtilisateur((prevState) => ({
                                ...prevState,
                                nomUtilisateur: e.target.value
                            }))}
                        />
                    </div>

                    <div>
                        <label>Email :</label>
                        <input
                            type="email"
                            value={utilisateur?.mail || ''}
                            onChange={e => setUtilisateur((prevState) => ({...prevState, mail: e.target.value}))}
                        />
                    </div>

                    <div>
                        <label>Nom :</label>
                        <input
                            type="text"
                            value={utilisateur?.nom || ''}
                            onChange={e => setUtilisateur((prevState) => ({...prevState, nom: e.target.value}))}
                        />
                    </div>

                    <div>
                        <label>Prénom :</label>
                        <input
                            type="text"
                            value={utilisateur?.prenom || ''}
                            onChange={e => setUtilisateur((prevState) => ({...prevState, prenom: e.target.value}))}
                        />
                    </div>

                    <div>
                        <label>Entreprise :</label>
                        <input
                            type="text"
                            value={utilisateur?.entreprise || ''}
                            onChange={e => setUtilisateur((prevState) => ({...prevState, entreprise: e.target.value}))}
                        />
                    </div>

                    <div>
                        <label>Description :</label>
                        <textarea
                            value={utilisateur?.description || ''}
                            onChange={e => setUtilisateur((prevState) => ({...prevState, description: e.target.value}))}
                        />
                    </div>

                    <div>
                        <label>Disponibilités :</label>
                    </div>

                    <div>
                        <label>Préférence de contact :</label>
                    </div>

                    <div>
                        <label>Accompagnements souhaités :</label>
                        <div className="section-choix">
                            {accompagnements.map(accompagnement => (
                                <label className="label-choix" key={accompagnement.id}>
                                    <input
                                        className="input-choix"
                                        type="checkbox"
                                        checked={utilisateur?.accompagnements.some(userAccompagnement => userAccompagnement.id === accompagnement.id) || false}
                                        onChange={() => {
                                            setUtilisateur((prevUtilisateur) => {
                                                if (!prevUtilisateur) return null;

                                                const isSelected = prevUtilisateur.accompagnements.some(userAccompagnement => userAccompagnement.id === accompagnement.id);
                                                const newAccompagnements = isSelected
                                                    ? prevUtilisateur.accompagnements.filter(userAccompagnement => userAccompagnement.id !== accompagnement.id)
                                                    : [...prevUtilisateur.accompagnements, accompagnement];

                                                return {
                                                    ...prevUtilisateur,
                                                    accompagnements: newAccompagnements
                                                };
                                            });
                                        }}
                                    />
                                    {accompagnement.nom}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label>Domaines d'activité :</label>
                        <div className="section-choix">
                            {domaineActivites.map(domaineActivite => (
                                <label className="label-choix" key={domaineActivite.id}>
                                    <input
                                        className="input-choix"
                                        type="checkbox"
                                        checked={utilisateur?.domaine_activites.some(userDomaineActivite => userDomaineActivite.id === domaineActivite.id) || false}
                                        onChange={() => {
                                            setUtilisateur((prevUtilisateur) => {
                                                if (!prevUtilisateur) return null;

                                                const isSelected = prevUtilisateur.domaine_activites.some(userDomaineActivite => userDomaineActivite.id === domaineActivite.id);
                                                const newDomaineActivites = isSelected
                                                    ? prevUtilisateur.domaine_activites.filter(userDomaineActivite => userDomaineActivite.id !== domaineActivite.id)
                                                    : [...prevUtilisateur.domaine_activites, domaineActivite];

                                                return {
                                                    ...prevUtilisateur,
                                                    domaine_activites: newDomaineActivites
                                                };
                                            });
                                        }}
                                    />
                                    {domaineActivite.nom}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label>Secteurs géographiques :</label>
                        <div className="section-choix">
                            {lieux.map(lieu => (
                                <label className="label-choix" key={lieu.id}>
                                    <input
                                        className="input-choix"
                                        type="checkbox"
                                        checked={utilisateur?.lieux.some(userLieu => userLieu.id === lieu.id) || false}
                                        onChange={() => {
                                            setUtilisateur((prevUtilisateur) => {
                                                if (!prevUtilisateur) return null;

                                                const isSelected = prevUtilisateur.lieux.some(userLieu => userLieu.id === lieu.id);
                                                const newLieux = isSelected
                                                    ? prevUtilisateur.lieux.filter(userLieu => userLieu.id !== lieu.id)
                                                    : [...prevUtilisateur.lieux, lieu];

                                                return {
                                                    ...prevUtilisateur,
                                                    lieux: newLieux
                                                };
                                            });
                                        }}
                                    />
                                    {lieu.nom}
                                </label>
                            ))}
                        </div>
                    </div>


                    <button type="submit">Mettre à jour</button>
                </form>
            </div>


        </>

    );
};

export default ModifierUtilisateur;
