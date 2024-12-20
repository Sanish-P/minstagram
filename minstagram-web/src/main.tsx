import React from 'react';
import { createRoot } from "react-dom/client";

import App from './App';

const renderApp = () => {
  const rootDiv = document.getElementById('app');
  if(rootDiv) {
    const root = createRoot(rootDiv)
    root.render(<App />);
  } else {
    console.error('Root app element is missing');
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
}

renderApp();