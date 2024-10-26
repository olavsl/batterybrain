import React, { useState, useEffect } from 'react';
import { fetchAllRPis } from './services/RPiDBService'; // Import the API service
import { RPi } from './types/Rpi';

const RPiButtons = () => {
    const [rpis, setRpis] = useState<RPi[]>([]);

    useEffect(() => {
        fetch('/api/rpis')
        //fetch('http://localhost:5000/api/rpis')

            .then(response => response.json())
            .then((data) => {
                console.log('Fetched data:', data); // Add this line
                setRpis(Array.isArray(data) ? data : []); // Ensure data is an array
            })
            .catch(error => console.error('Error fetching RPi data:', error));

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