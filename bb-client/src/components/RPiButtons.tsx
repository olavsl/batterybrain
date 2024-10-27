import React from 'react';
import { RPi } from '../types/Rpi';
import { RPiButton } from './RPiButton';

interface RPiButtonsProps {
  rpis: RPi[];
}

const RPiButtons: React.FC<RPiButtonsProps> = ({ rpis }) => {
  return (
    <div className="h-96 overflow-y-scroll scrollable-container overflow-x-hidden w-full px-10 pt-3 flex flex-col items-center gap-3">
      {rpis.map((rpi) => (
        <RPiButton
          key={rpi.mac_address} // `key` is only used here for React's list rendering
          subdomain={rpi.subdomain}
          last_update={rpi.last_update}
          last_battery_lvl={rpi.last_battery_lvl}
        />
      ))}
    </div>
  );
};

export default RPiButtons;
