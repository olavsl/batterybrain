import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex ${isOpen ? 'w-64' : 'w-20'} bg-primary text-white h-screen shadow-lg`}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col justify-between h-full w-full">
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-between p-4">
            <span className="text-2xl font-bold">{isOpen ? 'MyApp' : 'M'}</span>
            <button onClick={toggleSidebar} className="focus:outline-none">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
          <nav className="mt-4">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-accent"
              onClick={toggleSidebar}
            >
              {isOpen ? 'Home' : 'H'}
            </Link>
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-accent"
              onClick={toggleSidebar}
            >
              {isOpen ? 'Dashboard' : 'D'}
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 hover:bg-accent"
              onClick={toggleSidebar}
            >
              {isOpen ? 'About' : 'A'}
            </Link>
          </nav>
        </div>
        {/* Bottom Section */}
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="text-sm text-gray-300 hover:text-accent"
          >
            {isOpen ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
