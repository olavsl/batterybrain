import React from 'react';
import Navbar from './navigation/Navbar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at the top */}
      <Navbar />
      {/* Page Content */}
      <main className="flex-1 container mx-auto p-6 bg-background">
        <Outlet /> {/* Renders the nested route components */}
      </main>
    </div>
  );
};

export default Layout;
