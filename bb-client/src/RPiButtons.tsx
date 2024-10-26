import React, { useState, useEffect } from 'react';
import { fetchAllRPis } from './services/RPiDBService'; // Import the API service
import { RPi } from './types/Rpi';

const RPiButtons = () => {
    const [rpis, setRpis] = useState<RPi[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchAllRPis();
                console.log('Fetched data:', data); // Log the fetched data
                setRpis(Array.isArray(data) ? data : []); // Ensure data is an array
            } catch (error) {
                console.error('Error fetching RPi data:', error);
            }
        };

        getData();
    }, []);

    return (
        <div>
            {rpis.map(rpi => (
                <button
                    key={rpi.id}
                    onClick={() => window.location.href = `http://${rpi.subdomain}.gr9.codexenmo.no/`}
                >
                    {rpi.subdomain}
                </button>
            ))}
        </div>
    );
};

export default RPiButtons;
