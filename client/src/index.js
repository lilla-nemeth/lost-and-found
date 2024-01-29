import React from 'react';
import { createRoot } from 'react-dom/client';
import './style/App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import AppRoutes from './routes/AppRoutes';
import AuthContextProvider from './contexts/AuthContext';
import AppStateContextProvider from './contexts/AppStateContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppStateContextProvider>
        <AppRoutes />
      </AppStateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
