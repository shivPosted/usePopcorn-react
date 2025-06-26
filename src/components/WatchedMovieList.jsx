import { useState } from "react";
import DeleteButton from "./DeleteButton";
import { useMovieContext } from "../Contexts/MoviesContext";
import { deleteMovie } from "./util";

export default function WatchedMovieList() {
  const { watched: movies, dispatch } = useMovieContext();

  const [hoverId, setHoverId] = useState(null);

  function handleDelete() {
    deleteMovie(hoverId, dispatch);
  }

  console.log(movies);
  return (
    <ul>
      {movies?.map((movie) => (
        <li
          key={movie.imdbId}
          onMouseEnter={() => setHoverId(movie.imdbId)}
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
          {movie.imdbId === hoverId ? (
            <DeleteButton handleClick={handleDelete} />
          ) : (
            ""
          )}
        </li>
      ))}
    </ul>
  );
}
