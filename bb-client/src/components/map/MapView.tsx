import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { RPi } from '../../types/Rpi';
import { useTheme } from '../../contexts/ThemeContext';

import 'leaflet/dist/leaflet.css';

// Custom icon for the battery marker
const customIcons: { [key: string]: L.Icon } = {
  AAA: new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/battery_marker.png`,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45],
  }),
  energizer_bunny: new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/energizer_bunny.png`,
    iconSize: [70, 90],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45],
  }),
  energizer9V: new L.Icon({
    iconUrl: `${process.env.PUBLIC_URL}/energizer_9V.png`,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -45],
  }),
};

interface MapViewProps {
  rpis: RPi[];
}

const MapView: React.FC<MapViewProps> = ({ rpis }) => {
  const { darkMode } = useTheme(); // Access the theme context

  const validRPis = rpis.filter(
    (rpi) => !isNaN(rpi.latitude) && !isNaN(rpi.longitude)
  );

  const defaultCenter: LatLngExpression = [40.7128, -74.006]; // Example center (New York)
  const center: LatLngExpression =
    validRPis.length > 0
      ? [
          validRPis.reduce((sum, rpi) => sum + rpi.latitude, 0) /
            validRPis.length,
          validRPis.reduce((sum, rpi) => sum + rpi.longitude, 0) /
            validRPis.length,
        ]
      : defaultCenter;

  return (
    <div className="rounded-xl overflow-hidden">
      <MapContainer
        center={center}
        zoom={3}
        style={{ height: '600px', width: '100%' }}
      >
        <TileLayer
          url={
            darkMode
              ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' // Light theme
              : 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' // Dark theme
          }
          attribution='&copy; <a href="https://www.carto.com/">CARTO</a> contributors'
        />
        {validRPis.map((rpi) => (
          <Marker
            key={rpi.mac_address}
            position={[rpi.latitude, rpi.longitude]}
            icon={
              customIcons[
                Object.keys(customIcons)[
                  Math.floor(Math.random() * Object.keys(customIcons).length)
                ] as keyof typeof customIcons
              ]
            }
          >
            <Popup>
              <div>
                <h2 className="text-lg font-semibold">{rpi.subdomain}</h2>
                <p className="text-sm">Last updated: {rpi.last_update}</p>
                <p className="text-sm">
                  Battery level: {rpi.last_battery_lvl}%
                </p>
                <p className="text-sm">
                  Lat: {rpi.latitude}, Lon: {rpi.longitude}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
