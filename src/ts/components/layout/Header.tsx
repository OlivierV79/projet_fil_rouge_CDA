import React from "react";
import logoTTM from '../../assets/logos/logo_ttm.png';
import '../../style/Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <img src={logoTTM} alt="Logo Initiative Deux-Sèvre"/>
            </div>
            <nav>
                <ul>
                    <li>Accueil</li>
                    <li>Messagerie</li>
                    <li>Documents</li>
                    <li>Statistiques</li>
                    <li>Utilisateurs/Membres</li>
                    <li>Profil</li>
                    <li>Déconnexion</li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;