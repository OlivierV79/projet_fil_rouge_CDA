// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { username, password });
            const token = response.data.token;
            login(token);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            alert('Erreur de connexion');
        }
    };

    return (
        <>
            <h1>Trouve ton match</h1>

            <div className="card">
                <h2>Connexion</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Se connecter</button>
                </form>
            </div>


        </>

    );
}

export default LoginPage;
