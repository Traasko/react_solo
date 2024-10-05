import React, { useState, useEffect } from 'react';
import useWebSocket from './useWebSocket';
import axios from 'axios';

const WebSocketComponent = () => {
  const { messages, sendMessage } = useWebSocket('wss://echo.websocket.org');
  const [message, setMessage] = useState('');
  const [prices, setPrices] = useState({ bitcoin: 0, ethereum: 0 });
  const [error, setError] = useState(null);

  // Fonction pour récupérer les prix des cryptomonnaies
  const fetchCryptoPrices = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
      setPrices(response.data);
    } catch (err) {
      setError(err);
    }
  };

  // Utiliser useEffect pour récupérer les prix toutes les 10 secondes
  useEffect(() => {
    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 10000); // Récupérer les prix toutes les 10 secondes
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage(''); // Réinitialiser le champ de message après l'envoi
  };

  // Afficher un message lorsque de nouvelles données sont reçues
  useEffect(() => {
    messages.forEach((msg) => {
      console.log('Message reçu:', msg); // Vous pouvez gérer les messages reçus ici
    });
  }, [messages]);

  return (
    <div>
      <h2>WebSocket avec Hook personnalisé</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tapez votre message"
      />
      <button onClick={handleSendMessage}>Envoyer</button>
      <div>
        <h3>Messages reçus :</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      
    </div>
  );
};

export default WebSocketComponent;
