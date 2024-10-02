import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MovieContextProvider } from "./Contexts/MoviesContext.jsx";
// import { Test } from './StarComponent';
// import StarComponent from './StarComponent';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </StrictMode>,
);
