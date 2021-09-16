import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApiContextProvider from './contexts/ApiContext';
import AuthContextProvider from './contexts/AuthContext';


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

