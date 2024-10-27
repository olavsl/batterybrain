import React, { useState, useEffect } from 'react';
// import { fetchAllRPis } from '../services/RPiDBService'; // Import the API service
import { RPi } from '../types/Rpi';
import { mockData } from '../data/mockData';
import { RPiButton } from './RPiButton';

const RPiButtons = () => {
  const [rpis, setRpis] = useState<RPi[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getData = async () => {
      setRpis(mockData);
      // try {
      //     const data = await fetchAllRPis();
      //     console.log('Fetched data:', data); // Log the fetched data
      //     setRpis(Array.isArray(data) ? data : []); // Ensure data is an array
      // } catch (error) {
      //     console.error('Error fetching RPi data:', error);
      // }
    };

    getData();
  }, []);

  // Filter RPi list based on search query
  const filteredRPis = rpis.filter((rpi) =>
    rpi.subdomain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center">
      {/* Search Field */}
      <input
        type="text"
        placeholder="Search RPis"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 px-4 py-2 w-1/2 border rounded-md text-text-dark focus:outline-none focus:ring focus:ring-primary"
      />

      {/* RPi Buttons */}
      {filteredRPis.map((rpi) => (
        <RPiButton
          key={rpi.mac_address}
          subdomain={rpi.subdomain}
          last_updated={rpi.last_updated}
          last_battery_lvl={rpi.last_battery_lvl}
        />
      ))}
    </div>
  );
};

export default RPiButtons;
