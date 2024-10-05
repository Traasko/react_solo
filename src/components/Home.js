import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser, selectUser } from '../redux/authSlice';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div>
      <h1>Page d'Accueil</h1>
      {user ? (
        <h2>Bienvenue, {user.username}</h2>
      ) : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
            <div>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>

          <div>
            <p>Pas encore inscrit ?</p>
            <Link to="/register">S'inscrire</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
