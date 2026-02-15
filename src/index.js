import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './AppTemp'; // Sadece bir kez yazılı olduğundan emin ol

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);