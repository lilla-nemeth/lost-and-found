import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApiContextProvider from './contexts/ApiContext';
import AuthContextProvider from './contexts/AuthContext';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';




ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

