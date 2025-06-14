import { useEffect } from "react";
import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getUser } from "./authutil";
import { Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET/AUTHENTICATE":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SET/USER":
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        error: null,
      };

    case "SET/LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET/LOADING_DONE":
      return {
        ...state,
        isLoading: false,
      };
    case "SET/ERROR":
      return {
        ...state,
        isLoading: false,
        user: {},
        error: action.payload,
      };
    case "REMOVE/ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isLoading, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const fetchUserInfo = useCallback(async function fetchUserInfo() {
    dispatch({ type: "SET/LOADING" });
    dispatch({ type: "REMOVE/ERROR" });
    try {
      const user = await getUser();
      dispatch({ type: "SET/USER", payload: user });
      return user;
    } catch (error) {
      console.error(error.message);
      dispatch({ type: "SET/ERROR", payload: error.message });
      throw error;
    } finally {
      dispatch({ type: "SET/LOADING_DONE" });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        dispatch,
        fetchUserInfo,
        user,
        error,
        isLoading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Can not use context out of its scope");
  return context;
}

export { AuthProvider, useAuth };
