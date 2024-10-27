import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="w-48 h-fit rounded-lg flex flex-col gap-1">
      <div className="flex justify-center items-center h-fit mb-3">
        {title === 'Avg. Battery Level' ? (
          <span className="text-2xl font-bold text-text-100">{value}%</span>
        ) : (
          <span className="text-2xl font-bold text-text-100">{value}</span>
        )}
      </div>
      <hr className="border border-background-300" />
      <div className="flex justify-center items-center h-8">
        <span className="text-sm text-text-200 font-bold">{title}</span>
      </div>
    </div>
  );
};

export default StatCard;
