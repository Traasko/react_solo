import React from 'react';
import WebSocketComponent from './WebSocket/WebSocketComponent';
import { useSelector } from 'react-redux';
import Navigate from 'react-router-dom';
import { selectUser } from '../redux/authSlice';

const ProtectedPage = () => {
    const user = useSelector(selectUser);

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Page Protégée</h1>
            <p>Bienvenue sur la page protégée, {user.username}!</p>
            <WebSocketComponent />
        </div>
    );
};

export default ProtectedPage;
