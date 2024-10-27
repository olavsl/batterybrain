import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded-md focus:outline-none focus:ring"
    >
      {darkMode ? (
        <MdLightMode className="text-yellow-400" />
      ) : (
        <MdDarkMode className="text-blue-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
