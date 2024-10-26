import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './contexts/UserContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId="87032160534-02tdeca4kukve8tbbrg8p6fldbjuvcsf.apps.googleusercontent.com">
    <UserProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserProvider>
  </GoogleOAuthProvider>
);
