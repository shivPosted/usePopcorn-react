import { useEffect, useState } from "react";
import "./style.css";
import NavBar from "./components/Navbar";
import Logo from "./components/Logo";
import SearchBox from "./components/SearchBox";
import NumResult from "./components/NumResult";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import MovieList from "./components/MovieList";
import DisplayError from "./components/DisplayError";
import SelectedMovie from "./components/SelectedMovie";
import UserSummary from "./components/UserSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import { API_key } from "./components/util";

async function fetchMovies(query, setState, setLoading, setError, controller) {
  setLoading(true);
  setError("");

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${API_key}&s=${query}`,
      { signal: controller.signal },
    );
    if (!res.ok) throw new Error(`Failed: ${res.status + res.statusText}`);

    const data = await res.json();
    if (data.Response === "False") throw new Error(data.Error);
    setState(data.Search);
  } catch (err) {
    if (err.name !== "AbortError") {
      setError(err.message);
    }
  } finally {
    setError("");
    setLoading(false);
  }
}

function App() {
  const [movies, setMovies] = useState([]);

  const [watched, setWatched] = useState(() => {
    const list = localStorage.getItem("watchedList");
    if (list) return JSON.parse(list);
    return [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  // const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const searchLength = movies ? movies.length : 0;
  // const search = 'interstellar';

  // async function fetchMovieData(id) {
  //   if (selectedMovie?.imdbID === id) {
  //     setSelectedMovie(null);
  //     return;
  //   }
  //   try {
  //     const res = await fetch(
  //       `https://www.omdbapi.com/?i=${id}&apikey=${API_key}`
  //     );
  //     if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);

  //     const data = await res.json();

  //     if (data.Response === 'False') throw new Error(data.Error);
  //     setSelectedMovie(data);
  //   } catch (err) {
  //   }
  // }

  useEffect(() => {
    const controller = new AbortController();

    if (query.length < 3) {
      setError("");
      setMovies([]);
      return;
    }

    setSelectedId(null);
    fetchMovies(query, setMovies, setIsLoading, setError, controller);

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
    setWatched((cur) => [...cur, passedMovie]);
    // setMovies(cur => )
    setSelectedId(null);
  }
  return (
    <>
      <NavBar>
        <Logo />
        <SearchBox setQuery={setQuery} query={query} />
        <NumResult searchLength={searchLength} />
      </NavBar>
      <Main>
        <Box className="result-display-section">
          {!error ? (
            isLoading ? (
              <Loader />
            ) : (
              <MovieList movies={movies} setSelectedId={setSelectedId} />
            )
          ) : (
            <DisplayError message={error} />
          )}
        </Box>
        <Box className="watch-list-section">
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              handleAddToWathedList={handleAddToWathedList}
              watchlist={watched}
            />
          ) : (
            <>
              <UserSummary watched={watched} />
              <WatchedMovieList movies={watched} setWathList={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// function WatchedMovieBox({children}) {
//   const [isOpen2, setIsOpen2] = useState(false);
//   return (
//     <section className="user-interaction-section">
//       <button
//         onClick={() => {
//           setIsOpen2(cur => !cur);
//         }}
//       >
//         {isOpen2 ? '-' : '+'}
//       </button>

//       {isOpen2 && (
//         <>
//           <UserSummary watched={watched} />
//           {children}
//         </>
//       )}
//     </section>
//   );
// }

export default App;
