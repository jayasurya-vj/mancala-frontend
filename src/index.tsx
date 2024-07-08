import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MancalaProvider } from './context/MancalaContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MancalaProvider>
    <App />
    </MancalaProvider>
  </React.StrictMode>
);

reportWebVitals();
