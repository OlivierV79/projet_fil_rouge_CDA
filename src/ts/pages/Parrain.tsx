import React from 'react';
import ModifierUtilisateur from "../components/modifierUtilisateur/ModifierUtilisateur.tsx";

const Parrain: React.FC = () => {
    return (
        <>
            <h1>Parrain</h1>
            <button>Modifier profil</button>
            <br/>
            <button>Obtenir document</button>
            <br/>
            <button>Notification "j'ai un nouveau filleul"</button>
            <br/>
            <button>Modifier disponibilité</button>
            <br/>
            <button>A venir</button>
            <br/>
            <button>A venir</button>
            <br/>
            <button>A venir</button>
            <br/>
            <button>A venir</button>
            <br/>
            <button>A venir</button>
            <br/>
            <ModifierUtilisateur utilisateurId={3} roleId={4}/>


        </>


    )
};

export default Parrain;