import React from 'react';
import ModifierUtilisateur from "../components/modifierUtilisateur/ModifierUtilisateur.tsx";

const Parrain: React.FC = () => {
    return (
        <>
            <h1>H1 de la page Parrain</h1>
            { // <DetailsUtilisateur utilisateurId={1} roleId={4} />
                 }
            <ModifierUtilisateur utilisateurId={3} roleId={4}/>


        </>


    )
};

export default Parrain;