import React from 'react';
import {Link} from "react-router-dom";

const PageTest: React.FC = () => {
    return (
        <>
                <h1>Test</h1>
            <div className="card">
                <ul>
                    <li>
                        <Link to="/AdminG">
                            Page administrateur général (Régional)
                        </Link>

                    </li>
                    <br/>
                    <li>
                        <Link to="/AdminD">
                            Page administrateur départemental
                        </Link>
                    </li>
                    <br/>
                    <li>
                        <Link to="/Porteur">
                            Page porteur de projet
                        </Link>
                    </li>
                    <br/>
                    <li>
                        <Link to="/Parrain">
                            Page parrain
                        </Link>
                    </li>
                </ul>
            </div>

        </>

    )

};

export default PageTest;