import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, logoutUser, selectUser } from './redux/authSlice';
import Home from './components/Home';
import CryptoPage from './components/Crypto/CryptoPage';
import WebSocketSimulationPage from './components/WebSocket/WebSocketSimulationPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [registerData, setRegisterData] = useState({ username: '', password: '' });
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await dispatch(registerUser(registerData)).unwrap();
            setRegisterData({ username: '', password: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await dispatch(loginUser(loginData)).unwrap();
            setLoginData({ username: '', password: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <nav>
                <Link to="/">Accueil</Link>
                {user ? (
                    <>
                        <Link to="/crypto">Crypto</Link>
                        <Link to="/websocket-simulation">WebSocket</Link>
                        <button onClick={() => dispatch(logoutUser())}>Déconnexion</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Se connecter</Link>
                        <Link to="/register">S'inscrire</Link>
                    </>
                )}
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={
                    <div>
                        <h2>Se connecter</h2>
                        <form onSubmit={handleLogin}>
                            <input
                                type="text"
                                placeholder="Nom d'utilisateur"
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                required
                            />
                            <button type="submit">Se connecter</button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                } />
                <Route path="/register" element={
                    <div>
                        <h2>S'inscrire</h2>
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                placeholder="Nom d'utilisateur"
                                value={registerData.username}
                                onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Mot de passe"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                required
                            />
                            <button type="submit">S'inscrire</button>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </form>
                    </div>
                } />
                <Route element={<PrivateRoute />}>
                    <Route path="/crypto" element={<CryptoPage />} />
                    <Route path="/websocket-simulation" element={<WebSocketSimulationPage />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
