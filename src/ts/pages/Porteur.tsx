import React from 'react';
import DetailsUtilisateur from "../components/DetailsUtilisateur";

const Porteur: React.FC = () => {
    return (
        <>
            <h1>H1 de la page Porteur</h1>
            <DetailsUtilisateur utilisateurId={1} roleId={3} />

        </>

    )
};

export default Porteur;