import React from 'react';
import {Link} from "react-router-dom";

const PageTest: React.FC = () => {
    return (
        <>
            <h1>H1 de la page de test</h1>
            <ul>
                <li>
                    <Link to="/AdminG">
                        Vers la page de l'administrateur général (Régional)
                    </Link>
                </li>
                <li>
                    <Link to="/AdminD">
                        Vers la page de l'administrateur départemental
                    </Link>
                </li>
                <li>
                    <Link to="/Porteur">
                        Vers la page d'un porteur de projet'
                    </Link>
                </li>
                <li>
                    <Link to="/Parrain">
                        Vers la page d'un parrain
                    </Link>
                </li>
                <li></li>
            </ul>

        </>

    )

};

export default PageTest;