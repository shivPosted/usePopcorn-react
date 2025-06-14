import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MovieContextProvider } from "./Contexts/MoviesContext.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "./Auth/AuthPage.jsx";
import Login from "./Auth/Login.jsx";
import Signup from "./Auth/Signup.jsx";
import { action as signupAction } from "./Auth/Signup.jsx";
import { action as loginAction } from "./Auth/Login.jsx";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import ErrorPopup from "./ui/ErrorPopup.jsx";

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
        action: loginAction,
      },
      {
        path: "signup",
        element: <Signup />,
        action: signupAction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MovieContextProvider>
        <RouterProvider router={router} />
      </MovieContextProvider>
    </AuthProvider>
  </StrictMode>,
);
