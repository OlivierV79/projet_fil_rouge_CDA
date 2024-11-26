import React from 'react';
import {Link} from "react-router-dom";

const PageTest: React.FC = () => {
    return (
        <>
            <h1>H1 de la page de test</h1>
            <Link to="/AdminG">
                Vers la page de l'administrateur général (Régional)
            </Link>
        </>

    )

};

export default PageTest;