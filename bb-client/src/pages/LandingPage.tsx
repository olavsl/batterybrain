import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button'; // Adjust the path as needed

const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">BætteryBrainz</h1>
      <Link to="/login">
        <Button
          size="large"
          variant="primary"
          ariaLabel="Log in to BætteryBrainz"
        >
          Log In
        </Button>
      </Link>
    </div>
  );
};

export default Landing;
