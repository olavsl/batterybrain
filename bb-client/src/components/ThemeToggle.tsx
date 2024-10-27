import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="p-2 rounded-md focus:outline-none hover:bg-background-300 active:bg-background-400 transition-colors"
    >
      <div
        className={`transition-transform duration-500 ${darkMode ? 'rotate-180' : 'rotate-0'}`}
      >
        {darkMode ? (
          <MdLightMode className="text-yellow-400" />
        ) : (
          <MdDarkMode className="text-blue-600" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
