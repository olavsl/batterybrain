import React from 'react';
import RPiButtons from '../components/RPiButtons';

const Dashboard: React.FC = () => {
  return (
    <div className="text-text-100 p-12 flex flex-col gap-12">
      <h1 className="text-7xl text-center">Dine enheter</h1>
      <RPiButtons />
    </div>
  );
};

export default Dashboard;
