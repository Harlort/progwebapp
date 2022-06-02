import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function regServiceWorker() {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../service-worker.js')
      .then(() => { console.log('Registered service worker') })
      .catch(() => { console.log('Could not register service worker') });
  }
}

regServiceWorker();