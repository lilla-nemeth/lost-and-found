import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import AppStateContextProvider from './contexts/AppStateContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

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
