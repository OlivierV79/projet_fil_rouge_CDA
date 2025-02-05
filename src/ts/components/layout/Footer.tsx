import React from 'react';
import '../../style/Footer.css';
import logoInitiave79 from '../../assets/logos/logo_i_79.png';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-top">
                    <div className="footer-logo">
                        <img src={logoInitiave79} alt="Logo Initiative Deux-Sèvre" />
                    </div>
                    <div className="footer-contact">
                        <h4>Contact</h4>
                        <p>INITIATIVE DEUX SEVRES</p>
                        <p>4, boulevard Louis Tardy</p>
                        <p>Pépinière d'entreprises du Niortais</p>
                        <p>79000 Niort</p>
                    </div>
                </div>
                <div className="footer-social">
                    <h4>Nous suivre</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                           className="social-button facebook">
                            Facebook
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                           className="social-button twitter">
                            Twitter
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
                           className="social-button linkedin">
                            LinkedIn
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                           className="social-button instagram">
                            Instagram
                        </a>
                    </div>
                </div>
            </div>

            <p className="footer-copyright">&copy; 2025 Olivier VILLAVERDE. Tous droits réservés.</p>
        </footer>
    );
};

export default Footer;