import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Auth0Provider
        domain='dev-4abyqjmhbtxaxgj0.us.auth0.com'
        clientId='0ohH5dNZ4ipvYtcq6lDYMtksWrPDmMFg'
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'PortfolioApi',
        }}
      >
        <App />
      </Auth0Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
