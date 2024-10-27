import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useUser } from '../../contexts/UserContext';
import ThemeToggle from '../ThemeToggle';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { profile, setProfile } = useUser();
  const navigate = useNavigate();
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setIsDropdownOpen(false), 150);
  };

  const handleLogout = () => {
    googleLogout();
    setProfile(null);
    navigate('/');
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    };
  }, []);

  return (
    <nav className="bg-header p-2 bg-background-100">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-text-100">
          <Link to="/dashboard">BætteryBrainz</Link>
        </div>

        {/* Links and Profile */}
        {profile && (
          <div className="flex items-center space-x-6 relative">
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* Profile Icon with Dropdown Wrapper */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={profile.picture} // User profile image
                alt={profile.name}
                className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer"
              />

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background-100 rounded-md shadow-lg z-10">
                  <p className="px-4 py-2 text-sm text-text-100">
                    {profile.name}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-md text-sm text-text-100 hover:text-text-900 hover:bg-background-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
