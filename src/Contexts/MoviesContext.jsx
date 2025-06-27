import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { fetchMovies, fetchWatchList } from "../components/util";

import { useAuth } from "../Auth/AuthContext";

const MoviesContext = createContext();

// NOTE: for localstorage use
// function initWatched() {
//   const list = localStorage.getItem("watchedList");
//   if (list) return JSON.parse(list);
//   return [];
// }

const initialState = {
  movies: [],
  watched: [],
  error: "",
  isLoading: false,
  isLoadingWatchList: false,
  query: "",
  selectedId: null,
  errorWatched: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "error/watched":
      return {
        ...state,
        errorWatched: action.payload,
        isLoadingWatchList: false,
      };
    case "movies/set":
      return {
        ...state,
        movies: action.payload,
        isLoading: false,
        error: "",
      };
    case "watched/set":
      return {
        ...state,
        watched: action.payload,
        isLoadingWatchList: false,
        error: "",
      };
    case "selectedID/set":
      return {
        ...state,
        selectedId: state.selectedId === action.payload ? null : action.payload,
        isLoading: false,
        error: "",
      };
    case "selectedID/null":
      return {
        ...state,
        selectedId: null,
      };
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case "loading/watched":
      return {
        ...state,
        isLoadingWatchList: true,
      };
    case "watched/add":
      return {
        ...state,
        watched: [...state.watched, action.payload],
      };
    case "watched/delete":
      return {
        ...state,
        watched: state.watched.filter(
          (movie) => movie.imdbID !== action.payload,
        ),
      };
    case "query/set":
      return {
        ...state,
        query: action.payload,
      };
    case "reset":
      return {
        ...initialState,
      };
  }
}

function MovieContextProvider({ children }) {
  const API_key = import.meta.env.VITE_OMDB_API_KEY;
  const { isAuthenticated } = useAuth();
  const [
    {
      movies,
      watched,
      isLoading,
      error,
      query,
      selectedId,
      isLoadingWatchList,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const searchLength = movies ? movies.length : 0;

  const watchedList = useCallback(fetchWatchList, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) watchedList(dispatch);
  }, [watchedList, isAuthenticated]);

  useEffect(() => {
    const controller = new AbortController();

    if (query.length < 3) {
      dispatch({ type: "movies/set", payload: [] });
      return;
    }

    dispatch({ type: "selectedID/null" });
    fetchMovies(query, dispatch, controller, API_key);

    return () => {
      controller.abort();
    };
  }, [query, API_key]);

  // useEffect(() => {
  //   try {
  //     localStorage.setItem("watchedList", JSON.stringify(watched));
  //   } catch (error) {
  //     dispatch({ type: "error/watched", payload: error.message });
  //   }
  // }, [watched]);

  // function handleAddToWathedList(passedMovie) {
  //   const isPresent = watched.findIndex(
  //     (movie) => movie.imdbID === passedMovie.imdbID,
  //   );
  //   if (!(isPresent === -1)) return null;
  //
  //   dispatch({ type: "watched/add", payload: passedMovie });
  //   dispatch({ type: "selectedID/null" });
  // }

  return (
    <MoviesContext.Provider
      value={{
        movies,
        selectedId,
        isLoading,
        error,
        dispatch,
        searchLength,
        watched,
        query,
        isLoadingWatchList,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovieContext() {
  const context = useContext(MoviesContext);
  if (context === undefined)
    throw new Error("Movie Context used outside its scope");
  return context;
}

export { MovieContextProvider, useMovieContext };
