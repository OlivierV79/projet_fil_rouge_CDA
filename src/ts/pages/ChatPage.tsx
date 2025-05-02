import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ChatPage: React.FC = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>Messagerie {username} !</h1>
        </div>
    );
};

export default ChatPage;