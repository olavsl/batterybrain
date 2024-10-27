import React from 'react';
import RPiButtons from '../components/RPiButtons';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white- text-text p-24">
      <h1 className="text-7xl text-center">Dine enheter</h1>
      <RPiButtons />
  </div>
  )
};

export default Dashboard;
