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
          domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
          authorizationParams={{
            redirect_uri: window.location.origin,
            audience: `${import.meta.env.VITE_AUTH0_AUDIENCE as string}`,
            scope: 'openid profile email',
          }}
        >
          <App />
        </Auth0Provider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
