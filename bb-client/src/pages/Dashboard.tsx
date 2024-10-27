import React, { useState, useEffect } from 'react';
import RPiButtons from '../components/RPiButtons';
import MapView from '../components/map/MapView';
import { RPi } from '../types/Rpi';
import { fetchAllRPis } from '../services/RPiDBService';
import { mockData } from '../data/mockData';
import StatCard from '../components/stats/StatCard';

const Dashboard: React.FC = () => {
  const [rpis, setRpis] = useState<RPi[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAllRPis();

        const fetchedRPis = data.map((rpi: RPi) => ({
          mac_address: rpi.mac_address,
          subdomain: rpi.subdomain,
          last_update: rpi.last_update,
          last_battery_lvl:
            rpi.last_battery_lvl ||
            Math.max(Math.floor(Math.random() * 100) + 1, 19),
          latitude: rpi.latitude || Math.random() * 180 - 90,
          longitude: rpi.longitude || Math.random() * 360 - 180,
        }));

        const filteredMockData = mockData.filter(
          (mockRpi) =>
            !fetchedRPis.some(
              (fetchedRpi: { subdomain: string }) =>
                fetchedRpi.subdomain === mockRpi.subdomain
            )
        );

        const combinedRPis = [...fetchedRPis, ...filteredMockData]; // Combine fetched and mock data
        setRpis(combinedRPis);
      } catch (error) {
        console.error('Error fetching RPis:', error);
        setRpis(mockData); // Use mock data if fetching fails
      }
    };
    getData();
  }, []);

  // Filter RPis based on tags
  const filteredRPis = rpis.filter((rpi) =>
    tags.some((tag) => rpi.subdomain.toLowerCase().includes(tag.toLowerCase()))
  );

  // Online RPis
  const onlineRPis = rpis.filter(
    (rpi) =>
      typeof rpi.last_update === 'number' &&
      new Date().getTime() - rpi.last_update < 600
  );

  // Average battery level
  const avgBatteryLevel = Math.round(
    rpis.reduce((acc, rpi) => acc + rpi.last_battery_lvl, 0) / rpis.length
  );

  // Handle adding a new tag on Enter key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && searchQuery.trim() !== '') {
      setTags([...tags, searchQuery.trim()]);
      setSearchQuery(''); // Clear the search input after adding the tag
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="p-12 pt-6 grid grid-cols-2 gap-x-12 gap-y-6">
      <div className="col-span-1 h-32">
        <h1 className="text-5xl text-start text-text-100 mb-8">
          Your Raspberry PIs
        </h1>

        {/* Search and Tag Input */}
        <div className="w-full">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="mb-4 w-full px-4 py-2 border border-background-400 rounded-md bg-background-200 text-text-100 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center px-3 py-1 bg-background-300 rounded-full"
              >
                <span className="text-sm text-text-100">{tag}</span>
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-text-400 hover:text-text-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-1 h-32 flex justify-between items-end gap-6">
        <StatCard title="Total RPis" value={rpis.length} />
        <StatCard title="Online RPis" value={onlineRPis.length} />
        <StatCard title="Avg. Battery Level" value={avgBatteryLevel} />
      </div>

      {/* RPi Buttons */}
      <div className="col-span-1 h-80 w-full">
        <RPiButtons
          rpis={
            filteredRPis.length === 0 && tags.length === 0 ? rpis : filteredRPis
          }
        />
      </div>

      {/* Map View with All Filtered RPis */}
      <div className="col-span-1 h-80">
        <MapView
          rpis={
            filteredRPis.length === 0 && tags.length === 0 ? rpis : filteredRPis
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
