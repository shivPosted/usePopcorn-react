import { createContext, useContext, useEffect, useReducer } from "react";
import { fetchMovies } from "../components/util";

const MoviesContext = createContext();

function initWatched() {
  const list = localStorage.getItem("watchedList");
  if (list) return JSON.parse(list);
  return [];
}

const initialState = {
  movies: [],
  watched: initWatched(),
  error: "",
  isLoading: false,
  query: "",
  selectedId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "error":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "movies/set":
      return {
        ...state,
        movies: action.payload,
        isLoading: false,
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
  }
}

function MovieContextProvider({ children }) {
  const [{ movies, watched, isLoading, error, query, selectedId }, dispatch] =
    useReducer(reducer, initialState);

  const searchLength = movies ? movies.length : 0;

  useEffect(() => {
    const controller = new AbortController();

    if (query.length < 3) {
      dispatch({ type: "movies/set", payload: [] });
      return;
    }

    dispatch({ type: "selectedID/null" });
    fetchMovies(query, dispatch, controller);

    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watchedList", JSON.stringify(watched));
  }, [watched]);

  function handleAddToWathedList(passedMovie) {
    const isPresent = watched.findIndex(
      (movie) => movie.imdbID === passedMovie.imdbID,
    );
    if (!(isPresent === -1)) return null;

    // const newArr =
    //   isPresent === -1 ? [...watched] : [...watched].splice(isPresent, 1);

    // newArr.push(passedMovie);
    dispatch({ type: "watched/add", payload: passedMovie });
    // setMovies(cur => )
    dispatch({ type: "selectedID/null" });
  }

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
        handleAddToWathedList,
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
