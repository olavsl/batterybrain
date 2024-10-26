import React, { useState, useEffect } from 'react';

const RPiButtons = () => {
    const [rpis, setRpis] = useState<Rpi[]>([]);

    useEffect(() => {
        fetch('http://databoysxko.codexenmo.no:8081/api/rpis')
            .then(response => response.json())
            .then((data: Rpi[]) => setRpis(data))
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