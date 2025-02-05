import React from 'react';
import DetailsUtilisateurProfil from "../components/detailsUtilisateur/DetailsUtilisateurProfil.tsx";
import DetailsMembreRecherche from "../components/detailsUtilisateur/DetailsMembreRecherche.tsx";

const Porteur: React.FC = () => {
    return (
        <>
            <h1>H1 de la page Porteur</h1>
            <DetailsMembreRecherche />
            <DetailsUtilisateurProfil utilisateurId={1} roleId={3} />
        </>
    )
};

export default Porteur;