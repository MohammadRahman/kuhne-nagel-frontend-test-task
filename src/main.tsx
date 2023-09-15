import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Settings from './ui/Settings.tsx';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Settings>
      <App />
    </Settings>
  </React.StrictMode>
);
