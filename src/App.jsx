import { useEffect, useState } from 'react';
import './style.css';
import { API_key } from './Util';
import { jsx } from 'react/jsx-runtime';
import StarComponent from './StarComponent';
const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = arr => arr.reduce((accum, cur) => accum + cur) / arr.length;

async function fetchMovies(query, setState, setLoading, setError) {
  setLoading(true);
  setError('');
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=${API_key}&s=${query}`
    );
    if (!res.ok) throw new Error(`Failed: ${res.status + res.statusText}`);

    const data = await res.json();
    if (data.Response === 'False') throw new Error(data.Error);
    setState(data.Search);
    console.log(data);
  } catch (err) {
    setError(err.message);
    console.error(err.message);
  } finally {
    // setError('Try Searching');
    setLoading(false);
  }
}

function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('avengers');
  const [selectedMovie, setSelectedMovie] = useState('');
  const searchLength = movies ? movies.length : 0;
  // const search = 'interstellar';

  async function fetchMovieData(id) {
    console.log(id);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=${API_key}`
      );
      if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);

      const data = await res.json();

      if (data.Response === 'False') throw new Error(data.Error);
      setSelectedMovie(data);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    if (query.length < 3) {
      setError('');
      setMovies([]);
      return;
    }
    fetchMovies(query, setMovies, setIsLoading, setError);
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBox setQuery={setQuery} query={query} />
        <NumResult searchLength={searchLength} />
      </NavBar>
      <Main>
        <Box>
          {!error ? (
            isLoading ? (
              <Loader />
            ) : (
              <MovieList movies={movies} setSelectedId={fetchMovieData} />
            )
          ) : (
            <DisplayError message={error} />
          )}
        </Box>
        <Box>
          {selectedMovie ? (
            <SelectedMovie selectedMovie={selectedMovie} />
          ) : (
            <>
              <UserSummary watched={watched} />
              <WatchedMovieList movies={watched} />
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
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => {
        setQuery(e.target.value);

        console.log(e.target.value);
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

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <section className="result-display-section">
      <button
        onClick={() => {
          setIsOpen(cur => !cur);
        }}
      >
        {isOpen ? '-' : '+'}
      </button>
      {isOpen && children}
    </section>
  );
}

function MovieList({ movies, setSelectedId }) {
  return (
    <ul>
      {movies?.map(movie => (
        <li
          key={movie.imdbID}
          onClick={() => {
            setSelectedId(movie.imdbID);
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
  const avgImdbRating = average(watched?.map(movie => movie.imdbRating));
  const avgUserRating = average(watched?.map(movie => movie.userRating));
  const avgRunTime = average(watched?.map(movie => movie.runtime));
  return (
    <div className="user-movies-overview flex">
      <h3>Movies You Watched</h3>
      <div className="stats flex">
        <div className="stats-num">
          #️⃣ <span>{watched.length}</span> Movies
        </div>
        <div className="stats-imdb-avg-ratings">
          ⭐ <span>{avgImdbRating}</span>
        </div>
        <div className="stats-your-avg-ratings">
          🌟 <span>{avgUserRating}</span>
        </div>
        <div className="stats-watch-time">
          ⌛ <span>{avgRunTime}</span> min
        </div>
      </div>
    </div>
  );
}

function WatchedMovieList({ movies }) {
  return (
    <ul>
      {movies?.map(movie => (
        <li key={movie.imdbID}>
          <div className="img-container">
            <img src={movie.Poster} alt={`${movie.Title} Poster`} />
          </div>
          <h3>{movie.Title}</h3>
          <div className="user-reviewed-list-stats flex">
            <div className="imdb-ratings">
              ⭐ <span>{movie.imdbRating}</span>
            </div>
            <div className="user-ratings">
              🌟 <span>{movie.userRating}</span>
            </div>
            <div className="movie-length">
              ⌛ <span>{movie.runtime}</span> min
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SelectedMovie({ selectedMovie }) {
  return (
    <div className="selected-movie">
      <section className="movie-overview">
        <figure className="movie-overview-image">
          <img
            src={selectedMovie.Poster}
            alt={`${selectedMovie.Title}-poster`}
          />
        </figure>
        <div className="movie-overview-details">
          <h2>{selectedMovie.Title}</h2>
          <p>
            {selectedMovie.Released} • {selectedMovie.Runtime}
          </p>
          <p>{selectedMovie.Genre}</p>
          <p>⭐ {selectedMovie.imdbRating} IMDB rating</p>
        </div>
      </section>
      <section>
        <div className="rate-movie">
          <StarComponent maxLength={10} size={24} />
        </div>
        <p>{selectedMovie.Plot}</p>
        <p>Starring {selectedMovie.Actors}</p>
        <p>Directed by {selectedMovie.Director}</p>
      </section>
      <button className="back-btn" onClick={() => {}}>
        &larr;
      </button>
    </div>
  );
}

// console.log(avgImdbRating, avgUserRating);

export default App;
