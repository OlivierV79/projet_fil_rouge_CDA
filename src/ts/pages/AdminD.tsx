import React from 'react';
import CreationUtilisateur from "../components/creationUtilisateur/CreationUtilisateur.tsx";

const AdminD: React.FC = () => {
    return (
        <>
            <h1>H1 de la page AdminD</h1>
            {/*<CreationUtilisateur role={"3"} typeUtilisateur={"Porteur de projet"}/>*/}
            {/*<CreationUtilisateur role={"4"} typeUtilisateur={"Parrain"}/>*/}
            <button>Créer un profil Membre</button>
            <br/>
            <button>Modifier un profil Membre de son département</button>
            <br/>
            <button>Consulter tous les profils de son département</button>
            <br/>
            <button>Consulter tous les matchs de son département</button>
            <br/>
            <button>Consulter suivi de tout le monde de son département</button>
            <br/>
            <button>Modifier le footer de la page de son département</button>
            <br/>
            <button>Gestion des documents</button>
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
            <button>A venir</button>
            <br/>
            <button>A venir</button>
            <br/>

            <CreationUtilisateur/>

        </>

    )
};

export default AdminD;