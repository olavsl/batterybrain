import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { RPi } from '../../types/Rpi';

// Import the Leaflet CSS for proper marker styling
import 'leaflet/dist/leaflet.css';

// Create a custom icon for the battery marker
const customIcon = new L.Icon({
  iconUrl: `${process.env.PUBLIC_URL}/battery_marker.png`, // Path to your custom marker icon
  iconSize: [35, 45], // Size of the icon
  iconAnchor: [17, 45], // Anchor the icon so that the point is on the location
  popupAnchor: [0, -45], // Position popup relative to the icon
});

interface MapViewProps {
  rpis: RPi[];
}

const MapView: React.FC<MapViewProps> = ({ rpis }) => {
  // Filter out RPis with invalid coordinates
  const validRPis = rpis.filter(
    (rpi) => !isNaN(rpi.latitude) && !isNaN(rpi.longitude)
  );

  // Set default center if no RPis
  const defaultCenter: LatLngExpression = [40.7128, -74.006]; // New York City as an example
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
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {validRPis.map((rpi) => (
          <Marker
            key={rpi.mac_address}
            position={[rpi.latitude, rpi.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="flex flex-col space-y-2 rounded-lg text-gray-800">
                <h2 className="text-lg font-semibold text-gray-900">
                  {rpi.subdomain}
                </h2>
                <p className="text-sm text-gray-600">
                  Last updated: {rpi.last_update}
                </p>
                <p className="text-sm text-gray-600">
                  Battery level: {rpi.last_battery_lvl}%
                </p>
                <p className="text-sm text-gray-600">
                  Latitude: {rpi.latitude}, Longitude: {rpi.longitude}
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
