import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './contexts/UserContext';
import { ThemeProvider } from './contexts/ThemeContext';

const clientId =
  process.env.GOOGLE_CLIENT_ID ||
  'EXCHANGE_WITH_YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={clientId}>
    <UserProvider>
      <ThemeProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </UserProvider>
  </GoogleOAuthProvider>
);
