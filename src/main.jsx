import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MovieContextProvider } from "./Contexts/MoviesContext.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./Auth/AuthPage.jsx";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import ErrorPopup from "./ui/ErrorPopup.jsx";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/user" />,
  },
  {
    path: "/user",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
    errorElement: (
      <ErrorPopup type="fail" message="Authorization failed please try again" />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
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
    <AuthProvider>
      <MovieContextProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </MovieContextProvider>
    </AuthProvider>
  </StrictMode>,
);
