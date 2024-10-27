import React from 'react';
import SemiCircleProgress from './SemiCircleProgress';

interface RPiButtonProps {
  key: string;
  subdomain: string;
  last_updated: string;
  last_battery_lvl: number;
}

export const RPiButton = ({
  key,
  subdomain,
  last_updated,
  last_battery_lvl,
}: RPiButtonProps) => {
  const url = `http://${subdomain}.gr9.codexenmo.no/`;
  const tmp = last_updated.split(' ');
  const date = tmp[0].split('-');
  const time = tmp[1].split(':');
  const last_updated_date = new Date(
    parseInt(date[0]),
    parseInt(date[1]) - 1,
    parseInt(date[2]),
    parseInt(time[0]),
    parseInt(time[1]),
    parseInt(time[2])
  );
  const now = new Date();
  const diffSeconds = Math.floor(
    (now.getTime() - last_updated_date.getTime()) / 1000
  );
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);

  // indicator color
  // green: less than 1 hour
  // yellow: less than 24 hours
  // red: more than 24 hours
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
      key={key}
      onClick={() => (window.location.href = url)}
      className="bg-background-300 w-1/2 h-28 m-4 rounded-md hover:scale-105"
    >
      <div className="grid grid-cols-3 h-full justify-between pl-8 pr-4 pt-3 pb-3">
        <div className="col-span-1 flex flex-col text-left">
          <h2 className="text-2xl text-text-100 mb-1">{subdomain}</h2>
          <h3 className="text-sm text-text-400">{url}</h3>
        </div>
        <div className="col-span-1 flex flex-col justify-center">
          <SemiCircleProgress percentage={last_battery_lvl} />
          {/*       <svg height="100%" width="100%" viewBox="-2 -2 295 256">
            <path
              d="M55.5,237.2c-23.5-23.3-38.1-55.6-38.1-91.3C17.3,75,74.8,17.5,145.7,17.5C216.5,17.5,274,75,274,145.9  c0,35.7-14.6,68-38.1,91.3"
              strokeWidth="32"
            />
          </svg> */}
          <h4 className="text-sm text-text-400">Batteri</h4>
        </div>
        <div className="col-span-1 flex flex-col justify-between">
          <div className="flex flex-row w-full items-center justify-end ">
            <h4 className="text-sm text-text-400 mr-1">Status:</h4>
            <div
              className={`flex w-4 h-4 rounded-full ${indicatorColor}`}
            ></div>
          </div>
          <div className="w-full flex flex-col items-end">
            <h4 className="text-sm text-text-400">Sist oppdatert:</h4>
            <h4 className="text-sm">{last_updated}</h4>
          </div>
        </div>
      </div>
    </button>
  );
};
