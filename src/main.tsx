import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Auth0Provider
          domain="dev-4abyqjmhbtxaxgj0.us.auth0.com"
          clientId="0ohH5dNZ4ipvYtcq6lDYMtksWrPDmMFg"
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: 'PortfolioApi',
            scope: 'openid profile email',
          }}
        >
          <App />
        </Auth0Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
