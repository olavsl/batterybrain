import React from 'react';
import SemiCircleProgress from './SemiCircleProgress';

interface RPiButtonProps {
  subdomain: string;
  last_update: string;
  last_battery_lvl: number;
}

export const RPiButton = ({
  subdomain,
  last_update,
  last_battery_lvl,
}: RPiButtonProps) => {
  const url = `http://${subdomain}.gr9.codexenmo.no/`;
  const tmp = last_update.split(' ');
  const date = tmp[0].split('-');
  const time = tmp[1].split(':');
  const last_update_date = new Date(
    parseInt(date[0]),
    parseInt(date[1]) - 1,
    parseInt(date[2]),
    parseInt(time[0]),
    parseInt(time[1]),
    parseInt(time[2])
  );
  const now = new Date();
  const diffSeconds = Math.floor(
    (now.getTime() - last_update_date.getTime()) / 1000
  );
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  // Indicator color
  let indicatorColor = 'bg-gray-500';
  if (diffHours < 1) {
    indicatorColor = 'bg-green';
  } else if (diffHours < 24) {
    indicatorColor = 'bg-yellow-400';
  } else {
    indicatorColor = 'bg-red';
  }

  return (
    <button
      onClick={() => (window.location.href = url)}
      className="bg-background-300 hover:bg-background-400 w-full h-28 rounded-md hover:scale-105 active:scale-100 transition-transform"
    >
      <div className="grid grid-cols-3 h-full justify-between px-4 py-3">
        <div className="col-span-1 h-full flex flex-col justify-between text-left">
          <h2 className="text-2xl text-text-100 mb-1">{subdomain}</h2>
          <h3 className="text-sm text-text-400">{url}</h3>
        </div>
        <div className="col-span-1 flex flex-col justify-center">
          <SemiCircleProgress percentage={last_battery_lvl} />
          <h4 className="text-sm text-text-400">Batteri</h4>
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <div className="flex flex-row w-full items-center justify-end">
            <h4 className="text-sm text-text-400 mr-1">Status:</h4>
            <div
              className={`flex w-4 h-4 rounded-full ${indicatorColor}`}
            ></div>
          </div>
          <div className="w-full flex flex-col items-end">
            <h4 className="text-sm text-text-400">Sist oppdatert:</h4>
            <h4 className="text-sm text-text-500">{last_update}</h4>
          </div>
        </div>
      </div>
    </button>
  );

