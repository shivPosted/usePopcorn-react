import { useMovieContext } from "../Contexts/MoviesContext";

export default function MovieList() {
  const { movies, dispatch } = useMovieContext();

  return (
    <ul>
      {movies?.map((movie) => (
        <li
          className="search-list-row"
          key={movie.imdbID}
          onClick={() => {
            dispatch({ type: "selectedID/set", payload: movie.imdbID });
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
