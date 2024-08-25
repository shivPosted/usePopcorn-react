import { useEffect, useState } from 'react';
import './style.css';
import { API_key } from './Util';
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

async function fetchMovies(query, setState) {
  const res = await fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=${API_key}&s=${query}`
  );
  const data = await res.json();
  console.log(data);
  setState(data.Search);
}

function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const searchLength = movies ? movies.length : 0;
  const search = 'interstellar';

  useEffect(() => {
    fetchMovies(search, setMovies);
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBox />
        <NumResult searchLength={searchLength} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <UserSummary watched={watched} />
          <WatchedMovieList movies={watched} />
        </Box>
      </Main>
    </>
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

function Main({ children }) {
  return <main className="grid">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(false);
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

function MovieList({ movies }) {
  return (
    <ul>
      {movies?.map(movie => (
        <li key={movie.imdbID}>
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

// console.log(avgImdbRating, avgUserRating);

export default App;
