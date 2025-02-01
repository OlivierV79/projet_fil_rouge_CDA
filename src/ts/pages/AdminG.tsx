import React from 'react';
import CreationUtilisateur from "../components/CreationUtilisateur";

const AdminG: React.FC = () => {
    return (
        <>
            <h1>H1 de la page AdminG</h1>
            <CreationUtilisateur roleId={"2"} typeUtilisateur={"Administrateur départemantal"}/>
        </>

    )
};

export default AdminG;