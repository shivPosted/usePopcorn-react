import { useState } from 'react';
import './style.css';

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

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const searchLength = movies ? movies.length : 0;
  return (
    <>
      <NavBar searchLength={searchLength} />
      <Main movies={movies} />
    </>
  );
}

function NavBar({ searchLength }) {
  return (
    <nav className="flex">
      <Logo />
      <SearchBox />
      <NumResult searchLength={searchLength} />
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo flex">
      <span>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBox() {
  const [search, setSearch] = useState('');
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={e => {
        setSearch(e.target.value);

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

function MovieListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(false);
  return (
    <section className="result-display-section">
      <button
        onClick={() => {
          setIsOpen1(cur => !cur);
        }}
      >
        {isOpen1 ? '-' : '+'}
      </button>
      {isOpen1 && (
        <ul>
          {movies.map(movie => (
            <Movie key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      )}
    </section>
  );
}

function Movie({ movie }) {
  return (
    <li>
      <div className="img-container">
        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
      </div>
      <h3>{movie.Title}</h3>
      <h4>📅 {movie.Year}</h4>
    </li>
  );
}

function WatchedMovieBox() {
  const [isOpen2, setIsOpen2] = useState(false);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <section className="user-interaction-section">
      <button
        onClick={() => {
          setIsOpen2(cur => !cur);
        }}
      >
        {isOpen2 ? '-' : '+'}
      </button>

      {isOpen2 && (
        <>
          <UserSummary watched={watched} />
          <ul className="user-reviewed-list">
            {watched.map(movie => (
              <WatchedMovie key={movie.imdbID} movie={movie} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function UserSummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRunTime = average(watched.map(movie => movie.runtime));
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

function WatchedMovie({ movie }) {
  return (
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
  );
}

// console.log(avgImdbRating, avgUserRating);

function Main({ movies }) {
  return (
    <main className="grid">
      <MovieListBox movies={movies} />
      <WatchedMovieBox />
    </main>
  );
}
export default App;
