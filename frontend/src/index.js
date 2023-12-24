import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import AppStateContextProvider from './contexts/AppStateContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

Sentry.init({
  dsn: 'https://3e23ef08f38d4d7d9b956e81b8e2a466@o1077602.ingest.sentry.io/6080787',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.3,
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppStateContextProvider>
        <App />
      </AppStateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
