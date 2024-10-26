import React, { useState, useEffect } from 'react';
import { RPi } from './types/Rpi';

const RPiButtons = () => {
    const [rpis, setRpis] = useState<RPi[]>([]);

    useEffect(() => {
        fetch('http://databoysxko.codexenmo.no:8081/api/rpis')
            .then(response => response.json())
            .then((data) => {
                console.log('Fetched data:', data); // Add this line
                setRpis(Array.isArray(data) ? data : []); // Ensure data is an array
            })
            .catch(error => console.error('Error fetching RPi data:', error));
    }, []);

    return (
        <div>
            <h2>Connect to Raspberry Pis</h2>
            {rpis.map(rpi => (
                <button
                    key={rpi.id}
                    onClick={() => window.location.href = `http://${rpi.subdomain}`}
                >
                    Connect to {rpi.id}
                </button>
            ))}
        </div>
    );
};

export default RPiButtons;