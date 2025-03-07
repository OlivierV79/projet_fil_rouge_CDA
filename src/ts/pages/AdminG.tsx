import React from 'react';
import CreationUtilisateur from "../components/creationUtilisateur/CreationUtilisateur.tsx";

const AdminG: React.FC = () => {
    return (
        <>
            <h1>Administrateur Régional</h1>
            <br/>
            <button>Créer un profil</button>
            <br/>
            <button>Modifier un profil</button>
            <br/>
            <button>Consulter tous les profils</button>
            <br/>
            <button>Consulter tous les matchs</button>
            <br/>
            <button>Consulter suivi de tout le monde</button>
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


            <CreationUtilisateur/>
        </>

    )
};

export default AdminG;