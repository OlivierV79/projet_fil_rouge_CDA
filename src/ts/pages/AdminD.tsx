import React from 'react';
import CreationUtilisateur from "../components/CreationUtilisateur";

const AdminD: React.FC = () => {
    return (
        <>
            <h1>H1 de la page AdminD</h1>
            {/*<CreationUtilisateur role={"3"} typeUtilisateur={"Porteur de projet"}/>*/}
            {/*<CreationUtilisateur role={"4"} typeUtilisateur={"Parrain"}/>*/}
            <CreationUtilisateur />

        </>

    )
};

export default AdminD;