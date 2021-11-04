import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContextProvider from './contexts/AuthContext';
import AppStateContextProvider from './contexts/AppStateContext';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AppStateContextProvider>
          <App />
      </AppStateContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

