import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
import StarComponent from './StarComponent';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <StarComponent maxLength={10} />
  </StrictMode>
);
