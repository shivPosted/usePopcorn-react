import { useEffect, useRef, useState } from "react";
import "./style.css";
import StarComponent from "./StarComponent";
import DeleteButton from "./deleteButton";

const API_key = import.meta.env.VITE_API_key;
const average = (arr) => arr.reduce((accum, cur) => accum + cur) / arr.length;

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

function Loader() {
  return <p className="loader">Loading...</p>;
}

function DisplayError({ message }) {
  return (
    <p className="error">
      🚨<span>{message}</span>
    </p>
  );
}

function NavBar({ children }) {
  return <nav className="flex">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo flex">
      <span>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBox({ setQuery, query }) {
  // const [search, setSearch] = useState('');

  //NOTE: -- how not to select elements in dom👇
  //
  // useEffect(() => {
  //   const input = document.querySelector(".input-field");
  //   input.focus();
  // }, []);

  //HACK: -- how to select dom element in react using refs

  const inputEl = useRef(null);

  useEffect(() => {
    const callBack = function (e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keydown", callBack);

    return () => document.removeEventListener("keydown", callBack);
  }, [setQuery]);

  return (
    <input
      type="text"
      className="input-field"
      placeholder="Search movies..."
      value={query}
      ref={inputEl}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
    />
  );
}

function NumResult({ searchLength }) {
  return (
    <h2 className="result-summary">
      Found <strong>{searchLength}</strong> results
    </h2>
  );
}

function Main({ children }) {
  return <main className="grid">{children}</main>;
}

function Box({ children, className }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <section className={className}>
      <button
        className="collapse-show-btn"
        onClick={() => {
          setIsOpen((cur) => !cur);
        }}
      >
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </section>
  );
}

function MovieList({ movies, setSelectedId }) {
  return (
    <ul>
      {movies?.map((movie) => (
        <li
          className="search-list-row"
          key={movie.imdbID}
          onClick={() => {
            setSelectedId((cur) =>
              cur === movie.imdbID ? null : movie.imdbID,
            );
          }}
        >
          <div className="img-container">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
          </div>
          <h3>{movie.Title}</h3>
          <h4>📅 {movie.Year}</h4>
        </li>
      ))}
    </ul>
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

function UserSummary({ watched }) {
  let avgImdbRating = 0;
  let avgUserRating = 0;
  let avgRunTime = 0;
  if (!(watched.length === 0)) {
    avgImdbRating = average(watched?.map((movie) => movie.imdbRating));
    avgUserRating = average(watched?.map((movie) => movie.userRating));
    avgRunTime = average(watched?.map((movie) => movie.runtime));
  }
  return (
    <div className="user-movies-overview flex">
      <h3>Movies You Watched</h3>
      <div className="stats flex">
        <div className="stats-num">
          #️⃣ <span>{watched.length}</span> Movies
        </div>
        <div className="stats-imdb-avg-ratings">
          ⭐ <span>{+avgImdbRating.toFixed(1)}</span>
        </div>
        <div className="stats-your-avg-ratings">
          🌟 <span>{+avgUserRating.toFixed(1)}</span>
        </div>
        <div className="stats-watch-time">
          ⌛ <span>{+avgRunTime.toFixed(1)}</span> min
        </div>
      </div>
    </div>
  );
}

function WatchedMovieList({ movies, setWathList }) {
  const [hoverId, setHoverId] = useState(null);

  function handleDelete() {
    setWathList((list) => list.filter((item) => item.imdbID !== hoverId));
  }
  return (
    <ul>
      {movies?.map((movie) => (
        <li
          key={movie.imdbID}
          onMouseEnter={() => setHoverId(movie.imdbID)}
          onMouseLeave={() => setHoverId(null)}
          className="watch-list-row"
        >
          <div className="img-container">
            <img src={movie.poster} alt={`${movie.title} Poster`} />
          </div>
          <h3>{movie.title}</h3>
          <div className="user-reviewed-list-stats flex">
            <div className="imdb-ratings">
              ⭐ <span>{movie.imdbRating}</span>
            </div>
            <div className="user-ratings">
              🌟 <span>{movie.userRating}</span>
            </div>
            <div className="movie-length">
              ⌛ <span>{movie.runtime}</span>
            </div>
          </div>
          {movie.imdbID === hoverId ? (
            <DeleteButton handleClick={handleDelete} />
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
}

function SelectedMovie({
  selectedId,
  setSelectedId,
  handleAddToWathedList,
  watchlist,
}) {
  // let showAddBtn = false;

  const iswatched = watchlist.find((movie) => movie.imdbID === selectedId);

  // function defaultRatingHandle() {
  //   // if (!movieInList) return;

  //   const defaultRating = iswatched ? iswatched.userRating : 0;
  //   setUserRating(defaultRating);
  //   // showAddBtn = true;
  // }

  // const defaultRating =
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);

  const {
    Poster: poster,
    Title: title,
    Released: released,
    Plot: plot,
    Genre: genre,
    Actors: actors,
    Director: director,
    Runtime: runtime,
    imdbRating,
  } = selectedMovie;

  function handleOnBackClick() {
    setSelectedId(null);
  }

  function handleAddOnClick() {
    const newMovie = {
      runtime: parseInt(runtime),
      title,
      imdbRating: parseInt(imdbRating),
      userRating,
      poster,
      imdbID: selectedId,
    };

    handleAddToWathedList(newMovie);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchMovieData() {
      setError("");
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=${API_key}`,

          { signal },
        );
        if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);

        const data = await res.json();

        if (data.Response === "False") throw new Error(data.Error);

        setSelectedMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieData(selectedId);

    () => controller.abort();
    // defaultRatingHandle();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => (document.title = "usePopcorn"); //cleanup function
  }, [title]);

  useEffect(() => {
    const keydownEvent = function (e) {
      if (e.key === "Escape") handleOnBackClick();
    };

    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
  }, [handleOnBackClick]);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <DisplayError message={error} />
  ) : (
    <>
      <div className="selected-movie">
        <section className="movie-overview">
          <img
            className="movie-overview-image"
            src={poster}
            alt={`${title}-poster`}
          />
          <div className="movie-overview-details">
            <h2>{title}</h2>
            <p>
              {released} &bull; {runtime}
            </p>
            <p>{genre}</p>
            <p>⭐ {imdbRating} IMDB rating</p>
          </div>
        </section>
        <section>
          <div className="rate-movie">
            {!iswatched ? (
              <>
                <StarComponent
                  maxLength={10}
                  size={24}
                  onSetRating={setUserRating}
                  defaultRating={userRating}
                />
                {userRating > 0 ? (
                  <button
                    className="add-watchlist-btn"
                    onClick={handleAddOnClick}
                  >
                    + Add To Watchlist
                  </button>
                ) : (
                  ""
                )}
              </>
            ) : (
              <p>
                You gave this movie <strong>{iswatched.userRating}</strong>⭐
                rating
              </p>
            )}
          </div>
          <p>{plot}</p>
          <p>Starring {actors}</p>
          <p>Directed by {director}</p>
        </section>
        <button className="back-btn" onClick={handleOnBackClick}>
          &larr;
        </button>
      </div>
    </>
  );
}

export default App;
