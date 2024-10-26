import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './pages/LoginPage';
import { isAuthenticated } from './services/LoginService';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        {isAuthenticated() ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} /> // Redirect unauthorized access to login
        )}
      </Routes>
    </Router>
  );
};

export default App;
