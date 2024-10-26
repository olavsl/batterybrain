import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to MyApp</h1>
      <p className="text-lg text-gray-700 mb-8">
        Discover our features by logging in to your account.
      </p>
      <Link
        to="/login"
        className="px-6 py-3 bg-primary text-white rounded hover:bg-accent"
      >
        Log In
      </Link>
    </div>
  );
};

export default Landing;
