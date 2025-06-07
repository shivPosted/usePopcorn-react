import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MovieContextProvider } from "./Contexts/MoviesContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./Auth/AuthPage.jsx";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";
// import { Test } from './StarComponent';
// import StarComponent from './StarComponent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovieContextProvider>
      <RouterProvider router={router} />
    </MovieContextProvider>
  </StrictMode>,
);
