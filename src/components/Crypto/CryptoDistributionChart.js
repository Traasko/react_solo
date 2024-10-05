import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Bitcoin', value: 30 }, // Valeur hypothétique
    { name: 'Ethereum', value: 25 }, // Valeur hypothétique
    { name: 'Ripple', value: 20 }, // Valeur hypothétique
    { name: 'Litecoin', value: 15 }, // Valeur hypothétique
    { name: 'Cardano', value: 10 }, // Valeur hypothétique
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d0ed57'];

const CryptoDistributionChart = () => {
    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Distribution des Principales Cryptomonnaies sur le Marché            </h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={entry => `${entry.name}: ${entry.value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CryptoDistributionChart;
