import {
  useReducer,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { getUser, loginUser, createUser, logOutUser } from "./authutil";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const getUserOnRefreshIfAuthorized = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      const user = await getUser();
      dispatch({ type: "USER_LOADED", payload: user });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const login = useCallback(async (formData) => {
    dispatch({ type: "LOADING" });
    try {
      const data = await loginUser(formData);
      const user = await getUser();
      dispatch({ type: "USER_LOADED", payload: user });
      return data;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const signup = useCallback(async (formData) => {
    dispatch({ type: "LOADING" });
    try {
      const data = await createUser(formData);
      const user = await getUser();
      dispatch({ type: "USER_LOADED", payload: user });
      return data;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    dispatch({ type: "LOADING" });
    try {
      await logOutUser(dispatch);
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
      throw error;
    }
  }, []);

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        isAuthenticated,
        login,
        signup,
        logout,
        getUserOnRefreshIfAuthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
