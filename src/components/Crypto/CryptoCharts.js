import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const BitcoinPriceChart = () => {
  const [bitcoinData, setBitcoinData] = useState([]);

  // Fonction pour récupérer les données historiques du Bitcoin sur 7 jours
  const fetchBitcoinData = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart',
        { params: { vs_currency: 'usd', days: '7', interval: 'daily' } } // Données sur les 7 derniers jours
      );
      
      const formattedData = response.data.prices.map((price) => ({
        date: new Date(price[0]).toLocaleDateString(), // Convertir la date en format lisible
        price: price[1].toFixed(2), // Prix du Bitcoin en USD, arrondi à 2 décimales
      }));
      setBitcoinData(formattedData);
    } catch (error) {
      console.error('Erreur lors de la récupération des données Bitcoin:', error);
    }
  };

  useEffect(() => {
    fetchBitcoinData();
  }, []);

  return (
    <div>
      <h3>Évolution du Prix du Bitcoin (7 derniers jours)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={bitcoinData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} unit=" $" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" name="Prix du Bitcoin (USD)" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BitcoinPriceChart;
