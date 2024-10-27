import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { RPi } from '../../types/Rpi';

// Import the Leaflet CSS for proper marker styling
import 'leaflet/dist/leaflet.css';

// Create a custom icon
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
            icon={customIcon} // Use the custom icon here
          >
            <Popup>
              <div>
                <h2>{rpi.subdomain}</h2>
                <p>Last updated: {rpi.last_update}</p>
                <p>Battery level: {rpi.last_battery_lvl}%</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
