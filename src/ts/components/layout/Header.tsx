import React from "react";
import logoTTM from '../../assets/logos/logo_ttm.png';
import '../../style/Header.css';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';


const Header: React.FC = () => {
    const { role, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        navigate('/login'); // ou la route que tu souhaites
    };

    const renderMenuItems = () => {
        switch (role) {
            case 'ADMIN':
                return (
                    <>
                        <li><NavLink to="/">Accueil</NavLink></li>
                        <li><NavLink to="/chat">Messagerie</NavLink></li>
                        <li><NavLink to="/statistics">Statistiques</NavLink></li>
                        <li><NavLink to="/memberManagement">Gestion membres</NavLink></li>
                        <li><NavLink to="/appointmentTracking">Suivi rdv</NavLink></li>
                        <li><NavLink to="/documents">Documents</NavLink></li>
                        <li><NavLink to="/profil">Profil</NavLink></li>
                        <li onClick={handleLogout} className="logout">Déconnexion</li>
                    </>
                );
            case 'MENTOR':
                return (
                    <>
                        <li><NavLink to="/">Accueil</NavLink></li>
                        <li><NavLink to="/chat">Messagerie</NavLink></li>
                        <li><NavLink to="/appointmentTracking">Suivi des porteurs</NavLink></li>
                        <li><NavLink to="/documents">Documents</NavLink></li>
                        <li><NavLink to="/profil">Profil</NavLink></li>
                        <li onClick={handleLogout} className="logout">Déconnexion</li>
                    </>
                );
            case 'FOUNDER':
                return (
                    <>
                        <li><NavLink to="/">Accueil</NavLink></li>
                        <li><NavLink to="/chat">Messagerie</NavLink></li>
                        <li><NavLink to="/documents">Documents</NavLink></li>
                        <li><NavLink to="/profil">Profil</NavLink></li>
                        <li onClick={handleLogout} className="logout">Déconnexion</li>
                    </>
                );
            default:
                return (
                    <>

                    </>
                );
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <img src={logoTTM} alt="Logo Initiative Deux-Sèvre"/>
            </div>
            <nav>
                <ul>
                    {renderMenuItems()}
                </ul>
            </nav>
        </header>
    );
};

export default Header;