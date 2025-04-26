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
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LoginPage;
