import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ProfileProvider } from './contexts/ProfileContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfileProvider>   
        <AuthProvider>      
          <App />
        </AuthProvider>
      </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>
);
