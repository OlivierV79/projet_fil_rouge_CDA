import React from 'react';
import DetailsUtilisateurProfil from "../components/detailsUtilisateur/DetailsUtilisateurProfil.tsx";
import DetailsMembreRecherche from "../components/detailsUtilisateur/DetailsMembreRecherche.tsx";

const Porteur: React.FC = () => {
    return (
        <>
            <h1>Porteur</h1>
            <br/>
            <button>Consulter les parrains</button>
            <br/>
            <button>Modifier profil</button>
            <br/>
            <button>Obtenir document</button>
            <br/>
            <button>Notification "j'ai un nouveau filleul"</button>
            <br/>
            <button>Modifier disponibilité</button>
            <br/>

            <DetailsMembreRecherche/>
            <DetailsUtilisateurProfil utilisateurId={3} roleId={4}/>
        </>
    )
};

export default Porteur;