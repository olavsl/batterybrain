import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">BætteryBrainz</h1>
      <Link
        to="/login"
        className="px-6 py-3 bg-primary text-text rounded hover:bg-accent"
      >
        Log In
      </Link>
    </div>
  );
};

export default Landing;
