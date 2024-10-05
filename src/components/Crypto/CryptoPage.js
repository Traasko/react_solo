import React, { useEffect, useState } from 'react';
import CryptoCharts from './CryptoCharts';
import CryptoDistributionChart from './CryptoDistributionChart';
import axios from 'axios';

const CryptoPage = () => {
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await axios.get(
                    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,ripple,litecoin,cardano&vs_currencies=usd'
                );

                const currentTime = new Date().toISOString().slice(0, 10);
                setPrices((prevPrices) => [
                    ...prevPrices,
                    {
                        time: currentTime,
                        bitcoin: response.data.bitcoin.usd,
                        ethereum: response.data.ethereum.usd,
                        ripple: response.data.ripple.usd,
                        litecoin: response.data.litecoin.usd,
                        cardano: response.data.cardano.usd,
                    },
                ]);
            } catch (error) {
                console.error('Erreur lors de la récupération des prix : ', error);
            }
        };

        const intervalId = setInterval(fetchPrices, 10000);
        fetchPrices(); // Récupérer les prix initiaux

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <h1>Page des Cryptomonnaies</h1>
            <h3>Prix Actuels :</h3>
            <ul>
                {prices.length > 0 ? (
                    <li>Bitcoin: {prices[prices.length - 1].bitcoin} USD</li>
                ) : (
                    <li>Chargement...</li>
                )}
                {prices.length > 0 ? (
                    <li>Ethereum: {prices[prices.length - 1].ethereum} USD</li>
                ) : (
                    <li>Chargement...</li>
                )}
                {prices.length > 0 ? (
                    <li>Ripple: {prices[prices.length - 1].ripple} USD</li>
                ) : (
                    <li>Chargement...</li>
                )}
                {prices.length > 0 ? (
                    <li>Litecoin: {prices[prices.length - 1].litecoin} USD</li>
                ) : (
                    <li>Chargement...</li>
                )}
                {prices.length > 0 ? (
                    <li>Cardano: {prices[prices.length - 1].cardano} USD</li>
                ) : (
                    <li>Chargement...</li>
                )}
            </ul>
            <CryptoCharts data={prices} />
            <CryptoDistributionChart />
        </div>
    );
};

export default CryptoPage;
